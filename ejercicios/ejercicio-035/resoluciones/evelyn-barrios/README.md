# Solución Ejercicio 035: API de Items

## Error Encontrado

La API de items presentaba varios errores que impedían que las pruebas pasaran:

1.  **`GET /items/:id`**: No encontraba el item porque comparaba un `string` (`req.params.id`) con un `number` (`current.id`).
2.  **`GET /items/:id`**: Cuando no encontraba un item, devolvía un status `200 OK` en lugar de un `404 Not Found`.
3.  **`POST /items`**: Al crear un nuevo item, devolvía un status `200 OK` en lugar del correcto `201 Created`.

## Causa Raíz

1.  **Comparación de tipos**: JavaScript es de tipado débil, pero la comparación estricta (`===`) falla si los tipos no coinciden. `req.params.id` es siempre un string.
2.  **Status incorrecto en GET**: La lógica no manejaba el caso de "no encontrado" y devolvía el status por defecto (200) con un cuerpo de error.
3.  **Status incorrecto en POST**: La lógica no seguía la convención REST de devolver `201 Created` al crear un recurso exitosamente.

## Cambio Aplicado

1.  **`GET /items/:id`**: Se añadió `parseInt()` para convertir el `req.params.id` a número antes de la comparación.
2.  **`GET /items/:id`**: Se añadió una condición `if (!item)` para verificar si el item fue encontrado. Si no, se devuelve `res.status(404)`.
3.  **`POST /items`**: Se cambió `res.status(200)` por `res.status(201)` para cumplir con el estándar HTTP.

## Comando Usado para Validar

```bash
npm test -- ejercicios/ejercicio-035/tests/players.api.test.js
```

## Resultado Final

```text
camper@campus-H610M-K-V2:~/campuslands-debugging-js-ts-node-Eve-1$ npm test -- ejercicios/ejercicio-035/tests/players.api.test.js

> campuslands-debugging-js-ts-node@1.0.0 test
> vitest run ejercicios/ejercicio-035/tests/players.api.test.js


 RUN  v4.1.10 /home/camper/campuslands-debugging-js-ts-node-Eve-1

 ✓ ejercicios/ejercicio-035/tests/players.api.test.js (3 tests) 25ms
   ✓ ejercicio 035 (3)
     ✓ responde health correctamente 14ms
     ✓ busca item por id numerico y devuelve 404 si no existe 4ms
     ✓ crea item con status 201 6ms

 Test Files  1 passed (1)
      Tests  3 passed (3)
   Start at  09:50:27
   Duration  178ms (transform 16ms, setup 0ms, import 77ms, tests 25ms, environment 0ms)

camper@campus-H610M-K-V2:~/campuslands-debugging-js-ts-node-Eve-1$ 
```