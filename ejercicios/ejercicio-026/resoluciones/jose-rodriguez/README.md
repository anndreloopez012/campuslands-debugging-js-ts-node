# Resolución Ejercicio 026: Libros

## Error encontrado
- El código base exportaba funciones irrelevantes (`calcularPromedio` y `obtenerMejor`) sin tipos ni utilidades para procesar sagas ni páginas de libros.

## Causa raíz
- Ausencia de las interfaces `Libro` y `ProgresoSaga`, así como de la lógica de agregación por páginas totales y leídas.

## Cambio aplicado
- Se crearon los tipos `Libro` y `ProgresoSaga`.
- Se implementó `calcularProgresoLibro()` para obtener la métrica individual controlando desbordamientos de páginas leídas.
- Se desarrolló `calcularProgresoSaga()` para consolidar el avance acumulado por saga en porcentaje y número de volúmenes completados.

## Comando usado para validar
```bash
npm test -- ejercicios/ejercicio-026/resoluciones/jose-rodriguez/book-progress.test.ts