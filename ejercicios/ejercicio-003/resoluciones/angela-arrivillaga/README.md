# Documentación de Debugging - Ejercicio 003

## Descripción
Se corrigieron errores lógicos en el módulo de skins para cumplir con los requerimientos de las pruebas de validación.

### Problemas Detectados
1. **`calcularResultado`**: Concatenaba los puntos como texto debido al uso de `.map()` y `.join('')`. Se solucionó aplicando `.reduce()` para sumar los valores numéricos.
2. **`ordenarRanking`**: Ordenaba en sentido ascendente (`a - b`). Se modificó a (`b - a`) para priorizar los puntajes más altos primero.

## Tecnologías Utilizadas
- JavaScript (ES6+)
- Vitest