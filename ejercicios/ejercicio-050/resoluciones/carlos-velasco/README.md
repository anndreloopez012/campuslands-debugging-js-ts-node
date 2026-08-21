# Ejercicio 050: API final

## Error encontrado

Se encontraron varios errores en el archivo `app.js`.

Aunque el ejercicio representa una API final, el código y el test proporcionados mantienen el mismo contrato utilizado en los ejercicios anteriores.

El test exige:

- `GET /health` debe responder `200`.
- `GET /items/:id` debe encontrar correctamente un elemento mediante un ID numérico.
- `GET /items/:id` debe responder `404` cuando el elemento no existe.
- `POST /items` debe crear un elemento con ID consecutivo.
- `POST /items` debe responder `201`.

Por esta razón, la solución se basa en el comportamiento realmente comprobado por `final-api.api.test.js`.

## Causa raiz

### Error 1: comparación incorrecta del ID

La implementación original utilizaba:

```js
const item = items.find(current => current.id === req.params.id);
```

Los parámetros de las rutas de Express son strings.

Al realizar:

```http
GET /items/1
```

el valor recibido es:

```text
"1"
```

pero el ID almacenado en el arreglo es:

```text
1
```

La comparación estricta:

```js
1 === "1"
```

produce:

```text
false
```

Por esta razón, un elemento existente no podía ser encontrado correctamente.

### Corrección

Se convirtió el parámetro recibido a número:

```js
current.id === Number(req.params.id)
```

De esta forma:

```js
1 === Number("1")
```

produce:

```text
true
```

---

### Error 2: status incorrecto para elemento inexistente

La implementación original utilizaba:

```js
if (!item) return res.status(200).json({ error: 'not found' });
```

Esto representa incorrectamente la ausencia del recurso como una respuesta exitosa.

El test exige:

```js
await request(app).get('/items/999').expect(404);
```

Por lo tanto, se cambió a:

```js
if (!item) {
  return res.status(404).json({ error: 'not found' });
}
```

---

### Error 3: status incorrecto al crear un elemento

La implementación original utilizaba:

```js
return res.status(200).json(item);
```

El test exige:

```js
.expect(201);
```

La creación exitosa de un nuevo recurso debe responder:

```text
201 Created
```

Por lo tanto, se cambió a:

```js
return res.status(201).json(item);
```

## Cambio aplicado

Se realizaron únicamente los cambios necesarios para cumplir los tests.

### Cambio 1: conversión del ID

Se cambió:

```js
current.id === req.params.id
```

por:

```js
current.id === Number(req.params.id)
```

### Cambio 2: respuesta `404`

Se cambió:

```js
res.status(200).json({ error: 'not found' })
```

por:

```js
res.status(404).json({ error: 'not found' })
```

### Cambio 3: respuesta `201`

Se cambió:

```js
res.status(200).json(item)
```

por:

```js
res.status(201).json(item)
```

No se modificaron los tests ni los archivos base.

## Comando usado para validar

```bash
npm test -- ejercicios/ejercicio-050/tests/final-api.api.test.js
```

También puede ejecutarse directamente con Vitest:

```bash
npx vitest run ejercicios/ejercicio-050/tests/final-api.api.test.js
```

## Validación

### Caso 1: health

Solicitud:

```http
GET /health
```

Respuesta esperada:

```text
200 OK
```

Body:

```json
{
  "ok": true
}
```

### Caso 2: búsqueda por ID

Solicitud:

```http
GET /items/1
```

Respuesta esperada:

```text
200 OK
```

Body:

```json
{
  "id": 1,
  "name": "alpha",
  "score": 10
}
```

La conversión mediante:

```js
Number(req.params.id)
```

permite comparar correctamente el parámetro de ruta con el ID numérico almacenado.

### Caso 3: recurso inexistente

Solicitud:

```http
GET /items/999
```

Respuesta esperada:

```text
404 Not Found
```

### Caso 4: creación

Solicitud:

```http
POST /items
```

Body:

```json
{
  "name": "gamma",
  "score": 30
}
```

El nuevo elemento recibe:

```text
id: 3
```

y la respuesta esperada es:

```text
201 Created
```

con:

```json
{
  "id": 3,
  "name": "gamma",
  "score": 30
}
```

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
ejercicios/ejercicio-050/resoluciones/carlos-velasco/
+-- app.js
+-- README.md
```

## Conclusión

Los errores encontrados corresponden a tres problemas de contrato HTTP y tipos de datos.

El primer problema era comparar un ID numérico con un parámetro de ruta recibido como string.

El segundo problema era devolver `200 OK` cuando el recurso no existía. Se corrigió a `404 Not Found`.

El tercer problema era devolver `200 OK` después de crear un recurso. Se corrigió a `201 Created`.

La solución mantiene el código base y aplica únicamente las modificaciones necesarias para cumplir el contrato establecido por `final-api.api.test.js`.

No se modificaron los tests ni los archivos base.