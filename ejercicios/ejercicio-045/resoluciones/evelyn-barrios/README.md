# Solución Ejercicio 045: Servicios Asincrónicos

## Error Encontrado

El endpoint `GET /user/:id` tenía dos problemas. Primero, respondía inmediatamente a las solicitudes sin esperar a que el servicio asíncrono (`userService.findById`) terminara, devolviendo un cuerpo de respuesta vacío (`{}`). Segundo, el `id` del usuario en la respuesta era un `string` en lugar de un `number`, causando un fallo de aserción en el test.

## Causa Raíz

1.  **Falta de `async/await`:** La causa del primer bug era la falta de manejo de la asincronía. El controlador de la ruta no estaba declarado como `async` y no usaba `await` al invocar `userService.findById`.
2.  **Tipo de dato incorrecto:** La causa del segundo bug es que los parámetros de ruta en Express (`req.params.id`) siempre son de tipo `string`. El código pasaba este `string` directamente, y el test esperaba un `number`.

## Cambio Aplicado

1.  Se modificó la firma del controlador de la ruta para que fuera una función `async`.
2.  Se añadió el operador `await` antes de la llamada a `userService.findById(userId)`.
3.  Se añadió `parseInt(req.params.id, 10)` para convertir el `id` de la URL de `string` a `number` antes de pasarlo al servicio.

Estos cambios aseguran que el controlador espere la promesa y que los tipos de datos en la respuesta sean los correctos.

## Comando Usado para Validar

```bash
npm test -- ejercicios/ejercicio-045/tests/async.api.test.js
```

## Resultado Final 
```text
PS C:\Users\Dell\campuslands-debugging-js-ts-node-Eve> npm test -- ejercicios/ejercicio-045/tests/async.api.test.js

> campuslands-debugging-js-ts-node@1.0.0 test
> vitest run ejercicios/ejercicio-045/tests/async.api.test.js


 RUN  v4.1.10 C:/Users/Dell/campuslands-debugging-js-ts-node-Eve

 ✓ ejercicios/ejercicio-045/tests/async.api.test.js (1 test) 111ms
   ✓ ejercicio 045: Servicios Asincrónicos (1)
     ✓ debe esperar la resolución de la promesa y devolver los datos del usuario 108ms

 Test Files  1 passed (1)
      Tests  1 passed (1)
   Start at  12:02:03
   Duration  869ms (transform 54ms, setup 0ms, import 422ms, tests 111ms, environment 0ms)

PS C:\Users\Dell\campuslands-debugging-js-ts-node-Eve> 
```