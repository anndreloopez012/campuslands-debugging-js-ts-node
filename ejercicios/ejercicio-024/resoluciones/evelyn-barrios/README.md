# Ejercicio 024: Depuración de Misiones Espaciales

## 1. Error Encontrado

Al ejecutar las pruebas, se detectó que la función `clasificarMisiones` no agrupaba correctamente las misiones según su nivel de riesgo. Misiones de "Alto" riesgo (como las destinadas a Marte) eran incorrectamente clasificadas como de riesgo "Bajo" o "Medio".

## 2. Causa Raíz

El problema principal residía en el orden de las condiciones `if/else if/else`. La lógica verificaba primero las condiciones menos restrictivas. Por ejemplo, una misión a Marte con una duración corta podía ser clasificada como de "Bajo" riesgo antes de que se evaluara la condición del destino, que la convertía en "Alto" riesgo.

## 3. Cambio Aplicado

-   Se reestructuró el bloque condicional para que evalúe primero el caso más específico y de mayor prioridad: el riesgo "Alto".

    ```typescript
    if (mision.duracion > 365 || mision.destino === 'Marte') {
      resultado.Alto.push(mision);
    } else if (mision.duracion > 180) {
      resultado.Medio.push(mision);
    } else {
      resultado.Bajo.push(mision);
    }
    ```

-   Al verificar primero la condición de "Alto" riesgo (`duracion > 365` o `destino === 'Marte'`), nos aseguramos de que esas misiones se clasifiquen correctamente y no caigan en las categorías de menor riesgo.

## 4. Comando Usado para Validar

Para validar la solución, primero se corrigió el entorno de pruebas (que estaba corrupto) y luego se ejecutó el comando específico del ejercicio:

```bash
npm test -- ejercicios/ejercicio-024/tests/space-missions.test.ts
```

## 5. Resultado Final

Tras aplicar la corrección en el orden de la lógica condicional, todas las pruebas pasaron, confirmando que el sistema de clasificación de misiones ahora funciona como se espera.

```text
 camper@campus-H610M-K-V2:~/campuslands-debugging-js-ts-node-Eve$ npm test -- ejercicios/ejercicio-024/tests/space-missions.test.ts

> campuslands-debugging-js-ts-node@1.0.0 test
> vitest run ejercicios/ejercicio-024/tests/space-missions.test.ts


 RUN  v4.1.10 /home/camper/campuslands-debugging-js-ts-node-Eve

 ✓ ejercicios/ejercicio-024/tests/space-missions.test.ts (1 test) 3ms
   ✓ ejercicio 024 (1)
     ✓ debería clasificar correctamente las misiones por su nivel de riesgo 2ms

 Test Files  1 passed (1)
      Tests  1 passed (1)
   Start at  20:20:05
   Duration  106ms (transform 17ms, setup 0ms, import 25ms, tests 3ms, environment 0ms)

camper@campus-H610M-K-V2:~/campuslands-debugging-js-ts-node-Eve$ 
```