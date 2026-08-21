# Ejercicio 016 - Carreras

## Error encontrado

Se encontraron dos errores en la implementación de `racing-laps.js`.

El objetivo indicado en el README menciona corregir penalizaciones en tiempos de vuelta. Sin embargo, el archivo JavaScript y el archivo de pruebas proporcionados no implementan una lógica específica de tiempos o penalizaciones.

Los archivos reales utilizan las funciones:

```js
calcularResultado()
ordenarRanking()
```

y trabajan con una propiedad llamada `puntos`.

Además, los tests establecen explícitamente que:

- `calcularResultado()` debe realizar una suma numérica.
- `ordenarRanking()` debe ordenar de mayor a menor puntaje.

Por lo tanto, la solución se basa en el contrato real definido por `racing-laps.test.js`, ya que este es el comportamiento que determina si la implementación pasa o falla.

### 1. Error en `calcularResultado`

La implementación original era:

```js
export function calcularResultado(datos) {
  // BUG intencional: la implementacion no respeta completamente el README ni los tests.
  return datos.map(item => item.puntos).join('');
}
```

El problema está en utilizar `join('')` después de obtener los puntos.

Con los datos utilizados por el test:

```js
[
  { nombre: 'ak47-master', puntos: 10 },
  { nombre: 'rpg-tank', puntos: 15 },
  { nombre: 'moto-racer', puntos: 5 }
]
```

la expresión:

```js
datos.map(item => item.puntos)
```

produce:

```js
[10, 15, 5]
```

Pero posteriormente:

```js
.join('')
```

concatena los valores como texto:

```text
"10155"
```

El test espera:

```text
30
```

Por lo tanto, el resultado actual no representa una suma numérica.

### 2. Error en `ordenarRanking`

La implementación original era:

```js
export function ordenarRanking(jugadores) {
  // BUG intencional: orden ascendente cuando deberia priorizar mejores resultados.
  return [...jugadores].sort((a, b) => a.puntos - b.puntos);
}
```

El comparador:

```js
(a, b) => a.puntos - b.puntos
```

ordena los valores de menor a mayor.

Con los datos:

```js
[
  { nombre: 'novato', puntos: 7 },
  { nombre: 'pro', puntos: 22 },
  { nombre: 'elite', puntos: 18 }
]
```

el resultado original es:

```text
novato -> 7
elite -> 18
pro -> 22
```

Pero el test espera:

```text
pro -> 22
elite -> 18
novato -> 7
```

Por lo tanto, el ranking debe ordenarse de forma descendente.

## Causa raíz

### Causa raíz de `calcularResultado`

La causa raíz es el uso incorrecto de `join()` para realizar una operación matemática.

`join()` convierte los elementos de un arreglo en una cadena de texto.

Por ejemplo:

```js
[10, 15, 5].join('')
```

produce:

```text
"10155"
```

Esto no equivale a:

```text
10 + 15 + 5
```

El contrato definido por el test requiere obtener un único valor numérico:

```text
30
```

La operación adecuada es `reduce()`, porque permite recorrer los elementos y acumular sus puntos.

### Causa raíz de `ordenarRanking`

La causa raíz es el criterio ascendente utilizado en `sort()`:

```js
a.puntos - b.puntos
```

Este criterio coloca primero los valores más pequeños.

Para obtener un orden descendente debe utilizarse:

```js
b.puntos - a.puntos
```

De esta manera, los jugadores con mayor puntaje aparecen primero.

## Cambio aplicado

Se realizaron únicamente los cambios necesarios para cumplir con los tests.

### Corrección de `calcularResultado`

Se reemplazó:

```js
return datos.map(item => item.puntos).join('');
```

por:

```js
return datos.reduce((total, item) => total + item.puntos, 0);
```

El funcionamiento de `reduce()` puede representarse así:

```text
0 + 10 = 10
10 + 15 = 25
25 + 5 = 30
```

Resultado final:

```text
30
```

De esta forma, el valor retornado es numérico y coincide con lo solicitado por el test.

### Corrección de `ordenarRanking`

Se reemplazó:

```js
return [...jugadores].sort((a, b) => a.puntos - b.puntos);
```

por:

```js
return [...jugadores].sort((a, b) => b.puntos - a.puntos);
```

Con los valores:

```text
7, 22, 18
```

el nuevo orden es:

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

porque crea una copia del arreglo antes de ordenarlo.

Esto evita modificar directamente el arreglo original recibido por la función.

## Archivo corregido

El contenido final de `racing-laps.js` es:

