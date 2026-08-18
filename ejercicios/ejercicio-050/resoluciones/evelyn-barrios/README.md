# Solución Ejercicio 050: Depuración Integral CRUD

## Errores Encontrados

La API presentaba múltiples fallos a lo largo de todo el flujo CRUD (Crear, Leer, Actualizar, Borrar), demostrando una falta de adherencia a las convenciones de API REST y un manejo de errores deficiente.

1.  **CREATE (`POST /items`):** Devolvía un código de estado `200 OK` en lugar del `201 Created` que es el estándar para la creación exitosa de un recurso.
2.  **READ (`GET /items/:id`):** Si un item no se encontraba, devolvía un `200 OK` con un cuerpo de error, en lugar de un `404 Not Found`.
3.  **UPDATE (`PUT /items/:id`):** No manejaba el caso en que el item a actualizar no existiera (debía devolver 404). Además, la lógica de actualización era incorrecta, potencialmente reemplazando el objeto en lugar de fusionar los cambios.
4.  **DELETE (`DELETE /items/:id`):** No manejaba el caso de un item no existente (debía devolver 404). Para un borrado exitoso, devolvía un `200 OK` en lugar del estándar `204 No Content`, que indica éxito sin devolver cuerpo.

## Causa Raíz

La causa general era una implementación incompleta y un desconocimiento de las mejores prácticas de API REST. No se validaban los resultados de las búsquedas (`find`, `findIndex`) para manejar casos de error, y los códigos de estado HTTP se usaban de manera incorrecta, dificultando la comunicación con el cliente.

## Cambio Aplicado

Se realizó una refactorización completa de todos los endpoints:

- **CREATE:** Se cambió el código de estado a `201`.
- **READ (by ID):** Se añadió una comprobación para verificar si el item fue encontrado. Si no, se retorna un `404`.
- **UPDATE:** Se añadió una comprobación para retornar `404` si el `findIndex` devuelve `-1`. Se aseguró que la actualización fusione los datos (`{ ...old, ...new }`) en lugar de reemplazar.
- **DELETE:** Se añadió una comprobación para retornar `404` si el item no existe. Se cambió el código de estado de éxito a `204` y se eliminó el cuerpo de la respuesta con `.send()`.

## Comando Usado para Validar

```bash
npm test -- ejercicios/ejercicio-050/tests/final-api.api.test.js
```

## Resultado final
```text
PS C:\Users\Dell\campuslands-debugging-js-ts-node-Eve> npm test -- ejercicios/ejercicio-050/tests/final-api.api.test.js                                                                                 
                                                                                                    
> campuslands-debugging-js-ts-node@1.0.0 test
> vitest run ejercicios/ejercicio-050/tests/final-api.api.test.js


 RUN  v4.1.10 C:/Users/Dell/campuslands-debugging-js-ts-node-Eve

 ✓ ejercicios/ejercicio-050/tests/final-api.api.test.js (7 tests) 136ms
   ✓ ejercicio 050: Depuración Integral CRUD (7)
     ✓ POST /items - debe crear un nuevo item y devolverlo con status 201 74ms
     ✓ GET /items/:id - debe obtener el item recién creado 10ms
     ✓ GET /items/:id - debe devolver 404 para un item que no existe 8ms
     ✓ PUT /items/:id - debe actualizar un item existente 9ms
     ✓ PUT /items/:id - debe devolver 404 al intentar actualizar un item que no existe 9ms
     ✓ DELETE /items/:id - debe borrar un item existente y devolver 204 12ms
     ✓ DELETE /items/:id - debe devolver 404 al intentar borrar un item que ya no existe 9ms

 Test Files  1 passed (1)
      Tests  7 passed (7)
   Start at  14:20:22
   Duration  1.24s (transform 85ms, setup 0ms, import 666ms, tests 136ms, environment 0ms)

PS C:\Users\Dell\campuslands-debugging-js-ts-node-Eve> 
```