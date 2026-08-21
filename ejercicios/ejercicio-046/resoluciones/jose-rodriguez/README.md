# Resolución Ejercicio 046: Manejo centralizado de errores

## Error encontrado
- La aplicación devolvía respuestas directas sin un middleware centralizado para procesar fallas.
- Ante errores no controlados, el comportamiento por defecto exponía detalles internos o trazas de la pila de ejecución (*stack trace*)[cite: 19].
- `GET /items/:id` devolvía un código de estado `200 OK` en búsquedas sin coincidencias y comparaba tipos de datos desalineados (`string` vs `number`).

## Causa raíz
- Ausencia de un middleware global de captura de errores con la firma de cuatro parámetros `(err, req, res, next)` de Express al final de la pila de middleware[cite: 19].

## Cambio aplicado
- Se creó la clase personalizada `AppError` extendida de `Error` para transportar códigos HTTP (`statusCode`) personalizados[cite: 19].
- Se implementó un middleware centralizado al final de la aplicación Express que captura cualquier error propagado mediante `next(err)`[cite: 19].
- Se formateó la respuesta JSON para estructurar el mensaje en la clave `error` y asegurar que la propiedad `stack` nunca sea expuesta en el cuerpo de la respuesta HTTP[cite: 19].
- Se normalizó el casteo de `req.params.id` con `Number()` y la gestión del código `404 Not Found`.

## Comando usado para validar
```bash
npm test -- ejercicios/ejercicio-046/resoluciones/jose-rodriguez/errors.api.test.js