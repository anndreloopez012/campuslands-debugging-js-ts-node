# Ejercicio 011 - Battle royale

## Error encontrado

Se encontraron dos errores en la implementación de `battle-zone.js`.

### 1. Error en `calcularResultado`

La implementación original era:

```javascript
return datos.map(item => item.puntos).join('');
```

El método `map()` obtiene correctamente los puntos de cada jugador, pero `join('')` convierte los valores en una cadena de texto y los concatena.

Para los datos:

```javascript
[
  { nombre: 'ak47-master', puntos: 10 },
  { nombre: 'rpg-tank', puntos: 15 },
  { nombre: 'moto-racer', puntos: 5 }
]
```

el resultado original es:

```text
"10155"
```

Sin embargo, el test espera una suma numérica:

```text
30
```

### 2. Error en `ordenarRanking`

La implementación original era:

```javascript
return [...jugadores].sort((a, b) => a.puntos - b.puntos);
```

La comparación `a.puntos - b.puntos` ordena los jugadores de menor a mayor puntaje.

El contrato definido por el test requiere ordenar el ranking de mayor a menor puntaje.

Con los puntajes:

```text
7, 22, 18
```

la implementación original produce:

```text
7, 18, 22
```

pero el resultado esperado es:

```text
22, 18, 7
```

## Causa raíz

### `calcularResultado`

La causa raíz es el uso de `join('')` para realizar una operación que requiere una suma numérica.

`join()` está diseñado para unir elementos de un arreglo en una cadena de texto, no para realizar operaciones matemáticas.

Por este motivo, los valores numéricos terminan concatenándose como texto.

### `ordenarRanking`

La causa raíz está en el criterio de comparación utilizado por `sort()`.

La expresión:

```javascript
a.puntos - b.puntos
```

representa un orden ascendente.

Para obtener un orden descendente se debe utilizar:

```javascript
b.puntos - a.puntos
```

## Cambio aplicado

Se realizaron únicamente los cambios necesarios para cumplir el contrato definido por los tests.

### `calcularResultado`

Se reemplazó la concatenación de puntos por una suma mediante `reduce()`:

```javascript
return datos.reduce((total, item) => total + item.puntos, 0);
```

Esto permite acumular los puntos como valores numéricos.

Ejemplo:

```text
0 + 10 = 10
10 + 15 = 25
25 + 5 = 30
```

Resultado final:

```text
30
```

### `ordenarRanking`

Se cambió el criterio de ordenamiento:

```javascript
a.puntos - b.puntos
```

por:

```javascript
b.puntos - a.puntos
```

Esto permite priorizar los jugadores con mayor puntaje.

Además, se mantuvo:

```javascript
[...jugadores]
```

para conservar la copia del arreglo antes de ordenarlo y evitar modificar directamente los datos originales.

## Validación

### Comando utilizado

```bash
npm test -- ejercicios/ejercicio-011/tests/battle-zone.test.js
```

También puede ejecutarse directamente con Vitest:

```bash
npx vitest run ejercicios/ejercicio-011/tests/battle-zone.test.js
```

### Casos validados

#### Cálculo del resultado

Entrada:

```javascript
[
  { nombre: 'ak47-master', puntos: 10 },
  { nombre: 'rpg-tank', puntos: 15 },
  { nombre: 'moto-racer', puntos: 5 }
]
```

Resultado esperado:

```text
30
```

#### Ordenamiento del ranking

Entrada:

```javascript
[
  { nombre: 'novato', puntos: 7 },
  { nombre: 'pro', puntos: 22 },
  { nombre: 'elite', puntos: 18 }
]
```

Resultado esperado:

```javascript
['pro', 'elite', 'novato']
```

### Resultado esperado de los tests

Los dos casos del archivo `battle-zone.test.js` deben pasar:

```text
✓ calcula suma numerica y no concatena texto
✓ ordena ranking de mayor a menor puntaje

2 tests passed
```

La cantidad exacta de detalles mostrados por Vitest puede variar según la configuración del proyecto.

## Estructura del ejercicio

```text
ejercicios/ejercicio-011/resoluciones/carlos-velasco/
├── battle-zone.js
└── README.md
```

## Autor

- Hecho por: Carlos Velasco
- Ejercicio: 011 - Battle royale
- Tecnología: JavaScript
- Tipo de corrección: Bug fix

## Justificación técnica

La primera corrección utiliza `reduce()` porque el objetivo de `calcularResultado()` es obtener un único valor numérico a partir de los puntos de todos los jugadores.

```javascript
datos.reduce((total, item) => total + item.puntos, 0);
```

El segundo argumento `0` establece el valor inicial del acumulador.

Para el ranking se utiliza:

```javascript
jugadores.sort((a, b) => b.puntos - a.puntos);
```

Cuando la diferencia es positiva, `b` se coloca antes que `a`, produciendo un orden descendente por puntaje.

También se conserva la copia mediante:

```javascript
[...jugadores]
```

para no mutar el arreglo recibido por la función.

No se agregaron validaciones, funciones auxiliares ni lógica adicional porque los tests no requieren ese comportamiento.

## Conclusión

Se corrigieron los dos bugs presentes en `battle-zone.js`:

1. La suma de puntos ahora produce un número en lugar de concatenar los valores como texto.
2. El ranking ahora se ordena de mayor a menor puntaje.
