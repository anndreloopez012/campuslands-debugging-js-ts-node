# Resolución — Ejercicio 020: Equipo de esports

## Código corregido

El archivo `esports-team.ts` tenía dos errores de lógica.

La función `calcularPromedio()` filtraba correctamente los registros activos, pero dividía el total entre la cantidad de registros originales.

La función `obtenerMejor()` ordenaba los registros de menor a mayor puntuación, por lo que devolvía el registro con menor puntaje.

La resolución aplicada fue:

    export type Registro = {
      nombre: string;
      puntos: number;
      activo?: boolean;
    };

    export function calcularPromedio(registros: Registro[]): number {
      const activos = registros.filter(
        (registro) => registro.activo !== false
      );

      if (activos.length === 0) {
        return 0;
      }

      const total = activos.reduce(
        (suma, registro) => suma + registro.puntos,
        0
      );

      return total / activos.length;
    }

    export function obtenerMejor(
      registros: Registro[]
    ): Registro | undefined {
      return [...registros].sort(
        (a, b) => b.puntos - a.puntos
      )[0];
    }

## ¿Qué esperaba el test?

El primer test esperaba que el promedio se calculara únicamente con los registros activos.

Los datos eran:

    alpha: 90 puntos, activo
    beta: 30 puntos, inactivo
    gamma: 70 puntos, activo

El registro `beta` no debía participar en el promedio.

Por lo tanto:

    (90 + 70) / 2 = 80

El segundo test esperaba que se obtuviera el registro con mayor puntuación.

Los datos eran:

    render-1: 40 puntos
    render-2: 96 puntos
    render-3: 80 puntos

Por lo tanto, el resultado esperado era `render-2`.

## ¿Qué recibía realmente?

En `calcularPromedio()`, el código original hacía:

    return total / registros.length;

Esto provocaba:

    (90 + 70) / 3 = 53.333333333333336

El test esperaba `80`, pero recibía `53.333333333333336`.

En `obtenerMejor()`, el código original utilizaba:

    sort((a, b) => a.puntos - b.puntos)

Esto ordenaba de menor a mayor y devolvía `render-1`, con 40 puntos.

El test esperaba `render-2`, con 96 puntos.

## ¿El error es de tipo, lógica, async, HTTP o estructura?

El error es de **lógica**.

No es un error de tipos, programación asíncrona, HTTP ni comunicación con una API.

Los datos y el tipo `Registro` eran correctos. El problema estaba en las operaciones realizadas con esos datos.

## ¿El dato llega bien a la función?

Sí.

Los datos llegan correctamente como un arreglo de objetos `Registro`.

La información necesaria para realizar ambas operaciones está presente:

    nombre
    puntos
    activo

Por lo tanto, el problema no estaba en la entrada.

## ¿El problema nace en la entrada, transformación o salida?

El problema nace en la **transformación**.

En `calcularPromedio()`, el filtro de registros activos funcionaba correctamente, pero el cálculo utilizaba una cantidad incorrecta como divisor.

Se corrigió utilizando:

    activos.length

En `obtenerMejor()`, el problema estaba en el criterio de ordenamiento.

Se cambió:

    a.puntos - b.puntos

por:

    b.puntos - a.puntos

para ordenar de mayor a menor.

## Cambios realizados

- Se mantuvo el tipo `Registro`.
- Se conservaron únicamente los registros activos para calcular el promedio.
- Se utilizó `activos.length` como divisor.
- Se agregó el caso para devolver `0` cuando no existen registros activos.
- Se modificó el ordenamiento para obtener el mayor puntaje.
- No se utilizó `any`.
- No fue necesario modificar el contrato de los tests.

## Resultado de los tests

    ✓ ejercicio 020 (2)
      ✓ calcula promedio solo con registros activos 1ms
      ✓ obtiene el registro con mayor puntaje 0ms

## Resultado final

Los dos tests pasaron correctamente.

La causa raíz de los errores estaba en la transformación de los datos:

- El promedio utilizaba todos los registros como divisor en lugar de únicamente los activos.
- El mejor registro se obtenía ordenando de menor a mayor en lugar de mayor a menor.

La solución corrige ambas operaciones manteniendo la estructura y los tipos existentes del ejercicio.