# Resolución Ejercicio 040: API de pedidos

## Error encontrado
- `GET /items/:id`: Retornaba un código de respuesta HTTP `200` en lugar de `404 Not Found` cuando el recurso consultado no existía.
- `POST /items`: No distinguía entre errores semánticos de validación (deviendo responder `422 Unprocessable Entity`) y peticiones exitosas o mal formadas.

## Causa raíz
- Ausencia de validaciones sobre las reglas de negocio en los valores del cuerpo de la petición (`score < 0` o tipos de datos incorrectos) y falta de mapeo hacia el estado HTTP `422`.

## Cambio aplicado
- Se agregó conversión `Number(req.params.id)` y retorno con status `404` cuando no se localiza el ítem.
- Se implementó la guarda en `POST /items` para validar el tipo y rango de `score`, respondiendo con estado HTTP `422` en caso de fallo de dominio.

## Comando usado para validar
```bash
npm test -- ejercicios/ejercicio-040/resoluciones/jose-rodriguez/orders.api.test.js