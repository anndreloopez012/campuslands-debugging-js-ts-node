# Ejercicio 004 - Torneo MOBA

## Error encontrado

Se identificaron dos errores en `moba-ranking.js`:

1. `calcularResultado()` concatenaba los valores de `puntos` como texto en lugar de realizar una suma numérica.
2. `ordenarRanking()` ordenaba los jugadores de menor a mayor puntuación, cuando el ranking evaluado por los tests requiere ordenar de mayor a menor.

## Causa raíz

### 1. Cálculo del resultado

La implementación original utilizaba:

```js
datos.map(item => item.puntos).join('');
```

`map()` obtiene los valores de `puntos`, pero `join('')` los convierte en texto y los concatena.

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

## Cambio aplicado

Se reemplazó `map().join()` por `reduce()` para realizar la suma numérica:

```js
return datos.reduce((total, item) => {
  return total + Number(item.puntos);
}, 0);
```

También se corrigió el ordenamiento:

```js
return [...jugadores].sort((a, b) => b.puntos - a.puntos);
```

Se mantiene `[...jugadores]` para trabajar sobre una copia del arreglo y evitar modificar directamente los datos originales.

## Validación

### Comando utilizado

```bash
npm test -- ejercicios/ejercicio-004/tests/moba-ranking.test.js
```

### Resultado final

La solución debe cumplir los dos casos definidos por los tests:

* La suma de `10 + 15 + 5` devuelve `30`.
* El ranking queda ordenado como `pro`, `elite`, `novato`.

Los tests deben finalizar correctamente sin modificar el archivo de pruebas.

## Estructura del ejercicio

```text
ejercicios/ejercicio-004/resoluciones/carlos-velasco/
├── moba-ranking.js
└── README.md
```

## Autor

* **Hecho por:** Carlos Velasco
* **Ejercicio:** 004 - Torneo MOBA
* **Tecnología:** JavaScript
* **Tipo de corrección:** Bug fix
