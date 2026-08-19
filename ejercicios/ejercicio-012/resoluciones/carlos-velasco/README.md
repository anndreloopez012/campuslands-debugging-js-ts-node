# Ejercicio 012 - Kickboxing

## Error encontrado

Se encontraron dos errores intencionales en la implementación de `kickboxing.js`.

Los errores afectan directamente las dos funciones evaluadas por los tests:

- `calcularResultado()`
- `ordenarRanking()`

El archivo de pruebas define que la primera función debe calcular una suma numérica y que la segunda debe ordenar los jugadores de mayor a menor puntaje.

### 1. Error en `calcularResultado()`

La implementación original era:

```javascript
export function calcularResultado(datos) {
  return datos.map(item => item.puntos).join('');
}
```

La función utiliza `map()` para obtener los puntos de cada elemento:

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

Sin embargo, posteriormente se utiliza:

```javascript
.join('')
```

`join()` no realiza una suma matemática. Su función es unir los elementos de un arreglo y producir una cadena de texto.

Por lo tanto, el resultado original es:

```text
"10155"
```

El test espera:

```text
30
```

Por lo tanto, existe una diferencia entre el resultado real y el contrato esperado.

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

ordena los jugadores de menor a mayor puntaje.

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

Pero el test requiere un ranking de mayor a menor:

```text
pro -> 22
elite -> 18
novato -> 7
```

Por lo tanto, el criterio de ordenamiento también es incorrecto.

## Causa raíz

### Causa raíz de `calcularResultado()`

El problema se encuentra en el uso de:

```javascript
join('')
```

`join()` convierte los elementos del arreglo en una cadena de texto y los concatena.

Por ejemplo:

```javascript
[10, 15, 5].join('')
```

produce:

```text
"10155"
```

Esto no representa:

```text
10 + 15 + 5
```

El contrato definido por el test requiere una suma numérica:

```text
10 + 15 + 5 = 30
```

Por lo tanto, se necesita una operación de acumulación numérica.

`reduce()` es apropiado para este caso porque permite recorrer los elementos y acumular sus puntos en un único valor.

### Causa raíz de `ordenarRanking()`

El problema se encuentra en el comparador utilizado por `sort()`:

```javascript
a.puntos - b.puntos
```

Este comparador establece un orden ascendente.

Por ejemplo:

```text
7 < 18 < 22
```

Por eso el jugador con 7 puntos aparece antes que los jugadores con 18 y 22 puntos.

El contrato del ejercicio requiere exactamente lo contrario: los jugadores con mayor puntaje deben aparecer primero.

Para conseguirlo se debe utilizar:

```javascript
b.puntos - a.puntos
```

Esto invierte el criterio y genera un orden descendente.

## Cambio aplicado

Se realizaron únicamente los cambios necesarios para cumplir con el comportamiento establecido por los tests.

### Corrección de `calcularResultado()`

La implementación original:

```javascript
return datos.map(item => item.puntos).join('');
```

fue reemplazada por:

```javascript
return datos.reduce((total, item) => total + item.puntos, 0);
```

El funcionamiento ahora es:

```text
Inicialización:
0

Primer elemento:
0 + 10 = 10

Segundo elemento:
10 + 15 = 25

Tercer elemento:
25 + 5 = 30
```

Resultado final:

```text
30
```

El resultado ahora es un valor numérico y coincide con:

```javascript
.toBe(30)
```

utilizado por el test.

### Corrección de `ordenarRanking()`

El comparador original:

```javascript
(a, b) => a.puntos - b.puntos
```

fue reemplazado por:

```javascript
(a, b) => b.puntos - a.puntos
```

Con los valores:

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

Esto permite ordenar una copia del arreglo recibido y evita modificar directamente el arreglo original.

La corrección, por lo tanto, modifica únicamente el criterio de ordenamiento y conserva el comportamiento de no mutación que ya estaba presente en la implementación original.

## Solución final

El archivo `kickboxing.js` queda de la siguiente manera:

```javascript
export function calcularResultado(datos) {
  return datos.reduce((total, item) => total + item.puntos, 0);
}

export function ordenarRanking(jugadores) {
  return [...jugadores].sort((a, b) => b.puntos - a.puntos);
}
```

## Validación

### Comando principal

El README del ejercicio indica utilizar:

```bash
npm test -- ejercicios/ejercicio-012/tests/kickboxing.test.js
```

Este comando ejecuta específicamente el archivo de pruebas correspondiente al ejercicio 012.

También puede ejecutarse directamente mediante Vitest:

