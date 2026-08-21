# README — Ejercicio 011: Battle Royale

## ¿Qué esperaba el test?

Los tests esperaban que las funciones trabajaran específicamente con la lógica del ejercicio de Battle Royale:

- `detectarSobrevivientes()` debía devolver únicamente los jugadores que todavía tienen vida.
- Un jugador con `vida: 0` debía considerarse eliminado.
- `detectarZonaSegura()` debía devolver únicamente las zonas marcadas como seguras.
- Si no existían zonas seguras, debía devolver un arreglo vacío.

## ¿Qué recibió realmente?

Antes de la corrección, la implementación no estaba adaptada al caso específico del ejercicio.

El código utilizaba funciones genéricas relacionadas con resultados y rankings, por lo que no realizaba directamente las operaciones necesarias para:

- Identificar jugadores sobrevivientes.
- Identificar jugadores eliminados.
- Detectar zonas seguras.

Después de la modificación, las funciones devuelven los resultados esperados para cada caso de prueba.

## ¿El error es de tipo, lógica, async, HTTP o estructura?

El problema era de **lógica y estructura de la solución**.

No era un error `async`, HTTP ni de tipos. La implementación necesitaba representar correctamente el comportamiento solicitado para el ejercicio de Battle Royale.

Se reemplazaron las funciones genéricas por funciones específicas:

```js
detectarSobrevivientes()
detectarZonaSegura()