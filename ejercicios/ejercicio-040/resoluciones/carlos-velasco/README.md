# Ejercicio 040: API de pedidos

## Error encontrado

Se encontraron varios errores en el archivo `app.js`.

Aunque el objetivo del ejercicio indica "Separar errores 404 y 422", el código y el test proporcionados no contienen ningún caso relacionado con validaciones de entrada ni con respuestas `422 Unprocessable Entity`.

El contrato real definido por `orders.api.test.js` exige:

- `GET /health` debe responder `200`.
- `GET /items/:id` debe encontrar correctamente un elemento mediante un ID numérico.
- `GET /items/:id` debe responder `404` cuando el elemento no existe.
- `POST /items` debe crear un elemento con ID consecutivo.
- `POST /items` debe responder `201`.

Por esta razón, la solución se basa en el comportamiento realmente comprobado por el código y los tests proporcionados.

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

Express proporciona:

```js
req.params.id
```

como:

```text
"1"
```

Mientras que los IDs almacenados en `items` son números:

```text
1
2
```

Por lo tanto, la comparación original termina siendo:

```js
1 === "1"
```

El resultado es:

```text
false
```

Esto provoca que incluso un elemento existente no sea encontrado.

### Corrección

Se convierte el parámetro de la ruta a número:

```js
current.id === Number(req.params.id)
```

Ahora la comparación es:

```js
1 === Number("1")
```

y el resultado es:

```text
true
```

---

### Error 2: status incorrecto cuando no existe el elemento

La implementación original utilizaba:

```js
if (!item) return res.status(200).json({ error: 'not found' });
```

El test exige:

```js
await request(app).get('/items/999').expect(404);
```

Cuando el recurso solicitado no existe, la respuesta correcta debe ser:

```text
404 Not Found
```

Por lo tanto, se cambió a:

```js
if (!item) {
  return res.status(404).json({ error: 'not found' });
}
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

Una creación exitosa debe responder:

```text
201 Created
```

Por lo tanto, se cambió a:

```js
return res.status(201).json(item);
```

## Sobre el objetivo de separar errores `404` y `422`

El objetivo indicado para el ejercicio es:

```text
Separar errores 404 y 422.
```

Sin embargo, el código y los tests proporcionados no definen ningún escenario de validación que requiera `422`.

El test únicamente comprueba:

```text
GET /health
GET /items/:id
POST /items
```

No existe ningún caso que envíe datos inválidos mediante `POST /items`, ni se especifica qué campos serían obligatorios o qué condición debería producir un `422`.

Por ejemplo, el test actual utiliza:

```js
.send({ name: 'gamma', score: 30 })
```

y espera:

```text
201 Created
```

Por esta razón, no se agregó una validación `422` que no está definida por el contrato actual.

Agregar reglas de validación adicionales podría cambiar el comportamiento de la aplicación más allá de lo solicitado por los tests disponibles.

## Cambio aplicado

Se realizaron únicamente los cambios necesarios para cumplir el contrato definido por los tests.

### Cambio 1: convertir el ID de string a número

Se cambió:

```js
current.id === req.params.id
```

por:

```js
current.id === Number(req.params.id)
```

### Cambio 2: devolver `404` cuando el elemento no existe

Se cambió:

```js
res.status(200).json({ error: 'not found' })
```

por:

```js
res.status(404).json({ error: 'not found' })
```

### Cambio 3: devolver `201` después de crear

Se cambió:

```js
res.status(200).json(item)
```

por:

```js
res.status(201).json(item)
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
npm test -- ejercicios/ejercicio-040/tests/orders.api.test.js
```

También puede ejecutarse directamente con Vitest:

```bash
npx vitest run ejercicios/ejercicio-040/tests/orders.api.test.js
```

## Validación del primer caso

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

## Validación del segundo caso

El test realiza:

```http
GET /items/1
```

Express recibe:

```text
req.params.id = "1"
```

La solución convierte el valor mediante:

```js
Number(req.params.id)
```

obteniendo:

```text
1
```

El elemento encontrado es:

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

Después se realiza:

```http
GET /items/999
```

Como no existe un elemento con ese ID, la aplicación responde:

```text
404 Not Found
```

## Validación del tercer caso

El test realiza:

```http
POST /items
```

con:

```json
{
  "name": "gamma",
  "score": 30
}
```

Inicialmente existen dos elementos:

```text
id 1
id 2
```

Por lo tanto:

```js
items.length + 1
```

genera:

```text
id 3
```

El objeto creado es:

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

Los tres casos definidos en el test deben pasar correctamente:

```text
✓ responde health correctamente
✓ busca item por id numerico y devuelve 404 si no existe
✓ crea item con status 201
```

Resultado esperado:

```text
3 tests passed
```

El formato exacto de la salida puede variar dependiendo de la versión de Vitest.

## Estructura de la entrega

```text
ejercicios/ejercicio-040/resoluciones/carlos-velasco/
+-- app.js
+-- README.md
```

## Conclusión

Se corrigieron los errores que afectan directamente el contrato verificable del ejercicio.

El primer error estaba causado por comparar un ID numérico almacenado en los datos con un parámetro de ruta recibido como string.

El segundo error consistía en devolver `200 OK` cuando el recurso solicitado no existía. Se corrigió a `404 Not Found`.

El tercer error consistía en devolver `200 OK` después de crear un recurso. Se corrigió a `201 Created`.

La funcionalidad de `422 Unprocessable Entity` mencionada en el objetivo no fue implementada porque los tests proporcionados no establecen ningún escenario de validación que defina cuándo debe producirse dicha respuesta.

La solución se mantiene limitada al comportamiento establecido por `orders.api.test.js`.

No se modificaron los tests ni los archivos base.