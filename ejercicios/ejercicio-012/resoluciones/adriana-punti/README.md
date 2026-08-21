# README — Ejercicio 012: Kickboxing

## Error encontrado

El objetivo del ejercicio es calcular el ganador de una pelea de kickboxing utilizando las tarjetas de los jueces.

Al ejecutar el test se encontró el siguiente error:

    AssertionError: expected '1' to be 'Alex' // Object.is equality

El test esperaba que la función devolviera `Alex`, pero la función devolvía `1`.

## ¿Qué esperaba el test?

El test esperaba que `calcularGanador()` identificara al peleador que obtuvo la mayoría de las tarjetas de los jueces.

Por ejemplo:

    [
      { juez: 1, ganador: 'Alex' },
      { juez: 2, ganador: 'Alex' },
      { juez: 3, ganador: 'Bruno' }
    ]

El resultado esperado es:

    Alex

porque Alex recibió dos de las tres tarjetas.

## ¿Qué recibió realmente?

La función devolvía:

    1

en lugar de:

    Alex

Esto ocurría porque se estaba utilizando la propiedad `juez` para determinar al ganador:

    const ganador = tarjeta.juez;

La propiedad `juez` contiene el identificador del juez (`1`, `2`, `3`), mientras que la propiedad `ganador` contiene el nombre del peleador seleccionado.

## ¿El error es de tipo, lógica, async, HTTP o estructura?

El error es de **lógica**.

No era un error de tipo, programación asíncrona, HTTP ni estructura de los datos.

La función se ejecutaba correctamente, pero utilizaba una propiedad incorrecta para realizar el cálculo.

## ¿El dato llega bien a la función?

Sí.

Los datos llegan correctamente a `calcularGanador()` como un arreglo de tarjetas.

Cada tarjeta tiene una estructura como:

    {
      juez: 1,
      ganador: 'Alex'
    }

Por lo tanto, la información necesaria para determinar al ganador está presente en la entrada.

## ¿El problema nace en la entrada, transformación o salida?

El problema nace en la **transformación**.

La entrada es correcta, pero la función estaba utilizando:

    const ganador = tarjeta.juez;

cuando debía utilizar:

    const ganador = tarjeta.ganador;

Al utilizar `tarjeta.juez`, el programa contaba los identificadores de los jueces en lugar de contar los votos de cada peleador.

## Cambio aplicado

La función fue corregida para contar cuántas tarjetas recibió cada peleador y devolver al que obtuvo la mayoría:

    export function calcularGanador(tarjetas) {
      const votos = {};

      tarjetas.forEach((tarjeta) => {
        const ganador = tarjeta.ganador;

        votos[ganador] = (votos[ganador] || 0) + 1;
      });

      return Object.entries(votos)
        .sort((a, b) => b[1] - a[1])[0][0];
    }

## Casos de prueba

Se utilizaron tres casos específicos del ejercicio:

1. Determinar el ganador por mayoría de tarjetas.
2. Determinar correctamente al ganador cuando recibe todas las tarjetas.
3. Determinar correctamente al ganador cuando dos jueces votan por el mismo peleador.

## Resultado de los tests

Después de realizar la corrección, los tres tests pasaron correctamente:

    ✓ determina al ganador por mayoría de tarjetas de los jueces 1ms
    ✓ determina correctamente al ganador cuando recibe todas las tarjetas 0ms
    ✓ determina correctamente al ganador cuando dos jueces votan por el mismo peleador 0ms

## Resultado final

La función ahora utiliza correctamente la propiedad `ganador` de cada tarjeta y determina al peleador ganador según la mayoría de votos de los jueces.

El problema estaba en la **transformación de los datos**. Los datos de entrada eran correctos y la salida era incorrecta como consecuencia de utilizar `tarjeta.juez` en lugar de `tarjeta.ganador`.