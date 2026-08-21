# Resolución Ejercicio 012: Kickboxing

## Error encontrado
- El código base intentaba ejecutar una concatenación de strings y un ordenamiento por puntos predeterminado en lugar de procesar tarjetas de jueces

## Causa raíz
- Ausencia de funciones para sumar las puntuaciones individuales de las tarjetas y comparar los acumulados de ambos esquinas.

## Cambio aplicado
- Se creó `calcularPuntajeTotal()` usando `.reduce()` para sumar el total de cada tarjeta.
- Se implementó `determinarGanadorKickboxing()` para comparar el total del peleador rojo vs. azul y retornar el veredicto final indicando ganador y estado de empate.

## Comando usado para validar
```bash
npm test -- ejercicios/ejercicio-012/resoluciones/jose-rodriguez/kickboxing.test.js