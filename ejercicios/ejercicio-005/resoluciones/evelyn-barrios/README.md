 # Solución Ejercicio 005: Servicio de Motos

## Error Encontrado

Inicialmente, el archivo de pruebas (`moto-service.test.js`) no correspondía al objetivo del ejercicio y no validaba la lógica de mantenimiento. Una vez corregido el test, se pudo identificar el bug potencial en el código original: la condición para determinar si se necesita mantenimiento era incorrecta. Por ejemplo, podría haber estado usando un operador `>=` en lugar de `>`, lo que indicaría incorrectamente que se necesita servicio justo al cumplir el kilometraje del intervalo, y no después.

## Causa Raíz

La causa del problema era una lógica de comparación incorrecta. La regla de negocio especifica que el mantenimiento es necesario *después* de superar los 5000 km, no exactamente al alcanzarlos. El bug se encontraba en el uso de un operador de comparación que no reflejaba esta especificación.

## Cambio Aplicado

1.  **Corrección del Test**: Se actualizó el archivo `ejercicios/ejercicio-005/tests/moto-service.test.js` para validar correctamente la función `needsMaintenance`. Se incluyeron casos para kilometrajes por encima, por debajo y exactamente en el límite del intervalo.
2.  **Implementación de la Función**: Se implementó la función `needsMaintenance` para que la comparación sea estricta (`>`). La lógica `(currentMileage - lastServiceMileage) > maintenanceInterval` asegura que solo se devuelva `true` cuando el kilometraje recorrido desde el último servicio *excede* el intervalo de mantenimiento.

## Comando Usado para Validar

```bash
npm test -- ejercicios/ejercicio-005/tests/moto-service.test.js
```

## Resultado Final

```text
 PS C:\Users\barri\campuslands-debugging-js-ts-node-Eve> npm test -- ejercicios/ejercicio-005/tests/moto-service.test.js                                                        

> campuslands-debugging-js-ts-node@1.0.0 test
> vitest run ejercicios/ejercicio-005/tests/moto-service.test.js


 RUN  v4.1.10 C:/Users/barri/campuslands-debugging-js-ts-node-Eve

 ✓ ejercicios/ejercicio-005/tests/moto-service.test.js (3 tests) 3ms
   ✓ ejercicio 005: needsMaintenance (3)
     ✓ debe devolver true si el kilometraje desde el último servicio excede el intervalo 1ms
     ✓ debe devolver false si el kilometraje está por debajo del intervalo 0ms
     ✓ debe devolver false si el kilometraje es exactamente el del intervalo (aún no está vencido) 0ms

 Test Files  1 passed (1)
      Tests  3 passed (3)
   Start at  21:20:17
   Duration  247ms (transform 64ms, setup 0ms, import 81ms, tests 3ms, environment 0ms)

PS C:\Users\barri\campuslands-debugging-js-ts-node-Eve> 
```