# Solución Ejercicio 048: Invalidación de Cache

## Error Encontrado

El sistema sufría de un problema de "stale cache" (caché obsoleta). Después de crear un nuevo producto a través de `POST /products`, las siguientes peticiones a `GET /products` seguían devolviendo la lista de productos antigua, la que estaba almacenada en la caché, en lugar de la lista actualizada que incluía el nuevo producto.

## Causa Raíz

La causa del bug era la falta de una estrategia de invalidación de caché. La operación de escritura (`POST /products`) modificaba la fuente de datos original, pero no realizaba ninguna acción para notificar o limpiar la caché. Como resultado, la entrada de la caché para `GET /products` permanecía intacta y se servía en las siguientes solicitudes, ignorando por completo la actualización de los datos.

## Cambio Aplicado

La corrección se implementó en el controlador del endpoint `POST /products`. Después de que el nuevo producto se añade con éxito al array de `products`, se añadió una lógica explícita para invalidar la caché:

```javascript
if (cache.has('/products')) {
  cache.delete('/products');
}
```

Este cambio asegura que, tras una operación de escritura, la caché para la ruta `/products` se elimina. Esto fuerza a que la siguiente solicitud `GET /products` sea un `CACHE MISS`, obteniendo los datos frescos directamente de la fuente y volviendo a poblar la caché con la información actualizada.

## Comando Usado para Validar

```bash
npm test -- ejercicios/ejercicio-048/tests/cache-invalidation.api.test.js
```

## Resultado final 
```text
PS C:\Users\Dell\campuslands-debugging-js-ts-node-Eve> npm test -- ejercicios/ejercicio-048/tests/cache-invalidation.api.test.js

> campuslands-debugging-js-ts-node@1.0.0 test
> vitest run ejercicios/ejercicio-048/tests/cache-invalidation.api.test.js


 RUN  v4.1.10 C:/Users/Dell/campuslands-debugging-js-ts-node-Eve

 ✓ ejercicios/ejercicio-048/tests/cache-invalidation.api.test.js (1 test) 105ms
   ✓ ejercicio 048: Invalidación de Cache (1)
     ✓ debe invalidar la caché de productos después de crear uno nuevo 102ms

 Test Files  1 passed (1)
      Tests  1 passed (1)
   Start at  13:48:22
   Duration  888ms (transform 59ms, setup 0ms, import 432ms, tests 105ms, environment 0ms)

PS C:\Users\Dell\campuslands-debugging-js-ts-node-Eve> 
```