# Resolucion Ejercicio 010: food orders

## Error encontrado
- Al ejecutar las pruebas unitarias, la funcion `calcularResultado` retornabba una cadeda de texto concatenada (`"10155"`) en lugar de la suma numerica esperada (`30`).
- La funcion `ordenarRanking` retornaba la lista ordenada de menor a mayor puntaje (ascendente), cuando el test requeria un orden de mayor a menor (descendente).

## Causa Raiz 
1. `calcularResultado` utilizaba el metodoo `.join(')` sobre los puntos, lo que convertia los numeros a texto y los concatenaba en lugar de sumar sus valores.
2. `ordenarRanking` utilizaba la resta `a.puntos - b.puntos` dentro del metodo `.sort()`, lo que genera un ordenamiento ascendente por defecto.

## Cambio aplicado 
- Se reemplazo `join('')` por el metodo de orden superior `.reduce()` para acumular y retornar la suma numerica de la propiedad `puntos`.
- Se invirtio la resta dentro de `.sort()` a `b.puntos - a.puntos` para asegurar que el arreglo se ordene de forma descendente (priorizando los mayores puntajes).