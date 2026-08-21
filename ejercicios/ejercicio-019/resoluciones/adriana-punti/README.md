# Análisis de errores

## ¿Qué esperaba el test?

El test esperaba dos resultados correctos:

* `calcularPromedio()` debía devolver `80`.
* `obtenerMejor()` debía devolver el registro `"render-2"`.

## ¿Qué recibió realmente?

Los tests recibieron:

* `53.333333333333336` en lugar de `80`.
* `"render-1"` en lugar de `"render-2"`.

## ¿Qué tipo de error es?

Los errores son de **lógica**.

No son errores de tipo, `async`, HTTP ni de estructura. Las funciones se ejecutaban correctamente, pero realizaban los cálculos y el ordenamiento de forma incorrecta.

## ¿El dato llega bien a la función?

Sí. Los datos llegan correctamente a las funciones.

El problema aparece después de recibirlos, al momento de procesarlos.

## ¿Dónde nace el problema?

El problema nace en la **transformación** de los datos.

### `calcularPromedio()`

Se filtraban correctamente los registros activos y se sumaban sus puntos, pero el total se dividía entre todos los registros:

```ts
return total / registros.length;
```

Se corrigió utilizando únicamente los registros activos:

```ts
return total / activos.length;
```

### `obtenerMejor()`

Los registros se ordenaban de menor a mayor puntuación, por lo que se obtenía el registro con menos puntos.

Se corrigió el ordenamiento para priorizar la puntuación más alta:

```ts
return [...registros].sort((a, b) => b.puntos - a.puntos)[0];
```

## Conclusión

Los datos de entrada eran correctos. Los errores estaban en la **transformación**, específicamente en el cálculo del promedio y en el criterio de ordenamiento del ranking.
