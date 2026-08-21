# Ejercicio 017 - Pingpong

## Error encontrado

Se encontraron dos errores en la implementación de `pingpong.js`.

### Error 1: `calcularResultado()` concatenaba los puntos

La implementación original era:

```javascript
export function calcularResultado(datos) {
  // BUG intencional: la implementacion no respeta completamente el README ni los tests.
  return datos.map(item => item.puntos).join('');
}
```

La función obtenía los puntos mediante `map()`:

```javascript
datos.map(item => item.puntos)
```

Con los datos del test:

```javascript
[
  { nombre: 'ak47-master', puntos: 10 },
  { nombre: 'rpg-tank', puntos: 15 },
  { nombre: 'moto-racer', puntos: 5 }
]
```

El resultado de `map()` era:

```javascript
[10, 15, 5]
```

Posteriormente se utilizaba:

```javascript
.join('')
```

Esto concatenaba los valores como texto:

```text
10155
```

Por lo tanto, el resultado incorrecto era:

```javascript
'10155'
```

El test esperaba:

```javascript
30
```

La operación correcta es:

```text
10 + 15 + 5 = 30
```

### Error 2: `ordenarRanking()` ordenaba de menor a mayor

La implementación original era:

```javascript
export function ordenarRanking(jugadores) {
  // BUG intencional: orden ascendente cuando deberia priorizar mejores resultados.
  return [...jugadores].sort((a, b) => a.puntos - b.puntos);
}
```

El comparador:

```javascript
(a, b) => a.puntos - b.puntos
```

ordena los valores de menor a mayor.

Con los datos del test:

```javascript
[
  { nombre: 'novato', puntos: 7 },
  { nombre: 'pro', puntos: 22 },
  { nombre: 'elite', puntos: 18 }
]
```

El resultado incorrecto era:

```javascript
['novato', 'elite', 'pro']
```

El test espera un ranking de mayor a menor:

```javascript
['pro', 'elite', 'novato']
```

El orden correcto de los puntajes es:

```text
22 > 18 > 7
```

## Causa raíz

### Causa raíz de `calcularResultado()`

La causa raíz fue utilizar `map()` y `join()` cuando el contrato del test requiere una suma numérica.

`map()` transforma los elementos y devuelve un nuevo arreglo:

```javascript
datos.map(item => item.puntos)
```

produce:

```javascript
[10, 15, 5]
```

Sin embargo, `map()` no acumula los valores.

Después, `join('')` convierte los elementos en texto y los concatena:

```javascript
[10, 15, 5].join('')
```

produce:

```text
10155
```

Para obtener un único valor numérico se debe utilizar `reduce()`:

```javascript
datos.reduce((total, item) => total + item.puntos, 0)
```

El proceso es:

```text
0 + 10 = 10
10 + 15 = 25
25 + 5 = 30
```

Por lo tanto, el resultado final es:

```javascript
30
```

### Causa raíz de `ordenarRanking()`

La causa raíz fue utilizar un comparador ascendente:

```javascript
(a, b) => a.puntos - b.puntos
```

Este comparador coloca primero los puntajes menores.

Para obtener un ranking descendente se utiliza:

```javascript
(a, b) => b.puntos - a.puntos
```

Con los valores:

```text
7, 22, 18
```

el resultado es:

```text
22, 18, 7
```

que corresponde a:

```javascript
['pro', 'elite', 'novato']
```

También se mantiene:

```javascript
[...jugadores]
```

porque `sort()` modifica el arreglo sobre el cual trabaja. La copia evita mutar directamente el arreglo original.

## Cambio aplicado

### Corrección de `calcularResultado()`

Código original:

```javascript
export function calcularResultado(datos) {
  return datos.map(item => item.puntos).join('');
}
```

Código corregido:

```javascript
export function calcularResultado(datos) {
  return datos.reduce((total, item) => total + item.puntos, 0);
}
```

Se reemplazó la concatenación de valores por una acumulación numérica mediante `reduce()`.

### Corrección de `ordenarRanking()`

Código original:

```javascript
export function ordenarRanking(jugadores) {
  return [...jugadores].sort((a, b) => a.puntos - b.puntos);
}
```

