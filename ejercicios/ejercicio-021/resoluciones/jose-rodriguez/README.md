# Resolución Ejercicio 021: Arquitectura 3D

## Error encontrado
- El código base exportaba funciones genéricas de arreglo (`calcularPromedio`, `obtenerMejor`) sin tipado ni lógica relacionada con materiales o presupuestos[cite: 27, 28].

## Causa raíz
- Ausencia de interfaces de TypeScript (`Material3D`, `PresupuestoArquitectura`) y falta de cálculo ponderado de costo (`costoUnidad * cantidad`).

## Cambio aplicado
- Se definieron las interfaces tipadas para modelar materiales e ítems de un modelo 3D[cite: 28].
- Se creó la función `calcularCostoTotal()` que filtra materiales no incluidos y multiplica cantidad por costo unitario[cite: 28].
- Se implementó `validarPresupuesto()` para evaluar la diferencia frente al límite del proyecto[cite: 28].

## Comando usado para validar
```bash
npm test -- ejercicios/ejercicio-021/resoluciones/jose-rodriguez/architecture-budget.test.ts