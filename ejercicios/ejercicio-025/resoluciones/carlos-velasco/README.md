# Ejercicio 025 - Mecanica de motos

## Error encontrado

Se encontraron dos errores en la implementación de `moto-diagnostics.ts`.

El archivo contiene dos funciones:

- `calcularPromedio()`
- `obtenerMejor()`

Los tests permiten identificar que ambas funciones presentan errores en su lógica de procesamiento.

### 1. Error en `calcularPromedio()`

La implementación original era:

```ts
export function calcularPromedio(registros: Registro[]): number {
  // BUG intencional: divide entre el total aunque algunos registros no cuentan.
  const activos = registros.filter((registro) => registro.activo !== false);
  const total = activos.reduce((suma, registro) => suma + registro.puntos, 0);
  return total / registros.length;
}
```

La función filtra correctamente los registros que deben participar en el cálculo:

```ts
const activos = registros.filter((registro) => registro.activo !== false);
```

Sin embargo, después de filtrar los registros, divide el total entre la cantidad original de registros:

```ts
return total / registros.length;
```

Esto genera un promedio incorrecto cuando existen registros inactivos.

El test utiliza:

```ts
[
  { nombre: 'alpha', puntos: 90, activo: true },
  { nombre: 'beta', puntos: 30, activo: false },
  { nombre: 'gamma', puntos: 70, activo: true }
]
```

El registro `beta` tiene:

```text
activo: false
```

por lo que no debe participar en el cálculo.

Los registros que sí deben participar son:

```text
alpha -> 90
gamma -> 70
```

La suma correcta es:

```text
90 + 70 = 160
```

El promedio correcto debe calcularse utilizando únicamente los dos registros activos:

```text
160 / 2 = 80
```

La implementación original utiliza:

```text
160 / 3 = 53.333333333333336
```

Por lo tanto, el resultado no coincide con el valor esperado por el test:

```text
80
```

### 2. Error en `obtenerMejor()`

La implementación original era:

```ts
export function obtenerMejor(registros: Registro[]): Registro | undefined {
  // BUG intencional: devuelve el menor puntaje.
  return [...registros].sort((a, b) => a.puntos - b.puntos)[0];
}
```

El problema se encuentra en el criterio utilizado por `sort()`:

```ts
(a, b) => a.puntos - b.puntos
```

Este comparador ordena los registros de menor a mayor puntaje.

Con los datos del test:

```ts
[
  { nombre: 'render-1', puntos: 40 },
  { nombre: 'render-2', puntos: 96 },
  { nombre: 'render-3', puntos: 80 }
]
```

la implementación original produce:

```text
render-1 -> 40
render-3 -> 80
render-2 -> 96
```

Al obtener el primer elemento mediante:

```ts
[0]
```

la función devuelve:

```text
render-1
```

Sin embargo, el test espera el registro con el mayor puntaje:

```text
render-2 -> 96
```

Por lo tanto, el ordenamiento debe realizarse de mayor a menor.

## Causa raíz

### Causa raíz de `calcularPromedio()`

La causa raíz es que se utiliza un denominador incorrecto.

La función crea correctamente el arreglo de registros que participan:

```ts
const activos = registros.filter((registro) => registro.activo !== false);
```

Después calcula correctamente la suma:

```ts
const total = activos.reduce((suma, registro) => suma + registro.puntos, 0);
```

El error aparece al utilizar:

```ts
registros.length
```

como denominador.

`registros.length` representa la cantidad total de elementos recibidos originalmente, incluyendo aquellos que fueron excluidos del cálculo.

Si el promedio se calcula sobre los registros activos, el denominador también debe representar la cantidad de registros activos.

Por lo tanto, debe utilizarse:

```ts
activos.length
```

La operación correcta es:

```text
suma de puntos activos / cantidad de registros activos
```

En este caso:

```text
160 / 2 = 80
```

### Causa raíz de `obtenerMejor()`

La causa raíz es el orden ascendente utilizado en el comparador de `sort()`.

La expresión original:

```ts
a.puntos - b.puntos
```

ordena los valores de menor a mayor.

Como posteriormente se obtiene:

```ts
[0]
```

se termina devolviendo el registro con el menor puntaje.

El objetivo de la función es obtener el registro con mayor puntaje, por lo que el orden debe ser descendente.

El comparador correcto es:

```ts
b.puntos - a.puntos
```

Con este cambio, los registros quedan ordenados así:

```text
render-2 -> 96
render-3 -> 80
render-1 -> 40
```

Por lo tanto:

```ts
[0]
```

devuelve correctamente:

```text
render-2
```

## Cambio aplicado

### Corrección de `calcularPromedio()`

Se mantuvo la lógica existente de filtrado y acumulación:

```ts
const activos = registros.filter((registro) => registro.activo !== false);
const total = activos.reduce((suma, registro) => suma + registro.puntos, 0);
```

Únicamente se corrigió el denominador:

```ts
return total / activos.length;
```

La función corregida queda:

```ts
export function calcularPromedio(registros: Registro[]): number {
  const activos = registros.filter((registro) => registro.activo !== false);
  const total = activos.reduce((suma, registro) => suma + registro.puntos, 0);
  return total / activos.length;
}
```

Esto garantiza que tanto el numerador como el denominador correspondan al mismo conjunto de registros.

### Corrección de `obtenerMejor()`

Se cambió el criterio de ordenamiento:

```ts
a.puntos - b.puntos
```

por:

```ts
b.puntos - a.puntos
```

La función corregida queda:

```ts
export function obtenerMejor(registros: Registro[]): Registro | undefined {
  return [...registros].sort((a, b) => b.puntos - a.puntos)[0];
}
```

