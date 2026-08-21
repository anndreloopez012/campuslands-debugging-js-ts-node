# Solución Ejercicio 033: Animación 3D (Basado en el test actual)

## Error Encontrado

Las pruebas fallaron para las funciones `calcularPromedio` y `obtenerMejor`.

1.  `calcularPromedio`: La función calculaba un promedio incorrecto cuando había registros inactivos.
2.  `obtenerMejor`: La función devolvía el registro con el menor puntaje en lugar del mayor.

## Causa Raíz

1.  **`calcularPromedio`**: El error se debía a que la suma total de los puntos de los registros activos se dividía por el número total de registros en el array (`registros.length`), en lugar de dividirse por el número de registros que realmente se contaron (`activos.length`).
2.  **`obtenerMejor`**: El error estaba en la lógica de ordenamiento. Se usaba `(a, b) => a.puntos - b.puntos`, lo que ordena el array en orden ascendente, devolviendo el elemento con el puntaje más bajo.

## Cambio Aplicado

1.  **`calcularPromedio`**:
    -   Se modificó la línea final para dividir el `total` de puntos por `activos.length`.
    -   Se añadió una validación para evitar la división por cero si no hay registros activos, devolviendo `0` en ese caso.

2.  **`obtenerMejor`**:
    -   Se invirtió la lógica de ordenamiento a `(a, b) => b.puntos - a.puntos` para que ordene de forma descendente y devuelva el registro con el puntaje más alto.

## Comando Usado para Validar

```bash
npm test -- ejercicios/ejercicio-033/tests/render-farm.test.ts
```

## Resultado Final

```text
camper@campus-H610M-K-V2:~/campuslands-debugging-js-ts-node-Eve-1$ npm test -- ejercicios/ejercicio-033/tests/render-farm.test.ts

> campuslands-debugging-js-ts-node@1.0.0 test
> vitest run ejercicios/ejercicio-033/tests/render-farm.test.ts


 RUN  v4.1.10 /home/camper/campuslands-debugging-js-ts-node-Eve-1

 ✓ ejercicios/ejercicio-033/tests/render-farm.test.ts (2 tests) 2ms
   ✓ ejercicio 033 (2)
     ✓ calcula promedio solo con registros activos 1ms
     ✓ obtiene el registro con mayor puntaje 0ms

 Test Files  1 passed (1)
      Tests  2 passed (2)
   Start at  09:26:51
   Duration  102ms (transform 16ms, setup 0ms, import 24ms, tests 2ms, environment 0ms)

camper@campus-H610M-K-V2:~/campuslands-debugging-js-ts-node-Eve-1$ 
```