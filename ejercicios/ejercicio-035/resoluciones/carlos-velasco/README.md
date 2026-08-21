# Ejercicio 035: API de jugadores

## Error encontrado

Se encontraron dos errores principales en el archivo `app.js`.

El primero se encontraba en la búsqueda de elementos mediante `GET /items/:id`.

El segundo se encontraba en la creación de elementos mediante `POST /items`.

Los tests definen que:

- Un elemento existente debe responder con `200`.
- Un elemento inexistente debe responder con `404`.
- Un nuevo elemento debe responder con `201`.

La implementación original no cumplía completamente estos contratos HTTP.

## Causa raiz

### Error 1: comparación incorrecta del ID

La implementación original utilizaba:

```js
const item = items.find(current => current.id === req.params.id);
```

El problema es que `req.params.id` siempre llega como una cadena de texto desde Express.

Por ejemplo, para:

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

Mientras que el ID almacenado en el arreglo es un número:

```js
1
```

Por lo tanto, la comparación estricta:

```js
1 === "1"
```

devuelve:

```text
false
```

Esto provoca que incluso un elemento existente pueda considerarse como inexistente.

### Corrección

Se convierte el parámetro recibido a número antes de realizar la comparación:

```js
current.id === Number(req.params.id)
```

De esta manera:

```text
1 === Number("1")
```

produce:

```text
true
```

y el elemento correcto puede ser encontrado.

---

### Error 2: status incorrecto para un elemento inexistente

La implementación original utilizaba:

```js
if (!item) return res.status(200).json({ error: 'not found' });
```

El body indicaba que el elemento no existía, pero el status HTTP era:

```text
200 OK
```

El test exige:

```js
await request(app).get('/items/999').expect(404);
```

Por lo tanto, la respuesta correcta para un recurso inexistente es:

```js
return res.status(404).json({ error: 'not found' });
```

La causa raíz es que se estaba utilizando un código de éxito (`200`) para representar un recurso que no fue encontrado.

---

### Error 3: status incorrecto al crear un elemento

La implementación original utilizaba:

```js
return res.status(200).json(item);
```

para `POST /items`.

El test exige:

```js
await request(app)
  .post('/items')
  .send({ name: 'gamma', score: 30 })
  .expect(201);
```

Cuando una petición `POST` crea correctamente un nuevo recurso, el contrato de este ejercicio espera:

```text
201 Created
```

Por lo tanto, la respuesta debe utilizar:

```js
return res.status(201).json(item);
```

## Cambio aplicado

Se realizaron únicamente los cambios necesarios para cumplir el contrato establecido por los tests.

### Cambio 1: convertir el ID recibido

Se cambió:

```js
current.id === req.params.id
```

por:

```js
current.id === Number(req.params.id)
```

Esto permite comparar correctamente el ID numérico almacenado con el parámetro recibido por Express.

### Cambio 2: utilizar `404` cuando el elemento no existe

Se cambió:

```js
res.status(200).json({ error: 'not found' })
```

por:

```js
res.status(404).json({ error: 'not found' })
```

### Cambio 3: utilizar `201` al crear

Se cambió:

```js
res.status(200).json(item)
```

por:

```js
res.status(201).json(item)
```

No se modificó la lógica de generación del ID ni la estructura de los objetos.

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
npm test -- ejercicios/ejercicio-035/tests/players.api.test.js
```

También puede ejecutarse directamente con Vitest:

```bash
npx vitest run ejercicios/ejercicio-035/tests/players.api.test.js
```

## Validación del primer caso

El test realiza:

```http
GET /health
```

La respuesta esperada es:

```http
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

El test solicita:

```http
GET /items/1
```

El parámetro recibido por Express es:

```text
"1"
```

Después de convertirlo:

```js
Number(req.params.id)
```

se obtiene:

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

Para un elemento inexistente:

```http
GET /items/999
```

la función no encuentra ningún elemento y responde:

```text
404 Not Found
```

con:

```json
{
  "error": "not found"
}
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

Los elementos existentes inicialmente tienen los IDs:

```text
1
2
```

Por lo tanto:

```js
items.length + 1
```

produce:

```text
3
```

La respuesta contiene:

```json
{
  "id": 3,
  "name": "gamma",
  "score": 30
}
```

y utiliza:

```text
201 Created
```

## Resultado final

Los tres casos definidos por el test deben pasar correctamente:

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
ejercicios/ejercicio-035/resoluciones/carlos-velasco/
+-- app.js
+-- README.md
```

## Conclusión

Se corrigieron los errores relacionados con el contrato HTTP y la validación del parámetro `id`.

El primer error ocurría porque Express entrega los parámetros de ruta como strings, mientras que los IDs almacenados son números. Se corrigió convirtiendo `req.params.id` mediante `Number()`.

El segundo error ocurría porque un recurso inexistente estaba respondiendo con `200 OK` en lugar de `404 Not Found`.

El tercer error ocurría porque la creación de un recurso respondía con `200 OK` en lugar de `201 Created`.

No se modificaron los tests ni los archivos base.

La solución mantiene la estructura original de la aplicación y aplica únicamente los cambios necesarios para cumplir el contrato esperado por los tests.