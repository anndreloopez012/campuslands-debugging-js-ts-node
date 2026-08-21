# Solución Ejercicio 032: Paracaidismo

## Error Encontrado

La función `canJump` no validaba correctamente el checklist de seguridad para un salto en paracaídas. Devolvía `true` incluso si solo uno de los elementos requeridos estaba marcado como `true`, cuando la regla de negocio es que todos los ítems deben estar verificados para poder saltar.

## Causa Raíz

El error se encontraba en la lógica de validación dentro de la función. La implementación original utilizaba el método `Array.prototype.some()`. Este método comprueba si **al menos un** elemento en el array pasa la prueba, lo cual es incorrecto para un checklist de seguridad donde todos los puntos deben ser positivos.

Para que la validación sea correcta, se necesita asegurar que **todos** los elementos del checklist sean `true`.

## Cambio Aplicado

La corrección consistió en reemplazar el método `some()` por `Array.prototype.every()`. El método `every()` comprueba si **todos** los elementos en el array satisfacen la condición, garantizando que la función solo devuelva `true` si cada ítem del checklist está verificado.

```typescript
// Lógica de corrección clave
export function canJump(checklist: SkydiverChecklist): boolean {
  const items = Object.values(checklist);
  return items.every(item => item === true);
}
```

## Comando Usado para Validar

```bash
npm test -- ejercicios/ejercicio-032/tests/skydiving.test.ts
```

## Resultado Final
```text
camper@campus-H610M-K-V2:~/campuslands-debugging-js-ts-node-Eve-1$ npm test -- ejercicios/ejercicio-032/tests/skydiving.test.ts

> campuslands-debugging-js-ts-node@1.0.0 test
> vitest run ejercicios/ejercicio-032/tests/skydiving.test.ts


 RUN  v4.1.10 /home/camper/campuslands-debugging-js-ts-node-Eve-1

 ✓ ejercicios/ejercicio-032/tests/skydiving.test.ts (3 tests) 3ms
   ✓ ejercicio 032 - Skydiving Checklist (3)
     ✓ should return true if all checklist items are true 1ms
     ✓ should return false if any checklist item is false 0ms
     ✓ should return false if all checklist items are false 0ms

 Test Files  1 passed (1)
      Tests  3 passed (3)
   Start at  09:16:44
   Duration  101ms (transform 17ms, setup 0ms, import 24ms, tests 3ms, environment 0ms)

camper@campus-H610M-K-V2:~/campuslands-debugging-js-ts-node-Eve-1$ 
```