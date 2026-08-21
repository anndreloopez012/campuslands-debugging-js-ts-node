# Ejercicio 021: Depuración de Presupuesto de Arquitectura

## 1. Error Encontrado

Al ejecutar las pruebas, se detectó que la función `esPresupuestoValido` siempre devolvía `true`, incluso cuando el costo total de los materiales excedía el límite del presupuesto.

## 2. Causa Raíz

La función tenía dos errores fundamentales:

1.  **Cálculo Incorrecto del Costo:** El `reduce` sumaba únicamente el `costo` unitario de cada material, ignorando por completo la `cantidad`. La fórmula correcta es `costo * cantidad`.
2.  **Falta de Comparación:** La función no comparaba el `costoTotal` calculado con el `limite` del presupuesto. Siempre retornaba `true` sin importar el resultado.

## 3. Cambio Aplicado

-   Se corrigió la lógica del `reduce` para que el acumulador sume el resultado de `partida.costo * partida.cantidad`, obteniendo así el costo total real.

    ```typescript
    const costoTotal = presupuesto.partidas.reduce((total, partida) => {
      return total + (partida.costo * partida.cantidad);
    }, 0);
    ```

-   Se modificó la sentencia `return` para que compare si el `costoTotal` es menor o igual al `presupuesto.limite`, devolviendo un booleano correcto.

    ```typescript
    return costoTotal <= presupuesto.limite;
    ```

## 4. Comando Usado para Validar

Para validar la solución, se ejecutó el comando de prueba específico del ejercicio:

```bash
npm test -- ejercicios/ejercicio-021/tests/architecture-budget.test.ts
```

## 5. Resultado Final

Tras aplicar las correcciones, todas las pruebas pasaron, confirmando que la validación del presupuesto ahora funciona como se esperaba.

```text
 camper@campus-H610M-K-V2:~/campuslands-debugging-js-ts-node-Eve$ npm test -- ejercicios/ejercicio-021/tests/architecture-budget.test.ts

> campuslands-debugging-js-ts-node@1.0.0 test
> vitest run ejercicios/ejercicio-021/tests/architecture-budget.test.ts


 RUN  v4.1.10 /home/camper/campuslands-debugging-js-ts-node-Eve

 ✓ ejercicios/ejercicio-021/tests/architecture-budget.test.ts (2 tests) 2ms
   ✓ ejercicio 021 (2)
     ✓ debería devolver false si el costo total excede el límite del presupuesto 1ms
     ✓ debería devolver true si el costo total está dentro del límite del presupuesto 0ms

 Test Files  1 passed (1)
      Tests  2 passed (2)
   Start at  18:29:57
   Duration  107ms (transform 16ms, setup 0ms, import 25ms, tests 2ms, environment 0ms)

camper@campus-H610M-K-V2:~/campuslands-debugging-js-ts-node-Eve$ 
```