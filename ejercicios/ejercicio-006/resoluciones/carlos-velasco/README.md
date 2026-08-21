# Ejercicio 006 - Playlist de entrenamiento

## Error encontrado

Se identificaron dos errores en `playlist.js`:

1. `calcularResultado()` concatenaba los valores de `puntos` como texto en lugar de realizar una suma numérica.
2. `ordenarRanking()` ordenaba los jugadores de menor a mayor puntuación, cuando los tests requieren un orden de mayor a menor.

## Causa raíz

### 1. Cálculo del resultado

La implementación original utilizaba:

```js id="9eblqq"
datos.map(item => item.puntos).join('');
```

`map()` obtiene los valores de `puntos`, pero `join('')` los convierte en texto y los concatena.

Con los valores del test:

```text id="4e2w0d"
10, 15, 5
```

el resultado incorrecto es:

```text id="0w4vgu"
10155
```

cuando el resultado esperado es:

```text id="c2p7v4"
30
```

La causa raíz es utilizar `join()` para combinar valores que deben participar en una operación matemática.

### 2. Ordenamiento del ranking

La implementación original utilizaba:

```js id="nwm8fy"
a.puntos - b.puntos
```

Este comparador ordena las puntuaciones de menor a mayor.

Los tests requieren que las puntuaciones más altas aparezcan primero, por lo que el comparador debe utilizar:

```js id="6o0z5p"
b.puntos - a.puntos
```

## Cambio aplicado

Se reemplazó `map().join()` por `reduce()` para realizar la suma numérica:

```js id="s3y89m"
return datos.reduce((total, item) => {
  return total + Number(item.puntos);
}, 0);
```

También se corrigió el ordenamiento:

```js id="7s4slk"
return [...jugadores].sort((a, b) => b.puntos - a.puntos);
```

Se mantiene `[...jugadores]` para trabajar sobre una copia del arreglo y evitar modificar directamente los datos originales.

## Validación

### Comando utilizado

```bash id="z7z5l3"
npm test -- ejercicios/ejercicio-006/tests/playlist.test.js
```

### Resultado final

La solución debe cumplir los dos casos definidos por los tests:

* La suma de `10 + 15 + 5` devuelve `30`.
* El ranking queda ordenado como `pro`, `elite`, `novato`.

Los tests deben finalizar correctamente sin modificar el archivo de pruebas.

## Estructura del ejercicio

```text id="8xgqpn"
ejercicios/ejercicio-006/resoluciones/carlos-velasco/
├── playlist.js
└── README.md
```

## Autor

* **Hecho por:** Carlos Velasco
* **Ejercicio:** 006 - Playlist de entrenamiento
* **Tecnología:** JavaScript
* **Tipo de corrección:** Bug fix
