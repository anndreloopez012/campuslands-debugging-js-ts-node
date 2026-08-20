# Resolución Ejercicio 005: Motos en taller

## Error encontrado
- El código base intentaba ejecutar concatenación de textos en lugar de la lógica de evaluación de kilometraje y mantenimiento técnico.

## Causa raíz
- Ausencia de funciones para la validación numérica de kilometrajes y filtrado por límite de mantenimiento.

## Cambio aplicado
- Se implementó `esKilometrajeValido()` para garantizar que los valores de lectura de kilometraje sean estrictamente números mayores o iguales a 0.
- Se creó `obtenerMantenimientosVencidos()` usando `.filter()` para retornar aquellas motos cuyo kilometraje actual superó o igualó el límite asignado para revisión técnica.

## Comando usado para validar
```bash
npm test -- ejercicios/ejercicio-005/resoluciones/jose-rodriguez/moto-service.test.js