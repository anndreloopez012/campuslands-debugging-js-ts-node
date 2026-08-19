# Corrección de errores

## ¿Qué fallaba?

El proyecto tenía dos errores principales:

* `calcularResultado()` concatenaba los puntos como texto en lugar de sumarlos.
* `ordenarRanking()` ordenaba los jugadores de menor a mayor puntuación, cuando debía hacerlo de mayor a menor.

## ¿Cómo lo encontraste?

Ejecuté los tests con Vitest y revisé los mensajes de `AssertionError`.

Los tests indicaron que:

* Se esperaba `30`, pero la función devolvía `'10155'`.
* Se esperaba `['pro', 'elite', 'novato']`, pero se obtenía `['novato', 'elite', 'pro']`.

Esto permitió identificar que había un problema tanto en el cálculo como en el ordenamiento.

## ¿Qué cambiaste?

En `calcularResultado()` cambié la concatenación con `join('')` por `reduce()` para sumar los puntos:

```js
return datos.reduce((total, item) => total + item.puntos, 0);
```

En `ordenarRanking()` cambié el ordenamiento ascendente por uno descendente:

```js
return [...jugadores].sort((a, b) => b.puntos - a.puntos);
```

## ¿Cómo validaste?

Volví a ejecutar los tests con:

```bash
npm test
```

Los resultados esperados fueron comprobados mediante los `AssertionError` proporcionados por Vitest, verificando que el cálculo devolviera `30` y que el ranking quedara ordenado como:

```text
pro → elite → novato
```
