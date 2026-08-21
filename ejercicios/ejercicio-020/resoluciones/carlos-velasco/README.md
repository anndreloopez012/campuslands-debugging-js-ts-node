# Ejercicio 020 - Equipo de esports

## Error encontrado

Se encontraron dos errores funcionales en la implementación de `esports-team.ts`.

El archivo utiliza TypeScript y define un tipo `Registro` con las propiedades:

```typescript
export type Registro = {
  nombre: string;
  puntos: number;
  activo?: boolean;
};
```

Los tests establecen dos comportamientos que la implementación original no cumple correctamente:

1. `calcularPromedio()` debe calcular el promedio únicamente utilizando los registros activos.
2. `obtenerMejor()` debe devolver el registro que tenga el mayor puntaje.

Los dos errores están relacionados con la lógica de cálculo y selección de registros.

## Error en `calcularPromedio`

La implementación original era:

```typescript
export function calcularPromedio(registros: Registro[]): number {
  const activos = registros.filter((registro) => registro.activo !== false);
  const total = activos.reduce((suma, registro) => suma + registro.puntos, 0);
  return total / registros.length;
}
```

La función realiza correctamente el primer paso:

```typescript
const activos = registros.filter((registro) => registro.activo !== false);
```

Esto obtiene únicamente los registros que deben participar en el promedio.

Con los datos del test:

```typescript
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

Por lo tanto, el total correcto es:

```text
90 + 70 = 160
```

Sin embargo, la implementación original divide el total entre:

```typescript
registros.length
```

El arreglo original tiene tres registros:

```text
3
```

Por lo tanto, la operación realizada actualmente es:

```text
160 / 3 = 53.333...
```

El test espera:

```text
80
```

porque el promedio debe calcularse únicamente utilizando los dos registros activos:

```text
160 / 2 = 80
```

El error, por lo tanto, no está en el filtrado ni en la suma, sino en utilizar la longitud del arreglo original como divisor.

## Error en `obtenerMejor`

La implementación original era:

```typescript
export function obtenerMejor(registros: Registro[]): Registro | undefined {
  return [...registros].sort((a, b) => a.puntos - b.puntos)[0];
}
```

La función crea correctamente una copia del arreglo:

```typescript
[...registros]
```

Sin embargo, el comparador:

```typescript
(a, b) => a.puntos - b.puntos
```

ordena los registros de menor a mayor puntaje.

El test proporciona:

```typescript
[
  { nombre: 'render-1', puntos: 40 },
  { nombre: 'render-2', puntos: 96 },
  { nombre: 'render-3', puntos: 80 }
]
```

El orden producido por la implementación original es:

```text
render-1 -> 40
render-3 -> 80
render-2 -> 96
```

Después se obtiene el primer elemento:

```typescript
[0]
```

Por lo tanto, la función devuelve:

```text
render-1
```

Pero el test espera:

```text
render-2
```

porque `render-2` tiene el mayor puntaje:

```text
96
```

## Causa raíz

### Causa raíz de `calcularPromedio`

La causa raíz es utilizar:

```typescript
registros.length
```

como divisor después de haber filtrado los registros.

La función trabaja con un subconjunto llamado:

```typescript
activos
```

Por lo tanto, el número de elementos que participan en el promedio debe obtenerse de:

```typescript
activos.length
```

La implementación original mezcla dos conjuntos diferentes:

```text
registros -> todos los registros
activos   -> registros que participan en el promedio
```

El numerador utiliza únicamente `activos`:

```typescript
const total = activos.reduce(
  (suma, registro) => suma + registro.puntos,
  0
);
```

pero el denominador utiliza `registros`:

```typescript
total / registros.length
```

Esto produce un cálculo inconsistente.

El numerador y el denominador deben pertenecer al mismo conjunto de datos.

La operación correcta es:

```typescript
total / activos.length
```

### Causa raíz de `obtenerMejor`

La causa raíz es que el criterio de ordenamiento está configurado de forma ascendente:

```typescript
a.puntos - b.puntos
```

Esto coloca primero los puntajes menores.

Como posteriormente se selecciona:

```typescript
[0]
```

se obtiene precisamente el registro con menor puntaje.

Para obtener el registro con mayor puntaje utilizando este enfoque, se debe ordenar de forma descendente:

```typescript
b.puntos - a.puntos
```

De esta forma, el registro con mayor cantidad de puntos queda en la primera posición.

## Cambio aplicado

Se realizaron únicamente los cambios necesarios para corregir los dos errores detectados.

### Corrección de `calcularPromedio`

Se reemplazó:

```typescript
return total / registros.length;
```

por:

```typescript
return total / activos.length;
```

La función corregida queda:

```typescript
export function calcularPromedio(registros: Registro[]): number {
  const activos = registros.filter((registro) => registro.activo !== false);
  const total = activos.reduce((suma, registro) => suma + registro.puntos, 0);
  return total / activos.length;
}
```

Con los datos del test:

```text
alpha -> 90 -> activo
beta  -> 30 -> inactivo
gamma -> 70 -> activo
```

se excluye `beta`.

El cálculo queda:

```text
90 + 70 = 160
160 / 2 = 80
```

Resultado:

```text
80
```

### Corrección de `obtenerMejor`

Se reemplazó:

```typescript
(a, b) => a.puntos - b.puntos
```

por:

```typescript
(a, b) => b.puntos - a.puntos
```

La función corregida queda:

```typescript
export function obtenerMejor(registros: Registro[]): Registro | undefined {
  return [...registros].sort((a, b) => b.puntos - a.puntos)[0];
}
```

Con los datos:

```text
render-1 -> 40
render-2 -> 96
render-3 -> 80
```

el orden descendente queda:

```text
render-2 -> 96
render-3 -> 80
render-1 -> 40
```

Por lo tanto:

```typescript
[0]
```

devuelve:

```text
render-2
```

que es exactamente el registro esperado por el test.

## Solución completa aplicada

El archivo `esports-team.ts` corregido queda así:

```typescript
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

