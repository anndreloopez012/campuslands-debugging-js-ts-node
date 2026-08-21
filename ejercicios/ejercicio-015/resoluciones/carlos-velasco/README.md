# Ejercicio 015 - Dibujo digital

## Error encontrado

Se encontraron dos errores en la implementación de `layers.js`.

Existe una diferencia entre el objetivo descrito en el README base y el contrato real definido por los archivos JavaScript y de pruebas.

El README indica como objetivo:

> Normalizar capas visibles en un archivo.

Sin embargo, el archivo `layers.js` y el test `layers.test.js` utilizan las funciones `calcularResultado()` y `ordenarRanking()`, trabajando con propiedades `puntos` y `nombre`.

Por esta razón, la corrección se realizó tomando como referencia el comportamiento real exigido por los tests.

### 1. Error en `calcularResultado`

La implementación original era:

```js
export function calcularResultado(datos) {
  // BUG intencional: la implementacion no respeta completamente el README ni los tests.
  return datos.map(item => item.puntos).join('');
}
```

El problema está en el uso de `join('')`.

Primero, `map()` extrae correctamente los puntos:

```js
datos.map(item => item.puntos)
```

Con los datos del test:

```js
[
  { nombre: 'ak47-master', puntos: 10 },
  { nombre: 'rpg-tank', puntos: 15 },
  { nombre: 'moto-racer', puntos: 5 }
]
```

el resultado intermedio es:

```js
[10, 15, 5]
```

Sin embargo, posteriormente se utiliza:

```js
.join('')
```

Esto concatena los valores como texto y produce:

```text
"10155"
```

El test espera:

```text
30
```

Por lo tanto, la función no está realizando una suma numérica.

### 2. Error en `ordenarRanking`

La implementación original era:

```js
export function ordenarRanking(jugadores) {
  // BUG intencional: orden ascendente cuando deberia priorizar mejores resultados.
  return [...jugadores].sort((a, b) => a.puntos - b.puntos);
}
```

El problema está en el criterio utilizado por `sort()`.

La expresión:

```js
a.puntos - b.puntos
```

ordena los elementos de menor a mayor.

Con los datos del test:

```js
[
  { nombre: 'novato', puntos: 7 },
  { nombre: 'pro', puntos: 22 },
  { nombre: 'elite', puntos: 18 }
]
```

la implementación original produce:

```text
novato -> 7
elite -> 18
pro -> 22
```

Pero el test exige el ranking de mayor a menor:

```text
pro -> 22
elite -> 18
novato -> 7
```

Por lo tanto, el criterio de ordenamiento debe invertirse.

## Causa raíz

### `calcularResultado`

La causa raíz es utilizar `join('')` para una operación matemática.

`join()` sirve para unir los elementos de un arreglo y generar una cadena de texto.

Por ejemplo:

```js
[10, 15, 5].join('')
```

produce:

```text
"10155"
```

No realiza:

```text
10 + 15 + 5
```

El contrato establecido por el test requiere un único valor numérico:

```text
30
```

La operación adecuada para acumular todos los puntos es `reduce()`.

### `ordenarRanking`

La causa raíz es utilizar un comparador ascendente:

```js
(a, b) => a.puntos - b.puntos
```

Este comparador coloca primero los valores menores.

Para un ranking donde los jugadores con mayor puntaje deben aparecer primero, el comparador debe ser:

```js
(a, b) => b.puntos - a.puntos
```

De esta manera, los valores mayores quedan al principio del arreglo.

## Cambio aplicado

Se realizaron únicamente los cambios necesarios para cumplir con el contrato definido por los tests.

### Corrección de `calcularResultado`

La implementación:

```js
return datos.map(item => item.puntos).join('');
```

se reemplazó por:

```js
return datos.reduce((total, item) => total + item.puntos, 0);
```

El método `reduce()` utiliza un acumulador para sumar cada valor.

El cálculo realizado es:

```text
0 + 10 = 10
10 + 15 = 25
25 + 5 = 30
```

Por lo tanto, el resultado final es:

```text
30
```

y es un valor numérico.

### Corrección de `ordenarRanking`

La implementación:

```js
return [...jugadores].sort((a, b) => a.puntos - b.puntos);
```

se modificó a:

```js
return [...jugadores].sort((a, b) => b.puntos - a.puntos);
```

El cambio invierte el orden del ranking.

Los puntos:

```text
7, 22, 18
```

ahora quedan ordenados como:

```text
22, 18, 7
```

Por lo tanto, los nombres quedan:

```js
['pro', 'elite', 'novato']
```

También se conserva:

```js
[...jugadores]
```

para crear una copia del arreglo antes de ejecutar `sort()`.

Esto evita modificar directamente el arreglo original recibido por la función.

## Archivo corregido

El contenido final de `layers.js` es:

```js
export function calcularResultado(datos) {
  return datos.reduce((total, item) => total + item.puntos, 0);
}

export function ordenarRanking(jugadores) {
  return [...jugadores].sort((a, b) => b.puntos - a.puntos);
}
```

