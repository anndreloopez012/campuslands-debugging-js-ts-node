# Resolución Ejercicio 013: Viajes

## Error encontrado
- El código base intentaba ejecutar concatenaciones de arreglos y ordenamiento predeterminado sin construir la estructura del diccionario de gastos por ubicación.

## Causa raíz
- Ausencia de un algoritmo de agrupación (`.reduce()`) que acumule valores numéricos en el mismo hash sin reescribir propiedades previas del objeto acumulador.

## Cambio aplicado
- Se implementó `agruparGastosPorCiudad()` utilizando `.reduce()`, verificando si la clave de la ciudad ya existe en el objeto para hacer la suma incremental (`acumulador[ciudad] = (acumulador[ciudad] || 0) + monto`).

## Comando usado para validar
```bash
npm test -- ejercicios/ejercicio-013/resoluciones/jose-rodriguez/travel-costs.test.js