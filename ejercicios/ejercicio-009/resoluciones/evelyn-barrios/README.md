 # Solución Ejercicio 009: Hypercars

## Error Encontrado

El archivo de pruebas inicial (`hypercar.test.js`) estaba desactualizado y no validaba la conversión de unidades de velocidad. Tras corregirlo, el bug hipotético en el código original se hizo evidente: la función de conversión utilizaba un factor incorrecto o no realizaba el redondeo necesario a dos decimales, produciendo resultados imprecisos.

## Causa Raíz

La causa del problema era una fórmula de conversión incorrecta y la falta de manejo de la precisión de los números de punto flotante. Para convertir km/h a mph, se debe usar el factor de conversión `0.621371`, y el resultado debe redondearse para evitar decimales excesivos.

## Cambio Aplicado

1.  **Corrección del Test**: Se actualizó `ejercicios/ejercicio-009/tests/hypercar.test.js` para validar la conversión de km/h a mph, el redondeo a dos decimales y el caso en que no se necesita conversión.
2.  **Implementación de la Función**: Se implementó la función `convertSpeed` que verifica la unidad de destino. Si es 'mph', aplica el factor de conversión correcto y utiliza `Math.round(valor * 100) / 100` para asegurar el redondeo a dos decimales. Si la unidad es 'km/h', devuelve el valor sin cambios.

## Comando Usado para Validar

```bash
npm test -- ejercicios/ejercicio-009/tests/hypercar.test.js
```

## Resultado Final (Ejemplo)

```text
 PS C:\Users\barri\campuslands-debugging-js-ts-node-Eve> npm test -- ejercicios/ejercicio-009/tests/hypercar.test.js

> campuslands-debugging-js-ts-node@1.0.0 test
> vitest run ejercicios/ejercicio-009/tests/hypercar.test.js


 RUN  v4.1.10 C:/Users/barri/campuslands-debugging-js-ts-node-Eve

 ✓ ejercicios/ejercicio-009/tests/hypercar.test.js (4 tests) 2ms
   ✓ ejercicio 009: convertSpeed (4)
     ✓ debe convertir km/h a mph correctamente y redondear a dos decimales 1ms
     ✓ debe devolver la misma velocidad si la unidad de destino es km/h 0ms
     ✓ debe manejar velocidades de 0 0ms
     ✓ debe manejar la conversión de un valor típico de hypercar 0ms

 Test Files  1 passed (1)
      Tests  4 passed (4)
   Start at  22:11:30
   Duration  158ms (transform 22ms, setup 0ms, import 35ms, tests 2ms, environment 0ms)
```