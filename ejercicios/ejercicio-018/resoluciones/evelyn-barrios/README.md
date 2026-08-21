# Ejercicio 018: Formulas quimicas

# Solución Ejercicio 018: Fórmulas Químicas

## Error Encontrado

El archivo de pruebas inicial estaba desactualizado. Tras crear un test que validara el parseo de fórmulas, se identificó el bug hipotético en el código original: la función no manejaba correctamente los átomos sin un número explícito (como la 'O' en 'H2O') ni los átomos con nombres de dos letras (como 'Na' en 'NaCl').

## Causa Raíz

La causa del problema era una lógica de parseo demasiado simple, probablemente basada en una expresión regular que no consideraba todos los casos. No contemplaba que el número después de un átomo es opcional y que un nombre de átomo puede tener una o dos letras.

## Cambio Aplicado

1.  **Creación del Test**: Se creó un archivo `ejercicios/ejercicio-018/tests/formula-parser.test.js` para validar el parseo de fórmulas simples, complejas y con diferentes tipos de átomos.
2.  **Implementación de la Función**: Se implementó la función `parseFormula` utilizando un enfoque basado en una pila para manejar correctamente los paréntesis. Se usa una expresión regular para identificar los pares de átomo-cantidad (`([A-Z][a-z]?)(\d*)`). La lógica itera sobre la fórmula, acumulando los conteos en un objeto. Si no se encuentra un número, se asume que la cantidad es 1.

## Comando Usado para Validar

```bash
npm test -- ejercicios/ejercicio-018/tests/formula-parser.test.js
```

## Resultado Final (Ejemplo)

```text
 ✓ ejercicios/ejercicio-018/tests/formula-parser.test.js (5 tests)
   ✓ ejercicio 018: parseFormula (5)
     ✓ debe parsear una fórmula simple como H2O
     ✓ debe manejar átomos sin número explícito como NaCl
     ✓ debe manejar números de múltiples dígitos como en C6H12O6
     ✓ debe manejar una fórmula compleja con varios elementos
     ✓ debe manejar paréntesis anidados como en [Co(NH3)4(NO2)2]Cl

 Test Files  1 passed (1)
      Tests  5 passed (5)
```
