# Ejercicio 045: Servicios asincronicos

## Error encontrado

Se encontraron tres errores en la implementación de `app.js`.

Aunque el objetivo del ejercicio indica:

```text
Esperar promesas antes de responder.
```

el test proporcionado no contiene ninguna operación asíncrona ni una promesa que deba ser esperada explícitamente.

El contrato real definido por `async.api.test.js` exige:

- `GET /health` debe responder `200`.
- `GET /items/:id` debe encontrar correctamente un elemento mediante un ID numérico.
- `GET /items/:id` debe responder `404` cuando el elemento no existe.
- `POST /items` debe crear un elemento con ID consecutivo.
- `POST /items` debe responder `201`.

Por esta razón, la solución se basa en el comportamiento realmente verificable mediante los tests proporcionados.

## Causa raiz

### Error 1: comparación incorrecta del ID

La implementación original utilizaba:

```js
const item = items.find(current => current.id === req.params.id);
```

Los parámetros de una ruta de Express son recibidos como strings.

Cuando se realiza:

```http
GET /items/1
```

el valor de:

```js
req.params.id
```

es:

```text
"1"
```

Mientras que los IDs almacenados en `items` son números:

```text
1
2
```

Por lo tanto, la comparación original equivale a:

```js
1 === "1"
```

El resultado es:

```text
false
```

Esto provoca que un elemento existente no sea encontrado.

### Corrección

Se convierte el parámetro recibido por la ruta a número:

```js
current.id === Number(req.params.id)
```

Ahora la comparación es:

```js
1 === Number("1")
```

y produce:

```text
true
```

---

### Error 2: status incorrecto cuando el elemento no existe

La implementación original utilizaba:

```js
if (!item) return res.status(200).json({ error: 'not found' });
```

El problema es que un recurso inexistente no representa una respuesta exitosa.

El test exige:

```js
await request(app).get('/items/999').expect(404);
```

Por lo tanto, la respuesta correcta es:

```js
return res.status(404).json({ error: 'not found' });
```

De esta manera, cuando el elemento no existe, la API devuelve:

```text
404 Not Found
```

---

### Error 3: status incorrecto después de crear un elemento

La implementación original utilizaba:

```js
return res.status(200).json(item);
```

para `POST /items`.

El test exige:

```js
.expect(201);
```

Cuando se crea correctamente un nuevo recurso, la respuesta esperada es:

```text
201 Created
```

Por lo tanto, se cambia a:

```js
return res.status(201).json(item);
```

## Sobre la asincronia

El objetivo del ejercicio menciona:

```text
Esperar promesas antes de responder.
```

Sin embargo, el archivo base proporcionado no contiene:

- funciones `async`;
- promesas;
- `await`;
- operaciones asíncronas;
- servicios externos;
- callbacks que deban convertirse en promesas.

Las operaciones utilizadas actualmente son síncronas:

```js
items.find(...)
```

y:

```js
items.push(...)
```

Por lo tanto, no existe una promesa real que deba esperarse dentro del código proporcionado.

Agregar `async` o `await` sin que exista una operación asíncrona no solucionaría ninguno de los errores comprobados por el test.

La corrección se limita al contrato verificable.

## Cambio aplicado

### Cambio 1: convertir el ID de la ruta

Se cambió:

```js
current.id === req.params.id
```

por:

```js
current.id === Number(req.params.id)
```

Esto permite comparar correctamente el ID numérico almacenado con el parámetro de ruta.

### Cambio 2: responder `404` cuando no existe el elemento

Se cambió:

```js
return res.status(200).json({ error: 'not found' });
```

por:

```js
return res.status(404).json({ error: 'not found' });
```

### Cambio 3: responder `201` después de crear

Se cambió:

```js
return res.status(200).json(item);
```

por:

```js
return res.status(201).json(item);
```

No se modificaron los tests ni los archivos base.

## Solución final

```js
import express from 'express';

export function createApp() {
  const app = express();
  app.use(express.json());

  const items = [
    { id: 1, name: 'alpha', score: 10 },
    { id: 2, name: 'beta', score: 20 }
  ];

  app.get('/health', (req, res) => {
    res.status(200).json({ ok: true });
  });

  app.get('/items/:id', (req, res) => {
    const item = items.find(current => current.id === Number(req.params.id));

    if (!item) {
      return res.status(404).json({ error: 'not found' });
    }

    return res.status(200).json(item);
  });

  app.post('/items', (req, res) => {
    const item = { id: items.length + 1, ...req.body };
    items.push(item);

    return res.status(201).json(item);
  });

  return app;
}
```

## Comando usado para validar

```bash
npm test -- ejercicios/ejercicio-045/tests/async.api.test.js
```

También puede utilizarse:

```bash
npx vitest run ejercicios/ejercicio-045/tests/async.api.test.js
```

## Validación

### Caso 1: health

El test realiza:

```http
GET /health
```

La respuesta esperada es:

```text
200 OK
```

con:

```json
{
  "ok": true
}
```

La implementación mantiene este comportamiento.

### Caso 2: búsqueda por ID

El test realiza:

```http
GET /items/1
```

Express recibe:

```js
req.params.id
```

como:

```text
"1"
```

La solución utiliza:

```js
Number(req.params.id)
```

para convertirlo a:

```text
1
```

Esto permite encontrar:

```json
{
  "id": 1,
  "name": "alpha",
  "score": 10
}
```

La respuesta es:

```text
200 OK
```

Después, el test realiza:

```http
GET /items/999
```

Como no existe un elemento con ese ID, la respuesta es:

```text
404 Not Found
```

### Caso 3: creación de elemento

El test realiza:

```http
POST /items
```

enviando:

```json
{
  "name": "gamma",
  "score": 30
}
```

Inicialmente existen:

```text
id 1
id 2
```

Por lo tanto:

```js
items.length + 1
```

produce:

```text
id 3
```

El nuevo elemento es:

```json
{
  "id": 3,
  "name": "gamma",
  "score": 30
}
```

La respuesta utiliza:

```text
201 Created
```

cumpliendo el contrato del test.

## Resultado final

Los tres casos definidos en `async.api.test.js` deben pasar correctamente:

```text
✓ responde health correctamente
✓ busca item por id numerico y devuelve 404 si no existe
✓ crea item con status 201
```

Resultado esperado:

```text
3 tests passed
```

El formato exacto de la salida puede variar dependiendo de la versión y configuración de Vitest.

## Estructura de la entrega

```text
ejercicios/ejercicio-045/resoluciones/carlos-velasco/
├── app.js
└── README.md
```

## Conclusión

Se encontraron tres errores comprobables en `app.js`.

El primero estaba en la búsqueda por ID. Express entrega los parámetros de ruta como strings, mientras que los IDs almacenados son números. Se corrigió mediante:

```js
Number(req.params.id)
```

El segundo error consistía en devolver:

```text
200 OK
```

cuando el elemento no existía. Se corrigió a:

```text
404 Not Found
```

El tercer error consistía en devolver:

```text
200 OK
```

después de crear un recurso. Se corrigió a:

```text
201 Created
```

Aunque el objetivo menciona servicios asíncronos, el código y los tests proporcionados no contienen ninguna operación basada en promesas que deba ser esperada. Por ello, no se agregó `async` ni `await` de manera artificial.

La solución mantiene la estructura original y aplica únicamente los cambios necesarios para cumplir el contrato real definido por `async.api.test.js`.

Los tests originales no fueron modificados.