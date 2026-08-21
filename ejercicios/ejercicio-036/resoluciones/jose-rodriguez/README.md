# Resolución Ejercicio 036: API de motos

## Error encontrado
- `POST /items`: No realizaba validación de payload y devolvía un status `200` en lugar de `201 Created`.
- `POST /items`: Si faltaban atributos obligatorios (`name` o `score`), aceptaba la petición en lugar de responder con un status `400 Bad Request`.
- `GET /items/:id`: No convertía el ID a tipo numérico y devolvía status `200` cuando no se encontraba el recurso.

## Causa raíz
- Asignación errónea de códigos de respuesta HTTP (`200` en lugar de `201` y `400`) y falta de guardas de validación para los datos recibidos en `req.body`.

## Cambio aplicado
- Se agregó la validación para comprobar que `name` y `score` estén presentes en el cuerpo de la petición `POST /items`, retornando status `400` en caso negativo.
- Se actualizó el código de creación a `201` tras insertar el nuevo ítem.
- Se parseó `req.params.id` con `Number()` y se corrigió el status `404` para recursos no encontrados.

## Comando usado para validar
```bash
npm test -- ejercicios/ejercicio-036/resoluciones/jose-rodriguez/motos.api.test.js