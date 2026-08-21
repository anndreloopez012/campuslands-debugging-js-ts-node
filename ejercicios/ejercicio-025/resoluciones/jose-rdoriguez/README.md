# Resolución Ejercicio 025: Mecánica de motos

## Error encontrado
- El código base mantenía la estructura genérica (`calcularPromedio`, `obtenerMejor`) sin lógica ni modelos de TypeScript orientados al diagnóstico técnico de motocicletas.

## Causa raíz
- Ausencia del tipo `SintomaMoto`, la interfaz `DiagnosticoFalla` y de un motor de búsqueda por coincidencia de síntomas.

## Cambio aplicado
- Se definió el tipo `SintomaMoto` y la interfaz `DiagnosticoFalla`.
- Se creó `diagnosticarSintoma()` para correlacionar síntomas con fallas mecánicas y sus respectivas soluciones.
- Se implementó `obtenerDiagnosticoCompleto()` para evaluar listados múltiples de fallas reportadas.

## Comando usado para validar
```bash
npm test -- ejercicios/ejercicio-025/resoluciones/jose-rodriguez/moto-diagnostics.test.ts