## Validación

El comando indicado por el README para ejecutar las pruebas es:

```bash
npm test -- ejercicios/ejercicio-020/tests/esports-team.test.ts
```

También puede ejecutarse directamente con Vitest:

```bash
npx vitest run ejercicios/ejercicio-020/tests/esports-team.test.ts
```

## Casos comprobados

### Caso 1: promedio de registros activos

Entrada:

```typescript
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

### Caso 2: registro con mayor puntaje

Entrada:

```typescript
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

El test verifica:

```typescript
expect(mejor?.nombre).toBe('render-2');
```

Por lo tanto, la solución debe devolver un objeto cuyo `nombre` sea `render-2`.

## Resultado esperado de los tests

Los dos casos definidos en `esports-team.test.ts` deben pasar:

```text
✓ calcula promedio solo con registros activos
✓ obtiene el registro con mayor puntaje
```

Resultado esperado:

```text
2 tests passed
```

La salida visual exacta puede variar dependiendo de la versión y configuración de Vitest.

Lo importante es que ambos tests finalicen correctamente en estado `passed`.

## Estructura final

La entrega debe quedar organizada de esta manera:

```text
ejercicios/ejercicio-020/resoluciones/carlos-velasco/
├── esports-team.ts
└── README.md
```

No se deben modificar los archivos originales:

```text
ejercicios/ejercicio-020/codigo/esports-team.ts
ejercicios/ejercicio-020/tests/esports-team.test.ts
```

La corrección debe permanecer dentro de:

```text
ejercicios/ejercicio-020/resoluciones/carlos-velasco/
```

## Justificación técnica

La corrección de `calcularPromedio()` mantiene la lógica existente de filtrado y acumulación porque ambas operaciones ya son correctas.

El problema estaba únicamente en el divisor.

La función determina primero qué registros participan:

```typescript
const activos = registros.filter((registro) => registro.activo !== false);
```

Después calcula la suma sobre esos mismos registros:

```typescript
const total = activos.reduce(
  (suma, registro) => suma + registro.puntos,
  0
);
```

Por consistencia matemática, el promedio debe dividirse por la cantidad de elementos de ese mismo conjunto:

```typescript
total / activos.length
```

No tendría sentido utilizar:

```typescript
registros.length
```

porque incluiría registros que fueron excluidos del cálculo.

En `obtenerMejor()` se conserva:

```typescript
[...registros]
```

porque `sort()` modifica el arreglo sobre el que trabaja.

Crear una copia permite mantener intacto el arreglo original.

El comparador:

```typescript
b.puntos - a.puntos
```

ordena de mayor a menor y permite obtener el mejor registro mediante:

```typescript
[0]
```

La solución no agrega lógica innecesaria ni modifica el tipo `Registro`, ya que la definición existente:

```typescript
export type Registro = {
  nombre: string;
  puntos: number;
  activo?: boolean;
};
```

ya es suficiente para satisfacer los tests proporcionados.

También se conserva el retorno:

```typescript
Registro | undefined
```

porque el arreglo podría no contener registros y, en ese caso, acceder a la primera posición puede producir `undefined`.

## Conclusión

El ejercicio contenía dos errores.

El primero estaba en el cálculo del promedio. La función filtraba correctamente los registros activos, pero posteriormente dividía la suma entre la cantidad total de registros, incluyendo los inactivos.

Se corrigió utilizando:

```typescript
total / activos.length
```

El segundo error estaba en `obtenerMejor()`. La función ordenaba los registros de menor a mayor y posteriormente seleccionaba el primer elemento, obteniendo así el peor puntaje.

Se corrigió utilizando un orden descendente:

```typescript
b.puntos - a.puntos
```

Con estas modificaciones:

- El promedio utiliza únicamente registros activos.
- El registro con mayor puntaje es seleccionado correctamente.
- Se mantiene la tipificación de TypeScript.
- Se evita mutar el arreglo original.
- No se modifican los tests.
- No se modifica el archivo base.
- La solución queda dentro de la carpeta personal.
- Los dos tests proporcionados deben pasar correctamente.

## Autor

```text
Hecho por: Carlos Velasco
Ejercicio: 020 - Equipo de esports
Tecnología: TypeScript
Tipo de corrección: Bug fix
```