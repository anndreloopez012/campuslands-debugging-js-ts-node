# Ejercicio 047: Capas controller/service

## Error encontrado

Se encontraron varios errores en el archivo `app.js`.

Aunque el objetivo del ejercicio indica "Corregir contrato entre ruta y servicio", el archivo proporcionado no contiene una separación explícita entre capas `controller` y `service`. Tampoco existen archivos independientes para esas capas ni tests que comprueben directamente dicha arquitectura.

El contrato real definido por `layers.api.test.js` exige:

- `GET /health` debe responder `200`.
- `GET /items/:id` debe encontrar correctamente un elemento mediante un ID numérico.
- `GET /items/:id` debe responder `404` cuando el elemento no existe.
- `POST /items` debe crear un elemento con ID consecutivo.
- `POST /items` debe responder `201`.

Por esta razón, la solución se basa en el comportamiento realmente comprobado por el test.

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

Se convierte el parámetro de la ruta a número:

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

### Error 2: status incorrecto cuando no existe el elemento

La implementación original utilizaba:

```js
if (!item) return res.status(200).json({ error: 'not found' });
```

El problema es que `200 OK` indica una respuesta exitosa, pero el recurso solicitado no existe.

El test exige:

```js
await request(app).get('/items/999').expect(404);
```

Por lo tanto, la respuesta correcta debe ser:

```js
res.status(404)
```

La implementación corregida es:

```js
if (!item) {
  return res.status(404).json({ error: 'not found' });
}
```

---

### Error 3: status incorrecto después de crear un recurso

La implementación original utilizaba:

```js
return res.status(200).json(item);
```

para:

```http
POST /items
```

El test exige:

```js
.expect(201);
```

Cuando un nuevo recurso se crea correctamente, el contrato del test espera:

```text
201 Created
```

Por lo tanto, se debe utilizar:

```js
return res.status(201).json(item);
```

---

### Error 4: contrato entre ruta y servicio no representado en el código

El objetivo menciona explícitamente:

```text
Corregir contrato entre ruta y servicio.
```

Sin embargo, el código proporcionado implementa toda la lógica directamente dentro de `createApp()`.

No existen funciones o módulos independientes que representen:

```text
ruta → controller → service
```

Tampoco existe un test que compruebe:

- la existencia de un controller;
- la existencia de un service;
- los parámetros enviados desde el controller al service;
- el valor retornado por el service;
- una separación física entre archivos.

Por lo tanto, no es posible determinar un contrato específico entre controller y service a partir del material proporcionado.

Agregar nuevas capas o dividir el archivo sin que exista un contrato definido podría introducir cambios arquitectónicos innecesarios.

La solución se mantiene limitada a los errores verificables mediante el test actual.

## Cambio aplicado

Se realizaron únicamente los cambios necesarios para cumplir los tests existentes.

### Cambio 1: convertir el parámetro `id`

Se cambió:

```js
current.id === req.params.id
```

por:

```js
current.id === Number(req.params.id)
```

Esto permite comparar correctamente el ID numérico almacenado con el parámetro recibido desde Express.

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
npm test -- ejercicios/ejercicio-047/tests/layers.api.test.js
```

También puede ejecutarse directamente con Vitest:

```bash
npx vitest run ejercicios/ejercicio-047/tests/layers.api.test.js
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

Express recibe el parámetro como:

```text
"1"
```

La solución lo convierte mediante:

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

Como no existe un elemento con ese ID, la solución devuelve:

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

## Sobre las capas controller/service

El objetivo del ejercicio menciona:

```text
Corregir contrato entre ruta y servicio.
```

Sin embargo, el material proporcionado no contiene una implementación separada de:

```text
Route
Controller
Service
```

El código concentra actualmente la lógica en:

```js
createApp()
```

y los tests validan únicamente el comportamiento HTTP mediante `supertest`.

Por esta razón, no se agregó una arquitectura controller/service que no está definida por el contrato actual.

La corrección se limita a garantizar que las rutas produzcan las respuestas que los tests esperan.

Si posteriormente se proporcionan módulos separados de controller y service, el contrato entre ambas capas deberá analizarse con base en sus funciones y tests correspondientes.

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
ejercicios/ejercicio-047/resoluciones/carlos-velasco/
+-- app.js
+-- README.md
```

## Conclusión

Se corrigieron los errores que afectan directamente el contrato comprobado por los tests.

El primer error estaba causado por comparar un ID numérico con un parámetro de ruta recibido como string.

El segundo error consistía en devolver `200 OK` cuando el recurso no existía. Se corrigió a `404 Not Found`.

El tercer error consistía en devolver `200 OK` después de crear un recurso. Se corrigió a `201 Created`.

La separación controller/service mencionada en el objetivo no fue implementada porque el código y los tests proporcionados no definen dicha arquitectura ni un contrato específico entre esas capas.

No se modificaron los tests ni los archivos base.

La solución mantiene la implementación original y aplica únicamente los cambios necesarios para cumplir el contrato real definido por `layers.api.test.js`.