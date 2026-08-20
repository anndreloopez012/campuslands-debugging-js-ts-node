# Resolución Ejercicio 001: Ranking gamer con parseo numérico

## Error encontrado
- `calcularResultado` concatenaba los valores como cadenas de texto usando `.join('')` en lugar de sumar numéricamente
- `ordenarRanking` utilizaba un orden ascendente `(a - b)` cuando se requería priorizar los mejores resultados de mayor a meno

## Causa raíz
- Ausencia de parseo numérico (`Number()`) para interpretar valores numéricos recibidos en formato string (`"150"` + `"50"` resultaba en `"15050"`)

## Cambio aplicado
- Se refactorizó `calcularResultado` con `.reduce()` aplicando `Number(item.puntos)` para acumular valores numéricos reales.
- Se corrigió el comparador de `.sort()` a `puntosB - puntosA` para garantizar el ranking descendente

## Comando usado para validar
```bash
npm test -- ejercicios/ejercicio-001/resoluciones/jose-rodriguez/scoreboard.test.js