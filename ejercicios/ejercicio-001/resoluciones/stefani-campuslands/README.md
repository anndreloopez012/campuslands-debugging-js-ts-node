# Resolucion Ejercicio 001

## Error encontrado
calcularResultado usaba .map().join('') concatenando puntos como texto. ordenarRanking ordenaba ascendente.

## Causa raiz
1. join('') genera string concatenado en vez de suma numerica.
2. Comparador a.puntos - b.puntos ordena ascendente, se necesita b.puntos - a.puntos.

## Cambio aplicado
1. Reemplazo por reduce((suma, item) => suma + item.puntos, 0).
2. Sort cambiado a b.puntos - a.puntos.

## Comando de validacion
npm test -- ejercicios/ejercicio-001/tests/scoreboard.test.js

## Resultado
Tests pasan correctamente.