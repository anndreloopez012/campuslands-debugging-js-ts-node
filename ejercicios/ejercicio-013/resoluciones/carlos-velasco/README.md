# Ejercicio 013 - Viajes

## Error encontrado

Se encontraron dos errores intencionales en la implementación de `travel-costs.js`.

Aunque el objetivo descrito en el README es **agrupar gastos por ciudad sin sobrescribir**, el archivo de pruebas proporcionado define un contrato diferente. Los tests actuales verifican dos comportamientos específicos:

- `calcularResultado()` debe realizar una suma numérica de los valores de `puntos`.
- `ordenarRanking()` debe ordenar los elementos de mayor a menor puntaje.

Por esta razón, la solución se basa en el comportamiento real establecido por `travel-costs.test.js`, ya que los tests son la referencia ejecutable del contrato actual del ejercicio.

### 1. Error en `calcularResultado()`

La implementación original era:

```javascript
export function calcularResultado(datos) {
  return datos.map(item => item.puntos).join('');
}
```

El problema se encuentra en el uso de `join('')`.

Primero, `map()` obtiene correctamente los puntos de cada elemento:

```javascript
datos.map(item => item.puntos)
```

Para los datos utilizados por el test:

```javascript
[
  { nombre: 'ak47-master', puntos: 10 },
  { nombre: 'rpg-tank', puntos: 15 },
  { nombre: 'moto-racer', puntos: 5 }
]
```

el resultado intermedio es:

```javascript
[10, 15, 5]
```

Sin embargo, `join('')` convierte estos valores en una cadena y los concatena:

```javascript
[10, 15, 5].join('')
```

Resultado:

```text
"10155"
```

El test espera:

```text
30
```

Por lo tanto, la función no está realizando la operación matemática requerida.

### 2. Error en `ordenarRanking()`

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

ordena los elementos de menor a mayor.

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

Sin embargo, el test espera:

```text
pro -> 22
elite -> 18
novato -> 7
```

Por lo tanto, el criterio de ordenamiento debe invertirse para obtener un ranking descendente.

## Causa raíz

### Causa raíz de `calcularResultado()`

La causa raíz es utilizar `join('')` para una operación que requiere una suma numérica.

`join()` está diseñado para unir los elementos de un arreglo y devolver una cadena de texto.

Por ejemplo:

```javascript
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

El contrato definido por el test requiere:

```text
10 + 15 + 5 = 30
```

Para realizar esta operación correctamente se utiliza `reduce()`, que permite recorrer los elementos y acumular sus valores en un único resultado.

### Causa raíz de `ordenarRanking()`

La causa raíz está en el comparador utilizado por `sort()`:

```javascript
(a, b) => a.puntos - b.puntos
```

Este criterio produce un orden ascendente:

```text
7 < 18 < 22
```

Por lo tanto, el jugador con menor puntaje queda primero.

El test requiere exactamente lo contrario: los jugadores con mayor puntaje deben ocupar las primeras posiciones.

Para conseguirlo se utiliza:

```javascript
(a, b) => b.puntos - a.puntos
```

Esto establece un orden descendente:

```text
22 > 18 > 7
```

## Cambio aplicado

Se realizaron únicamente los cambios necesarios para cumplir el contrato definido por los tests.

### Corrección de `calcularResultado()`

La implementación original:

```javascript
return datos.map(item => item.puntos).join('');
```

fue reemplazada por:

```javascript
return datos.reduce((total, item) => total + item.puntos, 0);
```

El valor inicial del acumulador es:

```text
0
```

Después se procesa cada elemento:

```text
0 + 10 = 10
10 + 15 = 25
25 + 5 = 30
```

Resultado final:

```text
30
```

De esta manera, la función devuelve un número y cumple con:

```javascript
expect(calcularResultado([
  { nombre: 'ak47-master', puntos: 10 },
  { nombre: 'rpg-tank', puntos: 15 },
  { nombre: 'moto-racer', puntos: 5 }
])).toBe(30);
```

### Corrección de `ordenarRanking()`

El comparador original:

```javascript
(a, b) => a.puntos - b.puntos
```

fue reemplazado por:

```javascript
(a, b) => b.puntos - a.puntos
```

Con los puntajes:

```text
7, 22, 18
```

el nuevo orden es:

```text
22, 18, 7
```

Por lo tanto, el resultado de:

```javascript
ranking.map((item) => item.nombre)
```

es:

```javascript
['pro', 'elite', 'novato']
```

que coincide exactamente con el resultado esperado por el test.

### Conservación de la copia del arreglo

Se mantiene:

```javascript
[...jugadores]
```

antes de utilizar `sort()`:

```javascript
return [...jugadores].sort((a, b) => b.puntos - a.puntos);
```

Esto permite trabajar sobre una copia del arreglo y evita modificar directamente el arreglo original recibido por la función.

No fue necesario modificar este comportamiento porque ya estaba correctamente implementado.

## Solución final

El archivo `travel-costs.js` queda de la siguiente manera:

```javascript
export function calcularResultado(datos) {
  return datos.reduce((total, item) => total + item.puntos, 0);
}

