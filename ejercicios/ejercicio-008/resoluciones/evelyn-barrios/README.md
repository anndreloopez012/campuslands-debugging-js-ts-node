 # Solución Ejercicio 008: Futbol Sala

## Error Encontrado

El archivo de pruebas inicial estaba desactualizado. Tras corregirlo, se pudo identificar el bug en el código original: la función no lograba agregar correctamente los datos de cada partido a una tabla de posiciones consolidada. Probablemente, en cada iteración, en lugar de acumular los resultados, los sobrescribía, o solo procesaba uno de los dos equipos del partido.

## Causa Raíz

La causa del problema era una estructura de datos y una lógica de acumulación inadecuadas. Para construir una tabla de posiciones, es necesario inicializar las estadísticas de todos los equipos y luego recorrer cada partido, actualizando los datos de *ambos* equipos involucrados en cada encuentro. El código original fallaba en este proceso de agregación.

## Cambio Aplicado

1.  **Corrección del Test**: Se actualizó `ejercicios/ejercicio-008/tests/futsal-table.test.js` para validar que la función `calculateFutsalTable` genera una tabla completa y correcta a partir de una lista de equipos y partidos.
2.  **Implementación de la Función**: Se implementó la función `calculateFutsalTable` utilizando un `Map` para un acceso y actualización eficiente de las estadísticas de cada equipo. La función itera sobre cada partido y actualiza los campos (P, W, D, L, GF, GA, Pts) para el equipo local y el visitante según el resultado. Finalmente, calcula la diferencia de goles (GD) y devuelve la tabla como un array de objetos.

## Comando Usado para Validar

```bash
npm test -- ejercicios/ejercicio-008/tests/futsal-table.test.js
```

## Resultado Final (Ejemplo)

```text
 PS C:\Users\barri\campuslands-debugging-js-ts-node-Eve> npm test -- ejercicios/ejercicio-008/tests/futsal-table.test.js                                                        

> campuslands-debugging-js-ts-node@1.0.0 test
> vitest run ejercicios/ejercicio-008/tests/futsal-table.test.js


 RUN  v4.1.10 C:/Users/barri/campuslands-debugging-js-ts-node-Eve

 ✓ ejercicios/ejercicio-008/tests/futsal-table.test.js (2 tests) 3ms
   ✓ ejercicio 008: calculateFutsalTable (2)
     ✓ debe calcular correctamente la tabla de posiciones 2ms
     ✓ debe devolver una tabla inicializada si no hay partidos 0ms

 Test Files  1 passed (1)
      Tests  2 passed (2)
   Start at  22:01:45
   Duration  157ms (transform 21ms, setup 0ms, import 32ms, tests 3ms, environment 0ms)

PS C:\Users\barri\campuslands-debugging-js-ts-node-Eve>                                                                
```