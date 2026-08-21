# Ejercicio 033 - Animación 3D

## Error encontrado

Se encontraron dos errores en la implementación de `render-farm.ts`.

Los tests proporcionados establecen dos comportamientos concretos:

- `calcularPromedio()` debe calcular el promedio únicamente de los registros activos.
- `obtenerMejor()` debe devolver el registro con mayor puntaje.

### Error 1: `calcularPromedio()` utilizaba un denominador incorrecto

La implementación original era:

```typescript
export function calcularPromedio(registros: Registro[]): number {
  // BUG intencional: divide entre el total aunque algunos registros no cuentan.
  const activos = registros.filter((registro) => registro.activo !== false);
  const total = activos.reduce((suma, registro) => suma + registro.puntos, 0);
  return total / registros.length;
}
```

La función filtraba correctamente los registros activos:

```typescript
const activos = registros.filter((registro) => registro.activo !== false);
```

Sin embargo, posteriormente utilizaba:

```typescript
return total / registros.length;
```

El problema es que `registros.length` representa la cantidad total de registros, incluyendo aquellos que tienen:

```typescript
activo: false
```

El test utiliza:

```typescript
[
  { nombre: 'alpha', puntos: 90, activo: true },
  { nombre: 'beta', puntos: 30, activo: false },
  { nombre: 'gamma', puntos: 70, activo: true }
]
```

El registro `beta` está inactivo y no debe participar en el cálculo.

Los registros activos son:

```text
alpha = 90
gamma = 70
```

La suma correcta es:

```text
90 + 70 = 160
```

La cantidad de registros activos es:

```text
2
```

Por lo tanto, el promedio esperado es:

```text
160 / 2 = 80
```

La implementación original calculaba:

```text
160 / 3 = 53.333333333333336
```

Por eso el resultado no coincidía con el test.

### Error 2: `obtenerMejor()` devolvía el menor puntaje

La implementación original era:

```typescript
export function obtenerMejor(registros: Registro[]): Registro | undefined {
  // BUG intencional: devuelve el menor puntaje.
  return [...registros].sort((a, b) => a.puntos - b.puntos)[0];
}
```

El comparador utilizado era:

```typescript
(a, b) => a.puntos - b.puntos
```

Este comparador ordena los registros de menor a mayor puntaje.

El test utiliza:

```typescript
[
  { nombre: 'render-1', puntos: 40 },
  { nombre: 'render-2', puntos: 96 },
  { nombre: 'render-3', puntos: 80 }
]
```

El orden producido por la implementación original era:

```text
render-1 = 40
render-3 = 80
render-2 = 96
```

Como la función devuelve el primer elemento:

```typescript
[0]
```

terminaba devolviendo:

```text
render-1
```

Pero el test espera:

```text
render-2
```

porque `render-2` tiene el mayor puntaje:

```text
96 > 80 > 40
```

## Causa raíz

### Causa raíz de `calcularPromedio()`

La causa raíz fue utilizar diferentes colecciones para el numerador y el denominador del promedio.

La función ya había filtrado correctamente los registros activos:

```typescript
const activos = registros.filter((registro) => registro.activo !== false);
```

Esto significa que `activos` contiene únicamente los registros que deben participar en el cálculo.

Con los datos del test:

```typescript
[
  { nombre: 'alpha', puntos: 90, activo: true },
  { nombre: 'beta', puntos: 30, activo: false },
  { nombre: 'gamma', puntos: 70, activo: true }
]
```

el resultado de `filter()` es:

```typescript
[
  { nombre: 'alpha', puntos: 90, activo: true },
  { nombre: 'gamma', puntos: 70, activo: true }
]
```

Después, `reduce()` calcula correctamente la suma:

```typescript
const total = activos.reduce((suma, registro) => suma + registro.puntos, 0);
```

El resultado es:

```text
90 + 70 = 160
```

El error ocurre en el denominador:

```typescript
registros.length
```

`registros.length` vale `3`, aunque solamente existen `2` registros activos.

El denominador correcto es:

