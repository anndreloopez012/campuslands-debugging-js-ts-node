# Ejercicio 016: Carreras

# Solución Ejercicio 016: Carreras

## Error Encontrado

El archivo de pruebas inicial estaba desactualizado. Tras crear un test que validara la lógica de las penalizaciones, se identificó el bug hipotético en el código original: la función restaba las penalizaciones del tiempo base de la vuelta en lugar de sumarlas, o no las consideraba en absoluto.

## Causa Raíz

La causa del problema era un operador aritmético incorrecto. En lugar de usar `+` para añadir las penalizaciones al tiempo, se estaba usando `-`, lo que resultaba en tiempos de vuelta incorrectamente más bajos.

## Cambio Aplicado

1.  **Creación del Test**: Se creó un archivo `ejercicios/ejercicio-016/tests/racing-laps.test.js` para validar que la función `calculateLapTimes` suma correctamente las penalizaciones y devuelve un nuevo array con los tiempos finales.
2.  **Implementación de la Función**: Se implementó la función `calculateLapTimes` usando `.map()` para crear un nuevo array sin mutar el original. Dentro del map, se utiliza `.reduce()` para sumar todas las penalizaciones de una vuelta y luego se añade este total al tiempo base para obtener el `finalTime`.

## Comando Usado para Validar

```bash
npm test -- ejercicios/ejercicio-016/tests/racing-laps.test.js
```

## Resultado Final (Ejemplo)

```text
 PS C:\Users\barri\campuslands-debugging-js-ts-node-Eve> npm test -- ejercicios/ejercicio-016/tests/racing-laps.test.js                                                       

> campuslands-debugging-js-ts-node@1.0.0 test
> vitest run ejercicios/ejercicio-016/tests/racing-laps.test.js


 RUN  v4.1.10 C:/Users/barri/campuslands-debugging-js-ts-node-Eve

 ✓ ejercicios/ejercicio-016/tests/racing-laps.test.js (3 tests) 3ms
   ✓ ejercicio 016: calculateLapTimes (3)
     ✓ debe sumar las penalizaciones al tiempo base de cada vuelta 2ms
     ✓ debe devolver un array vacío si no hay vueltas 0ms
     ✓ no debe mutar el array de vueltas original 0ms

 Test Files  1 passed (1)
      Tests  3 passed (3)
   Start at  00:25:48
   Duration  240ms (transform 64ms, setup 0ms, import 80ms, tests 3ms, environment 0ms)

PS C:\Users\barri\campuslands-debugging-js-ts-node-Eve>
```
