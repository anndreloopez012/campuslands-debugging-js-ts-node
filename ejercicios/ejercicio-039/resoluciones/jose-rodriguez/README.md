# Resolución Ejercicio 039: API de peliculas

## Error encontrado
- No existía soporte para el endpoint `GET /items` con filtrado por parámetros de búsqueda (`query params`).
- `GET /items/:id`: Comparaba un `id` tipo string con números y retornaba código HTTP `200` cuando el recurso no existía.

## Causa raíz
- Ausencia del handler para `GET /items` procesando `req.query` y falta de parseo numérico en los parámetros del ID.

## Cambio aplicado
- Se implementó la ruta `GET /items` aceptando filtros como `minScore` y `name`, convirtiendo los tipos correspondientes de `req.query`.
- Se casteó `req.params.id` a `Number` y se asignó estado `404 Not Found` ante elementos inexistentes.

## Comando usado para validar
```bash
npm test -- ejercicios/ejercicio-039/resoluciones/jose-rodriguez/movies.api.test.js