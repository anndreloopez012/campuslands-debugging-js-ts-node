# Ejercicio 002 - Inventario RPG

## Error encontrado

Se identificaron dos errores en `inventory.js`:

1. `calcularResultado()` concatenaba los valores de `puntos` como texto en lugar de realizar una suma numérica.
2. `ordenarRanking()` organizaba los jugadores de menor a mayor puntuación, cuando el test requiere un ranking de mayor a menor.

## Causa raíz

### 1. Cálculo del resultado

La implementación original utilizaba:

```js
datos.map(item => item.puntos).join('');
```

`map()` obtiene los valores de `puntos`, pero `join('')` los convierte en una cadena y los concatena.

Por ejemplo:

```text
10 + 15 + 5
```

se convierte en:

```text
10155
```

en lugar de:

```text
30
```

La operación correcta es acumular los valores mediante `reduce()` y convertir cada puntuación a número con `Number()`.

### 2. Ordenamiento del ranking

La implementación original utilizaba:

```js
a.puntos - b.puntos
```

Este comparador ordena las puntuaciones de menor a mayor.

El test requiere que el jugador con mayor puntuación aparezca primero, por lo que debe utilizarse:

```js
b.puntos - a.puntos
```

Se mantiene una copia del arreglo mediante `[...jugadores]` para evitar modificar directamente los datos originales.

## Cambio aplicado

Se reemplazó `map().join()` por `reduce()` para realizar una suma numérica:

```js
return datos.reduce((total, item) => {
  return total + Number(item.puntos);
}, 0);
```

También se corrigió el comparador del ranking:

```js
return [...jugadores].sort((a, b) => b.puntos - a.puntos);
```

## Validación

### Comando utilizado

```bash
npm test -- ejercicios/ejercicio-002/tests/inventory.test.js
```

### Resultado esperado

Los dos tests deben finalizar correctamente:

* La suma de `10 + 15 + 5` debe producir `30`.
* El ranking debe quedar en el orden `pro`, `elite`, `novato`.

## Estructura del ejercicio

```text
ejercicios/ejercicio-002/resoluciones/carlos-velasco/
├── inventory.js
└── README.md
```

## Autor

* **Hecho por:** Carlos Velasco
* **Ejercicio:** 002 - Inventario RPG
* **Tecnología:** JavaScript
* **Tipo de corrección:** Bug fix
