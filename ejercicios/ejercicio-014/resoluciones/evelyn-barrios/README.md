# Solución Ejercicio 014: Tatuajes

## Error Encontrado

El archivo de pruebas inicial estaba desactualizado. Tras corregirlo para que validara la lógica de la agenda, se identificó el bug en el código original: la función para verificar la disponibilidad no detectaba correctamente todos los casos de solapamiento de citas. Probablemente solo comprobaba si las horas de inicio eran idénticas, pero no consideraba los intervalos de tiempo completos.

## Causa Raíz

La causa del problema era una lógica de comparación de intervalos incorrecta. Para detectar un solapamiento entre dos intervalos de tiempo (A y B), la condición correcta es `(inicio_B < fin_A) Y (fin_B > inicio_A)`. El código original no implementaba esta lógica, permitiendo agendar citas en horarios ya ocupados.

## Cambio Aplicado

1.  **Corrección del Test**: Se actualizó `ejercicios/ejercicio-014/tests/tattoo-agenda.test.js` para incluir múltiples escenarios de solapamiento (parcial, total, envolvente) y casos donde no hay conflicto.
2.  **Implementación de la Función**: Se implementó la función `isAvailable` usando el método `.some()` para verificar si *alguna* de las citas existentes se solapa con la nueva. La condición `newAppointment.startTime < existing.endTime && newAppointment.endTime > existing.startTime` se utilizó para detectar cualquier tipo de conflicto. La función devuelve la negación del resultado de `.some()`, es decir, `true` solo si no se encontró ningún solapamiento.

## Comando Usado para Validar

```bash
npm test -- ejercicios/ejercicio-014/tests/tattoo-agenda.test.js
```

## Resultado Final (Ejemplo)

```text
 PS C:\Users\barri\campuslands-debugging-js-ts-node-Eve> New-Item -Path "ejercicios\ejercicio-014\resoluciones\evelyn-barrios\README.md" -ItemType File                           


    Directorio: 
    C:\Users\barri\campuslands-debugging-js-ts-node-Eve\ejercicios\ejercicio-014\resoluciones\evelyn-barrios


Mode                 LastWriteTime         Length Name                                                               
----                 -------------         ------ ----                                                               
-a----        16/08/2026     22:50              0 README.md                                                          


PS C:\Users\barri\campuslands-debugging-js-ts-node-Eve> npm test -- ejercicios/ejercicio-014/tests/tattoo-agenda.test.js                                                         

> campuslands-debugging-js-ts-node@1.0.0 test
> vitest run ejercicios/ejercicio-014/tests/tattoo-agenda.test.js


 RUN  v4.1.10 C:/Users/barri/campuslands-debugging-js-ts-node-Eve

 ✓ ejercicios/ejercicio-014/tests/tattoo-agenda.test.js (6 tests) 3ms
   ✓ ejercicio 014: isAvailable (6)
     ✓ debe devolver true si el horario está completamente libre 1ms
     ✓ debe devolver false si la nueva cita se solapa al inicio 0ms
     ✓ debe devolver false si la nueva cita se solapa al final 0ms
     ✓ debe devolver false si la nueva cita está contenida en otra 0ms
     ✓ debe devolver false si la nueva cita envuelve a otra existente 0ms
     ✓ debe devolver true si la agenda está vacía 0ms

 Test Files  1 passed (1)
      Tests  6 passed (6)
   Start at  00:09:30
   Duration  230ms (transform 62ms, setup 0ms, import 77ms, tests 3ms, environment 0ms)

PS C:\Users\barri\campuslands-debugging-js-ts-node-Eve> 
```