# Resolución Ejercicio 041: Middleware de request id

## Error encontrado
- No existía el middleware para capturar o generar el header `x-request-id`.
- Las respuestas de error no adjuntaban la propiedad `requestId` en la entidad del body ni establecían el header HTTP correspondiente.
- `GET /items/:id` devolvía un status `200` y hacía comparaciones con el ID en tipo `string`.

## Causa raíz
- Ausencia del middleware encargado de asignar `req.requestId` y configurar `res.setHeader('x-request-id', ...)` en el ciclo de vida de Express.

## Cambio aplicado
- Se implementó un middleware global que reutiliza el valor entrante del header `x-request-id` o genera uno nuevo usando `randomUUID()`.
- Se adjuntó la propiedad `requestId` en la respuesta JSON para las ramas de error y respuestas no encontradas (`404`, `400`, `409`).
- Se parseó `req.params.id` con `Number()` para realizar búsquedas estrictas.

## Comando usado para validar
```bash
npm test -- ejercicios/ejercicio-041/resoluciones/jose-rodriguez/request-id.api.test.js