```typescript
activos.length
```

porque el promedio debe utilizar la misma colección que fue utilizada para calcular la suma.

La expresión corregida es:

```typescript
return total / activos.length;
```

Esto produce:

```text
160 / 2 = 80
```

### Causa raíz de `obtenerMejor()`

La causa raíz fue utilizar un comparador ascendente cuando el contrato exige obtener el mayor puntaje.

El código original utilizaba:

```typescript
(a, b) => a.puntos - b.puntos
```

Este comparador coloca primero los valores menores.

Con los puntajes:

```text
40, 96, 80
```

el arreglo queda ordenado como:

```text
40, 80, 96
```

y:

```typescript
[0]
```

devuelve el menor puntaje.

Para obtener el mayor puntaje primero, el comparador debe ser descendente:

```typescript
(a, b) => b.puntos - a.puntos
```

El resultado será:

```text
96, 80, 40
```

Por lo tanto:

```typescript
[0]
```

devuelve correctamente:

```typescript
{ nombre: 'render-2', puntos: 96 }
```

## Cambio aplicado

### Corrección de `calcularPromedio()`

Código original:

```typescript
export function calcularPromedio(registros: Registro[]): number {
  const activos = registros.filter((registro) => registro.activo !== false);
  const total = activos.reduce((suma, registro) => suma + registro.puntos, 0);
  return total / registros.length;
}
```

Código corregido:

```typescript
export function calcularPromedio(registros: Registro[]): number {
  const activos = registros.filter((registro) => registro.activo !== false);
  const total = activos.reduce((suma, registro) => suma + registro.puntos, 0);
  return total / activos.length;
}
```

El único cambio necesario fue reemplazar:

```typescript
registros.length
```

por:

```typescript
activos.length
```

De esta manera, tanto el numerador como el denominador utilizan únicamente los registros que cumplen la condición de estar activos.

### Corrección de `obtenerMejor()`

Código original:

```typescript
export function obtenerMejor(registros: Registro[]): Registro | undefined {
  return [...registros].sort((a, b) => a.puntos - b.puntos)[0];
}
```

Código corregido:

```typescript
export function obtenerMejor(registros: Registro[]): Registro | undefined {
  return [...registros].sort((a, b) => b.puntos - a.puntos)[0];
}
```

El único cambio fue invertir el comparador:

```typescript
a.puntos - b.puntos
```

por:

```typescript
b.puntos - a.puntos
```

Esto hace que los registros con mayor puntaje queden primero.

Se conserva:

```typescript
[...registros]
```

para evitar modificar el arreglo original mediante `sort()`.

No fue necesario agregar funciones, validaciones adicionales ni modificar los tipos existentes.

## Validación

El comando indicado por el README del ejercicio es:

```bash
npm test -- ejercicios/ejercicio-033/tests/render-farm.test.ts
```

También puede utilizarse:

```bash
npx vitest run ejercicios/ejercicio-033/tests/render-farm.test.ts
```

Los tests originales no fueron modificados.

## Casos validados

### Caso 1: promedio únicamente con registros activos

Entrada:

```typescript
[
  { nombre: 'alpha', puntos: 90, activo: true },
  { nombre: 'beta', puntos: 30, activo: false },
  { nombre: 'gamma', puntos: 70, activo: true }
]
```

El filtro:

```typescript
registro.activo !== false
```

mantiene:

```text
alpha = 90
gamma = 70
```

El registro:

```text
beta = 30
```

no participa porque tiene:

```typescript
activo: false
```

Suma:

```text
90 + 70 = 160
```

Cantidad de registros activos:

```text
2
```

Promedio:

```text
160 / 2 = 80
```

Resultado esperado:

```typescript
80
```

### Caso 2: obtener el registro con mayor puntaje

Entrada:

```typescript
[
  { nombre: 'render-1', puntos: 40 },
  { nombre: 'render-2', puntos: 96 },
  { nombre: 'render-3', puntos: 80 }
]
```

Puntajes:

```text
render-1 = 40
render-2 = 96
render-3 = 80
```

