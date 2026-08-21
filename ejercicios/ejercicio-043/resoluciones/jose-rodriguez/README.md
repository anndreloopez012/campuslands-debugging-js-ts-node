# Resolución Ejercicio 043: Paginación

## Error encontrado
- No existía el endpoint `GET /items` preparado para gestionar parámetros de paginación (`limit` y `offset`) ni para estructurar los metadatos de respuesta.
- `GET /items/:id`: Comparaba un `id` de tipo string contra el `id` numérico de la lista y respondía con status `200` ante un ítem inexistente.

## Causa raíz
- Ausencia del endpoint con lógica de rebanado del arreglo (`Array.prototype.slice`) y parseo numérico de parámetros query.

## Cambio aplicado
- Se implementó la ruta `GET /items` parseando `limit` y `offset` a tipo `Number` con valores por defecto (10 y 0).
- Se estructuró la respuesta JSON incluyendo la lista `data`, junto con los metadatos `total`, `limit` y `offset`.
- Se ajustó el casteo de `req.params.id` a `Number` y el retorno de status `404 Not Found`.

## Comando usado para validar
```bash
npm test -- ejercicios/ejercicio-043/resoluciones/jose-rodriguez/pagination.api.test.js