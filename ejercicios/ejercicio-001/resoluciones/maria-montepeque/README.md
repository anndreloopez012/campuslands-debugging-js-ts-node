# Ejercicio 001: Ranking gamer con parseo numerico

## Error encontrado

1. `calcularResultado` devolvia `"10155"` (string concatenado) en vez de `30` (suma
   numerica).
2. `ordenarRanking` devolvia el ranking de menor a mayor puntaje en vez de mayor a menor.

## Causa raiz

1. La funcion usaba `datos.map(item => item.puntos).join('')`. `join('')` concatena los
   valores como texto sin separador, por lo que `10 + 15 + 5` se convertia en el string
   `"10155"` en lugar de sumarse numericamente.
2. El comparador del `sort` era `(a, b) => a.puntos - b.puntos`, que ordena de forma
   ascendente. El objetivo del ranking es mostrar primero a quien tiene mas puntos, es
   decir, orden descendente.

## Cambio aplicado

1. Se reemplazo `.map(...).join('')` por `.reduce((total, item) => total + item.puntos, 0)`
   para sumar los puntos como numeros.
2. Se invirtio el comparador a `(a, b) => b.puntos - a.puntos` para ordenar de mayor a
   menor puntaje. Se mantuvo el `[...jugadores]` para no mutar el arreglo original.

## Comando usado para validar

```bash
npm test -- ejercicios/ejercicio-001/tests/scoreboard.test.js
```

Como el test importa el archivo fijo de `codigo/`, tambien se valido copiando
temporalmente el test dentro de `tests/` apuntando a esta resolucion
(`../resoluciones/maria-montepeque/scoreboard.js`), ejecutando `vitest run` contra esa
copia y luego eliminandola (no se dejo ningun archivo extra fuera de esta carpeta).

## Resultado final

- `calcularResultado(...)` devuelve `30`.
- `ordenarRanking(...)` devuelve el orden `['pro', 'elite', 'novato']`.
- Ambos casos del test coinciden con lo esperado.
