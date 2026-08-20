# Resolución Ejercicio 003: Tienda de skins

## Error encontrado
- El código base genérico no implementaba las funciones de cálculo de descuento y redondeo para la temática de tienda de skins

## Causa raíz
- Ausencia de funciones dedicadas al cálculo porcentual e imprecisión de punto flotante al manipular precios decimales en JavaScript.

## Cambio aplicado
- Se diseñó la función `aplicarDescuento` usando `.toFixed(2)` para garantizar el redondeo exacto de precios.
- Se implementó `calcularTotalTienda` con `.reduce()` para sumar el total del carrito de forma limpia.

## Comando usado para validar
```bash
npm test -- ejercicios/ejercicio-003/resoluciones/jose-rodriguez/skins.test.js