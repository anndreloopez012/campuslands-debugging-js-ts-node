# Solución Ejercicio 011: Battle Royale

## Error Encontrado

El archivo de pruebas inicial estaba desactualizado. Tras corregirlo para que validara la lógica de la zona segura, se identificó el bug en el código original: la función incluía incorrectamente a los jugadores que se encontraban *exactamente en el borde* de la zona segura como sobrevivientes. La regla de negocio dicta que un jugador solo sobrevive si está estrictamente *dentro* del círculo.

## Causa Raíz

La causa del problema era un error en la comparación matemática. La función calculaba correctamente la distancia del jugador al centro de la zona, pero utilizaba el operador `<=` (menor o igual que) para compararla con el radio. Esto hacía que los jugadores cuya distancia era igual al radio (en el borde) fueran incluidos erróneamente.

## Cambio Aplicado

1.  **Corrección del Test**: Se actualizó `ejercicios/ejercicio-011/tests/battle-zone.test.js` para validar que la función `getSurvivors` solo devuelve jugadores cuya distancia al centro es estrictamente menor que el radio, incluyendo un caso de prueba para un jugador en el borde.
2.  **Implementación de la Función**: Se corrigió la lógica de la función `getSurvivors`. Se mantuvo el cálculo de la distancia euclidiana, pero se cambió el operador de comparación a `<` (menor que). La condición `distance < safeZone.radius` ahora asegura que solo los jugadores dentro del círculo sean considerados sobrevivientes.

## Comando Usado para Validar

```bash
npm test -- ejercicios/ejercicio-011/tests/battle-zone.test.js
```

## Resultado Final (Ejemplo)

```text
 PS C:\Users\barri\campuslands-debugging-js-ts-node-Eve> npm test -- ejercicios/ejercicio-011/tests/battle-zone.test.js


> campuslands-debugging-js-ts-node@1.0.0 test
> vitest run ejercicios/ejercicio-011/tests/battle-zone.test.js


 RUN  v4.1.10 C:/Users/barri/campuslands-debugging-js-ts-node-Eve

 ✓ ejercicios/ejercicio-011/tests/battle-zone.test.js (4 tests) 3ms
   ✓ ejercicio 011: getSurvivors (4)
     ✓ debe devolver solo los jugadores dentro de la zona segura 1ms
     ✓ debe excluir a los jugadores exactamente en el borde de la zona 0ms
     ✓ debe devolver un array vacío si ningún jugador está en la zona 0ms
     ✓ debe devolver un array vacío si la lista de jugadores está vacía 0ms

 Test Files  1 passed (1)
      Tests  4 passed (4)
   Start at  22:30:47
   Duration  153ms (transform 16ms, setup 0ms, import 28ms, tests 3ms, environment 0ms)

PS C:\Users\barri\campuslands-debugging-js-ts-node-Eve> 
```