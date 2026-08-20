# Resolución Ejercicio 004: Torneo MOBA

## Error encontrado
- `calcularResultado` realizaba una concatenación de cadenas mediante `.join('')` en lugar de una suma aritmética.
- `ordenarRanking` utilizaba un orden ascendente (`a.puntos - b.puntos`), posicionando a los equipos con mayores victorias al final de la tabla.

## Causa raíz
- Manipulación incorrecta de tipos de datos al procesar arreglos y criterio invertido en el callback de `.sort()`.

## Cambio aplicado
- Refactorización de `calcularResultado` con `.reduce()` para forzar el casteo a tipo `Number`.
- Corrección del comparador en `ordenarRanking` utilizando `b.puntos - a.puntos` sobre una copia inmutable del arreglo (`[...jugadores]`).

## Comando usado para validar
```bash
npm test -- ejercicios/ejercicio-004/resoluciones/jose-rodriguez/moba-ranking.test.js