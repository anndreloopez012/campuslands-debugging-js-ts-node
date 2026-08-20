# Resolución Ejercicio 004: Torneo MOBA

## Error encontrado
- El código base genérico utilizaba plantillas no relacionadas con la gestión de torneos ni criterios de desempate MOBA[cite: 5].

## Causa raíz
- Falta de lógica de desempate por diferencia de kills/deaths y cálculo de estadísticas de rendimiento (KDA).

## Cambio aplicado
- Se implementó `ordenarRankingMoba` aplicando `.sort()` con comparación multinivel (victorias y diferencia K/D)[cite: 6].
- Se agregó `calcularKda` con redondeo estricto de dos decimales[cite: 6].

## Comando usado para validar
```bash
npm test -- ejercicios/ejercicio-004/tests/moba-ranking.test.js