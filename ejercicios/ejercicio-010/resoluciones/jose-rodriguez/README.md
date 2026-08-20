# Resolucion Ejercicio 010: Pedidos de comida 

## Error encontrado
- El archivo base contenia implementaciones genericas que no validaban estados antes de acumular montos monetarios.

## Causa raiz
- Ausencia de filtrado por la propiedad `estado` y falta de acumuladores numericos seguros para evitar sumar ordenes canceladas o nulas.

## Cambio aplicado
- Se implemento `calcularTotalPedidosValidos` utilizando `.reduce()` con validacion estricta del parametro `estado` antes de sumar el campo `total`.
- Se creo `filtrarPedidiosPorEstado` evaluando pertenencia mediante `.includes()`.

## Comando usado para validar
```bash
npm test -- ejercicios/ejercicio-010/resoluciones/jose-rodriguez/food-orders.test.js