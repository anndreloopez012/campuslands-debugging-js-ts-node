# README — Ejercicio 025: Mecánica de motos

## Cambios realizados

Se corrigieron dos errores de lógica encontrados en `moto-diagnostics.ts`.

La estructura de los datos y los tests se mantuvieron sin cambios, siguiendo las instrucciones del README del ejercicio, que indican corregir el código sin modificar los tests. :contentReference[oaicite:0]{index=0}

### 1. Corrección de `calcularPromedio()`

La función ya filtraba correctamente los registros activos:

    const activos = registros.filter((registro) => registro.activo !== false);

También calculaba correctamente la suma de sus puntos.

El error estaba en que el resultado se dividía entre `registros.length`, es decir, entre todos los registros, incluyendo los que estaban inactivos. :contentReference[oaicite:1]{index=1}

Se corrigió para dividir entre `activos.length`.

Con los datos del test:

    alpha = 90 puntos, activo
    beta = 30 puntos, inactivo
    gamma = 70 puntos, activo

El cálculo correcto es:

    (90 + 70) / 2 = 80

### 2. Corrección de `obtenerMejor()`

La función original ordenaba los registros de menor a mayor:

    sort((a, b) => a.puntos - b.puntos)

Esto provocaba que se devolviera el registro con menor puntuación. :contentReference[oaicite:2]{index=2}

Se cambió el ordenamiento para que fuera de mayor a menor:

    sort((a, b) => b.puntos - a.puntos)

Con los datos del test:

    render-1 = 40 puntos
    render-2 = 96 puntos
    render-3 = 80 puntos

El registro con mayor puntuación es `render-2`.

## ¿Qué esperaba el test?

El test esperaba dos comportamientos específicos.

### Promedio de registros activos

Esperaba que `calcularPromedio()` ignorara los registros cuyo `activo` fuera `false`.

El test utiliza tres registros:

    alpha → 90 puntos → activo
    beta → 30 puntos → inactivo
    gamma → 70 puntos → activo

Por lo tanto, esperaba:

    (90 + 70) / 2 = 80

El test comprueba que el resultado sea exactamente `80`. :contentReference[oaicite:3]{index=3}

### Registro con mayor puntuación

Esperaba que `obtenerMejor()` devolviera el registro con la puntuación más alta.

Entre:

    render-1 → 40
    render-2 → 96
    render-3 → 80

el resultado esperado era:

    render-2

Esto está definido directamente en el test. :contentReference[oaicite:4]{index=4}

## ¿Qué recibió realmente?

Antes de la corrección, `calcularPromedio()` utilizaba:

    return total / registros.length;

Aunque la suma de los registros activos era `160`, se dividía entre los tres registros existentes:

    160 / 3 = 53.333333333333336

Por lo tanto:

    Esperado: 80
    Recibido: 53.333333333333336

En `obtenerMejor()`, el ordenamiento era ascendente:

    a.puntos - b.puntos

Por eso el primer elemento era:

    render-1 → 40 puntos

cuando el test esperaba:

    render-2 → 96 puntos

## ¿El error es de tipo, lógica, async, HTTP o estructura?

El error es de **lógica**.

El tipo `Registro` es válido y contiene los datos necesarios:

    nombre
    puntos
    activo

No hay evidencia en el código o en el test de un problema:

- De tipos.
- Asíncrono.
- HTTP.
- De comunicación con una API.

El problema estaba en las operaciones realizadas dentro de las funciones.

## ¿El dato llega bien a la función?

Sí.

Los datos llegan correctamente a las funciones.

`calcularPromedio()` recibe un arreglo de `Registro` con los valores necesarios para identificar cuáles registros están activos y cuáles son sus puntos.

`obtenerMejor()` recibe un arreglo de registros con sus respectivas puntuaciones.

El test proporciona correctamente los datos de entrada. :contentReference[oaicite:5]{index=5}

Por lo tanto, no fue necesario modificar la entrada.

## ¿El problema nace en la entrada, transformación o salida?

El problema nace en la **transformación**.

### Entrada

La entrada es correcta.

Los registros tienen la estructura esperada y contienen los valores necesarios.

### Transformación

Aquí se encontraba el problema.

En `calcularPromedio()`, la suma de los registros activos era correcta, pero el divisor utilizado era incorrecto.

En `obtenerMejor()`, los registros se transformaban mediante un ordenamiento ascendente cuando debía utilizarse un ordenamiento descendente.

### Salida

La salida era incorrecta como consecuencia de esas transformaciones.

Una vez corregidas las operaciones, las funciones producen los valores esperados por los tests.

## Comando utilizado para validar

De acuerdo con el README del ejercicio, el comando de validación es:

    npm test -- ejercicios/ejercicio-025/tests/moto-diagnostics.test.ts

El README también indica que la solución debe corregir el código sin modificar los tests. :contentReference[oaicite:6]{index=6} :contentReference[oaicite:7]{index=7}

## Resultado de los tests

Después de realizar las correcciones, los dos casos pasaron correctamente:

    ✓ calcula promedio solo con registros activos 1ms
    ✓ obtiene el registro con mayor puntaje 0ms

## Resultado final

La solución corrige los dos errores de lógica encontrados:

- `calcularPromedio()` ahora divide entre la cantidad de registros activos.
- `obtenerMejor()` ahora selecciona el registro con mayor puntuación.
- Los datos de entrada se mantienen sin cambios.
- Los tests se mantienen sin cambios.
- Ambos tests pasan correctamente.

La causa raíz estaba en la **transformación de los datos**, no en la entrada.