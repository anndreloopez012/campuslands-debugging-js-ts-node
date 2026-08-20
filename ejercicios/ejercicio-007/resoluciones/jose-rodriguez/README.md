# Resolucion Ejercicio 007: horror Awards

## Error encontrado 
- Al ejecutar las pruebas unitarias, la funcion `calcularResultado` retornaba una cadena de testo concatenada (`"10155"`) en lugar de la suma numerica esperada (`30`).
- La funcion `orderRanking` retornaba la lista ordenada de menor a mayor puntaje (ascendente), cuando el test requeria un orden de mayor a menor (descendent).
- *Nota Tecnica:* Se identifico una inconsistencia en la plantilla del reositorio, ya que el README general menciona "horror Awards", pero los test y el codigo bbase evaluan la logica de suma de puntos y ranking. Se priorizo hacer pasar el contrato definido por los test.

## Causa raiz
1. `calcularResultado` utilizaba el metodo `.join('')` sobre los puntos, lo que convertia los numeros a texto y los contatenaba en luga de sumar sus valores.
2. `ordenarRanking` utilizaba la resta `a.puntos - b.puntos` dentro del metodo `.sort()`, lo que genera un ordenamiento ascendente por defecto.

## Cambio aplicado
- Se reemplazo `.join('')` por el metodo de orden superior `.reduce()` para acumular y retornar la suma numerica de la propiedad `puntos`.
- Se invirtio la resta dentro de `.sort()` a `b.puntos - a.puntos` para asegurar que el arreglo se ordene de forma descendente (priorizando los mayores puntajes).

