# Resolución Ejercicio 035: API de jugadores

## Error encontrado
- `GET /items/:id`: `req.params.id` se recibía como `string`, impidiendo la comparación estricta (`===`) frente a los IDs numéricos.
- `GET /items/:id`: Devolvía status HTTP `200` en lugar de `404` cuando el ítem no existía.
- `POST /items`: Devolvía status HTTP `200` en lugar de `201` al crear un nuevo elemento.

## Causa raíz
- Faltaba parsear el parámetro de ruta de Express a tipo `number` y corregir los códigos de respuesta HTTP en el controlador.

## Cambio aplicado
- Se convirtió `req.params.id` a número con `Number()`.
- Se retornó un status `404` cuando `!item`.
- Se cambió el estado de respuesta en `POST /items` a `201`.

## Comando usado para validar
```bash
npm test -- ejercicios/ejercicio-035/resoluciones/jose-rodriguez/players.api.test.js