## Error Encontrado
* La funcion `calcularResultado` retornaba una cadena concatenada (por ejemplo `"10155"`) en lugar de realizar una nsuma numerica (`30`).
* La cuncion `ordenarRanking` devolvia los jugadores en orden ascendente (de menor a mayor puntaje), colocando al jugador con menos puntos arriba del ranking.

## Causa raiz
* En `calcularResultado`, los puntos venian como tipo `string` en algunos casos y se estaba utilizando `.join('')`, lo que obliga a JavaScript a concatenar los valores en lugar de sumarlos.
* En `ordenarRanking`, la funcion comparadora de `.sort()` ejecutaba `a.puntos - b.puntos`, lo que ordena los elementos de menor a mayor.

## Cambio aplicado 
* En `calcularResultado`: Se elimino el `.join('')` y se implemento un acumulador `total` junto a un `.forEach()`, utilizando `parseInt(item.puntos, 10)` para estandarizar los puntos a numero antes de sumar.
* En `ordenarRanking`: Se cambio la resta en `.sort()` a `parseInt(b.puntos, 10) - parseInt(a.puntos, 10)` para forzar la conversión numérica y ordenar de mayor a menor (descendente).