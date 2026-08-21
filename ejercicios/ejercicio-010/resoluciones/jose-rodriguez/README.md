# Resolucion Ejercicio 010: Pedidos de comida

## Error encontrado
- El codigo base intentaba concatenar propiedades genericas sin filtrar los estados de los pedidos ni aplicar calculos de impuestos.

## Causa raiz
- Ausencia de validacion de los estados del pedido (`esrado !== 'cancelado'`) antes de procesar el calculo de montos numericos.

## Cambio aplicado 
- Se implemento `calcularTotalPedidosValidos()` utilizando `.filter()` para descartar ordenes canceladas y `.reduce()` para sumar sus totales.
- Se creo `calcularTotalConIva()` para anadir la tasa impositiva correspondiente con ajustes a 2 decimales.

## Comando usado para validar
```bash
npm test -- ejercicios/ejercicio-010/resoluciones/jose-rodriguez/food-orders.test.js