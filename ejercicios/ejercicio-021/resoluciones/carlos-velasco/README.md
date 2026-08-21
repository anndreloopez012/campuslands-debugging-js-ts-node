# Ejercicio 021 - Arquitectura 3D

## Descripción

El ejercicio consiste en corregir una funcionalidad desarrollada en TypeScript que trabaja con registros que contienen un nombre, un puntaje y un estado opcional de actividad.

El código original contiene dos errores intencionales:

1. `calcularPromedio()` filtra correctamente los registros activos, pero utiliza una cantidad incorrecta como divisor.
2. `obtenerMejor()` ordena los registros de menor a mayor y, por esa razón, devuelve el registro con menor puntaje.

La solución se realizó modificando únicamente la implementación necesaria para cumplir el contrato definido por los tests.

## Error encontrado

Se encontraron dos errores en `architecture-budget.ts`.

### 1. Error en `calcularPromedio()`

La implementación original era:

```ts
export function calcularPromedio(registros: Registro[]): number {
  const activos = registros.filter((registro) => registro.activo !== false);
  const total = activos.reduce((suma, registro) => suma + registro.puntos, 0);
  return total / registros.length;
}
```

La función primero filtra correctamente los registros:

```ts
const activos = registros.filter((registro) => registro.activo !== false);
```

Esto significa que únicamente participan en el cálculo los registros cuyo campo `activo` no sea `false`.

Con los datos del test:

```ts
[
  { nombre: 'alpha', puntos: 90, activo: true },
  { nombre: 'beta', puntos: 30, activo: false },
  { nombre: 'gamma', puntos: 70, activo: true }
]
```

los registros activos son:

```text
alpha -> 90
gamma -> 70
```

El registro:

```text
beta -> 30
```

no debe participar porque tiene:

```ts
activo: false
```

La suma correcta es:

```text
90 + 70 = 160
```

Sin embargo, la implementación original divide el total entre:

```ts
registros.length
```

El arreglo original contiene tres registros:

```text
3
```

Por lo tanto, el cálculo incorrecto es:

```text
160 / 3 = 53.333333333333336
```

El test espera:

```text
80
```

porque el promedio debe calcularse únicamente entre los registros activos:

```text
160 / 2 = 80
```

### 2. Error en `obtenerMejor()`

La implementación original era:

```ts
export function obtenerMejor(registros: Registro[]): Registro | undefined {
  return [...registros].sort((a, b) => a.puntos - b.puntos)[0];
}
```

El problema se encuentra en el comparador:

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

el orden producido por la implementación original es:

```text
render-1 -> 40
render-3 -> 80
render-2 -> 96
```

Como la función devuelve el primer elemento:

```ts
[0]
```

termina devolviendo:

```text
render-1
```

Pero el test espera:

```text
render-2
```

porque `render-2` tiene el puntaje más alto:

```text
96
```

## Causa raíz

### Causa raíz de `calcularPromedio()`

La causa raíz es utilizar:

```ts
registros.length
```

como divisor después de haber creado un nuevo arreglo que contiene únicamente los registros activos.

La función realiza correctamente el filtrado:

```ts
const activos = registros.filter((registro) => registro.activo !== false);
```

y también calcula correctamente la suma:

```ts
const total = activos.reduce((suma, registro) => suma + registro.puntos, 0);
```

El error aparece al calcular el promedio:

```ts
return total / registros.length;
```

El numerador corresponde únicamente a los registros activos, pero el denominador corresponde a todos los registros.

Esto mezcla dos conjuntos diferentes de datos.

El promedio debe utilizar el mismo conjunto de elementos tanto para la suma como para el conteo:

```text
suma de activos / cantidad de activos
```

Por esta razón, el divisor correcto es:

```ts
activos.length
```

### Causa raíz de `obtenerMejor()`

La causa raíz está en el sentido del ordenamiento.

La implementación original utiliza:

```ts
a.puntos - b.puntos
```

que produce un orden ascendente:

```text
40
80
96
```

Posteriormente se obtiene:

```ts
[0]
```

por lo que se selecciona el menor puntaje.

El objetivo del ejercicio es obtener el registro con mayor puntaje.

Para ordenar de mayor a menor se debe utilizar:

```ts
b.puntos - a.puntos
```

De esta forma:

```text
96
80
40
```

y el elemento ubicado en la posición `0` será el registro con mayor puntaje.

## Cambio aplicado

### Corrección de `calcularPromedio()`

Se reemplazó:

```ts
return total / registros.length;
```

por:

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

El flujo ahora es:

