# Ejercicio 026 - Libros

## Error encontrado

Se encontraron dos errores en la implementación de `book-progress.ts`.

El archivo contiene dos funciones principales:

- `calcularPromedio()`
- `obtenerMejor()`

Los tests proporcionados permiten identificar que ambas funciones presentan errores en la lógica utilizada para calcular el promedio y seleccionar el registro con mayor puntaje.

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

La función realiza correctamente el filtrado de los registros que deben participar:

```ts
const activos = registros.filter((registro) => registro.activo !== false);
```

También calcula correctamente la suma de sus puntos:

```ts
const total = activos.reduce((suma, registro) => suma + registro.puntos, 0);
```

El error aparece en la última operación:

```ts
return total / registros.length;
```

Se está utilizando la cantidad total de registros recibidos, aunque algunos registros fueron excluidos mediante el filtro.

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

por lo tanto, no debe participar en el cálculo.

Los registros considerados son:

```text
alpha -> 90
gamma -> 70
```

La suma de los registros activos es:

```text
90 + 70 = 160
```

Existen solamente dos registros activos:

```text
2
```

Por lo tanto, el promedio correcto es:

```text
160 / 2 = 80
```

La implementación original divide entre los tres registros:

```text
160 / 3 = 53.333333333333336
```

Este resultado no coincide con el valor esperado por el test:

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

El problema se encuentra en el comparador utilizado por `sort()`:

```ts
(a, b) => a.puntos - b.puntos
```

Este criterio ordena los registros de menor a mayor.

El test proporciona:

```ts
[
  { nombre: 'render-1', puntos: 40 },
  { nombre: 'render-2', puntos: 96 },
  { nombre: 'render-3', puntos: 80 }
]
```

Con el comparador original, el orden queda:

```text
render-1 -> 40
render-3 -> 80
render-2 -> 96
```

Como posteriormente se obtiene el primer elemento:

```ts
[0]
```

la función devuelve:

```text
render-1
```

Sin embargo, el contrato definido por el test requiere obtener el registro con mayor puntaje:

```text
render-2 -> 96
```

Por lo tanto, el ordenamiento debe realizarse de mayor a menor.

## Causa raíz

### Causa raíz de `calcularPromedio()`

La causa raíz es utilizar `registros.length` como denominador después de haber filtrado los registros.

La función trabaja con este conjunto:

```ts
const activos = registros.filter((registro) => registro.activo !== false);
```

Por lo tanto, el promedio debe calcularse utilizando únicamente la cantidad de elementos contenidos en `activos`.

La implementación incorrecta:

```ts
return total / registros.length;
```

utiliza todos los registros originales.

La implementación correcta:

```ts
return total / activos.length;
```

utiliza solamente los registros que realmente participaron en la suma.

Esto mantiene coherencia entre:

- El numerador: suma de registros activos.
- El denominador: cantidad de registros activos.

### Causa raíz de `obtenerMejor()`

La causa raíz es utilizar un ordenamiento ascendente:

```ts
a.puntos - b.puntos
```

Este criterio coloca primero los valores más pequeños.

Como la función posteriormente devuelve:

```ts
[0]
```

termina seleccionando el registro con menor puntaje.

Para obtener el mayor puntaje es necesario utilizar un ordenamiento descendente:

```ts
b.puntos - a.puntos
```

De esta manera, los registros quedan ordenados desde el mayor puntaje hasta el menor.

## Cambio aplicado

### Corrección de `calcularPromedio()`

Se mantuvo el filtrado original:

```ts
const activos = registros.filter((registro) => registro.activo !== false);
```

También se mantuvo la suma:

```ts
const total = activos.reduce((suma, registro) => suma + registro.puntos, 0);
```

El único cambio necesario fue reemplazar:

```ts
return total / registros.length;
```

por:

```ts
return total / activos.length;
```

La función corregida es:

```ts
export function calcularPromedio(registros: Registro[]): number {
  const activos = registros.filter((registro) => registro.activo !== false);
  const total = activos.reduce((suma, registro) => suma + registro.puntos, 0);
  return total / activos.length;
}
```

Con los datos del test:

```text
90 + 70 = 160
160 / 2 = 80
```

Resultado:

```text
80
```

### Corrección de `obtenerMejor()`

Se cambió el comparador:

```ts
a.puntos - b.puntos
```

por:

```ts
b.puntos - a.puntos
```

La función corregida es:

```ts
export function obtenerMejor(registros: Registro[]): Registro | undefined {
  return [...registros].sort((a, b) => b.puntos - a.puntos)[0];
}
```

Con los datos del test:

```text
render-1 -> 40
render-2 -> 96
render-3 -> 80
```

el nuevo orden es:

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

## Explicación técnica

### Funcionamiento de `calcularPromedio()`

