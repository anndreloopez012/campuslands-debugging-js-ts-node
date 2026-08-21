# Solución Ejercicio 026: Progreso de Lectura

## Error Encontrado

El ejercicio presentaba dos bugs en las funciones de utilidad para manejar registros de lectura:

1.  **`calcularPromedio`**: La función calculaba incorrectamente el promedio de puntos. Sumaba los puntos de los registros activos pero dividía el resultado por el número total de registros (incluyendo los inactivos), lo que arrojaba un promedio más bajo del real.
2.  **`obtenerMejor`**: La función devolvía el registro con el menor puntaje en lugar del mayor, debido a que el criterio de ordenamiento era ascendente en lugar de descendente.

## Causa Raíz

1.  **`calcularPromedio`**: El error lógico estaba en el divisor. Se usaba `registros.length` en lugar de `activos.length`, sin considerar que el conjunto de datos para el promedio ya había sido filtrado.
2.  **`obtenerMejor`**: El error estaba en la función de comparación del `sort`. `a.puntos - b.puntos` ordena de menor a mayor. Para obtener el más alto, se necesita `b.puntos - a.puntos`.

## Cambio Aplicado

1.  En `calcularPromedio`, se cambió el divisor a `activos.length` para que coincida con la cantidad de elementos sumados. Se añadió también un control para el caso de que no haya registros activos, devolviendo `0` para evitar una división por cero.
2.  En `obtenerMejor`, se invirtió la lógica del `sort` a `(a, b) => b.puntos - a.puntos` para ordenar de forma descendente y obtener el registro con el puntaje más alto. Se añadió una guarda para retornar `undefined` explícitamente si el array de entrada está vacío.

## Comando Usado para Validar

```bash
npm test -- ejercicios/ejercicio-026/tests/book-progress.test.ts
```

## RESULTADO FINAL 
```text
camper@campus-H610M-K-V2:~/campuslands-debugging-js-ts-node-Eve-1$ npm test -- ejercicios/ejercicio-026/tests/book-progress.test.ts

> campuslands-debugging-js-ts-node@1.0.0 test
> vitest run ejercicios/ejercicio-026/tests/book-progress.test.ts


 RUN  v4.1.10 /home/camper/campuslands-debugging-js-ts-node-Eve-1

 ✓ ejercicios/ejercicio-026/tests/book-progress.test.ts (2 tests) 3ms
   ✓ ejercicio 026 (2)
     ✓ calcula promedio solo con registros activos 1ms
     ✓ obtiene el registro con mayor puntaje 0ms

 Test Files  1 passed (1)
      Tests  2 passed (2)
   Start at  07:19:21
   Duration  131ms (transform 29ms, setup 0ms, import 46ms, tests 3ms, environment 0ms)

camper@campus-H610M-K-V2:~/campuslands-debugging-js-ts-node-Eve-1$ 