```text
Registros originales:
90, 30, 70

Registros activos:
90, 70

Suma:
90 + 70 = 160

Cantidad de activos:
2

Promedio:
160 / 2 = 80
```

Esto coincide con el resultado esperado por el test.

### Corrección de `obtenerMejor()`

Se reemplazó:

```ts
(a, b) => a.puntos - b.puntos
```

por:

```ts
(a, b) => b.puntos - a.puntos
```

La función corregida queda:

```ts
export function obtenerMejor(registros: Registro[]): Registro | undefined {
  return [...registros].sort((a, b) => b.puntos - a.puntos)[0];
}
```

El resultado del ordenamiento pasa a ser:

```text
render-2 -> 96
render-3 -> 80
render-1 -> 40
```

Por lo tanto:

```ts
[0]
```

devuelve:

```text
render-2
```

que es exactamente lo que espera el test.

## Justificación técnica

### Uso de `activos.length`

La variable `activos` contiene exactamente los registros que participan en el cálculo.

Por eso, tanto el numerador como el denominador deben pertenecer al mismo conjunto:

```ts
const total = activos.reduce((suma, registro) => suma + registro.puntos, 0);
return total / activos.length;
```

Esta solución mantiene la lógica existente y modifica únicamente el divisor incorrecto.

No es necesario volver a filtrar los registros ni crear una lógica adicional.

### Orden descendente con `sort()`

Para obtener el mayor puntaje primero se utiliza:

```ts
b.puntos - a.puntos
```

Esto invierte el orden respecto al comparador original:

```ts
a.puntos - b.puntos
```

Además, se conserva:

```ts
[...registros]
```

para trabajar sobre una copia del arreglo.

Esto evita que `sort()` modifique directamente el arreglo recibido como argumento.

### Uso del tipo `Registro`

El tipo existente:

```ts
export type Registro = {
  nombre: string;
  puntos: number;
  activo?: boolean;
};
```

se mantiene sin modificaciones.

No se utiliza `any` ni se agregan tipos innecesarios.

El campo:

```ts
activo?: boolean;
```

también se conserva porque el test utiliza registros donde `activo` puede estar definido como `true`, `false` o no estar presente.

La condición:

```ts
registro.activo !== false
```

considera como activos los registros cuyo valor no sea explícitamente `false`, manteniendo el comportamiento que ya tenía la implementación original.

## Validación

### Comando utilizado

```bash
npm test -- ejercicios/ejercicio-021/tests/architecture-budget.test.ts
```

También se puede ejecutar directamente con Vitest:

```bash
npx vitest run ejercicios/ejercicio-021/tests/architecture-budget.test.ts
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

### Caso 2: registro con mayor puntaje

Entrada:

```ts
[
  { nombre: 'render-1', puntos: 40 },
  { nombre: 'render-2', puntos: 96 },
  { nombre: 'render-3', puntos: 80 }
]
```

Orden esperado:

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

Los dos casos del archivo `architecture-budget.test.ts` deben pasar correctamente:

```text
✓ calcula promedio solo con registros activos
✓ obtiene el registro con mayor puntaje

2 tests passed
```

La salida exacta de Vitest puede variar ligeramente dependiendo de la versión instalada y de la configuración del proyecto.

Lo importante es que ambos tests aparezcan como exitosos y no existan errores de ejecución.

## Estructura de la entrega

```text
ejercicios/ejercicio-021/resoluciones/carlos-velasco/
├── architecture-budget.ts
└── README.md
```

La entrega debe mantenerse dentro de la carpeta personal:

```text
resoluciones/carlos-velasco/
```

No se deben modificar los archivos originales ubicados en:

```text
ejercicios/ejercicio-021/codigo/
```

ni los tests ubicados en:

```text
ejercicios/ejercicio-021/tests/
```

## Archivo corregido

El contenido final de `architecture-budget.ts` es:

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

## Resultado final

La corrección resuelve los dos errores identificados:

1. `calcularPromedio()` ahora divide la suma de puntos entre la cantidad de registros activos, produciendo correctamente `80`.
2. `obtenerMejor()` ahora ordena los registros de mayor a menor puntaje y devuelve correctamente `render-2`.

No se modificaron los tests ni se agregaron comportamientos que no formen parte del contrato del ejercicio.

La solución utiliza el mínimo cambio necesario para corregir la causa raíz de cada bug y mantiene la estructura y los tipos originales del código.

## Autor

```text
Hecho por: Carlos Velasco
Ejercicio: 021 - Arquitectura 3D
Tecnología: TypeScript
Tipo de corrección: Bug fix
```