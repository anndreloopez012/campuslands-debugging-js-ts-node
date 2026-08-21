# Solución Ejercicio 037: API de Torneos (Items)

## Error Encontrado

La API de items presentaba varios errores que impedían que las pruebas pasaran, a pesar de que el nombre del ejercicio sugiere una API de torneos:

1.  **`GET /items/:id`**: No encontraba el item porque comparaba un `string` (`req.params.id`) con un `number` (`current.id`) usando el operador de igualdad estricta.
2.  **`GET /items/:id`**: Cuando no encontraba un item, devolvía un código de estado `200 OK` en lugar del esperado `404 Not Found`.
3.  **`POST /items`**: Al crear un nuevo item, devolvía un código de estado `200 OK` en lugar del correcto `201 Created`, que es el estándar para la creación de recursos.

## Causa Raíz

1.  **Comparación de tipos**: `req.params.id` es siempre un string en Express. La comparación estricta (`===`) con un `number` fallaba.
2.  **Status incorrecto en GET**: La lógica para el caso "no encontrado" estaba implementada, pero devolvía el código de estado incorrecto.
3.  **Status incorrecto en POST**: La lógica no seguía la convención REST de devolver `201 Created` al crear un recurso exitosamente.

## Cambio Aplicado

1.  **`GET /items/:id`**: Se añadió `parseInt()` para convertir el `req.params.id` a número antes de realizar la comparación, asegurando que la búsqueda funcione correctamente.
2.  **`GET /items/:id`**: Se cambió `res.status(200)` a `res.status(404)` en el bloque condicional que maneja los items no encontrados.
3.  **`POST /items`**: Se cambió `res.status(200)` a `res.status(201)` para cumplir con el estándar HTTP para la creación de recursos.

## Comando Usado para Validar

```bash
npm test -- ejercicios/ejercicio-037/tests/tournaments.api.test.js
```

## Resultado Final
```text
camper@campus-H610M-K-V2:~/campuslands-debugging-js-ts-node-Eve-1$ npm test -- ejercicios/ejercicio-037/tests/tournaments.api.test.js

> campuslands-debugging-js-ts-node@1.0.0 test
> vitest run ejercicios/ejercicio-037/tests/tournaments.api.test.js


 RUN  v4.1.10 /home/camper/campuslands-debugging-js-ts-node-Eve-1

 ✓ ejercicios/ejercicio-037/tests/tournaments.api.test.js (3 tests) 26ms
   ✓ ejercicio 037 (3)
     ✓ responde health correctamente 15ms
     ✓ busca item por id numerico y devuelve 404 si no existe 4ms
     ✓ crea item con status 201 6ms

 Test Files  1 passed (1)
      Tests  3 passed (3)
   Start at  10:05:01
   Duration  187ms (transform 18ms, setup 0ms, import 82ms, tests 26ms, environment 0ms)

camper@campus-H610M-K-V2:~/campuslands-debugging-js-ts-node-Eve-1$ 
```