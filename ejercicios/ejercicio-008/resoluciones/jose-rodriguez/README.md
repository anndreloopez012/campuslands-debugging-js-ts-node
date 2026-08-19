## Resolucion Ejercicio 008: futsal-table

## Error encontrado
- Al ejecutar las pruebas unitarias, la funcion `calcularResultado` retornaba una cadena de texto concatenada (`"10155"`) en lugar de la sua numerica esperada (`30`).
- La funcion `ordenerRanking`retornaba la lista ordenada de menor a mayor puntaje (ascendente), cuando el test requeria un orden de mayor a menor (descendente).
- *Nota Tecnica:* Se identifico una inconsistencia en la plantilla del repositorio, ya que el README general menciona "futsal-table", pero los tests y el codigo base evaluan la logica de suma de puntos y ranking. Se prioriozo hacer pasar el contrato definido por los tests.

## Causa raiz
1. `calcularResultado` utilizaba el metodo `join('')` sobre los puntos, lo que converia los numeros a texto y los concatenba en lugar de sumar sus valores.
2. `ordenarRanking` utilizaba la resta `a.puntos - b.puntos` dentro del metodo `.sort()`, lo que genera un ordenamiento ascendente por defecto.

## Cambio aplicado
- Se reemplazo `.join('')` por el metodo de orden superior `.reduce()` para acumular y retornar la suma numerica de la propiedad `puntos`.
- Se invirtio la resta dento de `.sort()` a `b.puntos - a.puntos` para asegurar que el arreglo se ordene de forma descendente (priorizando los mayores puntajes).