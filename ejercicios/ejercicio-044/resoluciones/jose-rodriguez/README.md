# Resolución Ejercicio 044: Validacion de datos

## Error encontrado
- El endpoint `POST /items` no realizaba validaciones de tipo sobre las propiedades recibidas en el body.
- `GET /items/:id`: Retornaba un código `200 OK` en recursos no encontrados y comparaba IDs sin conversión numérica.

## Causa raíz
- Falta de verificación manual sobre los campos requeridos (`name` y `score`) y sus tipos de datos antes de insertar el registro en memoria.

## Cambio aplicado
- Se agregaron validaciones nativas en `POST /items` para verificar que `name` sea `string` no vacío y `score` de tipo `number`, devolviendo estado `400 Bad Request` y un listado de `details` ante fallos.
- Se implementó la conversión `Number(req.params.id)` y la respuesta `404 Not Found` para consultas por ID inexistente.

## Comando usado para validar
```bash
npm test -- ejercicios/ejercicio-044/resoluciones/jose-rodriguez/zod.api.test.js