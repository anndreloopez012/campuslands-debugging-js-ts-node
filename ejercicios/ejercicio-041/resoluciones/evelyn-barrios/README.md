# Solución Ejercicio 041: Middleware de Request ID

## Error Encontrado

El problema principal era que, cuando la aplicación capturaba un error y activaba el middleware de manejo de errores, la respuesta JSON que se enviaba al cliente no contenía el `requestId`. Este ID es fundamental para poder rastrear una solicitud específica a través de los logs del sistema.

## Causa Raíz

La causa del bug estaba en la implementación del middleware de manejo de errores. Este middleware construía el objeto de respuesta de error únicamente con el mensaje del error, omitiendo por completo el `requestId` que el middleware anterior había generado y adjuntado al objeto `req`.

## Cambio Aplicado

La corrección consistió en modificar el middleware de manejo de errores. Ahora, al construir el objeto JSON de la respuesta, se accede al `req.id` (que contiene el `requestId`) y se incluye en el cuerpo de la respuesta. Esto garantiza que todas las respuestas de error contengan el ID de trazabilidad, cumpliendo con el objetivo del ejercicio.

## Comando Usado para Validar

```bash
npm test -- ejercicios/ejercicio-041/tests/request-id.api.test.js
```

## Resultado Final

```text
PS C:\Users\Dell\campuslands-debugging-js-ts-node-Eve> npm test -- ejercicios/ejercicio-041/tests/request-id.api.test.js

> campuslands-debugging-js-ts-node@1.0.0 test
> vitest run ejercicios/ejercicio-041/tests/request-id.api.test.js


 RUN  v4.1.10 C:/Users/Dell/campuslands-debugging-js-ts-node-Eve

 ✓ ejercicios/ejercicio-041/tests/request-id.api.test.js (1 test) 55ms
   ✓ ejercicio 041 (1)
     ✓ debe propagar el requestId en las respuestas de error 53ms

 Test Files  1 passed (1)
      Tests  1 passed (1)
   Start at  11:15:08
   Duration  890ms (transform 60ms, setup 0ms, import 374ms, tests 55ms, environment 0ms)

PS C:\Users\Dell\campuslands-debugging-js-ts-node-Eve> 
```