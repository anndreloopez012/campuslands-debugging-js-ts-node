# Resolución Ejercicio 037: API de torneos

## Error encontrado
- `POST /items`: No verificaba si el `id` recibido en la petición ya existía en la colección, permitiendo insertar registros duplicados.
- `POST /items`: Retornaba un código HTTP `200` en lugar de `409 Conflict` ante un conflicto de identificador o `201 Created` tras un registro exitoso.
- `GET /items/:id`: `req.params.id` venía como `string`, provocando que la búsqueda con `===` fallara y devolviera un estado `200` con error en lugar de `404`.

## Causa raíz
- Ausencia de validaciones de unicidad para el atributo `id` y uso inadecuado de los estados de respuesta HTTP en Express.

## Cambio aplicado
- Se agregó una verificación con `.some()` en el endpoint `POST /items` para detectar IDs repetidos y retornar `409 Conflict`.
- Se ajustaron los códigos de estado HTTP a `201` para creaciones y `400` para datos faltantes.
- Se convirtió `req.params.id` a `number` con `Number()` y se aplicó status `404` en caso de no hallar el registro.

## Comando usado para validar
```bash
npm test -- ejercicios/ejercicio-037/resoluciones/jose-rodriguez/tournaments.api.test.js