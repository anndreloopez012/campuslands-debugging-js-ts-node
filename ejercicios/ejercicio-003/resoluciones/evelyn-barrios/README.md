 # Solución Ejercicio 003: Descuentos en Skins

## Error Encontrado

El primer problema detectado fue que el archivo de pruebas (`skins.test.js`) no correspondía al objetivo del ejercicio. Estaba validando lógica de un ejercicio anterior en lugar de la funcionalidad de `applyDiscount`.

Una vez corregido el test, el síntoma del bug en el código original se hizo evidente: la función no manejaba correctamente el redondeo de precios, produciendo resultados con más de dos decimales debido a la imprecisión de las operaciones de punto flotante en JavaScript (por ejemplo, `20.993000000000002` en lugar de `20.99`).

## Causa Raíz

La causa raíz del problema era doble:

1.  **Archivo de Test Incorrecto**: El archivo de validación estaba desactualizado, impidiendo una correcta verificación del problema.
2.  **Falta de Redondeo**: La implementación original no contaba con un mecanismo para redondear el resultado final a dos decimales, que es el formato estándar para precios. Las operaciones aritméticas con números decimales en JavaScript pueden generar resultados imprecisos que deben ser normalizados.

## Cambio Aplicado

La solución se implementó en dos fases:

1.  **Corrección del Test**: Se actualizó el archivo `ejercicios/ejercicio-003/tests/skins.test.js` para que validara específicamente la función `applyDiscount`, incluyendo casos de redondeo y manejo de descuentos de 0% y 100%.
2.  **Implementación de la Función**: En el archivo `skins.js`, se implementó la lógica para calcular el precio con descuento y se añadió un paso de redondeo explícito. La técnica `Math.round(valor * 100) / 100` fue utilizada para asegurar que el resultado final siempre tenga dos decimales.

## Comando Usado para Validar

```bash
npm test -- ejercicios/ejercicio-003/tests/skins.test.js
```

## Resultado Final

```text
 PS C:\Users\barri\campuslands-debugging-js-ts-node-Eve> npm test -- ejercicios/ejercicio-003/tests/skins.test.js

> campuslands-debugging-js-ts-node@1.0.0 test
> vitest run ejercicios/ejercicio-003/tests/skins.test.js


 RUN  v4.1.10 C:/Users/barri/campuslands-debugging-js-ts-node-Eve

 ✓ ejercicios/ejercicio-003/tests/skins.test.js (4 tests) 3ms
   ✓ ejercicio 003: applyDiscount (4)
     ✓ debe aplicar un descuento y redondear correctamente a dos decimales 1ms
     ✓ debe devolver 0 si el descuento es del 100% 0ms
     ✓ no debe aplicar descuento si el porcentaje es 0 0ms
     ✓ debe manejar problemas de precisión con punto flotante 0ms

 Test Files  1 passed (1)
      Tests  4 passed (4)
   Start at  20:34:37
   Duration  214ms (transform 61ms, setup 0ms, import 76ms, tests 3ms, environment 0ms)

PS C:\Users\barri\campuslands-debugging-js-ts-node-Eve> 
```