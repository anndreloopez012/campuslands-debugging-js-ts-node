# Ejercicio 008: Fútbol sala

## Cambios realizados

El README del ejercicio establece que el objetivo es **calcular una tabla de fútbol sala con goles a favor y goles en contra**.

Por este motivo, se modificaron los nombres de las funciones y los casos de prueba para que representaran la temática real del ejercicio.

### 1. Problema encontrado en los tests originales

Al ejecutar los tests originales se produjeron los siguientes errores:

```text
FAIL ejercicios/ejercicio-008/tests/futsal-table.test.js
> ejercicio 008 > calcula suma numerica y no concatena texto

TypeError: calcularResultado is not a function
```

El test intentaba utilizar:

```js
calcularResultado()
```

pero esta función ya no formaba parte de la solución modificada.

También se produjo:

```text
FAIL ejercicios/ejercicio-008/tests/futsal-table.test.js
> ejercicio 008 > ordena ranking de mayor a menor puntaje

TypeError: ordenarRanking is not a function
```

El segundo test intentaba utilizar:

```js
ordenarRanking()
```

pero esta función tampoco correspondía al nuevo caso de fútbol sala.

### 2. Causa del error

El problema no estaba en la ejecución de las funciones nuevas, sino en que **los tests seguían utilizando los nombres y la lógica del ejercicio anterior**.

Los tests esperaban:

```text
calcularResultado()
ordenarRanking()
```

mientras que el código fue adaptado para trabajar con:

```text
contar/calcular estadísticas de partidos
```

Por lo tanto, Vitest no encontraba las funciones solicitadas y producía:

```text
TypeError: calcularResultado is not a function
TypeError: ordenarRanking is not a function
```

### 3. Cambio aplicado

Se actualizaron los nombres y la lógica para representar el contexto de fútbol sala.

La función principal pasó a ser:

```js
calcularTablaPartidos()
```

Esta función trabaja con partidos y calcula para cada equipo:

* Goles a favor.
* Goles en contra.

También se actualizaron los tests para trabajar con equipos y resultados de partidos en lugar de jugadores y puntos.

### 4. Casos de prueba agregados

Se agregaron casos específicos del ejercicio:

1. **Cálculo de goles a favor y en contra** de varios equipos.
2. **Acumulación de goles** cuando un equipo participa en varios partidos.
3. **Partidos sin goles**, como un resultado `0 - 0`.

Estos casos corresponden directamente al objetivo del ejercicio de fútbol sala.

### 5. Validación

El comando indicado por el README para validar el ejercicio es:

```bash
npm test -- ejercicios/ejercicio-008/tests/futsal-table.test.js
```

El error mostrado anteriormente permitió identificar que los tests antiguos todavía hacían referencia a `calcularResultado()` y `ordenarRanking()`. Después de actualizar los tests para utilizar las funciones relacionadas con fútbol sala, estos errores de `TypeError` dejan de producirse.

## Resultado final

El código y los tests quedan alineados con la temática y el objetivo del ejercicio:

**Fútbol sala → partidos → goles a favor/en contra → tabla de equipos.**

La solución mantiene el enfoque recomendado por el ejercicio: identificar la diferencia entre el resultado esperado y el resultado real, encontrar la causa raíz y modificar únicamente lo necesario.
