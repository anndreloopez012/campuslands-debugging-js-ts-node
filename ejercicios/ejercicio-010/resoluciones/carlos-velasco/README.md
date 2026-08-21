# Ejercicio 010 - Pedidos de comida

## Error encontrado

Se identificaron dos errores en `food-orders.js`:

1. `calcularResultado()` concatenaba los valores de `puntos` como texto en lugar de realizar una suma numérica.
2. `ordenarRanking()` ordenaba los jugadores de menor a mayor puntuación, cuando los tests requieren un orden de mayor a menor.

> **Nota:** El README del ejercicio describe una funcionalidad relacionada con pedidos de comida y validación de estados antes de totalizar pedidos. Sin embargo, el código base y los tests proporcionados actualmente evalúan una suma numérica y el ordenamiento de un ranking mediante el campo `puntos`. La solución se realizó respetando el contrato definido por los tests existentes.

## Causa raíz

### 1. Cálculo del resultado

La implementación original utilizaba:

```js
datos.map(item => item.puntos).join('');
````

`map()` obtiene los valores de `puntos`, pero `join('')` convierte los valores en una cadena de texto y los concatena.

Con los valores utilizados por el test:

```text
10, 15, 5
```

el resultado incorrecto es:

```text
10155
```

cuando el resultado esperado es:

```text
30
```

La causa raíz es utilizar `join()` para combinar valores que deben participar en una operación matemática.

### 2. Ordenamiento del ranking

La implementación original utilizaba:

```js
a.puntos - b.puntos
```

Este comparador ordena las puntuaciones de menor a mayor.

El test requiere que las puntuaciones más altas aparezcan primero, por lo que el comparador debe utilizar:

```js
b.puntos - a.puntos
```

De esta manera, el ranking queda ordenado de mayor a menor puntuación.

## Cambio aplicado

Se reemplazó la concatenación realizada mediante `map().join()` por `reduce()` para realizar una suma numérica:

```js
return datos.reduce((total, item) => {
  return total + Number(item.puntos);
}, 0);
```

Se utiliza `Number()` para garantizar que los valores de `puntos` sean tratados como números durante la operación.

También se corrigió el ordenamiento del ranking:

```js
return [...jugadores].sort((a, b) => b.puntos - a.puntos);
```

Se mantiene `[...jugadores]` para trabajar sobre una copia del arreglo y evitar modificar directamente el arreglo original recibido como parámetro.

## Validación

### Comando utilizado

```bash
npm test -- ejercicios/ejercicio-010/tests/food-orders.test.js
```

También se puede utilizar:

```bash
npx vitest run ejercicios/ejercicio-010/tests/food-orders.test.js
```

### Casos validados

El primer test verifica que:

```text
10 + 15 + 5 = 30
```

El segundo test verifica que el ranking:

```text
novato: 7
pro: 22
elite: 18
```

quede ordenado como:

```text
pro
elite
novato
```

### Resultado final esperado

```text
✓ calcula suma numerica y no concatena texto
✓ ordena ranking de mayor a menor puntaje

Test Files  1 passed
Tests       2 passed
```

## Estructura del ejercicio

```text
ejercicios/ejercicio-010/resoluciones/carlos-velasco/
├── food-orders.js
└── README.md
```

## Autor

* **Hecho por:** Carlos Velasco
* **Ejercicio:** 010 - Pedidos de comida
* **Tecnología:** JavaScript
* **Tipo de corrección:** Bug fix

