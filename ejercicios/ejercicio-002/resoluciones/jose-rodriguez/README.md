# Resolucion ejercicio 002: Inventario RPG

## Error encontrado
- el codigo base anterior realizaba mutacion directa sobre las propiedades de los objetos de los jugadores y no estaba orientado al objetivo del ejercicio (gestion inmutable de pociones).

## Causa raiz 
- Asignacion directa de propiedades (efectos secundarios en memoria) en lugar de retornar copias inmutables mediante el operador *spread* (`...`).

## Cambio aplicado
- Se rediseno el modulo `inventario.js` implementando las funciones `aplicarPocion` y `consumirItemInventario`.
- Se utilizo la sintaxis `{...objeto, propiedad: nuevoValor }` y `.map()` para garantizar que ningun objeto o arreglo original sea alterado.

## Resultado final
Modulo refactorizado cumpliendo el principio de inmutabilidad para el Inventario RPG.

