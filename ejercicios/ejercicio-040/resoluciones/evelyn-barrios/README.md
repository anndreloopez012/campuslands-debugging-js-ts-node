# Solución Ejercicio 040: API de Pedidos

## Error Encontrado

El endpoint `PUT /orders/:id/status` no diferenciaba correctamente entre dos tipos de errores distintos:

1.  **Recurso no encontrado**: Cuando se intentaba actualizar una orden con un ID que no existía.
2.  **Regla de negocio inválida**: Cuando se intentaba actualizar una orden que ya estaba en estado `completed`.

En ambos casos, la API devolvía un `404 Not Found`, lo que impedía al cliente saber la verdadera razón del fallo.

## Causa Raíz

La causa del error era una única estructura condicional que agrupaba ambas validaciones. El código comprobaba `if (!order || order.status === 'completed')` y devolvía `404` en ambos escenarios, sin separar la lógica de existencia de la lógica de negocio.

## Cambio Aplicado

La solución consistió en separar las validaciones en dos pasos secuenciales, cada uno con su propio código de estado de error:

1.  Primero, se verifica si la orden existe. Si no (`!order`), se devuelve inmediatamente un `404 Not Found`.
2.  Solo si la orden existe, se procede a verificar la regla de negocio. Si la orden ya está completada (`order.status === 'completed'`), se devuelve un `422 Unprocessable Entity`.

Este cambio asegura que el cliente reciba el código de estado más preciso según el contexto del error.

## Comando Usado para Validar

```bash
npm test -- ejercicios/ejercicio-040/tests/orders.api.test.js
```

## Resultado Final

```text
camper@campus-H610M-K-V2:~/campuslands-debugging-js-ts-node-Eve-1$ npm test -- ejercicios/ejercicio-040/tests/orders.api.test.js

> campuslands-debugging-js-ts-node@1.0.0 test
> vitest run ejercicios/ejercicio-040/tests/orders.api.test.js


 RUN  v4.1.10 /home/camper/campuslands-debugging-js-ts-node-Eve-1

 ✓ ejercicios/ejercicio-040/tests/orders.api.test.js (3 tests) 23ms
   ✓ ejercicio 040 - Orders API (3)
     ✓ PUT /orders/:id/status should return 404 if the order does not exist 18ms
     ✓ PUT /orders/:id/status should return 422 if the order is already completed 2ms
     ✓ PUT /orders/:id/status should update the status and return 200 if the order is valid 2ms

 Test Files  1 passed (1)
      Tests  3 passed (3)
   Start at  10:32:31
   Duration  173ms (transform 16ms, setup 0ms, import 76ms, tests 23ms, environment 0ms)

camper@campus-H610M-K-V2:~/campuslands-debugging-js-ts-node-Eve-1$ 
```