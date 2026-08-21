 # Solución Ejercicio 004: Torneo MOBA

## Error Encontrado

El archivo de pruebas (`moba-ranking.test.js`) estaba desactualizado y no validaba el objetivo real del ejercicio: ordenar un ranking por múltiples criterios. El bug hipotético en el código original sería una función de ordenamiento que solo considera un criterio (victorias) o que los ordena en la dirección incorrecta.

## Causa Raíz

La causa del problema es una lógica de ordenamiento incompleta. Para ordenar por un criterio secundario en caso de empate, la función de comparación del método `.sort()` debe manejar esa condición explícitamente.

## Cambio Aplicado

1.  **Corrección del Test**: Se actualizó `moba-ranking.test.js` para validar que la función `sortTeams` ordena correctamente los equipos, primero por victorias y luego por diferencia de puntos como desempate.
2.  **Implementación de la Función**: Se creó la función `sortTeams` que utiliza `.sort()` con una función de comparación. La expresión `b.victories - a.victories || b.difference - a.difference` resuelve ambos criterios de forma concisa: si el primer término es diferente de cero, se usa ese resultado; si es cero (empate), se evalúa y retorna el segundo término.

## Comando Usado para Validar

```bash
npm test -- ejercicios/ejercicio-004/tests/moba-ranking.test.js
```

## Resultado Final (Ejemplo)

```text
 PS C:\Users\barri\campuslands-debugging-js-ts-node-Eve> npm test -- ejercicios/ejercicio-004/tests/moba-ranking.test.js                                                        

> campuslands-debugging-js-ts-node@1.0.0 test
> vitest run ejercicios/ejercicio-004/tests/moba-ranking.test.js


 RUN  v4.1.10 C:/Users/barri/campuslands-debugging-js-ts-node-Eve

 ✓ ejercicios/ejercicio-004/tests/moba-ranking.test.js (3 tests) 3ms
   ✓ ejercicio 004: sortTeams (3)
     ✓ debe ordenar los equipos primero por victorias (desc) y luego por diferencia de puntos (desc) 2ms
     ✓ debe manejar un array vacío sin errores 0ms
     ✓ debe mantener el orden relativo si los equipos tienen los mismos stats 0ms

 Test Files  1 passed (1)
      Tests  3 passed (3)
   Start at  21:09:54
   Duration  203ms (transform 22ms, setup 0ms, import 38ms, tests 3ms, environment 0ms)

PS C:\Users\barri\campuslands-debugging-js-ts-node-Eve> 
```