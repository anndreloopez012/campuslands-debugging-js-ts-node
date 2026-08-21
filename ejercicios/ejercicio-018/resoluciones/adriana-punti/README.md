# README — Ejercicio 018: Fórmulas químicas

## Cambios realizados

El código base fue adaptado al objetivo del ejercicio, que consiste en **parsear una fórmula química simple y contar sus átomos**.

Se reemplazaron las funciones genéricas del código base por funciones específicas para el problema:

- `calcularResultado()` fue reemplazada por `parsearFormula()`.
- `ordenarRanking()` fue reemplazada por `contarAtomos()`.
- Se agregó lógica para reconocer elementos químicos con una o dos letras.
- Se agregó lógica para interpretar los números que indican la cantidad de átomos.
- Cuando un elemento no tiene un número después de su símbolo, se considera que aparece una vez.
- Se agregó acumulación cuando un mismo elemento aparece más de una vez en la fórmula.
- Los tests fueron adaptados para comprobar casos específicos de fórmulas químicas.

## ¿Qué esperaba el test?

El test esperaba que el programa pudiera interpretar fórmulas químicas simples y devolver correctamente la cantidad de átomos de cada elemento.

Los casos esperados eran:

1. Parsear una fórmula simple como `H2O`.
2. Contar correctamente los átomos de una fórmula como `CO2`.
3. Considerar que un elemento sin número tiene una cantidad de `1`, como ocurre en `NaCl`.
4. Sumar correctamente las cantidades cuando un mismo elemento aparece varias veces.

Por ejemplo, para:

    H2O

se esperaba:

    {
      H: 2,
      O: 1
    }

y el total de átomos debía ser:

    3

## ¿Qué recibió realmente?

El código base no estaba preparado para trabajar con fórmulas químicas.

La implementación original utilizaba funciones relacionadas con puntos y rankings, por lo que no podía interpretar símbolos químicos ni sus cantidades.

Por este motivo, se adaptó la transformación para trabajar con fórmulas como:

    H2O
    CO2
    NaCl

y obtener tanto el conteo de cada elemento como el número total de átomos.

## ¿El error es de tipo, lógica, async, HTTP o estructura?

El problema era principalmente de **lógica y estructura respecto al objetivo del ejercicio**.

No era un problema de:

- Programación asíncrona.
- HTTP.
- Comunicación con una API.

La lógica original pertenecía a un caso diferente y no realizaba las operaciones necesarias para analizar una fórmula química.

## ¿El dato llega bien a la función?

Sí.

La fórmula llega correctamente a las funciones como una cadena de texto.

Por ejemplo:

    parsearFormula('H2O')

La función recibe la información necesaria para identificar los símbolos de los elementos y sus cantidades.

Por lo tanto, el problema no se encontraba en la entrada.

## ¿El problema nace en la entrada, transformación o salida?

El problema nace en la **transformación**.

La entrada llega correctamente como una fórmula química, pero debe ser procesada para identificar:

- El símbolo del elemento.
- La cantidad indicada después del símbolo.
- La cantidad `1` cuando no existe un número.
- Las apariciones repetidas de un mismo elemento.

La transformación implementada utiliza una expresión regular para identificar los componentes de la fórmula y posteriormente acumula las cantidades de cada elemento.

La función utilizada para realizar esta transformación es:

    export function parsearFormula(formula) {
      const atomos = {};

      const partes = formula.match(/[A-Z][a-z]?\d*/g) || [];

      partes.forEach((parte) => {
        const coincidencia = parte.match(/^([A-Z][a-z]?)(\d*)$/);

        const simbolo = coincidencia[1];
        const cantidad =
          coincidencia[2] === '' ? 1 : Number(coincidencia[2]);

        atomos[simbolo] = (atomos[simbolo] || 0) + cantidad;
      });

      return atomos;
    }

La función `contarAtomos()` utiliza el resultado anterior para calcular la cantidad total:

    export function contarAtomos(formula) {
      const atomos = parsearFormula(formula);

      return Object.values(atomos).reduce(
        (total, cantidad) => total + cantidad,
        0
      );
    }

## Casos de prueba

Se utilizaron cuatro casos específicos del ejercicio:

1. Parsear una fórmula simple y contar correctamente sus átomos.
2. Contar correctamente los átomos cuando un elemento aparece varias veces.
3. Considerar un átomo sin número como una sola unidad.
4. Sumar correctamente cantidades de un mismo elemento.

## Resultado de los tests

Después de realizar los cambios, los cuatro tests pasaron correctamente:

    ✓ Ejercicio 018 - Fórmulas químicas (4)
      ✓ parsea una fórmula simple y cuenta correctamente sus átomos 1ms
      ✓ cuenta correctamente los átomos cuando un elemento aparece varias veces 0ms
      ✓ considera un átomo sin número como una sola unidad 0ms
      ✓ suma correctamente cantidades de un mismo elemento 0ms

## Resultado final

La implementación ahora está adaptada al objetivo del ejercicio de fórmulas químicas.

La función `parsearFormula()` identifica los elementos y sus cantidades, mientras que `contarAtomos()` calcula el total de átomos de la fórmula.

Los cuatro casos de prueba fueron validados correctamente.

El problema estaba principalmente en la **transformación de los datos**, ya que la entrada llegaba como una cadena correctamente, pero el código base no contenía la lógica necesaria para convertir esa fórmula en un conteo de átomos.