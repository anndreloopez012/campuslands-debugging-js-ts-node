# Ejercicio 018 - Formulas quimicas

## Error encontrado

Se encontraron dos errores en la implementación de `formula-parser.js`.

Aunque el objetivo descrito en el README es **parsear una fórmula química simple y contar átomos**, el archivo JavaScript y el archivo de pruebas proporcionados utilizan actualmente una estructura genérica basada en puntos y un ranking.

Por lo tanto, la solución se basa en el contrato real definido por el código y, principalmente, por los tests existentes en:

```text
ejercicios/ejercicio-018/tests/formula-parser.test.js
```

Los dos errores encontrados son:

1. `calcularResultado()` concatena los puntos como texto en lugar de sumarlos numéricamente.
2. `ordenarRanking()` ordena los jugadores de menor a mayor cuando el test exige un orden de mayor a menor.

## Error en `calcularResultado`

La implementación original era:

```javascript
export function calcularResultado(datos) {
  return datos.map(item => item.puntos).join('');
}
```

La función utiliza:

```javascript
datos.map(item => item.puntos)
```

para obtener los puntos de cada elemento.

Con los datos utilizados por el test:

```javascript
[
  { nombre: 'ak47-master', puntos: 10 },
  { nombre: 'rpg-tank', puntos: 15 },
  { nombre: 'moto-racer', puntos: 5 }
]
```

el `map()` produce:

```javascript
[10, 15, 5]
```

Posteriormente se ejecuta:

```javascript
.join('')
```

Esto no realiza una suma matemática. `join()` convierte los elementos en una cadena y los concatena.

El resultado real de la implementación original es:

```text
"10155"
```

Pero el test espera:

```text
30
```

Por lo tanto, existe una diferencia entre el resultado real y el contrato esperado.

## Error en `ordenarRanking`

La implementación original era:

```javascript
export function ordenarRanking(jugadores) {
  return [...jugadores].sort((a, b) => a.puntos - b.puntos);
}
```

El comparador:

```javascript
(a, b) => a.puntos - b.puntos
```

ordena los elementos de forma ascendente.

Los datos utilizados por el test son:

```javascript
[
  { nombre: 'novato', puntos: 7 },
  { nombre: 'pro', puntos: 22 },
  { nombre: 'elite', puntos: 18 }
]
```

La implementación original produce:

```text
novato -> 7
elite -> 18
pro -> 22
```

Sin embargo, el test exige:

```text
pro -> 22
elite -> 18
novato -> 7
```

Por lo tanto, el ranking debe organizarse de mayor a menor puntaje.

## Causa raíz

### Causa raíz de `calcularResultado`

La causa raíz es utilizar `join('')` para una operación que requiere una suma numérica.

`join()` tiene como finalidad unir los elementos de un arreglo en una cadena de texto.

Por ejemplo:

```javascript
[10, 15, 5].join('')
```

produce:

```text
"10155"
```

No produce:

```text
30
```

La operación requerida por el test es:

```text
10 + 15 + 5 = 30
```

Para realizar esta operación se necesita acumular los valores numéricos.

`reduce()` es apropiado para este caso porque permite transformar todos los puntos en un único resultado numérico.

### Causa raíz de `ordenarRanking`

La causa raíz es el criterio de comparación utilizado en `sort()`.

La expresión:

```javascript
a.puntos - b.puntos
```

representa un orden ascendente.

Esto coloca primero los valores menores.

El test requiere exactamente lo contrario: los jugadores con mayor cantidad de puntos deben aparecer primero.

Para conseguirlo se debe invertir el comparador:

```javascript
b.puntos - a.puntos
```

De esta manera:

```text
22 > 18 > 7
```

y el ranking queda correctamente ordenado.

## Cambio aplicado

Se realizaron únicamente los cambios necesarios para cumplir el contrato establecido por los tests.

### Corrección de `calcularResultado`

Se reemplazó:

```javascript
return datos.map(item => item.puntos).join('');
```

por:

```javascript
return datos.reduce((total, item) => total + item.puntos, 0);
```

El valor inicial del acumulador es:

```text
0
```

El cálculo se realiza de la siguiente manera:

```text
0 + 10 = 10
10 + 15 = 25
25 + 5 = 30
```

El resultado final es:

```text
30
```

El tipo del resultado también es correcto:

```javascript
typeof 30
```

produce:

```text
number
```

Esto cumple con:

```javascript
.toBe(30)
```

del test.

### Corrección de `ordenarRanking`

Se reemplazó:

```javascript
return [...jugadores].sort((a, b) => a.puntos - b.puntos);
```

por:

```javascript
return [...jugadores].sort((a, b) => b.puntos - a.puntos);
```

El nuevo criterio produce:

```text
22 > 18 > 7
```

Por lo tanto, el resultado es:

```javascript
[
  { nombre: 'pro', puntos: 22 },
  { nombre: 'elite', puntos: 18 },
  { nombre: 'novato', puntos: 7 }
]
```

