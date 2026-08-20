# Resolución Ejercicio 002: Inventario RPG

## Error encontrado
- El código base anterior realizaba mutación directa sobre las propiedades de los objetos de los jugadores y no estaba orientado al objetivo del ejercicio (gestión inmutable de pociones).

## Causa raíz
- Asignación directa de propiedades (efectos secundarios en memoria) en lugar de retornar copias inmutables mediante el operador *spread* (`...`).

## Cambio aplicado
- Se rediseñó el módulo `inventory.js` implementando las funciones `aplicarPocion` y `consumirItemInventario`.
- Se utilizó la sintaxis `{ ...objeto, propiedad: nuevoValor }` y `.map()` para garantizar que ningún objeto o arreglo original sea alterado.

## Resultado final
Módulo refactorizado cumpliendo el principio de inmutabilidad para el Inventario RPG.