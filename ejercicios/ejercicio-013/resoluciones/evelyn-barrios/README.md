# Solución Ejercicio 013: Viajes

## Error Encontrado

El archivo de pruebas inicial estaba desactualizado. Tras corregirlo para que validara la agrupación de gastos, se identificó el bug en el código original: al procesar la lista de gastos, la función sobrescribía el valor de cada ciudad con el último gasto encontrado, en lugar de acumular la suma de todos los gastos para esa ciudad.

## Causa Raíz

La causa del problema era una lógica de asignación incorrecta dentro del bucle o `reduce`. En lugar de verificar si la ciudad ya existía en el objeto resultado para sumarle el nuevo monto, simplemente se asignaba el nuevo monto (`acc[city] = amount`), perdiendo los valores anteriores.

## Cambio Aplicado

1.  **Corrección del Test**: Se actualizó `ejercicios/ejercicio-013/tests/travel-costs.test.js` para validar que la función `groupExpensesByCity` agrupa y suma correctamente los montos para cada ciudad.
2.  **Implementación de la Función**: Se implementó la función `groupExpensesByCity` usando el método `reduce`. La lógica `acc[city] = (acc[city] || 0) + amount;` soluciona el problema de forma concisa: si `acc[city]` ya existe, usa su valor; si no, usa `0` como base y luego le suma el `amount` actual. Esto asegura la acumulación correcta de los gastos.

## Comando Usado para Validar

```bash
npm test -- ejercicios/ejercicio-013/tests/travel-costs.test.js
```

## Resultado Final (Ejemplo)

```text
 PS C:\Users\barri\campuslands-debugging-js-ts-node-Eve> npm test -- ejercicios/ejercicio-013/tests/travel-costs.test.js

> campuslands-debugging-js-ts-node@1.0.0 test
> vitest run ejercicios/ejercicio-013/tests/travel-costs.test.js


 RUN  v4.1.10 C:/Users/barri/campuslands-debugging-js-ts-node-Eve

 ✓ ejercicios/ejercicio-013/tests/travel-costs.test.js (3 tests) 4ms
   ✓ ejercicio 013: groupExpensesByCity (3)
     ✓ debe agrupar y sumar los gastos por ciudad 2ms
     ✓ debe devolver un objeto vacío si no hay gastos 0ms
     ✓ debe manejar ciudades con un solo gasto 0ms

 Test Files  1 passed (1)
      Tests  3 passed (3)
   Start at  22:46:08
   Duration  230ms (transform 61ms, setup 0ms, import 75ms, tests 4ms, environment 0ms)

PS C:\Users\barri\campuslands-debugging-js-ts-node-Eve> 
```