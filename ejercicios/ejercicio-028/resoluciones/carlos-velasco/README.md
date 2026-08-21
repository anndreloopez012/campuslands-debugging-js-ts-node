# Ejercicio 028: Futbol

## Error encontrado

Se encontraron dos errores en el archivo `football-league.ts`.

Aunque el objetivo indicado en el README es "Calcular puntos y desempate en liga", el código y los tests proporcionados implementan otra funcionalidad: calcular el promedio únicamente de registros activos y obtener el registro con mayor puntaje.

Por esta razón, la solución se basa en el comportamiento real definido por `football-league.ts` y `football-league.test.ts`.

### Error 1: cálculo incorrecto del promedio

La implementación original era:

```ts
export function calcularPromedio(registros: Registro[]): number {
  const activos = registros.filter((registro) => registro.activo !== false);
  const total = activos.reduce((suma, registro) => suma + registro.puntos, 0);
  return total / registros.length;
}
```

La función filtra correctamente los registros activos:

```ts
const activos = registros.filter((registro) => registro.activo !== false);
```

También calcula correctamente la suma de sus puntos:

```ts
const total = activos.reduce((suma, registro) => suma + registro.puntos, 0);
```

El error se encuentra en la división:

```ts
return total / registros.length;
```

`registros.length` incluye tanto los registros activos como los inactivos.

El test utiliza:

```ts
[
  { nombre: 'alpha', puntos: 90, activo: true },
  { nombre: 'beta', puntos: 30, activo: false },
  { nombre: 'gamma', puntos: 70, activo: true }
]
```

Los registros considerados deben ser:

```text
alpha -> 90
gamma -> 70
```

La suma es:

```text
90 + 70 = 160
```

La cantidad de registros activos es:

```text
2
```

Por lo tanto:

```text
160 / 2 = 80
```

La implementación original realiza:

```text
160 / 3 = 53.333...
```

Esto no coincide con el resultado esperado por el test.

La corrección consiste en utilizar:

```ts
activos.length
```

como divisor.

### Error 2: `obtenerMejor()` devuelve el menor puntaje

La implementación original era:

```ts
export function obtenerMejor(registros: Registro[]): Registro | undefined {
  return [...registros].sort((a, b) => a.puntos - b.puntos)[0];
}
```

El comparador:

```ts
(a, b) => a.puntos - b.puntos
```

ordena los registros de menor a mayor.

Con los datos del test:

```text
render-1 -> 40
render-2 -> 96
render-3 -> 80
```

el resultado del ordenamiento original es:

```text
render-1 -> 40
render-3 -> 80
render-2 -> 96
```

Al utilizar:

```ts
[0]
```

se obtiene:

```text
render-1
```

Pero el test espera:

```text
render-2
```

porque tiene el mayor puntaje:

```text
96
```

Para ordenar de mayor a menor se debe utilizar:

```ts
(a, b) => b.puntos - a.puntos
```

## Causa raiz

### Causa raíz del cálculo del promedio

La función utiliza dos conjuntos diferentes para realizar el cálculo.

El numerador utiliza únicamente registros activos:

```ts
const total = activos.reduce((suma, registro) => suma + registro.puntos, 0);
```

Pero el denominador utiliza todos los registros:

```ts
registros.length
```

Esto provoca que los registros inactivos afecten incorrectamente el promedio.

La cantidad utilizada como divisor debe corresponder con la misma colección utilizada para calcular el total:

```ts
activos.length
```

### Causa raíz de `obtenerMejor()`

El comparador de `sort()` estaba configurado en orden ascendente:

```ts
(a, b) => a.puntos - b.puntos
```

Esto coloca primero el menor puntaje.

Como la función debe obtener el registro con mayor puntaje, el ordenamiento debe ser descendente:

```ts
(a, b) => b.puntos - a.puntos
```

De esta forma, el registro con mayor cantidad de puntos queda en la posición `[0]`.

## Cambio aplicado

Se realizaron únicamente los cambios necesarios.

### Cambio 1: promedio

Se cambió:

```ts
return total / registros.length;
```

por:

```ts
return total / activos.length;
```

Ahora el promedio se calcula exclusivamente con los registros activos.

### Cambio 2: mejor registro

Se cambió:

```ts
return [...registros].sort((a, b) => a.puntos - b.puntos)[0];
```

por:

```ts
return [...registros].sort((a, b) => b.puntos - a.puntos)[0];
```

Ahora el registro con mayor puntaje queda primero.

Se conserva:

```ts
[...registros]
```

para evitar modificar directamente el arreglo original mediante `sort()`.

## Solución final

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

## Comando usado para validar

```bash
npm test -- ejercicios/ejercicio-028/tests/football-league.test.ts
```

También puede ejecutarse directamente con Vitest:

```bash
npx vitest run ejercicios/ejercicio-028/tests/football-league.test.ts
```

## Validación del primer caso

Entrada:

```ts
[
  { nombre: 'alpha', puntos: 90, activo: true },
  { nombre: 'beta', puntos: 30, activo: false },
  { nombre: 'gamma', puntos: 70, activo: true }
]
```

Registros activos:

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

El primer test debe pasar.

## Validación del segundo caso

Entrada:

```ts
[
  { nombre: 'render-1', puntos: 40 },
  { nombre: 'render-2', puntos: 96 },
  { nombre: 'render-3', puntos: 80 }
]
```

Orden descendente:

```text
render-2 -> 96
render-3 -> 80
render-1 -> 40
```

El registro obtenido mediante `[0]` es:

```text
render-2
```

Resultado esperado:

```text
render-2
```

El segundo test debe pasar.

## Resultado final

Los dos casos definidos en el test deben pasar correctamente:

```text
✓ calcula promedio solo con registros activos
✓ obtiene el registro con mayor puntaje
```

Resultado esperado:

```text
2 tests passed
```

El formato exacto de la salida puede variar dependiendo de la versión de Vitest.

## Estructura de la entrega

```text
ejercicios/ejercicio-028/resoluciones/carlos-velasco/
+-- football-league.ts
+-- README.md
```

## Conclusión

Se corrigieron dos errores en `football-league.ts`.

El primer error provocaba que el promedio se dividiera entre todos los registros, incluyendo los inactivos. Se corrigió utilizando `activos.length`.

El segundo error provocaba que `obtenerMejor()` devolviera el registro con menor puntaje debido a un ordenamiento ascendente. Se corrigió utilizando un ordenamiento descendente.

La solución realiza únicamente los cambios necesarios para cumplir el contrato establecido por los tests.

No se modificaron los tests ni los archivos base.

La discrepancia entre el objetivo del README, que menciona puntos y desempates de una liga de fútbol, y el comportamiento real definido por el código y los tests queda documentada. La solución sigue el contrato verificable de los tests existentes.