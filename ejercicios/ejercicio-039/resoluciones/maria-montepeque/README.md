# Ejercicio 039: API de peliculas

## Nota sobre el ejercicio

El `README.md` base describe el objetivo como "implementar filtros query seguros", pero
el archivo real `codigo/app.js` no expone ningun query param ni filtro: solo tiene
`GET /health`, `GET /items/:id` y `POST /items`, con los mismos bugs de comparacion de id
y status HTTP que los ejercicios 035 a 038. Se corrigio el codigo tal como existe
realmente, sin agregar funcionalidad que el test no pide.

## Error encontrado

1. `GET /items/:id` nunca encontraba el item aunque existiera: pedir `/items/1` devolvia
   `{ error: 'not found' }` con status `200` en vez del item `alpha`.
2. Cuando el item realmente no existia (`/items/999`), la respuesta era status `200` en
   vez de `404`.
3. `POST /items` devolvia status `200` en vez de `201` al crear un recurso nuevo.

## Causa raiz

1. `req.params.id` llega siempre como **string** (los parametros de ruta en Express son
   texto), pero `current.id` en el arreglo `items` es un **number**. La comparacion
   `current.id === req.params.id` usaba igualdad estricta entre tipos distintos
   (`1 === '1'`), que siempre es `false`, por lo que `find` nunca encontraba nada.
2. El `if (!item)` devolvia `res.status(200)` en lugar de `res.status(404)`, ignorando el
   contrato REST de "no encontrado".
3. El endpoint de creacion devolvia `res.status(200)` en vez de `res.status(201)`, que es
   el status correcto para indicar que un recurso fue creado.

## Cambio aplicado

1. Se convirtio `req.params.id` a numero con `Number(req.params.id)` antes de comparar.
2. Se cambio el status de la respuesta "no encontrado" de `200` a `404`.
3. Se cambio el status de la respuesta de creacion de `200` a `201`.

## Comando usado para validar

```bash
npm test -- ejercicios/ejercicio-039/tests/movies.api.test.js
```

Como el test importa el archivo fijo de `codigo/`, tambien se valido copiando
temporalmente el test dentro de `tests/` apuntando a esta resolucion
(`../resoluciones/maria-montepeque/app.js`), ejecutando `vitest run` contra esa copia y
luego eliminandola (no se dejo ningun archivo extra fuera de esta carpeta).

## Resultado final

- `GET /health` responde `200` con `{ ok: true }`.
- `GET /items/1` responde `200` con el item `alpha`; `GET /items/999` responde `404`.
- `POST /items` responde `201` con el item creado (`id: 3, name: 'gamma', score: 30`).
- Los 3 casos del test coinciden con lo esperado.