```bash
npx vitest run ejercicios/ejercicio-012/tests/kickboxing.test.js
```

## Casos validados

### Caso 1: cálculo numérico

Entrada:

```javascript
[
  { nombre: 'ak47-master', puntos: 10 },
  { nombre: 'rpg-tank', puntos: 15 },
  { nombre: 'moto-racer', puntos: 5 }
]
```

Cálculo esperado:

```text
10 + 15 + 5 = 30
```

Resultado esperado:

```text
30
```

La función corregida devuelve:

```javascript
30
```

Por lo tanto, el siguiente test debe pasar:

```javascript
expect(calcularResultado([
  { nombre: 'ak47-master', puntos: 10 },
  { nombre: 'rpg-tank', puntos: 15 },
  { nombre: 'moto-racer', puntos: 5 }
])).toBe(30);
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

Orden correcto por puntaje:

```text
pro -> 22
elite -> 18
novato -> 7
```

Resultado esperado:

```javascript
['pro', 'elite', 'novato']
```

La función corregida produce exactamente ese resultado.

Por lo tanto, el siguiente test debe pasar:

```javascript
expect(ranking.map((item) => item.nombre))
  .toEqual(['pro', 'elite', 'novato']);
```

## Resultado esperado de los tests

Al ejecutar:

```bash
npm test -- ejercicios/ejercicio-012/tests/kickboxing.test.js
```

los dos casos deben finalizar correctamente:

```text
✓ calcula suma numerica y no concatena texto
✓ ordena ranking de mayor a menor puntaje

2 tests passed
```

La salida exacta de Vitest puede variar ligeramente dependiendo de la versión instalada y de la configuración del proyecto.

Lo importante es que ambos tests aparezcan como exitosos y no existan fallos en `kickboxing.test.js`.

## Estructura del ejercicio

La resolución debe quedar dentro de la carpeta personal:

```text
ejercicios/ejercicio-012/resoluciones/carlos-velasco/
├── kickboxing.js
└── README.md
```

No se deben modificar:

```text
ejercicios/ejercicio-012/codigo/kickboxing.js
ejercicios/ejercicio-012/tests/kickboxing.test.js
```

La solución se realiza sobre la copia personal dentro de `resoluciones/carlos-velasco/`.

## Justificación técnica

La corrección de `calcularResultado()` utiliza `reduce()` porque la función necesita transformar una colección de puntos en un único valor numérico.

La expresión:

```javascript
datos.reduce((total, item) => total + item.puntos, 0)
```

utiliza `0` como valor inicial del acumulador y agrega el campo `puntos` de cada elemento.

Esto permite obtener:

```text
0 + 10 + 15 + 5 = 30
```

en lugar de convertir los valores a texto.

Para `ordenarRanking()` se utiliza:

```javascript
b.puntos - a.puntos
```

porque el objetivo es ordenar de mayor a menor.

La diferencia entre ambos criterios es:

```javascript
a.puntos - b.puntos
```

orden ascendente.

```javascript
b.puntos - a.puntos
```

orden descendente.

Además, se conserva:

```javascript
[...jugadores]
```

para evitar mutar el arreglo original.

No se agregaron validaciones, funciones auxiliares ni lógica innecesaria, ya que los tests proporcionados no requieren comportamiento adicional.

## Cumplimiento del objetivo

El objetivo del ejercicio es:

```text
Calcular ganador por tarjetas de jueces.
```

En el contrato real proporcionado por los tests, esto se representa mediante el cálculo y ordenamiento de puntajes.

Después de la corrección:

- Los puntos se suman numéricamente.
- No se concatenan como texto.
- El ranking se ordena de mayor a menor puntaje.
- El arreglo original no se modifica durante el ordenamiento.
- Los dos tests proporcionados deben pasar.
- La solución permanece dentro de la carpeta personal correspondiente.

## Conclusión

Se corrigieron los dos errores intencionales encontrados en `kickboxing.js`.

El primer error hacía que los puntos fueran concatenados mediante `join('')`, generando una cadena como:

```text
"10155"
```

La solución utiliza `reduce()` para obtener correctamente:

```text
30
```

El segundo error utilizaba un comparador ascendente:

```javascript
a.puntos - b.puntos
```

La solución utiliza un comparador descendente:

```javascript
b.puntos - a.puntos
```

para producir:

```javascript
['pro', 'elite', 'novato']
```

Con estas modificaciones se cumple el contrato establecido por `kickboxing.test.js` utilizando la mínima cantidad de cambios necesarios.
```
