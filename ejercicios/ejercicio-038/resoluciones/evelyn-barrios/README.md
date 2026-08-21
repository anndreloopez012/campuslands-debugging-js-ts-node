# Solución Ejercicio 038: API de Inventario Gamer

## Error Encontrado

El endpoint `PATCH /inventory/:id` no realizaba una actualización parcial como se espera del método PATCH. En lugar de modificar solo los campos proporcionados en el cuerpo de la solicitud, reemplazaba el objeto completo del inventario. Esto causaba que cualquier campo no incluido en la solicitud PATCH se perdiera (se volviera `undefined`).

## Causa Raíz

La causa del error estaba en la lógica de actualización. Se estaba utilizando el spread syntax para crear un objeto nuevo con el `id` y los campos del `req.body`, en lugar de fusionar los campos del `req.body` con el objeto existente.

```javascript
// Código original con el bug
// Esto elimina los campos 'name' y 'type' si solo se envía 'quantity'
inventory[itemIndex] = { id, ...req.body };
```

## Cambio Aplicado

La corrección consistió en cambiar la lógica de asignación para que fusione el objeto existente con los nuevos datos. Se utiliza el spread syntax para copiar todas las propiedades del objeto original (`...inventory[itemIndex]`) y luego sobrescribir solo aquellas que vienen en el cuerpo de la solicitud (`...req.body`).

```javascript
// Lógica de corrección clave
inventory[itemIndex] = { ...inventory[itemIndex], ...req.body };
```
Esto asegura que los campos no proporcionados en la solicitud PATCH conserven su valor original.

## Comando Usado para Validar

```bash
npm test -- ejercicios/ejercicio-038/tests/inventory.api.test.js
```

## Resultado Final

```text
camper@campus-H610M-K-V2:~/campuslands-debugging-js-ts-node-Eve-1$ npm test -- ejercicios/ejercicio-038/tests/inventory.api.test.js

> campuslands-debugging-js-ts-node@1.0.0 test
> vitest run ejercicios/ejercicio-038/tests/inventory.api.test.js


 RUN  v4.1.10 /home/camper/campuslands-debugging-js-ts-node-Eve-1

 ✓ ejercicios/ejercicio-038/tests/inventory.api.test.js (2 tests) 21ms
   ✓ ejercicio 038 - Inventory API (2)
     ✓ PATCH /inventory/:id should update only the provided fields 16ms
     ✓ PATCH /inventory/:id should return 404 for a non-existent item 4ms

 Test Files  1 passed (1)
      Tests  2 passed (2)
   Start at  10:16:39
   Duration  176ms (transform 15ms, setup 0ms, import 74ms, tests 21ms, environment 0ms)

camper@campus-H610M-K-V2:~/campuslands-debugging-js-ts-node-Eve-1$ 
```