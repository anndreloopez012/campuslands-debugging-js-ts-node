# Resolución Ejercicio 008: Fútbol sala

## Error encontrado
- El código base genérico incluía funciones no adaptadas a estadísticas de fútbol sala[cite: 12].

## Causa raíz
- Ausencia de la lógica para calcular la diferencia entre goles a favor/en contra y ordenar posiciones considerando criterios de desempate.

## Cambio aplicado
- Se implementó `calcularDiferenciaGoles` para retornar la resta exacta entre goles anotados y recibidos[cite: 11].
- Se creó `calcularTablaFutsal` con un `.sort()` inmutable de múltiples niveles (Puntos > Diferencia de Goles > Goles a Favor)[cite: 11].

## Comando usado para validar
```bash
npm test -- ejercicios/ejercicio-008/resoluciones/jose-rodriguez/futsal-table.test.js