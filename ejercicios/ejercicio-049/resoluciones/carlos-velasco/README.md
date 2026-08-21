# Ejercicio 049: API de concurrencia

## Error encontrado

Se encontraron varios errores en el archivo `app.js`.

Aunque el objetivo específico del ejercicio está relacionado con concurrencia, el código y los tests proporcionados utilizan el mismo contrato básico de una API REST de elementos.

El test exige:

- `GET /health` debe responder `200`.
- `GET /items/:id` debe encontrar correctamente un elemento mediante un ID numérico.
- `GET /items/:id` debe responder `404` cuando el elemento no existe.
- `POST /items` debe crear un elemento con ID consecutivo.
- `POST /items` debe responder `201`.

Por esta razón, la solución se basa en el comportamiento realmente comprobado por `concurrency.api.test.js`.

## Causa raiz

### Error 1: comparación incorrecta del ID

La implementación original utilizaba:

```js
const item = items.find(current => current.id === req.params.id);
```

Express recibe los parámetros de las rutas como strings.

Por ejemplo:

```http
GET /items/1
```

produce:

```js
req.params.id === "1"
```

Mientras que el ID almacenado es:

```js
1
```

La comparación original equivale a:

```js
1 === "1"
```

que devuelve:

```text
false
```

### Corrección

Se convirtió el parámetro de la ruta a número:

```js
current.id === Number(req.params.id)
```

Ahora la comparación se realiza entre dos números.

---

### Error 2: status incorrecto para recurso inexistente

La implementación original devolvía:

```js
res.status(200).json({ error: 'not found' })
```

cuando no encontraba el elemento.

El test exige:

```js
await request(app).get('/items/999').expect(404);
```

Por lo tanto, la respuesta correcta es:

```js
res.status(404).json({ error: 'not found' })
```

---

### Error 3: status incorrecto en la creación

La implementación original devolvía:

```js
return res.status(200).json(item);
```

El test exige:

```js
.expect(201);
```

Por lo tanto, se debe utilizar:

```js
return res.status(201).json(item);
```

## Cambio aplicado

Se realizaron únicamente tres modificaciones.

### Cambio 1

```js
current.id === req.params.id
```

se cambió por:

```js
current.id === Number(req.params.id)
```

### Cambio 2

```js
res.status(200).json({ error: 'not found' })
```

se cambió por:

```js
res.status(404).json({ error: 'not found' })
```

### Cambio 3

```js
res.status(200).json(item)
```

se cambió por:

```js
res.status(201).json(item)
```

No se modificaron los tests ni los archivos base.

## Comando usado para validar

```bash
npm test -- ejercicios/ejercicio-049/tests/concurrency.api.test.js
```

También puede ejecutarse directamente con Vitest:

```bash
npx vitest run ejercicios/ejercicio-049/tests/concurrency.api.test.js
```

## Validación

### Health

```http
GET /health
```

Debe responder:

```text
200 OK
```

### Búsqueda de elemento existente

```http
GET /items/1
```

Debe responder:

```text
200 OK
```

con:

```json
{
  "id": 1,
  "name": "alpha",
  "score": 10
}
```

### Búsqueda de elemento inexistente

```http
GET /items/999
```

Debe responder:

```text
404 Not Found
```

### Creación de elemento

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

Debe responder:

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

El formato exacto puede variar dependiendo de la versión de Vitest.

## Estructura de la entrega

```text
ejercicios/ejercicio-049/resoluciones/carlos-velasco/
+-- app.js
+-- README.md
```

## Conclusión

La corrección consiste en convertir el ID recibido por Express a número, devolver `404 Not Found` cuando no existe el recurso y devolver `201 Created` al crear un nuevo elemento.

No se modificaron los tests ni los archivos base.

La solución aplica únicamente los cambios necesarios para cumplir el contrato verificable de `concurrency.api.test.js`.