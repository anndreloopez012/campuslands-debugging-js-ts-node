# Documentación de Debugging - Ejercicio 004

## Descripción
Se corrigieron los errores lógicos en el módulo del ranking de MOBA para cumplir con las expectativas de las pruebas automatizadas.

### Problemas Detectados
1. **`calcularResultado`**: Concatenaba los puntos como cadenas de texto usando `.map()` y `.join('')`. Se solucionó aplicando `.reduce()` para sumar los valores numéricos correctamente.
2. **`ordenarRanking`**: Ordenaba en sentido ascendente (`a - b`). Se modificó a (`b - a`) para priorizar de manera correcta los puntajes más altos al inicio.

## Tecnologías Utilizadas
- JavaScript (ES6+)
- Vitest