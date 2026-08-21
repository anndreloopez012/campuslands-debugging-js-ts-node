# Resolución Ejercicio 018: Fórmulas químicas

## Error encontrado
- El código base intentaba ejecutar concatenaciones y ordenamientos genéricos de arreglos que no procesaban la estructura léxica de una fórmula química[cite: 25, 26].

## Causa raíz
- Ausencia de un parser/expresión regular para tokens químicos que identifique los símbolos de los elementos (`[A-Z][a-z]*`) y los subíndices numéricos asociados (`\d*`).

## Cambio aplicado
- Se creó la función `contarAtomos()` utilizando la expresión regular `/([A-Z][a-z]*)(\d*)/g` para iterar sobre la fórmula, asignando `1` a los elementos sin número explícito y acumulando la suma en caso de repetición[cite: 25].

## Comando usado para validar
```bash
npm test -- ejercicios/ejercicio-018/resoluciones/jose-rodriguez/formula-parser.test.js