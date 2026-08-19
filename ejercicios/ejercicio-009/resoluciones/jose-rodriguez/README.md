# Resolucion Ejercicio 009: hypercar

## Error encontrado
- Al ejecutar las pruebas unitarias, la funcion `calcularResultado` retornaba una cadena de texto concatenada (`"10155"`) en lugar de la suma numerica esperada (`30`).
- La funcion `ordenarRanking` retornaba la lista ordenada de menor a mayor puntaje (ascendente), cuando el test requeria un orden de mayor a menor (descendente).
- *Nota tecnica:* Se identifico una inconsistencia en la plantilla del respositorio, ya que el README general menciona "hypercar", pero los tests y el codigo base evaluan la logica de suma de puntos y ranking. Se priorizo hacer pasar el contrato definido por los test.

## Causa raiz 
1. `calcularResultado` utilizaba el metodo `.join('')` sobre los puntos, lo que cconvertia los numeros a texto y los concatenaba en lugar de sumar sus valores.
2. `ordenarRanking` utilizaba la resta `a.puntos - b.puntos` dentro del metodo `.sort()`, lo que genera un ordenamiento ascendente por defecto.

## Cambio aplicado 
- Se reemplazo `.join('')` por el metodo de orden superior `.reduce()` para asegurar que el arreglo se ordene de formar descendente (priorizado los mayore puntajes).