export function ordenarRanking(jugadores) {
  return [...jugadores].sort((a, b) => b.puntos - a.puntos);
}
```

## Validación

El comando indicado por el ejercicio es:

```bash
npm test -- ejercicios/ejercicio-013/tests/travel-costs.test.js
```

También puede ejecutarse directamente mediante Vitest:

```bash
npx vitest run ejercicios/ejercicio-013/tests/travel-costs.test.js
```

La validación debe realizarse después de colocar la solución en:

```text
ejercicios/ejercicio-013/resoluciones/carlos-velasco/travel-costs.js
```

## Casos validados

### Caso 1: suma numérica

Entrada:

```javascript
[
  { nombre: 'ak47-master', puntos: 10 },
  { nombre: 'rpg-tank', puntos: 15 },
  { nombre: 'moto-racer', puntos: 5 }
]
```

Operación:

```text
10 + 15 + 5 = 30
```

Resultado esperado:

```text
30
```

La función corregida devuelve un valor numérico:

```javascript
30
```

Por lo tanto, debe pasar el test:

```javascript
expect(calcularResultado([
  { nombre: 'ak47-master', puntos: 10 },
  { nombre: 'rpg-tank', puntos: 15 },
  { nombre: 'moto-racer', puntos: 5 }
])).toBe(30);
```

### Caso 2: ranking de mayor a menor

Entrada:

```javascript
[
  { nombre: 'novato', puntos: 7 },
  { nombre: 'pro', puntos: 22 },
  { nombre: 'elite', puntos: 18 }
]
```

Orden esperado:

```text
pro -> 22
elite -> 18
novato -> 7
```

Resultado esperado:

```javascript
['pro', 'elite', 'novato']
```

La implementación corregida produce exactamente este orden.

Por lo tanto, debe pasar el test:

```javascript
expect(ranking.map((item) => item.nombre))
  .toEqual(['pro', 'elite', 'novato']);
```

## Resultado esperado de los tests

Al ejecutar:

```bash
npm test -- ejercicios/ejercicio-013/tests/travel-costs.test.js
```

los dos casos deben aparecer como exitosos:

```text
✓ calcula suma numerica y no concatena texto
✓ ordena ranking de mayor a menor puntaje

2 tests passed
```

La salida exacta puede variar ligeramente dependiendo de la versión de Vitest y de la configuración del proyecto.

Lo importante es que ambos tests finalicen correctamente y no se produzcan errores.

## Estructura del ejercicio

La resolución debe quedar dentro de la carpeta personal:

```text
ejercicios/ejercicio-013/resoluciones/carlos-velasco/
├── travel-costs.js
└── README.md
```

No se deben modificar los archivos base:

```text
ejercicios/ejercicio-013/codigo/travel-costs.js
ejercicios/ejercicio-013/tests/travel-costs.test.js
```

La corrección debe realizarse únicamente sobre la copia ubicada en:

```text
ejercicios/ejercicio-013/resoluciones/carlos-velasco/
```

## Justificación técnica

La corrección de `calcularResultado()` utiliza `reduce()` porque el objetivo definido por el test es obtener un único valor numérico a partir de los puntos de todos los elementos.

La expresión:

```javascript
datos.reduce((total, item) => total + item.puntos, 0)
```

utiliza `0` como valor inicial y acumula cada punto:

```text
0 + 10 + 15 + 5 = 30
```

Esto evita la conversión implícita a texto que ocurría con `join()`.

Para `ordenarRanking()` se utiliza:

```javascript
b.puntos - a.puntos
```

porque el ranking debe estar ordenado de mayor a menor.

La diferencia entre los comparadores es:

```javascript
a.puntos - b.puntos
```

Orden ascendente.

```javascript
b.puntos - a.puntos
```

Orden descendente.

Se mantiene:

```javascript
[...jugadores]
```

para conservar el arreglo original sin mutarlo directamente.

No se agregaron funciones auxiliares, validaciones adicionales ni lógica innecesaria, debido a que los tests proporcionados no requieren ese comportamiento.

## Cumplimiento del objetivo

El README describe como objetivo:

```text
Agrupar gastos por ciudad sin sobrescribir.
```

Sin embargo, existe una discrepancia entre el objetivo textual y el contrato real de los archivos entregados.

El test `travel-costs.test.js` no contiene casos de agrupación por ciudad. En cambio, verifica:

1. Una suma numérica de `puntos`.
2. Un ordenamiento de jugadores por puntaje.

Por lo tanto, la implementación se corrigió siguiendo el contrato ejecutable establecido por los tests disponibles.

Esta decisión evita inventar una funcionalidad que no está definida en los casos de prueba y permite realizar el mínimo cambio necesario sobre el código existente.

## Conclusión

Se corrigieron los dos errores intencionales presentes en `travel-costs.js`.

El primer error provocaba que los puntos fueran concatenados como texto:

```text
"10155"
```

en lugar de ser sumados:

```text
30
```

La solución utiliza `reduce()` para realizar correctamente la suma numérica.

El segundo error provocaba que el ranking se ordenara de menor a mayor.

La solución utiliza:

```javascript
b.puntos - a.puntos
```

para ordenar de mayor a menor.

Finalmente, se conserva la copia del arreglo mediante:

```javascript
[...jugadores]
```

para evitar modificar los datos originales.

La solución cumple el contrato definido por los tests proporcionados y requiere únicamente los cambios necesarios para corregir los errores encontrados.