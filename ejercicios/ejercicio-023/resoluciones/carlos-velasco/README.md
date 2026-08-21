# Ejercicio 023 - Ropa streetwear

## Descripción

El ejercicio consiste en corregir una implementación existente en TypeScript relacionada con el manejo de registros y sus puntajes.

Aunque la temática del ejercicio es ropa streetwear y el objetivo indica modelar tallas y stock con tipos seguros, el contrato real de la funcionalidad está definido por el código y los tests proporcionados.

El archivo `streetwear-stock.ts` contiene dos errores intencionales:

1. `calcularPromedio()` filtra correctamente los registros activos, pero divide la suma entre la cantidad total de registros.
2. `obtenerMejor()` ordena los registros de menor a mayor puntaje y, por lo tanto, devuelve el registro con menor puntuación.

La solución corrige únicamente estos dos errores sin modificar los tests ni agregar lógica innecesaria.

## Error encontrado

Se encontraron dos errores en `streetwear-stock.ts`.

### 1. Error en `calcularPromedio()`

La implementación original es:

```ts
export function calcularPromedio(registros: Registro[]): number {
  // BUG intencional: divide entre el total aunque algunos registros no cuentan.
  const activos = registros.filter((registro) => registro.activo !== false);
  const total = activos.reduce((suma, registro) => suma + registro.puntos, 0);
  return total / registros.length;
}
```

La función realiza correctamente el filtrado de registros:

```ts
const activos = registros.filter((registro) => registro.activo !== false);
```

Esto significa que los registros con:

```ts
activo: false
```

no deben participar en el cálculo del promedio.

El test proporciona:

```ts
[
  { nombre: 'alpha', puntos: 90, activo: true },
  { nombre: 'beta', puntos: 30, activo: false },
  { nombre: 'gamma', puntos: 70, activo: true }
]
```

Los registros que deben participar son:

```text
alpha -> 90
gamma -> 70
```

El registro:

```text
beta -> 30
```

debe ser excluido porque está marcado como inactivo.

La suma de los registros activos es:

```text
90 + 70 = 160
```

Sin embargo, el código original utiliza:

```ts
registros.length
```

como divisor.

El arreglo original contiene tres elementos:

```text
3
```

Por lo tanto, la operación realizada por el código original es:

```text
160 / 3 = 53.333333333333336
```

El test espera:

```text
80
```

El cálculo correcto es:

```text
160 / 2 = 80
```

donde `2` corresponde a la cantidad de registros activos.

### 2. Error en `obtenerMejor()`

La implementación original es:

```ts
export function obtenerMejor(registros: Registro[]): Registro | undefined {
  // BUG intencional: devuelve el menor puntaje.
  return [...registros].sort((a, b) => a.puntos - b.puntos)[0];
}
```

El problema está en el comparador:

```ts
(a, b) => a.puntos - b.puntos
```

Este comparador ordena los registros de menor a mayor.

El test utiliza:

```ts
[
  { nombre: 'render-1', puntos: 40 },
  { nombre: 'render-2', puntos: 96 },
  { nombre: 'render-3', puntos: 80 }
]
```

Con el comparador original, el resultado queda ordenado así:

```text
render-1 -> 40
render-3 -> 80
render-2 -> 96
```

Como posteriormente se obtiene:

```ts
[0]
```

la función devuelve:

```text
render-1
```

Pero el test espera:

```text
render-2
```

porque es el registro con mayor puntaje:

```text
96
```

## Causa raíz

### Causa raíz de `calcularPromedio()`

La causa raíz está en que el código utiliza dos conjuntos diferentes para realizar el cálculo.

La suma se realiza sobre:

```ts
activos
```

pero el divisor utiliza:

```ts
registros.length
```

La operación original equivale conceptualmente a:

```text
suma de registros activos / cantidad de todos los registros
```

Esto es incorrecto.

El promedio debe calcularse utilizando el mismo conjunto de registros tanto para la suma como para el conteo:

```text
suma de registros activos / cantidad de registros activos
```

Por esta razón, el divisor correcto es:

```ts
activos.length
```

La función ya tenía correctamente implementado el filtrado y la suma, por lo que no fue necesario modificar esas partes.

### Causa raíz de `obtenerMejor()`

La causa raíz está en el sentido del ordenamiento utilizado por `sort()`.

El código original utiliza:

```ts
a.puntos - b.puntos
```

Este comparador produce un orden ascendente:

```text
40
80
96
```

Al obtener el primer elemento mediante:

```ts
[0]
```

se selecciona el menor puntaje.

Como la función debe devolver el registro con mayor puntaje, el ordenamiento debe ser descendente.

Para ello se utiliza:

```ts
b.puntos - a.puntos
```

El resultado será:

```text
96
80
40
```

y el elemento ubicado en la posición `0` será el registro con mayor puntuación.

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

La implementación corregida es:

```ts
export function calcularPromedio(registros: Registro[]): number {
  const activos = registros.filter((registro) => registro.activo !== false);
  const total = activos.reduce((suma, registro) => suma + registro.puntos, 0);
  return total / activos.length;
}
```

