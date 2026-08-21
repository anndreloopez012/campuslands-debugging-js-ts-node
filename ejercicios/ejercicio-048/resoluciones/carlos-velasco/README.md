# Ejercicio 048: API de cache

## Error encontrado

Se encontraron varios errores en el archivo `app.js`.

Aunque el objetivo específico del ejercicio está relacionado con API de cache, el código y los tests proporcionados utilizan el mismo contrato básico de una API REST de elementos.

El test exige:

- `GET /health` debe responder `200`.
- `GET /items/:id` debe encontrar correctamente un elemento mediante un ID numérico.
- `GET /items/:id` debe responder `404` cuando el elemento no existe.
- `POST /items` debe crear un elemento con ID consecutivo.
- `POST /items` debe responder `201`.

Por esta razón, la solución se basa en el comportamiento realmente comprobado por `cache.api.test.js`.

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

Esto impide encontrar correctamente un elemento existente.

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

Un recurso inexistente debe responder con:

```text
404 Not Found
```

El test exige:

```js
await request(app).get('/items/999').expect(404);
```

Por lo tanto, se cambió la respuesta a:

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

El test exige:

```js
.expect(201);
```

Cuando se crea correctamente un nuevo recurso, la respuesta esperada es:

```text
201 Created
```

Por lo tanto, se cambió a:

```js
return res.status(201).json(item);
```

## Cambio aplicado

Se realizaron únicamente los cambios necesarios para cumplir los tests existentes.

### Cambio 1

Se cambió:

```js
current.id === req.params.id
```

por:

```js
current.id === Number(req.params.id)
```

### Cambio 2

Se cambió:

```js
res.status(200).json({ error: 'not found' })
```

por:

```js
res.status(404).json({ error: 'not found' })
```

### Cambio 3

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
npm test -- ejercicios/ejercicio-048/tests/cache.api.test.js
```

También puede ejecutarse directamente con Vitest:

```bash
npx vitest run ejercicios/ejercicio-048/tests/cache.api.test.js
```

## Validación

### Health

```http
GET /health
```

Resultado esperado:

```text
200 OK
```

Respuesta:

```json
{
  "ok": true
}
```

### Búsqueda existente

```http
GET /items/1
```

Resultado:

```text
200 OK
```

Elemento encontrado:

```json
{
  "id": 1,
  "name": "alpha",
  "score": 10
}
```

### Búsqueda inexistente

```http
GET /items/999
```

Resultado:

```text
404 Not Found
```

### Creación

```http
POST /items
```

Datos enviados:

```json
{
  "name": "gamma",
  "score": 30
}
```

Resultado esperado:

```text
201 Created
```

Elemento creado:

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
ejercicios/ejercicio-048/resoluciones/carlos-velasco/
+-- app.js
+-- README.md
```

## Conclusión

Se corrigieron los tres errores que afectan directamente el contrato comprobado por los tests.

El primer error estaba causado por comparar un ID numérico con un parámetro de ruta recibido como string.

El segundo error consistía en devolver `200 OK` cuando el recurso no existía. Se corrigió a `404 Not Found`.

El tercer error consistía en devolver `200 OK` después de crear un recurso. Se corrigió a `201 Created`.

La solución mantiene la implementación original y aplica únicamente los cambios necesarios para cumplir el contrato real definido por `cache.api.test.js`.