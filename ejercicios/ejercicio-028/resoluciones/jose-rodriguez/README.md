# Resolución Ejercicio 028: Fútbol

## Error encontrado
- El archivo base contenía funciones genéricas desalineadas (`calcularPromedio` y `obtenerMejor`), sin soporte para calcular la tabla de posiciones ni manejar criterios de desempate en ligas de fútbol.

## Causa raíz
- Ausencia de las interfaces `EquipoFutbol` y `ClasificacionEquipo`, además de no disponer de un algoritmo de ordenamiento multinivel para desempatar por diferencia de goles, goles a favor y nombre.

## Cambio aplicado
- Se crearon las interfaces `EquipoFutbol` y `ClasificacionEquipo`.
- Se implementó `calcularEstadisticasEquipo()` para computar los puntos acumulados (3 por victoria, 1 por empate) y la diferencia de goles.
- Se creó `ordenarTablaPosiciones()` con ordenamiento descendente en cascada (puntos -> diferencia de goles -> goles a favor -> orden alfabético).

## Comando usado para validar
```bash
npm test -- ejercicios/ejercicio-028/resoluciones/jose-rodriguez/football-league.test.ts