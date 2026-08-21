# Resolución Ejercicio 048: Cache simple

## Error encontrado
- Ausencia de un mecanismo de caché en memoria y falta de invalidación del mismo al mutar datos.
- `GET /items/:id`: Comparaba IDs como string contra números y devolvía `200 OK` en recursos inexistentes.
- `POST /items` y `PUT /items/:id`: No invalidaban las entradas en caché tras actualizar el estado del arreglo.

## Causa raíz
- Al no limpiar o actualizar el almacén de caché tras operaciones de escritura, las peticiones de lectura subsecuentes continuaban devolviendo información desactualizada (*stale data*).

## Cambio aplicado
- Se implementó un mapa (`Map`) para almacenar las lecturas por ID en memoria.
- Se agregaron las operaciones de invalidación de caché (`cache.clear()` y `cache.delete(id)`) al ejecutar peticiones `POST` y `PUT`.
- Se aseguró el casteo numérico de `req.params.id` y los códigos HTTP de respuesta (`200`, `201`, `404`).

## Comando usado para validar
```bash
npm test -- ejercicios/ejercicio-048/resoluciones/jose-rodriguez/cache.api.test.js