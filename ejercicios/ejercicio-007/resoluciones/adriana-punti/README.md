# Ejercicio 007: Películas de miedo

## Cambios realizados

Se modificaron las funciones y los tests para que correspondan con el objetivo del ejercicio: **contar votos y resolver empates entre películas de miedo**.

### 1. Cambio de nombres de funciones

Se reemplazaron las funciones genéricas:

* `calcularResultado()`
* `ordenarRanking()`

por funciones relacionadas directamente con el caso:

* `contarVotos()`
* `obtenerGanadores()`

Esto hace que el código sea más claro y que los nombres representen lo que realmente hace cada función.

### 2. Cambio en `contarVotos()`

La nueva función recibe una lista de películas y cuenta cuántas veces aparece cada una.

Por ejemplo:

```js
[
  'Scream',
  'El Conjuro',
  'Scream'
]
```

produce:

```js
{
  Scream: 2,
  'El Conjuro': 1
}
```

### 3. Cambio en `obtenerGanadores()`

La función determina cuál o cuáles películas tienen la mayor cantidad de votos.

También contempla empates. Si varias películas tienen la misma cantidad máxima de votos, devuelve todas las películas empatadas.

### 4. Cambios en los tests

Los tests anteriores comprobaban suma de puntos y ordenamiento de jugadores, aunque el README establece que el objetivo es trabajar con votos y empates.

Por eso se reemplazaron por casos específicos del ejercicio:

* Contar correctamente los votos de cada película.
* Identificar una película ganadora.
* Identificar todas las películas cuando existe un empate.

### 5. Validación

El ejercicio debe validarse utilizando el comando indicado en el README:

```bash
npm test -- ejercicios/ejercicio-007/tests/horror-awards.test.js
```

El README establece que la solución debe pasar los casos esperados y que el cambio debe poder explicarse técnicamente.

## Resultado

El código y los tests ahora están alineados con la temática de **películas de miedo** y con el objetivo de **contar votos y manejar empates correctamente**.
