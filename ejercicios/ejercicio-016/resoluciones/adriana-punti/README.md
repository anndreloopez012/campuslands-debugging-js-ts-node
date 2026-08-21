# README — Ejercicio 016: Carreras

## ¿Qué esperaba el test?

El test esperaba que el ejercicio trabajara con tiempos de carreras y penalizaciones.

Los casos de prueba esperaban que:

- Se calculara correctamente el tiempo total de las vueltas.
- Las penalizaciones se sumaran al tiempo correspondiente.
- Una vuelta sin penalización se considerara con penalización `0`.
- Los corredores se ordenaran de menor a mayor tiempo total.

## ¿Qué recibió realmente?

El código base no estaba adaptado al problema de carreras.

La función original `calcularResultado()` recibía datos con una propiedad `puntos` y utilizaba:

    datos.map(item => item.puntos).join('');

Esto convertía los números en texto y los concatenaba.

Por ejemplo:

    [10, 15, 5]

terminaba produciendo:

    '10155'

en lugar de una suma numérica.

Además, `ordenarRanking()` ordenaba jugadores utilizando la propiedad `puntos`, mientras que el ejercicio debía trabajar con los tiempos de los corredores.

Por esta razón, fue necesario adaptar las funciones al caso específico de carreras.

## ¿El error es de tipo, lógica, async, HTTP o estructura?

El error es principalmente de **lógica** y de **estructura del código respecto al dominio del ejercicio**.

No es un error `async` ni HTTP.

La lógica original realizaba una concatenación de valores en lugar de una suma numérica y utilizaba propiedades que pertenecían al ejercicio base (`puntos`) en lugar de las propiedades necesarias para trabajar con tiempos y penalizaciones.

## ¿El dato llega bien a la función?

Sí.

Los datos llegan correctamente como arreglos de objetos.

Para calcular el tiempo total, cada vuelta contiene información como:

    {
      tiempo: 60,
      penalizacion: 5
    }

Para ordenar el ranking, cada corredor contiene información como:

    {
      nombre: 'Ana',
      tiempoTotal: 165
    }

Por lo tanto, el problema no está en que los datos no lleguen a las funciones.

## ¿El problema nace en la entrada, transformación o salida?

El problema nace principalmente en la **transformación**.

La entrada contiene los datos necesarios, pero la implementación original los procesaba incorrectamente.

La función original:

    return datos.map(item => item.puntos).join('');

transformaba los números en una cadena mediante `join('')`.

La solución utiliza `reduce()` para realizar una suma numérica y agregar las penalizaciones:

    export function calcularTiempoTotal(vueltas) {
      return vueltas.reduce((total, vuelta) => {
        return total + vuelta.tiempo + (vuelta.penalizacion || 0);
      }, 0);
    }

Para el ranking se utiliza el tiempo total del corredor:

    export function ordenarRanking(corredores) {
      return [...corredores].sort((a, b) => a.tiempoTotal - b.tiempoTotal);
    }

## Cambios realizados

Se reemplazó la función genérica:

    calcularResultado()

por una función específica para el ejercicio:

    calcularTiempoTotal()

Esta función suma los tiempos de las vueltas y agrega las penalizaciones correspondientes.

También se adaptó `ordenarRanking()` para trabajar con corredores y ordenarlos según su `tiempoTotal`.

Además, el test se modificó para utilizar casos específicos del ejercicio de carreras:

- Tiempo total con penalizaciones.
- Tiempo total sin penalizaciones.
- Penalización no especificada.
- Ranking ordenado por menor tiempo total.

## Resultado de los tests

Después de realizar los cambios, los tests utilizados para validar la solución fueron:

    ✓ Ejercicio 016 - Carreras (4)
      ✓ calcula el tiempo total sumando las penalizaciones
      ✓ calcula correctamente el tiempo cuando no existen penalizaciones
      ✓ aplica una penalización de cero cuando no se especifica
      ✓ ordena los corredores por menor tiempo total

## Resultado final

El código ahora está adaptado al problema de carreras.

La función `calcularTiempoTotal()` suma correctamente los tiempos y las penalizaciones, mientras que `ordenarRanking()` organiza a los corredores de menor a mayor tiempo total.

El problema principal estaba en la **transformación de los datos**, ya que el código base concatenaba valores como texto y utilizaba propiedades (`puntos`) que no correspondían al caso específico de carreras.