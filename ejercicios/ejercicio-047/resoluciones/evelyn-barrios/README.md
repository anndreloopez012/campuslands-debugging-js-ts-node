# Solución Ejercicio 047: Capas Controller/Service

## Error Encontrado

La API fallaba al intentar crear un nuevo usuario, resultando en un error `500 Internal Server Error` o una respuesta inesperada. El problema era una violación del contrato entre la capa del controlador y la capa de servicio.

## Causa Raíz

La causa del bug era que el `userController` estaba llamando al método `userService.createUser` con argumentos incorrectos. Por ejemplo, podría haber estado pasando `req.body.name` y `req.body.email` como dos argumentos separados, mientras que el servicio esperaba un único objeto `{ name, email }`. Esto causaba que el servicio recibiera parámetros `undefined` y lanzara un error que no era manejado correctamente por el controlador.

## Cambio Aplicado

1.  **Separación de Capas:** Se estructuró el código en una capa de servicio (`userService`) para la lógica de negocio y una capa de controlador (`userController`) para manejar el flujo de HTTP.
2.  **Corrección del Contrato:** Se modificó la llamada en el `userController` para que pasara el objeto `req.body` completo al `userService.createUser`, cumpliendo con el contrato esperado por el servicio.
3.  **Manejo de Errores:** Se implementó un bloque `try...catch` en el controlador. Esto permite capturar cualquier error lanzado por la capa de servicio (como datos faltantes) y traducirlo en una respuesta HTTP apropiada (ej. `400 Bad Request`) con un mensaje claro para el cliente.

## Comando Usado para Validar

```bash
npm test -- ejercicios/ejercicio-047/tests/layers.api.test.js
```

## REsultado final 
```text
PS C:\Users\Dell\campuslands-debugging-js-ts-node-Eve> npm test -- ejercicios/ejercicio-047/tests/layers.api.test.js                                                                                    

> campuslands-debugging-js-ts-node@1.0.0 test
> vitest run ejercicios/ejercicio-047/tests/layers.api.test.js


 RUN  v4.1.10 C:/Users/Dell/campuslands-debugging-js-ts-node-Eve

 ✓ ejercicios/ejercicio-047/tests/layers.api.test.js (2 tests) 376ms
   ✓ ejercicio 047: Capas Controller/Service (2)
     ✓ debe crear un usuario correctamente a través de las capas  359ms
     ✓ debe devolver un error 400 si faltan datos en la solicitud 13ms

 Test Files  1 passed (1)
      Tests  2 passed (2)
   Start at  13:40:18
   Duration  6.62s (transform 162ms, setup 0ms, import 4.92s, tests 376ms, environment 0ms)

PS C:\Users\Dell\campuslands-debugging-js-ts-node-Eve> 
```