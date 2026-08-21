# Ejercicio 014 - Tatuajes

## Error encontrado

Se encontraron dos errores intencionales en la implementación de `tattoo-agenda.js`.

Existe una diferencia entre el objetivo descrito en el README y el contrato real definido por los archivos entregados.

El README indica que el objetivo es:

```text
Validar agenda y duración de sesiones.
```

Sin embargo, el archivo de pruebas `tattoo-agenda.test.js` no contiene casos relacionados con agendas, horarios o duración de sesiones.

Los tests disponibles verifican específicamente:

- Que `calcularResultado()` realice una suma numérica de los valores `puntos`.
- Que `ordenarRanking()` ordene los elementos de mayor a menor puntaje.

Por esta razón, la corrección se realiza tomando como contrato principal el comportamiento definido por los tests existentes. No se agrega lógica de agenda o duración que no esté especificada en los casos de prueba.

### 1. Error en `calcularResultado()`

La implementación original era:

```javascript
export function calcularResultado(datos) {
  return datos.map(item => item.puntos).join('');
}
```

El primer paso:

```javascript
datos.map(item => item.puntos)
```

extrae correctamente los puntos de cada elemento.

Con los datos utilizados por el test:

```javascript
[
  { nombre: 'ak47-master', puntos: 10 },
  { nombre: 'rpg-tank', puntos: 15 },
  { nombre: 'moto-racer', puntos: 5 }
]
```

el resultado de `map()` es:

```javascript
[10, 15, 5]
```

El problema aparece al utilizar:

```javascript
.join('')
```

`join()` no suma los valores. En cambio, convierte los elementos en texto y los concatena.

Por lo tanto:

```javascript
[10, 15, 5].join('')
```

produce:

```text
"10155"
```

Pero el test espera:

```text
30
```

La implementación original, por lo tanto, no cumple con el resultado esperado.

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

Con el comparador original, el orden obtenido es:

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

Por lo tanto, el criterio de ordenamiento debe modificarse para obtener un orden descendente.

## Causa raíz

### Causa raíz de `calcularResultado()`

La causa raíz es el uso de `join('')` para realizar una operación matemática.

`join()` está diseñado para unir elementos de un arreglo y devolver una cadena de texto.

Por ejemplo:

```javascript
[10, 15, 5].join('')
```

produce:

```text
"10155"
```

El objetivo definido por el test requiere realizar:

```text
10 + 15 + 5 = 30
```

Por lo tanto, se necesita una operación de acumulación numérica.

`reduce()` es apropiado para este caso porque permite recorrer todos los elementos y acumular sus puntos en un único resultado.

### Causa raíz de `ordenarRanking()`

La causa raíz está en el comparador utilizado por `sort()`:

```javascript
(a, b) => a.puntos - b.puntos
```

Este comparador establece un orden ascendente.

Con los valores:

```text
7, 22, 18
```

el resultado ascendente es:

```text
7, 18, 22
```

Pero el contrato del test exige:

```text
22, 18, 7
```

Para obtener ese resultado se debe invertir el comparador:

```javascript
(a, b) => b.puntos - a.puntos
```

Esto produce un orden descendente por puntaje.

## Cambio aplicado

Se realizaron únicamente los cambios necesarios para cumplir el contrato establecido por los tests.

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

El proceso de acumulación es:

```text
0 + 10 = 10
10 + 15 = 25
25 + 5 = 30
```

Resultado final:

```text
30
```

De esta manera, la función devuelve un número y cumple con la expectativa:

```javascript
.toBe(30)
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

el resultado ahora es:

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

que coincide con el resultado esperado por el test.

### Conservación de la copia del arreglo

Se mantiene:

```javascript
[...jugadores]
```

antes de ejecutar `sort()`:

```javascript
return [...jugadores].sort((a, b) => b.puntos - a.puntos);
```

Esto permite trabajar sobre una copia del arreglo y evita modificar directamente el arreglo original recibido por la función.

No fue necesario modificar este comportamiento porque ya estaba correctamente implementado.

## Solución final

El archivo `tattoo-agenda.js` queda de la siguiente manera:

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
npm test -- ejercicios/ejercicio-014/tests/tattoo-agenda.test.js
```

También puede ejecutarse directamente mediante Vitest:

