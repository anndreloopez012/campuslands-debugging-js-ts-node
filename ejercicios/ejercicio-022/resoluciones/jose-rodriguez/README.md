# Resolución Ejercicio 022: Soldadura

## Error encontrado
- El código base exportaba funciones genéricas (`calcularPromedio`, `obtenerMejor`) sin lógica ni modelos tipados para cordones de soldadura ni cálculo de varillas

## Causa raíz
- Falta de la interfaz `CordonSoldadura` y de funciones matemáticas para ponderar consumo por centímetro y margen de desperdicio.

## Cambio aplicado
- Se definió la interfaz `CordonSoldadura` en TypeScript.
- Se implementó `calcularConsumoCordon()` aplicando la fórmula `longitud * consumoPorCentimetro * (1 + desperdicio)`.
- Se creó `calcularConsumoTotalSoldadura()` para acumular los metros/unidades de varilla consumidos en la obra.

## Comando usado para validar
```bash
npm test -- ejercicios/ejercicio-022/resoluciones/jose-rodriguez/welding.test.ts