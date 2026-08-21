# Ejercicio 005 - Motos en taller

## Error encontrado

Se identificaron dos errores en `moto-service.js`:

1. `calcularResultado()` concatenaba los valores de `puntos` como texto en lugar de realizar una suma numérica.
2. `ordenarRanking()` ordenaba los jugadores de menor a mayor puntuación, cuando el test requiere un orden de mayor a menor.

## Causa raíz

### 1. Cálculo del resultado

La implementación original utilizaba:

```js id="7mjvpp"
datos.map(item => item.puntos).join('');
```

`map()` obtiene los valores de `puntos`, pero `join('')` los convierte en texto y los concatena.

Con los valores utilizados por el test:

```text id="qv8fj2"
10, 15, 5
```

el resultado incorrecto es:

```text id="f2ev1x"
10155
```

cuando el resultado esperado es:

```text id="s6cmy8"
30
```

La causa raíz es utilizar `join()` para combinar valores que deben participar en una operación matemática.

### 2. Ordenamiento del ranking

La implementación original utilizaba:

```js id="ojr7x8"
a.puntos - b.puntos
```

Este comparador ordena las puntuaciones de menor a mayor.

El test requiere que las puntuaciones más altas aparezcan primero, por lo que el comparador debe utilizar:

```js id="1o4x8b"
b.puntos - a.puntos
```

## Cambio aplicado

Se reemplazó `map().join()` por `reduce()` para realizar la suma numérica:

```js id="7d1o9a"
return datos.reduce((total, item) => {
  return total + Number(item.puntos);
}, 0);
```

También se corrigió el ordenamiento:

```js id="r2dtjo"
return [...jugadores].sort((a, b) => b.puntos - a.puntos);
```

Se mantiene `[...jugadores]` para trabajar sobre una copia del arreglo y evitar modificar directamente los datos originales.

## Validación

### Comando utilizado

```bash id="l0vv9x"
npm test -- ejercicios/ejercicio-005/tests/moto-service.test.js
```

### Resultado final

La solución debe cumplir los dos casos definidos por los tests:

* La suma de `10 + 15 + 5` devuelve `30`.
* El ranking queda ordenado como `pro`, `elite`, `novato`.

Los tests deben finalizar correctamente sin modificar el archivo de pruebas.

## Estructura del ejercicio

```text id="9fb1c3"
ejercicios/ejercicio-005/resoluciones/carlos-velasco/
├── moto-service.js
└── README.md
```

## Autor

* **Hecho por:** Carlos Velasco
* **Ejercicio:** 005 - Motos en taller
* **Tecnología:** JavaScript
* **Tipo de corrección:** Bug fix