Se conserva:

```ts
[...registros]
```

para crear una copia del arreglo antes de utilizar `sort()`.

Esto evita modificar directamente el arreglo original recibido por la función.

## Explicación técnica

### Promedio únicamente de registros activos

El filtro:

```ts
registro.activo !== false
```

considera como participantes aquellos registros cuyo valor de `activo` no sea explícitamente `false`.

Por lo tanto, tanto:

```ts
activo: true
```

como un registro sin propiedad `activo` pueden participar en el cálculo.

En el caso proporcionado por el test:

```text
alpha -> activo: true  -> participa
beta  -> activo: false -> no participa
gamma -> activo: true  -> participa
```

Los registros considerados son:

```text
alpha = 90
gamma = 70
```

La suma es:

```text
90 + 70 = 160
```

La cantidad de registros considerados es:

```text
2
```

Por lo tanto:

```text
160 / 2 = 80
```

La corrección consiste únicamente en utilizar:

```ts
activos.length
```

en lugar de:

```ts
registros.length
```

### Obtención del mayor puntaje

Para obtener el registro con mayor puntaje se necesita un orden descendente.

La comparación:

```ts
b.puntos - a.puntos
```

coloca primero los valores más altos.

Con:

```text
40
96
80
```

el resultado es:

```text
96
80
40
```

Por eso el primer elemento:

```ts
[0]
```

corresponde al registro:

```text
render-2
```

con:

```text
96 puntos
```

## Validación

### Comando utilizado

```bash
npm test -- ejercicios/ejercicio-025/tests/moto-diagnostics.test.ts
```

También puede utilizarse Vitest directamente:

```bash
npx vitest run ejercicios/ejercicio-025/tests/moto-diagnostics.test.ts
```

## Casos validados

### Caso 1: promedio de registros activos

Entrada:

```ts
[
  { nombre: 'alpha', puntos: 90, activo: true },
  { nombre: 'beta', puntos: 30, activo: false },
  { nombre: 'gamma', puntos: 70, activo: true }
]
```

Registros considerados:

```text
alpha -> 90
gamma -> 70
```

Cálculo:

```text
90 + 70 = 160
160 / 2 = 80
```

Resultado esperado:

```text
80
```

### Caso 2: obtener el registro con mayor puntaje

Entrada:

```ts
[
  { nombre: 'render-1', puntos: 40 },
  { nombre: 'render-2', puntos: 96 },
  { nombre: 'render-3', puntos: 80 }
]
```

Orden correcto:

```text
render-2 -> 96
render-3 -> 80
render-1 -> 40
```

Resultado esperado:

```text
render-2
```

## Resultado esperado de los tests

Los dos casos del archivo `moto-diagnostics.test.ts` deben pasar correctamente:

```text
✓ calcula promedio solo con registros activos
✓ obtiene el registro con mayor puntaje
```

Resultado esperado:

```text
2 tests passed
```

La cantidad exacta de información mostrada por Vitest puede variar según la versión y configuración del proyecto.

Lo importante es que ambos tests aparezcan como exitosos y no existan fallos.

## Estructura del ejercicio

```text
ejercicios/ejercicio-025/resoluciones/carlos-velasco/
├── moto-diagnostics.ts
└── README.md
```

La solución se mantiene dentro de la carpeta personal correspondiente y no modifica el archivo base ni los tests.

## Archivo corregido

La implementación final es:

```ts
export type Registro = {
  nombre: string;
  puntos: number;
  activo?: boolean;
};

export function calcularPromedio(registros: Registro[]): number {
  const activos = registros.filter((registro) => registro.activo !== false);
  const total = activos.reduce((suma, registro) => suma + registro.puntos, 0);
  return total / activos.length;
}

export function obtenerMejor(registros: Registro[]): Registro | undefined {
  return [...registros].sort((a, b) => b.puntos - a.puntos)[0];
}
```

## Justificación técnica

La primera corrección utiliza `activos.length` porque el promedio debe calcularse exclusivamente sobre los registros que participan en la operación.

Utilizar `registros.length` mezclaba registros considerados y no considerados, provocando un denominador incorrecto.

La segunda corrección cambia el ordenamiento de ascendente a descendente porque la función `obtenerMejor()` necesita recuperar el registro con mayor puntaje.

Se mantiene la copia mediante:

```ts
[...registros]
```

para evitar mutar el arreglo original con `sort()`.

No se agregaron funciones auxiliares, validaciones innecesarias ni cambios en los tipos porque los tests no requieren comportamiento adicional.

La solución se limita a corregir los dos errores existentes y conserva el resto de la implementación.

## Conclusión

Se corrigieron los dos errores presentes en `moto-diagnostics.ts`.

El primer error provocaba que el promedio se dividiera entre todos los registros, incluyendo aquellos con `activo: false`. Ahora el promedio utiliza únicamente la cantidad de registros activos.

El segundo error provocaba que `obtenerMejor()` seleccionara el registro con menor puntaje debido al orden ascendente. Ahora los registros se ordenan de mayor a menor y se obtiene correctamente el de mayor puntaje.

La solución final:

- Calcula el promedio únicamente con registros activos.
- Utiliza el denominador correcto para el promedio.
- Obtiene el registro con mayor puntaje.
- Mantiene la inmutabilidad del arreglo recibido.
- No modifica los tests.
- No modifica el archivo base.
- Mantiene el tipado original de TypeScript.
- Se encuentra dentro de `resoluciones/carlos-velasco/`.
- Cumple con el contrato establecido por los tests.

El resultado esperado es que los **2 tests pasen correctamente**.