No se agregaron funciones auxiliares, validaciones ni lógica adicional porque los tests no requieren ese comportamiento.

## Validación

### Comando utilizado

```bash
npm test -- ejercicios/ejercicio-015/tests/layers.test.js
```

También puede utilizarse directamente Vitest:

```bash
npx vitest run ejercicios/ejercicio-015/tests/layers.test.js
```

## Casos validados

### Caso 1: cálculo numérico

Entrada:

```js
[
  { nombre: 'ak47-master', puntos: 10 },
  { nombre: 'rpg-tank', puntos: 15 },
  { nombre: 'moto-racer', puntos: 5 }
]
```

La función corregida realiza:

```text
10 + 15 + 5 = 30
```

Resultado esperado:

```text
30
```

El resultado es numérico y no una cadena.

### Caso 2: ordenamiento del ranking

Entrada:

```js
[
  { nombre: 'novato', puntos: 7 },
  { nombre: 'pro', puntos: 22 },
  { nombre: 'elite', puntos: 18 }
]
```

Orden esperado por puntaje:

```text
22 > 18 > 7
```

Resultado esperado:

```js
['pro', 'elite', 'novato']
```

La implementación corregida produce exactamente ese orden.

## Resultado esperado de los tests

El archivo `layers.test.js` contiene dos pruebas.

La primera verifica que `calcularResultado()` realice una suma numérica.

La segunda verifica que `ordenarRanking()` ordene los jugadores de mayor a menor puntaje.

La salida esperada es equivalente a:

```text
✓ calcula suma numerica y no concatena texto
✓ ordena ranking de mayor a menor puntaje

2 tests passed
```

El formato exacto de la salida puede variar dependiendo de la versión y configuración de Vitest.

Lo importante es que ambas pruebas finalicen correctamente y no aparezcan errores ni fallos.

## Estructura de la entrega

```text
ejercicios/ejercicio-015/resoluciones/carlos-velasco/
├── layers.js
└── README.md
```

La solución se encuentra dentro de la carpeta personal correspondiente y no modifica el archivo base ni los tests.

## Justificación técnica

La primera corrección utiliza `reduce()` porque la función necesita transformar una colección de objetos en un único resultado numérico.

La implementación:

```js
datos.reduce((total, item) => total + item.puntos, 0);
```

inicia el acumulador en `0` y agrega el valor de `puntos` de cada objeto.

Esto garantiza que los valores se procesen como números:

```text
0 + 10 + 15 + 5 = 30
```

En cambio, `join()` trabaja con representación textual y por eso no es apropiado para realizar esta operación.

Para el ranking se utiliza:

```js
b.puntos - a.puntos
```

porque `sort()` necesita un comparador que determine qué elemento debe aparecer primero.

Con:

```js
b.puntos - a.puntos
```

los jugadores con mayor puntaje quedan antes que los jugadores con menor puntaje.

Además, se mantiene:

```js
[...jugadores]
```

para evitar mutar directamente el arreglo original.

Esto representa una corrección mínima y conserva el comportamiento esperado de recibir un arreglo y devolver un arreglo ordenado.

## Comparación antes y después

### `calcularResultado`

Antes:

```js
return datos.map(item => item.puntos).join('');
```

Resultado:

```text
"10155"
```

Después:

```js
return datos.reduce((total, item) => total + item.puntos, 0);
```

Resultado:

```text
30
```

### `ordenarRanking`

Antes:

```js
return [...jugadores].sort((a, b) => a.puntos - b.puntos);
```

Resultado:

```text
novato -> 7
elite -> 18
pro -> 22
```

Después:

```js
return [...jugadores].sort((a, b) => b.puntos - a.puntos);
```

Resultado:

```text
pro -> 22
elite -> 18
novato -> 7
```

## Conclusión

Se corrigieron los dos errores presentes en `layers.js`.

El primer error provocaba que los puntos fueran concatenados como texto en lugar de sumarse numéricamente.

El segundo error provocaba que el ranking se ordenara de menor a mayor en lugar de priorizar los puntajes más altos.

Después de aplicar la corrección:

1. `calcularResultado()` devuelve `30` para los datos proporcionados por el test.
2. `ordenarRanking()` devuelve `['pro', 'elite', 'novato']`.
3. El arreglo original no es modificado directamente durante el ordenamiento.
4. Los tests permanecen sin modificaciones.
5. La solución se mantiene dentro de `resoluciones/carlos-velasco/`.
6. El cambio realizado es mínimo y está directamente relacionado con los errores encontrados.

### Nota sobre la discrepancia del ejercicio

El README proporcionado describe una funcionalidad de "Dibujo digital" y menciona la normalización de capas visibles. Sin embargo, los archivos reales proporcionados (`layers.js` y `layers.test.js`) contienen y validan una lógica de suma y ordenamiento por `puntos`.

Por lo tanto, esta resolución toma como contrato principal el comportamiento definido por el código y los tests reales, ya que son los elementos que determinan si la implementación pasa o falla durante la ejecución de Vitest.