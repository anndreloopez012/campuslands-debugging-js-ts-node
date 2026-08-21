# README — Ejercicio 021

## Cambios realizados

Se corrigieron los errores de lógica presentes en las funciones del ejercicio.

### `calcularPromedio()`

La función debía calcular el promedio únicamente utilizando los registros activos.

El problema estaba en que, aunque primero se filtraban correctamente los registros activos, el total se dividía entre la cantidad de registros originales.

La corrección consiste en dividir entre la cantidad de registros activos.

Con los datos del test:

- `alpha`: 90 puntos, activo.
- `beta`: 30 puntos, inactivo.
- `gamma`: 70 puntos, activo.

El cálculo correcto es:

    (90 + 70) / 2 = 80

### `obtenerMejor()`

La función debía devolver el registro con mayor puntaje.

El problema estaba en que los registros se ordenaban de menor a mayor, por lo que se obtenía el registro con menor puntuación.

La corrección consiste en ordenar de mayor a menor.

Con los datos del test:

- `render-1`: 40 puntos.
- `render-2`: 96 puntos.
- `render-3`: 80 puntos.

El resultado correcto es `render-2`.

## ¿Qué esperaba el test?

El test esperaba dos comportamientos:

1. Que `calcularPromedio()` ignorara los registros inactivos y calculara el promedio únicamente con los activos.
2. Que `obtenerMejor()` devolviera el registro que tuviera la mayor cantidad de puntos.

## ¿Qué recibió realmente?

En la implementación original, el promedio se calculaba utilizando la cantidad total de registros como divisor.

Por lo tanto, para los valores del test se obtenía:

    (90 + 70) / 3 = 53.333333333333336

cuando el resultado esperado era:

    80

En `obtenerMejor()`, el ordenamiento era ascendente, por lo que el primer registro era `render-1`, con 40 puntos, en lugar de `render-2`, con 96 puntos.

## ¿El error es de tipo, lógica, async, HTTP o estructura?

El error es de **lógica**.

No corresponde a un error de:

- Tipo.
- Programación asíncrona.
- HTTP.
- Estructura de entrada.

Las funciones recibían datos válidos, pero los procesaban de manera incorrecta.

## ¿El dato llega bien a la función?

Sí.

Los datos llegan correctamente a las funciones como un arreglo de registros.

Cada registro contiene las propiedades necesarias:

- `nombre`
- `puntos`
- `activo` cuando corresponde.

Por lo tanto, no fue necesario modificar la entrada de datos.

## ¿El problema nace en la entrada, transformación o salida?

El problema nace en la **transformación**.

En `calcularPromedio()`, los registros activos se identificaban correctamente, pero el promedio utilizaba un divisor incorrecto.

En `obtenerMejor()`, los datos llegaban correctamente, pero el criterio de ordenamiento era contrario al resultado esperado.

No se identificó un problema en la entrada ni en la salida.

## Resultado de los tests

Los dos casos de prueba pasaron correctamente:

    ✓ calcula promedio solo con registros activos 1ms
    ✓ obtiene el registro con mayor puntaje 0ms

## Resultado final

Las funciones fueron corregidas para cumplir con el comportamiento esperado:

- El promedio utiliza únicamente registros activos.
- El promedio se divide entre la cantidad de registros activos.
- El mejor registro es el que tiene mayor puntuación.
- Los datos de entrada se mantienen sin cambios.
- Los tests pasan correctamente.

La causa raíz de los errores estaba en la **lógica de transformación de los datos**.