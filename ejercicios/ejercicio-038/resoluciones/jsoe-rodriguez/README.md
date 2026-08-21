# Resolución Ejercicio 038: API de inventario gamer

## Error encontrado
- Falta de la ruta `PATCH /items/:id` para soportar actualizaciones parciales.
- En `GET /items/:id`, `req.params.id` venía como `string` y respondía `200` cuando no existía el elemento.

## Causa raíz
- No existía implementación para peticiones `PATCH` y los tipos de datos en la búsqueda por parámetro no coincidían.

## Cambio aplicado
- Se implementó `PATCH /items/:id` utilizando `Object.assign()` para conservar las propiedades no enviadas en el body.
- Se agregó conversión con `Number()` para el parámetro `id` y se asignó código de estado HTTP `404` para recursos no encontrados.

## Comando usado para validar
```bash
npm test -- ejercicios/ejercicio-038/resoluciones/jose-rodriguez/inventory.api.test.js