```bash
npx vitest run ejercicios/ejercicio-014/tests/tattoo-agenda.test.js
```

La prueba debe realizarse después de colocar la solución corregida en:

```text
ejercicios/ejercicio-014/resoluciones/carlos-velasco/tattoo-agenda.js
```

## Casos validados

### Caso 1: cálculo de la suma

Entrada:

```javascript
[
  { nombre: 'ak47-master', puntos: 10 },
  { nombre: 'rpg-tank', puntos: 15 },
  { nombre: 'moto-racer', puntos: 5 }
]
```

Operación esperada:

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

Por lo tanto, debe pasar:

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

Orden correcto:

```text
pro -> 22
elite -> 18
novato -> 7
```

Resultado esperado:

```javascript
['pro', 'elite', 'novato']
```

La implementación corregida genera exactamente este resultado.

Por lo tanto, debe pasar:

```javascript
expect(ranking.map((item) => item.nombre))
  .toEqual(['pro', 'elite', 'novato']);
```

## Resultado esperado de los tests

Al ejecutar:

```bash
npm test -- ejercicios/ejercicio-014/tests/tattoo-agenda.test.js
```

los dos casos deben finalizar correctamente:

```text
✓ calcula suma numerica y no concatena texto
✓ ordena ranking de mayor a menor puntaje

2 tests passed
```

La salida exacta puede variar ligeramente dependiendo de la versión de Vitest y de la configuración del proyecto.

Lo importante es que los dos tests aparezcan como exitosos y no existan errores en `tattoo-agenda.test.js`.

## Estructura del ejercicio

La resolución debe quedar dentro de la carpeta personal:

```text
ejercicios/ejercicio-014/resoluciones/carlos-velasco/
├── tattoo-agenda.js
└── README.md
```

No se deben modificar los archivos base:

```text
ejercicios/ejercicio-014/codigo/tattoo-agenda.js
ejercicios/ejercicio-014/tests/tattoo-agenda.test.js
```

La corrección se realiza únicamente sobre la copia ubicada en:

```text
ejercicios/ejercicio-014/resoluciones/carlos-velasco/
```

## Justificación técnica

La corrección de `calcularResultado()` utiliza `reduce()` porque el contrato real del test requiere obtener un único valor numérico a partir de todos los puntos.

La expresión:

```javascript
datos.reduce((total, item) => total + item.puntos, 0)
```

utiliza `0` como valor inicial y acumula los puntos:

```text
0 + 10 + 15 + 5 = 30
```

Esto evita la concatenación de texto provocada por `join()`.

Para `ordenarRanking()` se utiliza:

```javascript
b.puntos - a.puntos
```

porque el resultado esperado requiere ordenar de mayor a menor.

Los dos criterios producen comportamientos diferentes:

```javascript
a.puntos - b.puntos
```

Orden ascendente:

```text
7, 18, 22
```

Mientras que:

```javascript
b.puntos - a.puntos
```

produce un orden descendente:

```text
22, 18, 7
```

También se mantiene:

```javascript
[...jugadores]
```

para evitar modificar el arreglo original durante el proceso de ordenamiento.

No se agregaron funciones auxiliares, validaciones adicionales ni lógica innecesaria porque los tests proporcionados no requieren ese comportamiento.

## Cumplimiento del objetivo

El objetivo textual del ejercicio indica:

```text
Validar agenda y duración de sesiones.
```

Sin embargo, los tests proporcionados no contienen ninguna validación relacionada con:

- Agenda.
- Fechas.
- Horarios.
- Duración de sesiones.
- Disponibilidad de tatuadores.
- Conflictos entre sesiones.

En cambio, los tests existentes evalúan exclusivamente:

1. La suma numérica de `puntos`.
2. El ordenamiento descendente de jugadores.

Por esta razón, no se inventó una implementación adicional de agenda o duración.

La solución sigue el contrato ejecutable definido por `tattoo-agenda.test.js`, aplicando únicamente las correcciones necesarias sobre el código existente.

## Conclusión

Se corrigieron los dos errores intencionales presentes en `tattoo-agenda.js`.

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

La solución cumple el contrato definido por los tests proporcionados y realiza únicamente los cambios necesarios para corregir los errores identificados.