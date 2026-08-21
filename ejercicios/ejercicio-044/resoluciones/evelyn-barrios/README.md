# Solución Ejercicio 044: Validación con Zod

## Error Encontrado

El endpoint `POST /products` no realizaba ninguna validación sobre los datos recibidos en el `body` de la solicitud. Esto permitía crear productos con campos faltantes (ej. sin nombre), con tipos de datos incorrectos (ej. un precio como `string`), o con valores inválidos (ej. un precio negativo), comprometiendo la integridad de los datos.

## Causa Raíz

La causa del problema era la ausencia de un middleware o una capa de validación. El handler de la ruta tomaba directamente el `req.body` y lo procesaba sin verificar si cumplía con un esquema o contrato predefinido.

## Cambio Aplicado

1.  **Definición de Esquema:** Se utilizó la librería `zod` para definir un `productSchema` estricto que especifica los campos requeridos (`name`, `price`, `inStock`), sus tipos de datos y reglas adicionales (ej. `price` debe ser un número positivo).
2.  **Middleware de Validación:** Se creó un middleware `validateProduct` que utiliza `productSchema.parse(req.body)` dentro de un bloque `try...catch`.
3.  **Manejo de Errores:** Si `parse` falla, lanza un `ZodError`. El bloque `catch` intercepta este error y responde con un estado `400 Bad Request` y un cuerpo JSON que contiene un array con los detalles de los errores de validación, proporcionando feedback claro al cliente.
4.  **Aplicación del Middleware:** El middleware `validateProduct` se aplicó a la ruta `POST /products` para asegurar que la validación se ejecute antes de que el controlador principal procese la solicitud.

## Comando Usado para Validar

```bash
npm test -- ejercicios/ejercicio-044/tests/zod.api.test.js
```

## Resultado final
```text
PS C:\Users\Dell\campuslands-debugging-js-ts-node-Eve> npm test -- ejercicios/ejercicio-044/tests/zod.api.test.js

> campuslands-debugging-js-ts-node@1.0.0 test
> vitest run ejercicios/ejercicio-044/tests/zod.api.test.js


 RUN  v4.1.10 C:/Users/Dell/campuslands-debugging-js-ts-node-Eve

 ✓ ejercicios/ejercicio-044/tests/zod.api.test.js (4 tests) 90ms
   ✓ ejercicio 044: Validacion con Zod (4)
     ✓ debe crear un producto con datos validos (201 Created) 61ms
     ✓ debe rechazar un producto si falta el nombre (400 Bad Request) 10ms
     ✓ debe rechazar un producto si el precio es un string (400 Bad Request) 8ms
     ✓ debe rechazar un producto si el precio es negativo (400 Bad Request) 9ms

 Test Files  1 passed (1)
      Tests  4 passed (4)
   Start at  11:50:56
   Duration  908ms (transform 65ms, setup 0ms, import 444ms, tests 90ms, environment 0ms)

PS C:\Users\Dell\campuslands-debugging-js-ts-node-Eve> 
```