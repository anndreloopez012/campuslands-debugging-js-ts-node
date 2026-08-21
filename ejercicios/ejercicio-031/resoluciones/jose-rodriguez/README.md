# Resolución Ejercicio 031: Autos de lujo

## Error encontrado
- El archivo base contenía funciones genéricas de arreglos (`calcularPromedio` y `obtenerMejor`) desalineadas con la temática de vehículos de lujo y sin lógica de ordenamiento.

## Causa raíz
- Ausencia de las interfaces `AutoLujo` y `AutoLujoConRatio`, e inexistencia de algoritmos para calcular la métrica potencia/precio y ordenar el catálogo.

## Cambio aplicado
- Se construyeron las interfaces `AutoLujo` y `AutoLujoConRatio`.
- Se implementó `calcularRatioPotenciaPrecio()` para medir los HP obtenidos por cada $1,000 USD de inversión.
- Se creó `ordenarCatalogoPorPotenciaPrecio()` para ordenar el catálogo de forma descendente en función del ratio calculado.

## Comando usado para validar
```bash
npm test -- ejercicios/ejercicio-031/resoluciones/jose-rodriguez/luxury-cars.test.ts