# Resolución Ejercicio 047: Capas controller/service

## Error encontrado
- Mezcla de responsabilidades HTTP y de negocio directamente en las definiciones de las rutas.
- El contrato de tipos no se cumplía al comparar `req.params.id` de tipo string contra los identificadores de tipo numérico.
- `GET /items/:id` devolvía un código `200 OK` en lugar de `404 Not Found` cuando el elemento no existía en el arreglo.
- `POST /items` no delegaba el procesamiento de negocio ni la creación de entidad a una capa de servicio.

## Causa raíz
- Inexistencia de separación clara en la arquitectura (ausencia de clases/módulos dedicados para `Controller` y `Service`).

## Cambio aplicado
- Se creó `ItemService` para aislar la manipulación de la fuente de datos y la validación de reglas de negocio.
- Se creó `ItemController` para actuar como puente entre las peticiones de Express y los métodos del servicio, traduciendo los resultados o excepciones en respuestas HTTP con sus correspondientes códigos de estado (`200`, `201`, `400`, `404`, `409`).
- Se aseguró la conversión numérica mediante `Number(id)` para mantener la consistencia del contrato.

## Comando usado para validar
```bash
npm test -- ejercicios/ejercicio-047/resoluciones/jose-rodriguez/layers.api.test.js