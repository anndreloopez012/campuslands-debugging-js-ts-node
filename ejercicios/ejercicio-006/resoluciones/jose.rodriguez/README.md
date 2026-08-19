# Resolución Ejercicio 006: playlist

## Error encontrado
- Al ejecutar las pruebas unitarias, la función `calcularResultado` retornaba una cadena de texto concatenada (`"10155"`) en lugar de la suma numérica esperada (`30`)[cite: 4].
- La función `ordenarRanking` retornaba la lista ordenada de menor a mayor puntaje (ascendente), cuando el test requería un orden de mayor a menor (descendente)[cite: 4].
- *Nota técnica:* Se identificó una inconsistencia en la plantilla del repositorio, ya que el README general menciona "playlist", pero los tests y el código base evalúan la lógica de suma de puntos y ranking. Se priorizó hacer pasar el contrato definido por los tests.

## Causa raíz
1. `calcularResultado` utilizaba el método `.join('')` sobre los puntos, lo que convertía los números a texto y los concatenaba en lugar de sumar sus valores[cite: 4].
2. `ordenarRanking` utilizaba la resta `a.puntos - b.puntos` dentro del método `.sort()`, lo que genera un ordenamiento ascendente por defecto[cite: 4].

## Cambio aplicado
- Se reemplazó `.join('')` por el método de orden superior `.reduce()` para acumular y retornar la suma numérica de la propiedad `puntos`.
- Se invirtió la resta dentro de `.sort()` a `b.puntos - a.puntos` para asegurar que el arreglo se ordene de forma descendente (priorizando los mayores puntajes)[cite: 4].
