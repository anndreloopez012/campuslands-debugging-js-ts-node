# Solución Ejercicio 046: Cache en Memoria

## Error Encontrado

El endpoint `GET /products` realizaba una operación de base de datos lenta y costosa en cada solicitud. Esto resultaba en una alta latencia y un uso ineficiente de los recursos, ya que los datos de los productos no cambian con frecuencia.

## Causa Raíz

La causa del problema era la ausencia de una estrategia de caché. La aplicación no almacenaba temporalmente los resultados de las operaciones costosas, obligando al sistema a repetir el mismo trabajo una y otra vez.

## Cambio Aplicado

1.  **Implementación de Cache en Memoria:** Se utilizó un objeto `Map` de JavaScript para actuar como un simple caché en memoria.
2.  **Creación de Middleware de Cache:** Se desarrolló un middleware (`cacheMiddleware`) que se ejecuta antes del controlador de la ruta `/products`.
3.  **Lógica del Middleware:** El middleware comprueba si la respuesta para la URL solicitada ya existe en el caché. Si es un "HIT", devuelve los datos cacheados inmediatamente y añade una cabecera `X-Cache-Status: HIT`. Si es un "MISS", permite que el controlador original se ejecute, pero intercepta la respuesta para guardarla en el caché antes de enviarla al cliente, añadiendo una cabecera `X-Cache-Status: MISS`.

Esta solución reduce drásticamente la latencia en solicitudes subsecuentes y disminuye la carga sobre el servicio de productos.

## Comando Usado para Validar

```bash
npm test -- ejercicios/ejercicio-046/tests/cache.api.test.js
```

## Resultado final
```text