La función recibe un arreglo de objetos que cumplen el tipo:

```ts
Registro
```

El tipo establece:

```ts
export type Registro = {
  nombre: string;
  puntos: number;
  activo?: boolean;
};
```

La propiedad `activo` es opcional.

El filtro:

```ts
registro.activo !== false
```

hace que solamente se excluyan explícitamente los registros cuyo valor sea:

```ts
false
```

Por ejemplo:

```text
activo: true  -> participa
activo: false -> no participa
sin activo    -> participa
```

En el caso probado:

```text
alpha -> 90 -> participa
beta  -> 30 -> excluido
gamma -> 70 -> participa
```

La suma es:

```text
160
```

La cantidad de registros utilizados es:

```text
2
```

Por lo tanto:

```text
160 / 2 = 80
```

La corrección utiliza `activos.length` porque representa exactamente el número de elementos sobre los cuales se calculó la suma.

### Funcionamiento de `obtenerMejor()`

La función necesita encontrar el registro con el mayor valor de `puntos`.

El uso de:

```ts
[...registros]
```

crea una copia superficial del arreglo.

Esto es importante porque `sort()` modifica el arreglo sobre el que se ejecuta.

Al trabajar con una copia:

```ts
[...registros].sort(...)
```

se evita alterar directamente el arreglo original recibido como parámetro.

El comparador:

```ts
b.puntos - a.puntos
```

establece un orden descendente.

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

Por esta razón, el primer elemento corresponde al registro con mayor puntaje.

## Validación

### Comando utilizado

```bash
npm test -- ejercicios/ejercicio-026/tests/book-progress.test.ts
```

También puede ejecutarse directamente mediante Vitest:

```bash
npx vitest run ejercicios/ejercicio-026/tests/book-progress.test.ts
```

## Casos validados

### Caso 1: promedio únicamente con registros activos

Entrada:

```ts
[
  { nombre: 'alpha', puntos: 90, activo: true },
  { nombre: 'beta', puntos: 30, activo: false },
  { nombre: 'gamma', puntos: 70, activo: true }
]
```

Registros utilizados:

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

El test valida:

```ts
expect(mejor?.nombre).toBe('render-2');
```

## Resultado esperado de los tests

Los dos tests de `book-progress.test.ts` deben pasar correctamente:

```text
✓ calcula promedio solo con registros activos
✓ obtiene el registro con mayor puntaje
```

Resultado esperado:

```text
2 tests passed
```

La salida exacta de Vitest puede variar según la versión y configuración del proyecto, pero ambos tests deben aparecer como exitosos y no debe existir ningún fallo.

## Estructura del ejercicio

```text
ejercicios/ejercicio-026/resoluciones/carlos-velasco/
├── book-progress.ts
└── README.md
```

La solución se mantiene dentro de la carpeta personal correspondiente.

No se modifica:

- El archivo base.
- El archivo de tests.
- Archivos pertenecientes a otros estudiantes.

## Archivo final corregido

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

La corrección de `calcularPromedio()` utiliza `activos.length` porque el promedio debe representar exclusivamente los registros que cumplen la condición de participación.

Utilizar:

```ts
registros.length
```

después de excluir registros provoca que el denominador no corresponda con los elementos utilizados para obtener la suma.

La corrección de `obtenerMejor()` utiliza:

```ts
b.puntos - a.puntos
```

porque el objetivo es seleccionar el registro con mayor puntaje.

Se conserva:

```ts
[...registros]
```

para evitar la mutación del arreglo original provocada por `sort()`.

No se agregaron funciones auxiliares ni validaciones adicionales porque los tests existentes no requieren ese comportamiento.

Los cambios se limitaron a corregir los dos errores identificados, manteniendo la estructura y el contrato original del código.

## Conclusión

Se corrigieron los dos errores presentes en `book-progress.ts`.

El primer error provocaba que el promedio utilizara como denominador todos los registros, incluso aquellos que estaban marcados como inactivos. Ahora se utiliza únicamente la cantidad de registros que participan en el cálculo.

El segundo error provocaba que `obtenerMejor()` seleccionara el menor puntaje debido al ordenamiento ascendente. Ahora los registros se ordenan de mayor a menor y se obtiene correctamente el registro con mayor puntuación.

La solución final:

- Calcula el promedio únicamente con registros activos.
- Utiliza el número correcto de registros como denominador.
- Obtiene el registro con mayor puntaje.
- Conserva el tipado de TypeScript.
- Evita modificar el arreglo original al ordenar.
- No modifica los tests.
- No modifica el archivo base.
- Mantiene únicamente los cambios necesarios.
- Se encuentra dentro de `resoluciones/carlos-velasco/`.
- Cumple con el contrato definido por los tests.

El resultado esperado es que los **2 tests pasen correctamente**.