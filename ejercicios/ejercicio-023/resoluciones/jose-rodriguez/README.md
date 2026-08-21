# Resolución Ejercicio 023: Ropa streetwear

## Error encontrado
- El código base contenía funciones genéricas desalineadas (`calcularPromedio` y `obtenerMejor`), sin validación de tipos estrictos para tallas ni control de stock de inventario.

## Causa raíz
- Ausencia de definición de tipos seguros de TypeScript (`TallaStreetwear`, `PrendaStreetwear`) y falta de métodos específicos para la gestión de prendas.

## Cambio aplicado
- Se creó el tipo union `TallaStreetwear` y la interfaz `PrendaStreetwear`.
- Se implementó `calcularStockTotal()` para sumar unidades disponibles de prendas activas[cite: 25].
- Se creó `obtenerPrendasPorTalla()` para filtrar inventario según la talla requerida con disponibilidad real de stock.

## Comando usado para validar
```bash
npm test -- ejercicios/ejercicio-023/resoluciones/jose-rodriguez/streetwear-stock.test.ts