# Documentación de Debugging - Ejercicio 009

## Descripción
Se corrigieron los errores lógicos en el módulo hypercar para cumplir con las pruebas de validación automatizadas.

### Problemas Detectados
1. **`calcularResultado`**: Concatenaba los puntos como cadenas de texto usando `.map()` y `.join('')`. Se solucionó aplicando `.reduce()` para sumar los valores numéricos correctamente.
2. **`ordenarRanking`**: Ordenaba de forma ascendente (`a - b`). Se modificó a (`b - a`) para asegurar el orden descendente de mayor a menor puntaje.

## Tecnologías Utilizadas
- JavaScript (ES6+)
- Vitest