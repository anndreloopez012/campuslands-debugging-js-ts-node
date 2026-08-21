# Solución Ejercicio 010: Pedidos de Comida

## Error Encontrado

El archivo de pruebas inicial estaba desactualizado. Tras corregirlo, el bug en el código original se hizo evidente: la función calculaba la suma total de *todos* los pedidos, sin importar su estado. Esto incluía pedidos cancelados o en otros estados que no deberían formar parte del total.

## Causa Raíz

La causa del problema era la ausencia de un paso de filtrado. La función aplicaba directamente un `reduce` para sumar los montos, pero no filtraba previamente la lista de pedidos para incluir solo aquellos con un estado válido.

## Cambio Aplicado

1.  **Corrección del Test**: Se actualizó `ejercicios/ejercicio-010/tests/food-orders.test.js` para validar que la función `calculateTotal` solo suma los pedidos cuyos estados están en la lista de estados válidos.
2.  **Implementación de la Función**: Se implementó la función `calculateTotal` encadenando dos métodos de array: primero `.filter()` para seleccionar solo los pedidos cuyo `status` está incluido en el array `validStatuses`, y luego `.reduce()` para sumar la propiedad `total` de los pedidos filtrados.

## Comando Usado para Validar

```bash
npm test -- ejercicios/ejercicio-010/tests/food-orders.test.js
```

## Resultado Final (Ejemplo)

```text
 PS C:\Users\barri\campuslands-debugging-js-ts-node-Eve> npm test -- ejercicios/ejercicio-010/tests/food-orders.test.js


> campuslands-debugging-js-ts-node@1.0.0 test
> vitest run ejercicios/ejercicio-010/tests/food-orders.test.js


 RUN  v4.1.10 C:/Users/barri/campuslands-debugging-js-ts-node-Eve

 ✓ ejercicios/ejercicio-010/tests/food-orders.test.js (4 tests) 3ms
   ✓ ejercicio 010: calculateTotal (4)
     ✓ debe calcular el total solo de los pedidos con estados válidos 1ms
     ✓ debe devolver 0 si ninguna orden tiene un estado válido 0ms
     ✓ debe devolver 0 si la lista de órdenes está vacía 0ms
     ✓ debe manejar una lista de estados válidos vacía 0ms

 Test Files  1 passed (1)
      Tests  4 passed (4)
   Start at  22:21:42
   Duration  150ms (transform 17ms, setup 0ms, import 28ms, tests 3ms, environment 0ms)

PS C:\Users\barri\campuslands-debugging-js-ts-node-Eve> 
```