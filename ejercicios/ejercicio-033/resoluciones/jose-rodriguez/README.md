# Resolución Ejercicio 033: Animación 3D

## Error encontrado
1. `calcularPromedio`: La función dividía la suma de puntos entre el total general de elementos del arreglo (`registros.length`) en lugar de dividir entre el total de elementos activos (`activos.length`).
2. `obtenerMejor`: El ordenamiento en `sort` aplicaba un criterio ascendente (`a.puntos - b.puntos`), devolviendo el registro de menor valor en el índice `[0]`.

## Causa raíz
- Cómputo incorrecto del divisor al promediar elementos filtrados y criterio de ordenamiento invertido en la búsqueda del valor máximo.

## Cambio aplicado
- En `calcularPromedio`, se corrigió la división para usar `activos.length`.
- En `obtenerMejor`, se cambió el criterio de ordenamiento en `sort` a descendente (`b.puntos - a.puntos`).

## Comando usado para validar
```bash
npm test -- ejercicios/ejercicio-033/tests/render-farm.test.ts