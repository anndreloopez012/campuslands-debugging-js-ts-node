# Ejercicio 009 - Autos hiperdeportivos

## Error encontrado

Se identificaron dos errores en `hypercar.js`:

1. `calcularResultado()` concatenaba los valores de `puntos` como texto en lugar de realizar una suma numérica.
2. `ordenarRanking()` ordenaba los jugadores de menor a mayor puntuación, cuando los tests requieren un orden de mayor a menor.

## Causa raíz

### 1. Cálculo del resultado

La implementación original utilizaba:

```js
datos.map(item => item.puntos).join('');
````

`map()` obtiene los valores de `puntos`, pero `join('')` los convierte en una cadena de texto y los concatena.

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
npm test -- ejercicios/ejercicio-009/tests/hypercar.test.js
```

### Resultado final

La solución debe cumplir los dos casos definidos por los tests:

* La suma de `10 + 15 + 5` devuelve `30`.
* El ranking queda ordenado como `pro`, `elite`, `novato`.

Los tests deben finalizar correctamente sin modificar el archivo de pruebas.

## Estructura del ejercicio

```text
ejercicios/ejercicio-009/resoluciones/carlos-velasco/
├── hypercar.js
└── README.md
```

## Autor

* **Hecho por:** Carlos Velasco
* **Ejercicio:** 009 - Autos hiperdeportivos
* **Tecnología:** JavaScript
* **Tipo de corrección:** Bug fix

