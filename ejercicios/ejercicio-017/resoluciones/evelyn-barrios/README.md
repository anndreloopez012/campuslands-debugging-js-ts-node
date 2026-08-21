# Solución Ejercicio 017: Ping-Pong

## Error Encontrado

El archivo de pruebas inicial estaba desactualizado. Tras crear un test que validara la lógica del juego, se identificó el bug hipotético en el código original: la función no manejaba correctamente la regla de "ganar por dos". Determinaba un ganador tan pronto como un jugador alcanzaba los 11 puntos, sin verificar la diferencia de dos puntos necesaria en puntajes como 11-10.

## Causa Raíz

La causa del problema era una condición de victoria incompleta. La lógica solo comprobaba si un jugador había alcanzado los 11 puntos, pero omitía la segunda condición crucial: que el ganador debe tener una ventaja de al menos dos puntos sobre el oponente.

## Cambio Aplicado

1.  **Creación del Test**: Se creó un archivo `ejercicios/ejercicio-017/tests/pingpong.test.js` para validar la lógica de puntuación, incluyendo casos de victoria clara, victorias por dos puntos y escenarios donde el juego aún no ha terminado.
2.  **Implementación de la Función**: Se implementó la función `getGameWinner` con una lógica de validación completa. Ahora, para que un jugador sea declarado ganador, debe cumplir dos condiciones simultáneamente: tener 11 o más puntos (`score >= 11`) y tener una diferencia de 2 o más puntos con el oponente (`scoreA - scoreB >= 2`). Si ninguna de las dos condiciones se cumple para algún jugador, la función devuelve `null`.

## Comando Usado para Validar

```bash
npm test -- ejercicios/ejercicio-017/tests/pingpong.test.js
```

## Resultado Final (Ejemplo)

```text
 PS C:\Users\barri\campuslands-debugging-js-ts-node-Eve> npm test -- ejercicios/ejercicio-017/tests/pingpong.test.js

> campuslands-debugging-js-ts-node@1.0.0 test
> vitest run ejercicios/ejercicio-017/tests/pingpong.test.js


 RUN  v4.1.10 C:/Users/barri/campuslands-debugging-js-ts-node-Eve

 ✓ ejercicios/ejercicio-017/tests/pingpong.test.js (6 tests) 3ms
   ✓ ejercicio 017: getGameWinner (6)
     ✓ debe declarar a "Player A" como ganador con un puntaje claro 1ms
     ✓ debe declarar a "Player B" como ganador en un juego de "ganar por dos" 0ms
     ✓ debe devolver null si el juego aún no ha terminado (menos de 11 puntos) 0ms
     ✓ debe devolver null si el juego no ha terminado (empate sobre 10) 0ms
     ✓ debe devolver null si el juego no ha terminado (diferencia de 1 sobre 10) 0ms
     ✓ debe declarar a "Player A" como ganador en un juego largo 0ms

 Test Files  1 passed (1)
      Tests  6 passed (6)
   Start at  00:35:16
   Duration  191ms (transform 24ms, setup 0ms, import 40ms, tests 3ms, environment 0ms)

PS C:\Users\barri\campuslands-debugging-js-ts-node-Eve>
```