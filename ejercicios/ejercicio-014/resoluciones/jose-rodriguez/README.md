# Resolución Ejercicio 014: Tatuajes

## Error encontrado
- El código base intentaba concatenar puntos y realizar un ordenamiento básico sin validar las restricciones de duración ni choque de horarios entre sesiones[cite: 19, 20].

## Causa raíz
- Ausencia de funciones para sumar el tiempo total agendado y comparar los intervalos de tiempo (`horaInicio` + `duracionHoras`) para prevenir solapamientos.

## Cambio aplicado
- Se construyó `calcularTotalHoras()` para sumar la duración acumulada.
- Se implementó `validarAgendaTatuajes()` para verificar que la suma no exceda `maxHorasPorDia` y que la hora de término de cada cita no colisione con el inicio de la siguiente.

## Comando usado para validar
```bash
npm test -- ejercicios/ejercicio-014/resoluciones/jose-rodriguez/tattoo-agenda.test.js