# Resolución Ejercicio 050: Depuracion integral

## Error encontrado
- `GET /items/:id`: Retornaba estado `200 OK` en recursos no encontrados y comparaba `req.params.id` (`string`) con `id` (`number`).
- `POST /items`: Retornaba estado `200 OK` en lugar de `201 Created` y carecía de validación de entradas.
- Inexistencia de los endpoints para consultar la lista completa (`GET /items`), actualizar (`PUT /items/:id`) y eliminar (`DELETE /items/:id`).

## Causa raíz
- Implementación incompleta e incorrecta del flujo CRUD básico, junto con el descalce de tipos entre los parámetros URL y los datos en memoria[cite: 23, 24].

## Cambio aplicado
- Se convirtió `req.params.id` a número con `Number()` en todos los endpoints de consulta y mutación.
- Se implementaron las rutas faltantes (`GET /items`, `PUT /items/:id` y `DELETE /items/:id`) respetando los códigos HTTP adecuados (`200`, `201`, `204`, `400`, `404`, `409`).
- Se agregaron validaciones de payload para evitar la creación/actualización de registros inconsistentes.

## Comando usado para validar
```bash
npm test -- ejercicios/ejercicio-050/resoluciones/jose-rodriguez/final-api.api.test.js