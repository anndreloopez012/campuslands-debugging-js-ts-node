# Ejercicio 001 - Ranking gamer con parseo numérico

## Error encontrado

Se identificaron dos errores en `scoreboard.js`:

1. `calcularResultado()` concatenaba los puntos como texto en lugar de realizar una suma numérica.
2. `ordenarRanking()` organizaba el ranking de menor a mayor puntuación.

## Causa raíz

### 1. Suma de puntos

La implementación original utilizaba:

```js
datos.map(item => item.puntos).join('');
```

El método `join('')` convierte los valores en una cadena y los concatena.

Por ejemplo:

```text
100 + 50 + 25
```

terminaba produciendo:

```text
1005025
```

en lugar de:

```text
175
```

Además, los valores de `puntos` pueden recibirse como texto, por lo que deben convertirse explícitamente a números antes de realizar la operación.

### 2. Orden del ranking

La implementación original utilizaba:

```js
a.puntos - b.puntos
```

Este comparador ordena los valores de forma ascendente, colocando primero las puntuaciones más bajas.

Para un ranking gamer se requiere el orden descendente:

```js
b.puntos - a.puntos
```

De esta forma, las puntuaciones más altas aparecen primero.

## Cambio aplicado

Se reemplazó la implementación de `calcularResultado()` por `reduce()` y se realizó el parseo numérico mediante `Number()`:

```js
return datos.reduce((total, item) => {
  return total + Number(item.puntos);
}, 0);
```

También se corrigió el ordenamiento del ranking:

```js
return [...jugadores].sort((a, b) => b.puntos - a.puntos);
```

Se mantiene `[...jugadores]` para evitar modificar directamente el arreglo original.

## Validación

### Comando de prueba

```bash
npm test -- ejercicios/ejercicio-001/tests/scoreboard.test.js
```

### Resultado esperado

Los tests deben finalizar correctamente, confirmando que:

* Los puntos se suman como valores numéricos.
* Los valores numéricos representados como texto se procesan correctamente.
* El ranking se ordena de mayor a menor puntuación.
* El arreglo original de jugadores no es modificado.

## Estructura del ejercicio

```text
ejercicios/ejercicio-001/resoluciones/carlos-velasco/
├── scoreboard.js
└── README.md
```

## Autor

* **Hecho por:** Carlos Velasco
* **Ejercicio:** 001 - Ranking gamer con parseo numérico
* **Tecnología:** JavaScript
* **Tipo de corrección:** Bug fix
