# Documentación de Debugging - Ejercicio 001

## Descripción
En este ejercicio, se identificaron y corrigieron errores de lógica en las funciones `calcularResultado` y `ordenarRanking`. 

### Problemas Detectados

1. **`calcularResultado`**:
   - **Error**: La función utilizaba `.map()` y `.join('')`, lo que causaba que los valores numéricos de los puntos se concatenaran como cadenas de texto (ej. "10155") en lugar de sumarse matemáticamente.
   - **Corrección**: Se implementó el método `.reduce()` para sumar correctamente los valores numéricos, garantizando que el resultado sea un número entero (ej. 30).

2. **`ordenarRanking`**:
   - **Error**: La función realizaba un ordenamiento ascendente (`a.puntos - b.puntos`), lo cual no cumplía con el requisito de mostrar primero a los jugadores con mejores resultados.
   - **Corrección**: Se cambió la lógica de comparación a `b.puntos - a.puntos`, lo que permite un ordenamiento descendente, colocando a los jugadores con mayores puntajes al inicio de la lista.

## Tecnologías Utilizadas
- JavaScript (ES6+)
- Vitest (para la validación mediante tests)