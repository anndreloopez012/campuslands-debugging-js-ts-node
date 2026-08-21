# Solución Ejercicio 030: Validador de Build MOBA

## Error Encontrado

Tanto el archivo de código como el de test para este ejercicio contenían código de un ejercicio anterior. Una vez reemplazados por la lógica correcta, el bug original inferido en la función `isValidBuild` era que no aplicaba correctamente las restricciones del juego:

1.  No limitaba la cantidad de objetos "Míticos" a uno por build.
2.  No limitaba la cantidad de "Botas" a un par por build.
3.  La validación del número máximo de objetos podía ser incorrecta.

## Causa Raíz

La causa raíz del bug hipotético sería una serie de validaciones incompletas o incorrectas. La función no contaba adecuadamente la cantidad de ítems de tipos específicos (`Mythic`, `Boots`) y, por lo tanto, no podía hacer cumplir las reglas del juego.

## Cambio Aplicado

La solución implementa una serie de validaciones claras y secuenciales:

1.  Primero, se comprueba si la longitud total de la `build` excede el máximo de 6 ítems.
2.  Luego, se usa `filter` para contar el número de ítems de tipo `Mythic` y se asegura que no sea mayor que 1.
3.  Se repite el proceso para los ítems de tipo `Boots`.
4.  Si todas las validaciones pasan, la función retorna `true`.

```typescript
// Lógica de corrección clave
if (build.length > MAX_ITEMS) {
  return false;
}
const mythicCount = build.filter(item => item.type === 'Mythic').length;
if (mythicCount > MAX_MYTHICS) {
  return false;
}
```

## Comando Usado para Validar

```bash
npm test -- ejercicios/ejercicio-030/tests/moba-build.test.ts
```

## Resultado Final
```text
camper@campus-H610M-K-V2:~/campuslands-debugging-js-ts-node-Eve-1$ npm test -- ejercicios/ejercicio-030/tests/moba-build.test.ts

> campuslands-debugging-js-ts-node@1.0.0 test
> vitest run ejercicios/ejercicio-030/tests/moba-build.test.ts


 RUN  v4.1.10 /home/camper/campuslands-debugging-js-ts-node-Eve-1

 ✓ ejercicios/ejercicio-030/tests/moba-build.test.ts (5 tests) 3ms
   ✓ ejercicio 030: MOBA Build Validator (5)
     ✓ should return true for a valid build 1ms
     ✓ should return false if build has more than 6 items 0ms
     ✓ should return false if build has more than one mythic item 0ms
     ✓ should return false if build has more than one pair of boots 0ms
     ✓ should return true for a build with 0 items 0ms

 Test Files  1 passed (1)
      Tests  5 passed (5)
   Start at  08:22:28
   Duration  111ms (transform 18ms, setup 0ms, import 27ms, tests 3ms, environment 0ms)

camper@campus-H610M-K-V2:~/campuslands-debugging-js-ts-node-Eve-1$ 

```