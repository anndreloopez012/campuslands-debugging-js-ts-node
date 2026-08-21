# README — Ejercicio 013: Viajes

## ¿Qué esperaba el test?

El test esperaba que la función agrupara los gastos por ciudad sin sobrescribir los valores anteriores.

Cuando existen varios gastos para la misma ciudad, sus montos deben sumarse.

Por ejemplo, si existen:

- Guatemala: 100
- Antigua: 50
- Guatemala: 75

el resultado esperado es:

- Guatemala: 175
- Antigua: 50

También se esperaba que:

- Varios gastos de una misma ciudad se acumulen correctamente.
- Los gastos de ciudades diferentes permanezcan separados.
- Un arreglo vacío produzca un objeto vacío.

## ¿Qué recibió realmente?

El problema estaba en la forma en que se agrupaban los gastos.

La implementación original no acumulaba correctamente los valores de una misma ciudad y podía sobrescribir el gasto anterior en lugar de sumarlo.

Por ejemplo, si Guatemala tenía:

- 100
- 75

el resultado debía ser:

    Guatemala: 175

y no conservar únicamente uno de los valores.

## ¿El error es de tipo, lógica, async, HTTP o estructura?

El error era de **lógica**.

No era un problema de programación asíncrona, HTTP ni de tipos.

La estructura de los datos permitía identificar correctamente la ciudad y el monto. El problema estaba en la lógica utilizada para agrupar y acumular los gastos.

## ¿El dato llega bien a la función?

Sí.

Los datos llegan correctamente a la función como un arreglo de objetos que contiene la ciudad y el monto del gasto.

Por ejemplo:

    {
      ciudad: 'Guatemala',
      monto: 100
    }

La información necesaria para realizar la agrupación está presente en la entrada.

## ¿El problema nace en la entrada, transformación o salida?

El problema nace en la **transformación**.

La entrada contiene correctamente los gastos, pero al procesarlos es necesario comprobar si la ciudad ya existe en el resultado.

Si la ciudad no existe, se crea con el monto correspondiente.

Si la ciudad ya existe, se suma el nuevo monto al valor anterior.

La lógica corregida es:

    export function agruparGastosPorCiudad(gastos) {
      return gastos.reduce((resultado, gasto) => {
        if (!resultado[gasto.ciudad]) {
          resultado[gasto.ciudad] = 0;
        }

        resultado[gasto.ciudad] += gasto.monto;

        return resultado;
      }, {});
    }

De esta manera, los gastos de una misma ciudad se acumulan y no se sobrescriben.

## Casos de prueba

Se utilizaron cuatro casos específicos:

1. Agrupar los gastos por ciudad sin sobrescribirlos.
2. Sumar correctamente varios gastos de la misma ciudad.
3. Mantener separados los gastos de ciudades diferentes.
4. Devolver un objeto vacío cuando no hay gastos.

## Resultado de los tests

Después de realizar la corrección, los cuatro tests pasaron correctamente:

    ✓ Ejercicio 013 - Viajes (4)
      ✓ agrupa los gastos por ciudad sin sobrescribirlos 6ms
      ✓ suma correctamente varios gastos de la misma ciudad 0ms
      ✓ mantiene separados los gastos de ciudades diferentes 6ms
      ✓ devuelve un objeto vacío cuando no hay gastos 0ms

## Resultado final

La función ahora agrupa correctamente los gastos por ciudad y suma los montos cuando existen varios gastos para la misma ciudad.

El problema estaba en la **transformación de los datos**: los datos de entrada llegaban correctamente, pero los valores de una misma ciudad podían ser sobrescritos en lugar de acumularse.

Los cuatro casos de prueba fueron validados correctamente.