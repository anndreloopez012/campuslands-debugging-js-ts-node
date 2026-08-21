# README — Ejercicio 024: Misiones espaciales

## Cambios realizados

Se adaptó el código base al objetivo del ejercicio: clasificar misiones espaciales según su nivel de riesgo y agruparlas por categoría.

Se realizaron los siguientes cambios:

- Se reemplazó el tipo `Registro` por el tipo `Mision`.
- Cada misión contiene:
  - `nombre`
  - `riesgo`
- Se creó la función `clasificarRiesgo()` para determinar el nivel de riesgo.
- Se definieron tres categorías:
  - `bajo`: riesgo menor a 50.
  - `medio`: riesgo entre 50 y 79.
  - `alto`: riesgo de 80 o más.
- Se creó la función `clasificarMisiones()` para agrupar las misiones según su nivel de riesgo.
- Se modificaron los tests para comprobar casos específicos de misiones espaciales.
- Se mantuvo el uso de tipos seguros de TypeScript.

## ¿Qué esperaba el test?

El test esperaba que una misión pudiera clasificarse correctamente según su nivel de riesgo.

Los límites establecidos fueron:

- Riesgo menor a 50 → `bajo`.
- Riesgo entre 50 y 79 → `medio`.
- Riesgo de 80 o más → `alto`.

También esperaba que varias misiones pudieran agruparse correctamente en un objeto según estas categorías.

Por ejemplo:

- Una misión con riesgo `30` debía clasificarse como `bajo`.
- Una misión con riesgo `65` debía clasificarse como `medio`.
- Una misión con riesgo `90` debía clasificarse como `alto`.

## ¿Qué recibió realmente?

El código base original no estaba diseñado para trabajar con misiones espaciales.

Utilizaba un tipo `Registro` con las propiedades:

- `nombre`
- `puntos`
- `activo`

Además, las funciones originales calculaban promedios y obtenían registros según sus puntos.

Por lo tanto, el código original no podía realizar directamente la clasificación de misiones por riesgo.

Se modificó la estructura para recibir objetos `Mision` con una propiedad `riesgo` y se implementó la lógica necesaria para clasificarlos.

## ¿El error es de tipo, lógica, async, HTTP o estructura?

El problema original era principalmente de **estructura y lógica**.

El código base utilizaba una estructura de datos y unas funciones que pertenecían a otro contexto.

No era un problema:

- De programación asíncrona.
- HTTP.
- Comunicación con una API.

También se necesitaba utilizar tipos específicos para representar correctamente una misión espacial.

## ¿El dato llega bien a la función?

Sí, después de adaptar el código al ejercicio, los datos llegan correctamente.

La función `clasificarRiesgo()` recibe una misión con la estructura:

    {
      nombre: 'Misión Marte',
      riesgo: 65
    }

La función puede utilizar directamente el valor de `riesgo` para determinar la categoría correspondiente.

`clasificarMisiones()` recibe un arreglo de misiones y procesa cada una utilizando la clasificación de riesgo.

## ¿El problema nace en la entrada, transformación o salida?

El problema original estaba principalmente en la **entrada y transformación**.

### Entrada

El código original esperaba objetos `Registro` con `puntos` y `activo`, mientras que el ejercicio requiere objetos `Mision` con `riesgo`.

Por eso fue necesario adaptar el modelo de datos.

### Transformación

Una vez corregida la estructura de entrada, se implementó la transformación necesaria para convertir el valor de riesgo en una categoría:

    riesgo < 50 → bajo
    riesgo >= 50 y < 80 → medio
    riesgo >= 80 → alto

Después, las misiones son agrupadas según la categoría obtenida.

### Salida

La salida corresponde a lo esperado por los tests:

- `clasificarRiesgo()` devuelve `bajo`, `medio` o `alto`.
- `clasificarMisiones()` devuelve un objeto con las misiones agrupadas por categoría.

## Resultado de los tests

Los cuatro casos de prueba pasaron correctamente:

    ✓ clasifica como bajo una misión con riesgo menor a 50 1ms
    ✓ clasifica como medio una misión con riesgo entre 50 y 79 0ms
    ✓ clasifica como alto una misión con riesgo de 80 o más 0ms
    ✓ agrupa correctamente las misiones según su nivel de riesgo 0ms

## Resultado final

El ejercicio quedó adaptado al contexto de misiones espaciales.

La solución ahora:

- Modela las misiones mediante el tipo `Mision`.
- Clasifica correctamente los niveles de riesgo.
- Agrupa varias misiones por categoría.
- Utiliza tipos seguros de TypeScript.
- Cumple con los casos específicos definidos en los tests.

Los cuatro tests finalizaron correctamente.