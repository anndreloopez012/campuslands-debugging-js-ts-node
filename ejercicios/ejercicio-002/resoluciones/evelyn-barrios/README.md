 # Solución Ejercicio 002: Inventario RPG

## Error Encontrado

Al ejecutar la prueba de validación, se detectó que la función `addPotion` modificaba el objeto de inventario original que se le pasaba como argumento. El test que verifica la inmutabilidad (`NO debe mutar (modificar) el inventario original`) fallaba, demostrando que la función estaba produciendo un efecto secundario no deseado.

## Causa Raíz

El problema se originaba porque JavaScript pasa los objetos y arrays por referencia. La implementación original de la función probablemente utilizaba un método como `.push()` directamente sobre el array `potions` del inventario. Esta acción modifica el array original en lugar de crear una copia, rompiendo el principio de inmutabilidad esperado para la función.

## Cambio Aplicado

Para corregir el bug, se refactorizó la función `addPotion` para que devuelva un nuevo objeto de inventario sin alterar el original. Los cambios fueron:

1.  Se utilizó el *spread syntax* (`...`) para crear una copia del array `potions` y añadir el nuevo elemento: `const newPotions = [...inventory.potions, potion];`.
2.  Se creó un nuevo objeto de inventario, copiando las propiedades del original y asignando el nuevo array de pociones: `const newInventory = { ...inventory, potions: newPotions };`.

De esta forma, la función se vuelve pura y predecible, devolviendo una nueva instancia del estado en lugar de mutar la existente.

## Comando Usado para Validar

```bash
npm test -- ejercicios/ejercicio-002/tests/inventory.test.js
```

## Resultado Final

```text
 PS C:\Users\barri\campuslands-debugging-js-ts-node-Eve> npm test -- ejercicios/ejercicio-002/tests/inventory.test.js

> campuslands-debugging-js-ts-node@1.0.0 test
> vitest run ejercicios/ejercicio-002/tests/inventory.test.js


 RUN  v4.1.10 C:/Users/barri/campuslands-debugging-js-ts-node-Eve

 ✓ ejercicios/ejercicio-002/tests/inventory.test.js (2 tests) 4ms
   ✓ ejercicio 002: addPotion (2)
     ✓ debe agregar una poción al inventario y devolver un nuevo objeto 3ms
     ✓ NO debe mutar (modificar) el inventario original 0ms

 Test Files  1 passed (1)
      Tests  2 passed (2)
   Start at  20:13:05
   Duration  244ms (transform 23ms, setup 0ms, import 39ms, tests 4ms, environment 0ms)

PS C:\Users\barri\campuslands-debugging-js-ts-node-Eve> 
```