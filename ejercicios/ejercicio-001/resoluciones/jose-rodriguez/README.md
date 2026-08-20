# Resolucion Ejercicio 001: Ranking gamer con parseo numerico

## Error encontrado 
- `calcularResultado` concatenaba los valores como cadenas de texto usando `.join('')` en lugar de sumar numericamente.
-`ordenarRanking` utilizanba un orden ascendente `(a -b)` cuando se requeria priorizar las mejores resultados de mayor a menor.

## Causa raiz 
- Ausencia de parseo numerico (`Number()`) para interpretar valores numericos recibidos en formato string (`"150"` + `"50"` resultaba en `"15050"`).

## Cambio aplicado
- Se refactorizo `calcularResultado` con `reduce()` aplicando `Numerico(item.puntos)` para acumular valores numericos reales.
- Se corrigio el comparador de `.sort()` a `puntosB - puntosA` para garantizar el ranking descendente.

## Comando usado para validar
```bash
npm test -- ejercicios/ejercicio-001/resoluciones/jose-rodriguez/scoreboard.test.js


