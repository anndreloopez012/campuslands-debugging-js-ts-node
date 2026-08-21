# Solución Ejercicio 029: Motor de Daño

## Error Encontrado

Tanto el archivo de código como el de test para este ejercicio contenían código de un ejercicio anterior. Una vez reemplazados por la lógica correcta, el bug original inferido en la función `calculateDamage` era doble:

1.  Los modificadores de daño por tipo elemental (debilidad/resistencia) no se aplicaban correctamente.
2.  El cálculo podía resultar en un daño de 0 o negativo, cuando la regla de negocio exige un daño mínimo de 1.

## Causa Raíz

La causa raíz del bug hipotético era una fórmula de cálculo incorrecta. El daño base (`ataque - defensa`) no se multiplicaba por el modificador elemental, y no existía una comprobación final para asegurar que el resultado fuera al menos 1.

## Cambio Aplicado

La solución implementa una lógica de cálculo de daño robusta:

1.  Se obtiene el modificador elemental (ej: `2` para debilidad, `0.5` para resistencia) de una matriz de modificadores.
2.  El daño base se multiplica por este modificador.
3.  Se utiliza `Math.max(1, ...)` para garantizar que el valor devuelto nunca sea inferior a 1.

```typescript
// Lógica de corrección clave
const modifier = MODIFIERS[attacker.type]?.[defender.type] ?? 1;
const baseDamage = attacker.attack - defender.defense;
const totalDamage = baseDamage * modifier;
return Math.max(1, Math.floor(totalDamage));
```

## Comando Usado para Validar

```bash
npm test -- ejercicios/ejercicio-029/tests/damage-engine.test.ts
```

## Resultado Final
```text
camper@campus-H610M-K-V2:~/campuslands-debugging-js-ts-node-Eve-1$ npm test -- ejercicios/ejercicio-029/tests/damage-engine.test.ts                      
                                                                                                                                   
> campuslands-debugging-js-ts-node@1.0.0 test
> vitest run ejercicios/ejercicio-029/tests/damage-engine.test.ts


 RUN  v4.1.10 /home/camper/campuslands-debugging-js-ts-node-Eve-1

 ✓ ejercicios/ejercicio-029/tests/damage-engine.test.ts (5 tests) 3ms
   ✓ ejercicio 029: Damage Engine (5)
     ✓ should calculate normal damage correctly when attack > defense 1ms
     ✓ should apply weakness modifier (2x damage) 0ms
     ✓ should apply resistance modifier (0.5x damage) 0ms
     ✓ should deal a minimum of 1 damage if attack is lower than defense 0ms
     ✓ should deal a minimum of 1 damage even with resistance 0ms

 Test Files  1 passed (1)
      Tests  5 passed (5)
   Start at  08:11:05
   Duration  112ms (transform 18ms, setup 0ms, import 27ms, tests 3ms, environment 0ms)

camper@campus-H610M-K-V2:~/campuslands-debugging-js-ts-node-Eve-1$ 

```