Código corregido:

```javascript
export function ordenarRanking(jugadores) {
  return [...jugadores].sort((a, b) => b.puntos - a.puntos);
}
```

Se invirtió el comparador para ordenar los puntajes de mayor a menor.

No fue necesario agregar funciones, validaciones ni lógica adicional.

## Validación

El comando indicado por el README es:

```bash
npm test -- ejercicios/ejercicio-017/tests/pingpong.test.js
```

También puede utilizarse:

```bash
npx vitest run ejercicios/ejercicio-017/tests/pingpong.test.js
```

Los tests originales no fueron modificados.

## Casos validados

### Caso 1: cálculo de suma numérica

Entrada:

```javascript
[
  { nombre: 'ak47-master', puntos: 10 },
  { nombre: 'rpg-tank', puntos: 15 },
  { nombre: 'moto-racer', puntos: 5 }
]
```

Proceso:

```text
10 + 15 + 5 = 30
```

Resultado esperado:

```javascript
30
```

### Caso 2: ordenamiento del ranking

Entrada:

```javascript
[
  { nombre: 'novato', puntos: 7 },
  { nombre: 'pro', puntos: 22 },
  { nombre: 'elite', puntos: 18 }
]
```

Orden de puntajes:

```text
22 > 18 > 7
```

Resultado esperado:

```javascript
['pro', 'elite', 'novato']
```

## Resultado esperado de los tests

Los tests definidos en `pingpong.test.js` son:

```text
✓ calcula suma numerica y no concatena texto
✓ ordena ranking de mayor a menor puntaje

2 tests passed
```

El formato exacto de la salida puede variar según la versión y configuración de Vitest.

No se inventaron tests adicionales.

## Estructura del ejercicio

```text
ejercicios/ejercicio-017/resoluciones/carlos-velasco/
├── pingpong.js
└── README.md
```

## Autor

```text
- Hecho por: Carlos Velasco
- Ejercicio: 017 - Pingpong
- Tecnología: JavaScript
- Tipo de corrección: Bug fix
```

## Justificación técnica

`calcularResultado()` utiliza `reduce()` porque el contrato del test requiere convertir múltiples valores de `puntos` en un único resultado numérico.

```javascript
datos.reduce((total, item) => total + item.puntos, 0)
```

El acumulador comienza en `0` y suma cada puntuación.

No se utiliza `join()` porque `join()` realiza una conversión a cadena y concatenación de elementos, no una operación aritmética.

`ordenarRanking()` utiliza `sort()` con un comparador descendente:

```javascript
(a, b) => b.puntos - a.puntos
```

Esto coloca primero a los jugadores con mayor puntuación.

Se conserva:

```javascript
[...jugadores]
```

para evitar modificar el arreglo original mediante `sort()`.

También se mantienen las funciones y exportaciones existentes:

```javascript
calcularResultado
ordenarRanking
```

No se agregaron validaciones innecesarias ni funciones nuevas porque los tests no las requieren.

El README menciona un marcador de pingpong con reglas de ventaja, pero el contrato verificable del ejercicio está definido por los tests proporcionados. Estos comprueban específicamente la suma numérica y el ordenamiento descendente del ranking, por lo que la implementación se ajusta a esos comportamientos.

## Conclusión

Se encontraron dos bugs.

El primero estaba en `calcularResultado()`, donde `map()` y `join('')` producían una concatenación de texto:

```javascript
'10155'
```

en lugar de la suma numérica:

```javascript
30
```

Se corrigió utilizando `reduce()`.

El segundo estaba en `ordenarRanking()`, donde el comparador ordenaba de menor a mayor.

Se corrigió utilizando:

```javascript
(a, b) => b.puntos - a.puntos
```

para obtener el ranking de mayor a menor.

La solución conserva `[...jugadores]` para evitar mutaciones, mantiene las funciones existentes y no modifica los tests.

Resultado esperado:

```text
calcularResultado(...) → 30
ordenarRanking(...) → ['pro', 'elite', 'novato']
```

Los dos tests del ejercicio deben pasar correctamente.