El test transforma posteriormente ese resultado mediante:

```javascript
ranking.map((item) => item.nombre)
```

obteniendo:

```javascript
['pro', 'elite', 'novato']
```

que coincide exactamente con el valor esperado.

## Solución completa aplicada

El archivo `formula-parser.js` corregido queda así:

```javascript
export function calcularResultado(datos) {
  return datos.reduce((total, item) => total + item.puntos, 0);
}

export function ordenarRanking(jugadores) {
  return [...jugadores].sort((a, b) => b.puntos - a.puntos);
}
```

## Validación

La validación debe realizarse utilizando el comando especificado por el README:

```bash
npm test -- ejercicios/ejercicio-018/tests/formula-parser.test.js
```

También puede ejecutarse directamente con Vitest:

```bash
npx vitest run ejercicios/ejercicio-018/tests/formula-parser.test.js
```

## Casos comprobados

### Caso 1: cálculo de la suma

Entrada:

```javascript
[
  { nombre: 'ak47-master', puntos: 10 },
  { nombre: 'rpg-tank', puntos: 15 },
  { nombre: 'moto-racer', puntos: 5 }
]
```

Cálculo:

```text
10 + 15 + 5 = 30
```

Resultado esperado:

```text
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

Orden por puntaje:

```text
22
18
7
```

Resultado esperado:

```javascript
['pro', 'elite', 'novato']
```

## Resultado esperado de los tests

Los dos casos definidos en `formula-parser.test.js` deben pasar:

```text
✓ calcula suma numerica y no concatena texto
✓ ordena ranking de mayor a menor puntaje
```

Resultado esperado:

```text
2 tests passed
```

La salida visual exacta puede variar dependiendo de la versión y configuración de Vitest.

Lo importante es que los dos tests terminen en estado `passed` y no existan errores o fallos.

## Estructura final

La entrega debe quedar organizada de la siguiente manera:

```text
ejercicios/ejercicio-018/resoluciones/carlos-velasco/
├── formula-parser.js
└── README.md
```

No se deben modificar:

```text
ejercicios/ejercicio-018/codigo/formula-parser.js
ejercicios/ejercicio-018/tests/formula-parser.test.js
```

La corrección debe existir únicamente dentro de la carpeta personal:

```text
resoluciones/carlos-velasco/
```

## Justificación técnica

La primera corrección utiliza `reduce()` porque `calcularResultado()` debe devolver un único valor numérico construido a partir de los puntos de todos los elementos.

La expresión:

```javascript
datos.reduce((total, item) => total + item.puntos, 0)
```

mantiene todos los valores como números y los acumula progresivamente.

El `0` utilizado como segundo argumento establece el valor inicial del acumulador y evita depender del primer elemento del arreglo.

Para el ordenamiento se utiliza:

```javascript
[...jugadores].sort((a, b) => b.puntos - a.puntos)
```

La copia mediante:

```javascript
[...jugadores]
```

se conserva porque `sort()` modifica el arreglo sobre el que se ejecuta.

De esta manera, la función ordena una copia y no modifica directamente el arreglo original recibido como argumento.

El comparador:

```javascript
b.puntos - a.puntos
```

permite ordenar de mayor a menor.

No se agregaron funciones auxiliares, validaciones adicionales ni lógica innecesaria porque los tests proporcionados no requieren ese comportamiento.

La solución se limita a corregir los dos comportamientos que actualmente incumplen el contrato establecido.

## Conclusión

El ejercicio contenía dos errores funcionales.

El primer error provocaba que los puntos fueran concatenados como texto:

```text
"10155"
```

en lugar de ser sumados:

```text
30
```

Este problema fue corregido utilizando `reduce()`.

El segundo error provocaba que el ranking se ordenara de menor a mayor:

```text
7, 18, 22
```

cuando el contrato requiere mayor a menor:

```text
22, 18, 7
```

Este problema fue corregido cambiando el comparador de:

```javascript
a.puntos - b.puntos
```

a:

```javascript
b.puntos - a.puntos
```

La solución final cumple con los dos tests proporcionados, mantiene la estructura de archivos solicitada y no modifica los archivos base ni los tests.

## Autor

```text
Hecho por: Carlos Velasco
Ejercicio: 018 - Formulas quimicas
Tecnología: JavaScript
Tipo de corrección: Bug fix
```

## Nota sobre la especificación

Existe una diferencia entre la temática y objetivo descritos en el README y el comportamiento definido actualmente por el código y los tests.

El README indica:

```text
Formulas quimicas
Parsear formula simple y contar atomos
```

Sin embargo, `formula-parser.js` y `formula-parser.test.js` implementan y validan:

```text
Suma numérica de puntos
Ordenamiento de ranking por puntaje
```

Por esta razón, la solución implementa el comportamiento que realmente exige el test actual. No se añadió una implementación de parsing químico que no está respaldada por los tests proporcionados.