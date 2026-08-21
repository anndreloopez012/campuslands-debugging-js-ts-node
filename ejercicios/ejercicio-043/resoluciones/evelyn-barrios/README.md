# Solución Ejercicio 043: Paginación

## Error Encontrado

La API no implementaba ninguna lógica de paginación. El endpoint `/items` ignoraba por completo los query parameters `page` y `limit`, devolviendo siempre el conjunto completo de datos. Además, la respuesta carecía de un objeto `metadata` que informara sobre el estado de la paginación (total de páginas, página actual, etc.).

## Causa Raíz

La causa era la ausencia total de código para manejar la paginación. El handler de la ruta `/items` no leía `req.query`, no calculaba el `offset` (desplazamiento) ni el `limit` (límite), y no utilizaba `Array.slice()` para devolver solo el subconjunto de datos solicitado. Tampoco se calculaban ni se incluían los metadatos en la respuesta.

## Cambio Aplicado

1.  **Parseo de Parámetros:** Se añadió lógica para leer y parsear `page` y `limit` desde `req.query`, asignando valores por defecto (`page=1`, `limit=10`) si no se proporcionan.
2.  **Cálculo de Paginación:** Se implementó el cálculo del `offset` basado en la página y el límite: `(page - 1) * limit`.
3.  **División de Datos:** Se usó `items.slice(offset, offset + limit)` para obtener únicamente el fragmento de datos correspondiente a la página solicitada.
4.  **Generación de Metadatos:** Se calcularon los metadatos clave (`totalItems`, `totalPages`, `currentPage`) y se incluyeron en un objeto `metadata` dentro de la respuesta JSON, siguiendo las mejores prácticas para APIs paginadas.

## Comando Usado para Validar

```bash
npm test -- ejercicios/ejercicio-043/tests/pagination.api.test.js

```

## Resultado final 
```text
PS C:\Users\Dell\campuslands-debugging-js-ts-node-Eve> npm test -- ejercicios/ejercicio-043/tests/pagination.api.test.js                                                                                
                                                                                                    
> campuslands-debugging-js-ts-node@1.0.0 test
> vitest run ejercicios/ejercicio-043/tests/pagination.api.test.js


 RUN  v4.1.10 C:/Users/Dell/campuslands-debugging-js-ts-node-Eve

 ✓ ejercicios/ejercicio-043/tests/pagination.api.test.js (4 tests) 82ms
   ✓ ejercicio 043: Paginación (4)
     ✓ debe devolver la primera página con 10 items por defecto 52ms
     ✓ debe devolver la segunda página con un límite de 5 items 11ms
     ✓ debe devolver un array de datos vacío si la página está fuera de rango 7ms
     ✓ debe manejar correctamente un límite personalizado de items por página 8ms

 Test Files  1 passed (1)
      Tests  4 passed (4)
   Start at  11:36:24
   Duration  988ms (transform 74ms, setup 0ms, import 544ms, tests 82ms, environment 0ms)

PS C:\Users\Dell\campuslands-debugging-js-ts-node-Eve> 
```