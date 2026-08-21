# Solución Ejercicio 012: Kickboxing

## Error Encontrado

El archivo de pruebas inicial estaba desactualizado. Tras corregirlo para que validara la lógica de las tarjetas de jueces, se identificó el bug en el código original: la función no contaba correctamente los resultados de cada juez para determinar un ganador. Probablemente solo consideraba la primera tarjeta o usaba una lógica de suma de puntos en lugar de contar cuántos jueces daban por ganador a cada luchador.

## Causa Raíz

La causa del problema era una lógica de agregación incorrecta. Para determinar un ganador por tarjetas, se debe contar cuántos jueces votaron por cada luchador y luego comparar esos "votos". El código original no implementaba este conteo, llevando a resultados incorrectos en decisiones divididas o empates.

## Cambio Aplicado

1.  **Corrección del Test**: Se actualizó `ejercicios/ejercicio-012/tests/kickboxing.test.js` para validar el resultado en decisiones unánimes, divididas y empates.
2.  **Implementación de la Función**: Se implementó la función `getWinner` para que itere sobre cada tarjeta (`scorecard`). Dentro del bucle, se incrementa un contador para el "Fighter A" o "Fighter B" dependiendo de quién ganó esa tarjeta específica. Finalmente, se comparan los contadores de victorias para devolver el ganador o un empate.

## Comando Usado para Validar

```bash
npm test -- ejercicios/ejercicio-012/tests/kickboxing.test.js
```

## Resultado Final (Ejemplo)

```text
 PS C:\Users\barri\campuslands-debugging-js-ts-node-Eve> npm test -- ejercicios/ejercicio-012/tests/kickboxing.test.js

> campuslands-debugging-js-ts-node@1.0.0 test
> vitest run ejercicios/ejercicio-012/tests/kickboxing.test.js


 RUN  v4.1.10 C:/Users/barri/campuslands-debugging-js-ts-node-Eve

 ✓ ejercicios/ejercicio-012/tests/kickboxing.test.js (4 tests) 3ms
   ✓ ejercicio 012: getWinner (4)
     ✓ debe declarar a "Fighter A" como ganador en una decisión dividida 2ms
     ✓ debe declarar a "Fighter B" como ganador en una decisión unánime 0ms
     ✓ debe declarar un empate si los jueces están divididos 0ms
     ✓ debe declarar un empate si el número de jueces ganadores es el mismo 0ms

 Test Files  1 passed (1)
      Tests  4 passed (4)
   Start at  22:39:46
   Duration  218ms (transform 59ms, setup 0ms, import 74ms, tests 3ms, environment 0ms)

PS C:\Users\barri\campuslands-debugging-js-ts-node-Eve> 
```