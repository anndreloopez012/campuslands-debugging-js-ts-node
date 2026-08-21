# Ejercicio 027: Musica

## Error encontrado

Se encontraron dos errores en el archivo `bpm-validator.ts`.

Aunque el contexto y objetivo del README hablan de detectar BPM fuera de rango por genero, el archivo TypeScript y el test proporcionado implementan y validan otra funcionalidad: calcular el promedio de registros activos y obtener el registro con mayor puntaje.

Por esta razón, la solución se basa en el contrato real definido por el código y los tests existentes.

### Error 1: cálculo incorrecto del promedio

La implementación original era:

```ts
export function calcularPromedio(registros: Registro[]): number {
  const activos = registros.filter((registro) => registro.activo !== false);
  const total = activos.reduce((suma, registro) => suma + registro.puntos, 0);
  return total / registros.length;
}
```

El filtro de registros activos funciona correctamente:

```ts
const activos = registros.filter((registro) => registro.activo !== false);
```

También se calcula correctamente el total de los puntos activos:

```ts
const total = activos.reduce((suma, registro) => suma + registro.puntos, 0);
```

El error está en el divisor:

```ts
return total / registros.length;
```

`registros.length` representa la cantidad total de registros, incluyendo aquellos que tienen:

```ts
activo: false
```

El test proporciona:

```ts
[
  { nombre: 'alpha', puntos: 90, activo: true },
  { nombre: 'beta', puntos: 30, activo: false },
  { nombre: 'gamma', puntos: 70, activo: true }
]
```

Los registros que participan en el promedio son:

```text
alpha -> 90
gamma -> 70
```

El total es:

```text
90 + 70 = 160
```

La cantidad de registros activos es:

```text
2
```

Por lo tanto, el promedio correcto es:

```text
160 / 2 = 80
```

La implementación original hacía:

```text
160 / 3 = 53.333...
```

Esto provoca que el test falle.

La corrección consiste en dividir entre la cantidad de registros activos:

```ts
return total / activos.length;
```

### Error 2: selección del registro con menor puntaje

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

Por ejemplo:

```text
40
96
80
```

se convierte en:

```text
40
80
96
```

Al obtener la posición `[0]`, se devuelve:

```text
40
```

correspondiente a:

```text
render-1
```

Sin embargo, el test espera el registro con mayor puntaje:

```text
render-2 -> 96
```

Por lo tanto, el orden debe ser descendente.

La corrección es:

```ts
(a, b) => b.puntos - a.puntos
```

De esta forma:

```text
96
80
40
```

y `[0]` corresponde al registro con mayor puntaje.

## Causa raiz

### Causa raíz del cálculo del promedio

La causa raíz es utilizar la longitud del arreglo original como divisor después de haber filtrado los registros.

Se calcula:

```ts
const activos = registros.filter((registro) => registro.activo !== false);
```

pero posteriormente se ignora esta colección filtrada al calcular el promedio:

```ts
return total / registros.length;
```

Esto genera una inconsistencia entre los elementos utilizados para calcular el total y los elementos utilizados para determinar la cantidad.

El total utiliza únicamente registros activos, mientras que el divisor utiliza todos los registros.

La solución correcta es utilizar:

```ts
activos.length
```

porque representa exactamente la cantidad de registros considerados en el cálculo.

### Causa raíz de `obtenerMejor`

La causa raíz es que el comparador de `sort()` está implementado en orden ascendente:

```ts
(a, b) => a.puntos - b.puntos
```

El objetivo de la función es obtener el registro con mayor puntaje, por lo que el primer elemento después del ordenamiento debe ser el de mayor valor.

Para lograrlo, el comparador debe invertir la operación:

```ts
(a, b) => b.puntos - a.puntos
```

## Cambio aplicado

Se realizaron únicamente los cambios necesarios para cumplir el contrato definido por los tests.

### Cambio 1

Se modificó:

```ts
return total / registros.length;
```

por:

```ts
return total / activos.length;
```

Esto permite calcular el promedio únicamente utilizando los registros activos.

### Cambio 2

Se modificó:

```ts
return [...registros].sort((a, b) => a.puntos - b.puntos)[0];
```

por:

```ts
return [...registros].sort((a, b) => b.puntos - a.puntos)[0];
```

Esto permite obtener el registro con mayor puntaje.

Se conserva:

```ts
[...registros]
```

para evitar modificar directamente el arreglo original recibido por la función.

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
npm test -- ejercicios/ejercicio-027/tests/bpm-validator.test.ts
```

También puede ejecutarse directamente con Vitest:

```bash
npx vitest run ejercicios/ejercicio-027/tests/bpm-validator.test.ts
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

El test debe pasar.

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

El primer elemento corresponde a:

```text
render-2
```

Resultado esperado:

```text
render-2
```

El test debe pasar.

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

El formato exacto de la salida puede variar según la versión de Vitest utilizada.

## Estructura de la entrega

```text
ejercicios/ejercicio-027/resoluciones/carlos-velasco/
+-- bpm-validator.ts
+-- README.md
```

## Conclusión

El ejercicio tenía dos errores independientes.

El primero consistía en dividir el total de puntos activos entre todos los registros, incluyendo los registros inactivos. Se corrigió utilizando `activos.length` como divisor.

El segundo consistía en ordenar los registros de menor a mayor puntaje. Se corrigió utilizando un comparador descendente para que el registro con mayor puntaje ocupe la primera posición.

La solución mantiene el código existente, realiza únicamente las modificaciones necesarias y conserva la copia del arreglo antes de ordenar para evitar mutaciones innecesarias.

No se modificaron los tests ni los archivos base.

La discrepancia entre el objetivo del README (`Detectar BPM fuera de rango por genero`) y el comportamiento real definido por `bpm-validator.ts` y `bpm-validator.test.ts` queda documentada. La solución sigue el contrato comprobable de los tests existentes.