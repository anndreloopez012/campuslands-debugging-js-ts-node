# Documentación de Debugging - Ejercicio 020

## Descripción
Se corrigieron los errores lógicos en el módulo de equipos de eSports para cumplir con las pruebas de validación automatizadas en TypeScript.

### Problemas Detectados
1. **`calcularPromedio`**: Dividía la suma de los puntos de los elementos activos entre el total de registros (`registros.length`) en lugar de usar la longitud del arreglo filtrado (`activos.length`).
2. **`obtenerMejor`**: Ordenaba de forma ascendente y devolvía el primer elemento (el menor puntaje). Se invirtió la resta (`b.puntos - a.puntos`) para obtener el registro con mayor puntaje.

## Tecnologías Utilizadas
- TypeScript
- Vitest