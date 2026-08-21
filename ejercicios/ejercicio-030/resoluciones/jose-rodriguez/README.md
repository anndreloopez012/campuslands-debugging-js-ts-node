# Resolución Ejercicio 030: MOBA builds

## Error encontrado
- El código base heredaba la plantilla con utilidades de arreglos numéricos (`calcularPromedio` y `obtenerMejor`) desalineadas con la validación de inventario y builds de objetos para videojuegos MOBA.

## Causa raíz
- Falta de modelos para definir `ObjetoMOBA` y ausencia de algoritmos de verificación para comprobar la unicidad de ítems, el límite de 6 ranuras y la colisión de pasivas únicas.

## Cambio aplicado
- Se definieron las interfaces `ObjetoMOBA` y `ResultadoValidacionBuild`.
- Se implementó `validarBuildMOBA()` aplicando verificaciones con `Set` para controlar la duplicidad de IDs de objetos únicos y pasivas exclusivas.
- Se agregaron validaciones de límite de ranuras de inventario (máximo 6) y suma total de costo en oro del equipamiento.

## Comando usado para validar
```bash
npm test -- ejercicios/ejercicio-030/resoluciones/jose-rodriguez/moba-build.test.ts