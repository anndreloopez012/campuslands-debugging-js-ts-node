# Solución Ejercicio 001: Ranking Gamer

## Error Encontrado

El problema principal estaba en la función `calcularResultado`, que en lugar de sumar los puntos de los jugadores, los estaba concatenando como si fueran cadenas de texto. Por ejemplo, para los puntajes `[10, 20]`, en lugar de obtener `30`, se obtenía la cadena `'1020'`.

Adicionalmente, la función `ordenarRanking` estaba ordenando a los jugadores de menor a mayor puntaje (ascendente), cuando un ranking de mejores jugadores debe ser de mayor a menor (descendente).

## Causa Raíz

1.  **Concatenación de texto:** La función `calcularResultado` usaba `map` para extraer los puntos y luego `join('')` para unirlos, lo que resulta en una concatenación de strings.
2.  **Orden incorrecto:** La función `sort` en `ordenarRanking` usaba la comparación `a.puntos - b.puntos`, que ordena de forma ascendente.

## Cambio Aplicado

1.  En `calcularResultado`, reemplacé `map().join('')` por `reduce()` para sumar correctamente los valores. Usé `Number()` para asegurar que cada punto se trate como un número antes de la suma.
2.  En `ordenarRanking`, modifiqué la función de comparación a `b.puntos - a.puntos` para que el orden sea descendente.

## Comando Usado para Validar

```bash
npm test -- ejercicios/ejercicio-001/tests/scoreboard.test.js
```

## Resultado Final en el testing

```text
PS C:\Users\Dell\campuslands-debugging-js-ts-node-Eve> npm test -- ejercicios/ejercicio-001/tests/scoreboard.test.js

> campuslands-debugging-js-ts-node@1.0.0 test
> vitest run ejercicios/ejercicio-001/tests/scoreboard.test.js


 RUN  v4.1.10 C:/Users/Dell/campuslands-debugging-js-ts-node-Eve

 ✓ ejercicios/ejercicio-001/tests/scoreboard.test.js (2 tests) 6ms
   ✓ ejercicio 001 (2)
     ✓ calcula suma numerica y no concatena texto 2ms
     ✓ ordena ranking de mayor a menor puntaje 1ms

 Test Files  1 passed (1)
      Tests  2 passed (2)
   Start at  14:26:52
   Duration  1.21s (transform 41ms, setup 0ms, import 92ms, tests 6ms, environment 0ms)

PS C:\Users\Dell\campuslands-debugging-js-ts-node-Eve> 
```