Orden descendente:

```text
96 > 80 > 40
```

Después del ordenamiento:

```typescript
[
  { nombre: 'render-2', puntos: 96 },
  { nombre: 'render-3', puntos: 80 },
  { nombre: 'render-1', puntos: 40 }
]
```

El primer elemento:

```typescript
[0]
```

es:

```typescript
{ nombre: 'render-2', puntos: 96 }
```

Por lo tanto:

```typescript
mejor?.nombre
```

produce:

```text
render-2
```

## Resultado esperado de los tests

Los tests definidos en `render-farm.test.ts` son:

```text
✓ calcula promedio solo con registros activos
✓ obtiene el registro con mayor puntaje

2 tests passed
```

El formato exacto de la salida puede variar según la versión y configuración de Vitest.

No se modificaron ni se inventaron tests adicionales.

## Estructura del ejercicio

```text
ejercicios/ejercicio-033/resoluciones/carlos-velasco/
├── render-farm.ts
└── README.md
```

## Autor

```text
- Hecho por: Carlos Velasco
- Ejercicio: 033 - Animación 3D
- Tecnología: TypeScript
- Tipo de corrección: Bug fix
```

## Justificación técnica

La solución respeta directamente el contrato establecido por los tests.

En `calcularPromedio()`, la función ya disponía de una colección filtrada llamada `activos`. Utilizar `activos.length` como denominador garantiza que la cantidad utilizada para calcular el promedio corresponda exactamente con los registros utilizados para obtener la suma.

La implementación corregida es:

```typescript
const activos = registros.filter((registro) => registro.activo !== false);
const total = activos.reduce((suma, registro) => suma + registro.puntos, 0);
return total / activos.length;
```

`filter()` determina qué registros participan, `reduce()` obtiene la suma de sus puntos y `activos.length` determina cuántos registros participan en el promedio.

En `obtenerMejor()`, se utiliza un comparador descendente:

```typescript
(a, b) => b.puntos - a.puntos
```

Esto coloca primero el registro con mayor cantidad de puntos.

También se conserva:

```typescript
[...registros]
```

porque `sort()` muta el arreglo que recibe. La copia permite realizar el ordenamiento sin alterar los datos originales.

El tipo:

```typescript
Registro | undefined
```

también se mantiene porque la función puede no tener un elemento disponible si recibe un arreglo vacío. No fue necesario modificar este contrato porque los tests y la implementación existente ya lo contemplan.

No se agregaron validaciones innecesarias, funciones nuevas ni cambios en el archivo de tests.

Aunque el contexto general del ejercicio indica como objetivo "Calcular frames renderizados por escena", el archivo base y los tests proporcionados implementan y verifican una funcionalidad de registros, promedio de activos y obtención del mayor puntaje. Por ello, la solución se basa en el contrato real y verificable definido por `render-farm.ts` y `render-farm.test.ts`, sin inventar una funcionalidad diferente a la proporcionada.

## Conclusión

Se encontraron dos bugs en `render-farm.ts`.

El primer bug estaba en `calcularPromedio()`. La función filtraba correctamente los registros activos y calculaba correctamente su suma, pero dividía el total entre la cantidad de registros originales.

Se corrigió:

```typescript
return total / registros.length;
```

por:

```typescript
return total / activos.length;
```

Con los datos del test, el resultado correcto es:

```text
90 + 70 = 160
160 / 2 = 80
```

El segundo bug estaba en `obtenerMejor()`. El comparador ordenaba los registros de menor a mayor:

```typescript
(a, b) => a.puntos - b.puntos
```

Se corrigió utilizando un orden descendente:

```typescript
(a, b) => b.puntos - a.puntos
```

De esta forma, el registro con `96` puntos queda primero y el resultado esperado es:

```text
render-2
```

Se mantuvieron los tipos, las funciones existentes, las exportaciones y la copia `[...registros]`.

Los tests originales no fueron modificados y los dos casos definidos por `render-farm.test.ts` deben pasar correctamente.