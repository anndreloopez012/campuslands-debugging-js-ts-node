# README — Ejercicio 010: Pedidos de comida

## ¿Qué esperaba el test?

El test esperaba que `totalizarPedidos()` sumara únicamente los pedidos cuyo estado fuera `confirmado`.

Los pedidos con estado `cancelado` debían ser ignorados.

También se esperaba que, si todos los pedidos estaban cancelados, el resultado fuera `0`.

## ¿Qué recibió realmente?

El problema estaba en que la función no estaba aplicando correctamente la condición de estado al calcular el total.

Después de la corrección, el resultado coincide con lo esperado:

- Los pedidos `confirmado` se suman.
- Los pedidos `cancelado` se ignoran.
- Si todos están cancelados, devuelve `0`.
- Varios pedidos confirmados se acumulan correctamente.

## ¿El error es de tipo, lógica, async, HTTP o estructura?

El error era de **lógica**.

No era un problema de tipos, programación asíncrona, HTTP ni estructura.

La función recibía los datos correctamente, pero no aplicaba correctamente la regla de negocio: **solo contar los pedidos confirmados**.

## ¿El dato llega bien a la función?

Sí.

Los pedidos llegan correctamente a `totalizarPedidos()` como un arreglo de objetos que contiene la información necesaria, incluyendo el estado:

```js
{
  nombre: 'Hamburguesa',
  precio: 25,
  estado: 'confirmado'
}