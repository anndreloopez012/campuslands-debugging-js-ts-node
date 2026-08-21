# Documentación de Debugging - Ejercicio 002

## Descripción
Se corrigieron errores de lógica en las funciones `calcularResultado` y `ordenarRanking` para que pasen las pruebas de inventario.

### Problemas Detectados
1. **`calcularResultado`**: Usaba `.map()` y `.join('')`, concatenando los números como texto ("10155"). Se corrigió implementando `.reduce()` para sumar los valores numéricos (30).
2. **`ordenarRanking`**: Ordenaba de forma ascendente (`a - b`). Se ajustó a `b - a` para lograr el orden descendente requerido.

## Tecnologías Utilizadas
- JavaScript (ES6+)
- Vitest