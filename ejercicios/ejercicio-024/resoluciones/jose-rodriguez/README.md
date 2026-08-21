# Resolución Ejercicio 024: Ciencia ficción

## Error encontrado
- El archivo base carecía de modelos para misiones de ciencia ficción y contenía funciones heredadas de promedio/máximo que no se ajustaban al requerimiento de clasificar misiones por riesgo.

## Causa raíz
- Ausencia de la estructura `MisionEspacial`, el tipo `NivelRiesgo` y algoritmos para evaluar criterios de amenaza y distancia.

## Cambio aplicado
- Se definió el tipo union `NivelRiesgo` y la interfaz `MisionEspacial`.
- Se creó `determinarRiesgoMision()` para calificar el peligro de una misión según variables de tripulación, distancia y amenaza.
- Se implementó `clasificarMisionesPorRiesgo()` para categorizar el listado en un objeto estructurado por nivel.

## Comando usado para validar
```bash
npm test -- ejercicios/ejercicio-024/resoluciones/jose-rodriguez/space-missions.test.ts