El cálculo ahora funciona de la siguiente manera:

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

El resultado coincide con el valor esperado por el test.

### Corrección de `obtenerMejor()`

Se reemplazó:

```ts
(a, b) => a.puntos - b.puntos
```

por:

```ts
(a, b) => b.puntos - a.puntos
```

La implementación corregida es:

```ts
export function obtenerMejor(registros: Registro[]): Registro | undefined {
  return [...registros].sort((a, b) => b.puntos - a.puntos)[0];
}
```

Ahora el orden de los registros es:

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

que es exactamente el resultado esperado.

## Justificación técnica

### Promedio de registros activos

La función utiliza:

```ts
const activos = registros.filter((registro) => registro.activo !== false);
```

para determinar qué registros participan en el cálculo.

Posteriormente utiliza:

```ts
const total = activos.reduce((suma, registro) => suma + registro.puntos, 0);
```

para obtener la suma de los puntos de esos registros.

Por consistencia, el divisor también debe corresponder al mismo arreglo:

```ts
activos.length
```

La implementación final es:

```ts
return total / activos.length;
```

Esto mantiene una única fuente de datos para el cálculo del promedio.

No fue necesario agregar funciones auxiliares ni realizar un segundo filtrado.

### Ordenamiento del registro con mayor puntaje

Para seleccionar el registro con mayor puntuación se utiliza:

```ts
b.puntos - a.puntos
```

Este comparador ordena los valores de forma descendente.

La estructura:

```ts
[...registros]
```

se mantiene porque crea una copia superficial del arreglo antes de utilizar `sort()`.

Esto evita modificar directamente el arreglo recibido como argumento.

Por lo tanto, la función conserva el comportamiento de no mutar el arreglo original.

### Tipado TypeScript

El tipo original:

```ts
export type Registro = {
  nombre: string;
  puntos: number;
  activo?: boolean;
};
```

se conserva sin modificaciones.

No se utiliza `any` ni se eliminan las restricciones de tipos existentes.

El campo:

```ts
activo?: boolean;
```

continúa siendo opcional y la condición:

```ts
registro.activo !== false
```

mantiene el comportamiento definido originalmente: solo se excluyen los registros cuyo valor sea explícitamente `false`.

## Validación

### Comando utilizado

```bash
npm test -- ejercicios/ejercicio-023/tests/streetwear-stock.test.ts
```

También puede utilizarse directamente Vitest:

```bash
npx vitest run ejercicios/ejercicio-023/tests/streetwear-stock.test.ts
```

## Casos validados

### Caso 1: promedio solo con registros activos

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

Registro excluido:

```text
beta -> 30
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

### Caso 2: obtiene el registro con mayor puntaje

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

Los dos tests proporcionados en `streetwear-stock.test.ts` deben pasar correctamente:

```text
✓ calcula promedio solo con registros activos
✓ obtiene el registro con mayor puntaje

2 tests passed
```

La salida exacta puede variar ligeramente dependiendo de la versión y configuración de Vitest.

Lo importante es que ambos tests sean reportados como exitosos y no existan errores de ejecución.

## Estructura de la entrega

```text
ejercicios/ejercicio-023/resoluciones/carlos-velasco/
├── streetwear-stock.ts
└── README.md
```

La solución debe permanecer dentro de la carpeta personal:

```text
resoluciones/carlos-velasco/
```

No se deben modificar los archivos originales de:

```text
ejercicios/ejercicio-023/codigo/
```

ni los archivos de prueba ubicados en:

```text
ejercicios/ejercicio-023/tests/
```

## Archivo corregido completo

El contenido final de `streetwear-stock.ts` es:

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

Se corrigieron los dos bugs identificados en `streetwear-stock.ts`.

### Corrección 1

`calcularPromedio()` ahora utiliza:

```ts
activos.length
```

como divisor, por lo que el promedio se calcula exclusivamente con los registros activos.

Resultado:

```text
80
```

### Corrección 2

`obtenerMejor()` ahora ordena los registros de mayor a menor mediante:

```ts
b.puntos - a.puntos
```

Por lo tanto, devuelve correctamente:

```text
render-2
```

Las correcciones respetan el contrato establecido por los tests, mantienen los tipos TypeScript existentes y no modifican los archivos base ni los tests.

No se agregaron validaciones o comportamientos adicionales que no sean necesarios para resolver los errores encontrados.

## Conclusión

El código ahora cumple correctamente con los casos definidos en `streetwear-stock.test.ts`.

La solución aplica cambios mínimos sobre la causa raíz:

1. El promedio utiliza únicamente los registros activos.
2. El registro con mayor puntaje es seleccionado correctamente.
3. El arreglo original no se modifica durante el ordenamiento.
4. Los tipos TypeScript originales se mantienen.
5. Los tests no fueron modificados.

## Autor

```text
Hecho por: Carlos Velasco
Ejercicio: 023 - Ropa streetwear
Tecnología: TypeScript
Tipo de corrección: Bug fix
```