```js
export function calcularResultado(datos) {
  return datos.reduce((total, item) => total + item.puntos, 0);
}

export function ordenarRanking(jugadores) {
  return [...jugadores].sort((a, b) => b.puntos - a.puntos);
}
```

No se agregaron funciones auxiliares ni lógica adicional porque los tests no requieren comportamientos adicionales.

## Validación

### Comando utilizado

```bash
npm test -- ejercicios/ejercicio-016/tests/racing-laps.test.js
```

También puede utilizarse directamente Vitest:

```bash
npx vitest run ejercicios/ejercicio-016/tests/racing-laps.test.js
```

## Casos validados

### Caso 1: suma numérica

Entrada:

```js
[
  { nombre: 'ak47-master', puntos: 10 },
  { nombre: 'rpg-tank', puntos: 15 },
  { nombre: 'moto-racer', puntos: 5 }
]
```

La implementación corregida realiza:

```text
10 + 15 + 5 = 30
```

Resultado esperado:

```text
30
```

La función devuelve un número y no una cadena.

### Caso 2: ordenamiento del ranking

Entrada:

```js
[
  { nombre: 'novato', puntos: 7 },
  { nombre: 'pro', puntos: 22 },
  { nombre: 'elite', puntos: 18 }
]
```

Los puntajes deben quedar ordenados:

```text
22 > 18 > 7
```

Por lo tanto, el resultado esperado es:

```js
['pro', 'elite', 'novato']
```

## Resultado esperado de los tests

El archivo `racing-laps.test.js` contiene dos pruebas.

La primera comprueba que los puntos se sumen numéricamente.

La segunda comprueba que el ranking se ordene de mayor a menor puntaje.

La salida esperada es equivalente a:

```text
✓ calcula suma numerica y no concatena texto
✓ ordena ranking de mayor a menor puntaje

2 tests passed
```

El formato exacto de la salida puede variar según la versión y configuración de Vitest.

Lo importante es que ambas pruebas finalicen correctamente.

## Estructura de la entrega

```text
ejercicios/ejercicio-016/resoluciones/carlos-velasco/
├── racing-laps.js
└── README.md
```

La solución se encuentra dentro de la carpeta personal correspondiente.

No se modifica el archivo base ni el archivo de pruebas.

## Justificación técnica

La primera corrección utiliza `reduce()` porque el objetivo real definido por los tests es transformar un arreglo de objetos en un único valor numérico.

La implementación:

```js
datos.reduce((total, item) => total + item.puntos, 0);
```

establece `0` como valor inicial del acumulador y suma los puntos de cada objeto.

Esto garantiza:

```text
10 + 15 + 5 = 30
```

En cambio, la implementación original utilizaba:

```js
datos.map(item => item.puntos).join('');
```

que transforma los valores en una representación textual:

```text
"10155"
```

Para el ranking se utiliza:

```js
b.puntos - a.puntos
```

porque el contrato requiere ordenar de mayor a menor.

Si se utilizaran:

```js
a.puntos - b.puntos
```

los valores quedarían en orden ascendente.

El uso de:

```js
[...jugadores]
```

se conserva para no mutar directamente el arreglo original.

De esta manera, `sort()` trabaja sobre una copia y la función mantiene un comportamiento más seguro respecto a los datos de entrada.

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

Se corrigieron los dos bugs presentes en `racing-laps.js`.

El primer error provocaba que los puntos fueran concatenados como texto en lugar de sumarse numéricamente.

El segundo error provocaba que el ranking se ordenara de menor a mayor en lugar de priorizar los puntajes más altos.

Después de aplicar la corrección:

1. `calcularResultado()` devuelve `30`.
2. `ordenarRanking()` devuelve `['pro', 'elite', 'novato']`.
3. El ordenamiento se realiza sobre una copia del arreglo.
4. Los tests no fueron modificados.
5. El archivo base no fue modificado.
6. La solución se encuentra dentro de `resoluciones/carlos-velasco/`.
7. Los cambios realizados son mínimos y están directamente relacionados con los errores encontrados.

### Nota sobre la discrepancia del objetivo

El README describe el ejercicio como una funcionalidad relacionada con carreras y menciona específicamente la corrección de penalizaciones en tiempos de vuelta.

Sin embargo, el archivo `racing-laps.js` y su test no contienen lógica relacionada con tiempos de vuelta, penalizaciones o duración de laps.

El contrato real verificable mediante Vitest corresponde a la suma de puntos y al ordenamiento de un ranking.

Por esta razón, la solución se implementó siguiendo el comportamiento exigido por el código de pruebas proporcionado.