# Documentación del razonamiento

## ¿Qué fallaba?
La función `calcularResultado` no sumaba los puntos numéricamente, sino que los concatenaba como si fueran texto. Por ejemplo, en lugar de `10 + 15 = 25`, el código original producía `'1015'`. Y la función `ordenarRanking` no garantizaba una comparación numérica correcta, lo que llevaría a un mal ordenamiento.

## ¿Cómo lo encontré?
Ejecuté `npm test -- ejercicios/ejercicio-001/tests/scoreboard.test.js` y la consola me arrojó lo siguiente:

- `calcula suma numerica y no concatena texto`
- **AssertionError:** expected '10155' to be 30 // Object.is equality

- `ordena ranking de mayor a menor puntaje`
- **AssertionError:** expected [ 'novato', 'elite', 'pro' ] to deeply equal [ 'pro', 'elite', 'novato' ]

## ¿Qué cambié? 
*   **En `calcularResultado`:** Reemplacé la `map` y `join` por el método `reduce`. Utilicé `parseInt(item.puntos, 10)` dentro del `reduce` para que cada punto se tratara como un número antes de sumarlo al total.
*   **En `ordenarRanking`:** Modifiqué la función de comparación del método `sort` para que usara `parseInt()` en los puntos de ambos jugadores (`a` y `b`). Esto para que la comparación sea numérica y el ordenamiento sea de mayor a menor.

## ¿Cómo lo validé?
Después de aplicar las correcciones en el archivo `resoluciones/codgo/scoreboard.js`, volví a ejecutar el mismo comando de prueba:
`npm test -- ejercicios/ejercicio-001/tests/scoreboard.test.js`