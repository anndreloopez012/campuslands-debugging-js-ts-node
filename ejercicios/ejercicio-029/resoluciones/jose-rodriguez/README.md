# Resolución Ejercicio 029: Shooter táctico

## Error encontrado
- El código base heredaba la plantilla genérica de registros (`calcularPromedio` y `obtenerMejor`) sin tipos ni motor para calcular reglas de combate o físicas de armas.

## Causa raíz
- Falta de abstracciones e interfaces para representar un `Disparo` y un `Objetivo`, así como de la lógica para calcular la atenuación de daño por distancia (falloff) y mitigación por armadura.

## Cambio aplicado
- Se construyeron las interfaces de TypeScript `Disparo`, `Objetivo` y `ResultadoImpacto`.
- Se implementó `calcularDanoPorDistancia()` para aplicar la reducción porcentual de daño según los metros de distancia.
- Se creó `resolverImpacto()` que calcula multiplicadores de impacto crítico (headshot) y la mitigación de daño proporcionada por la armadura del objetivo.

## Comando usado para validar
```bash
npm test -- ejercicios/ejercicio-029/resoluciones/jose-rodriguez/damage-engine.test.ts