# Ejercicio 043: Paginacion

## Error encontrado

Se encontraron varios errores en la implementación de `app.js`.

El archivo base contiene una implementación que no cumple completamente con el comportamiento esperado por los tests.

El contrato comprobado por `pagination.api.test.js` exige:

- `GET /health` debe responder `200`.
- `GET /items/:id` debe encontrar correctamente un elemento mediante un ID numérico.
- `GET /items/:id` debe responder `404` cuando el elemento no existe.
- `POST /items` debe crear un elemento con ID consecutivo.
- `POST /items` debe responder `201`.

Aunque la temática del ejercicio corresponde a paginación, el comportamiento real que debe cumplir la implementación está determinado por los tests proporcionados.

## Causa raiz

### Error 1: comparación incorrecta del ID

La implementación original utilizaba:

```js
const item = items.find(current => current.id === req.params.id);
```

Los parámetros de una ruta de Express son recibidos como strings.

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

Mientras que los IDs almacenados en el arreglo son números:

```text
1
2
```

La comparación original termina siendo:

```js
1 === "1"
```

y el resultado es:

```text
false
```

Por lo tanto, un elemento existente no puede ser encontrado correctamente.

La corrección consiste en convertir el parámetro a número:

```js
current.id === Number(req.params.id)
```

De esta manera:

```js
1 === Number("1")
```

produce:

```text
true
```

### Error 2: status incorrecto para recurso inexistente

La implementación original devolvía:

```js
res.status(200).json({ error: 'not found' })
```

cuando no encontraba el elemento.

Un recurso inexistente debe responder con:

```text
404 Not Found
```

Por lo tanto, se corrige a:

```js
return res.status(404).json({ error: 'not found' });
```

### Error 3: status incorrecto después de crear un recurso

La implementación original utilizaba:

```js
return res.status(200).json(item);
```

después de crear un elemento.

El test exige:

```text
201 Created
```

Por lo tanto, se corrige a:

```js
return res.status(201).json(item);
```

## Cambio aplicado

Se realizaron únicamente los cambios necesarios para cumplir el contrato definido por los tests.

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

Se cambió el status:

```js
200
```

por:

```js
404
```

cuando el elemento no existe.

### Cambio 3

Se cambió el status:

```js
200
```

por:

```js
201
```

después de crear un elemento.

No se modificaron los tests ni los archivos base.

## Comando usado para validar

```bash
npm test -- ejercicios/ejercicio-043/tests/pagination.api.test.js
```

También puede ejecutarse:

```bash
npx vitest run ejercicios/ejercicio-043/tests/pagination.api.test.js
```

## Validación

### GET `/health`

Debe responder:

```text
200 OK
```

con:

```json
{
  "ok": true
}
```

### GET `/items/1`

El parámetro:

```js
req.params.id
```

es recibido como:

```text
"1"
```

La conversión:

```js
Number(req.params.id)
```

permite encontrar correctamente:

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

### GET `/items/999`

No existe un elemento con ese ID.

La respuesta correcta es:

```text
404 Not Found
```

### POST `/items`

Se envía:

```json
{
  "name": "gamma",
  "score": 30
}
```

Los elementos existentes tienen IDs:

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

El nuevo elemento queda como:

```json
{
  "id": 3,
  "name": "gamma",
  "score": 30
}
```

La respuesta correcta es:

```text
201 Created
```

## Resultado final

Los casos definidos en `pagination.api.test.js` deben pasar correctamente:

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
ejercicios/ejercicio-043/resoluciones/carlos-velasco/
├── app.js
└── README.md
```

## Conclusión

Se corrigieron tres errores concretos en `app.js`.

El primero era la comparación entre un ID numérico y un parámetro de ruta recibido como string.

El segundo consistía en devolver `200 OK` cuando el recurso no existía. Se corrigió a `404 Not Found`.

El tercero consistía en devolver `200 OK` después de crear un recurso. Se corrigió a `201 Created`.

La solución mantiene la estructura original del código y aplica únicamente los cambios necesarios para cumplir el contrato definido por los tests.

Los tests no fueron modificados.