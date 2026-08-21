# Resolución Ejercicio 011: Battle royale

## Error encontrado
- El código base intentaba concatenar puntos y realizar un ordenamiento general en lugar de evaluar condiciones de sobrevivencia y delimitación de mapa.

## Causa raíz
- Ausencia de filtros para jugadores eliminados (`salud <= 0`) y falta de cálculo geométrico para determinar la distancia con respecto al radio seguro.

## Cambio aplicado
- Se construyó `obtenerSobrevivientes()` mediante `.filter()` para excluir jugadores con 0 de vida.
- Se implementó `estaEnZonaSegura()` utilizando la fórmula de distancia euclidiana `Math.sqrt(x² + y²)` frente al radio.

## Comando usado para validar
```bash
npm test -- ejercicios/ejercicio-011/resoluciones/jose-rodriguez/battle-zone.test.js