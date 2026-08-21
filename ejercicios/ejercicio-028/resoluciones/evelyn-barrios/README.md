# Solución Ejercicio 028: Liga de Fútbol

## Error Encontrado

El error principal no estaba en la lógica de la función `calculateStandings`, sino en el archivo de test `tests/football-league.test.ts`. Este test estaba intentando importar y probar funciones (`calcularPromedio` y `obtenerMejor`) que no existen en el archivo de código del ejercicio 28, ya que pertenecen a un ejercicio anterior.

## Causa Raíz

El archivo `ejercicios/ejercicio-028/tests/football-league.test.ts` fue copiado o creado incorrectamente, conteniendo tests del ejercicio 026. La importación `import { calcularPromedio, obtenerMejor } from '../codigo/football-league.ts';` fallaba porque `football-league.ts` solo exporta `calculateStandings`. Esto provocaba el error `TypeError: X is not a function`.

## Cambio Aplicado

1.  **Corrección del archivo de test:** Se reescribió por completo `ejercicios/ejercicio-028/tests/football-league.test.ts` para que importe y pruebe correctamente la función `calculateStandings`. Los nuevos tests verifican que los equipos se ordenen primero por puntos y luego por diferencia de goles como desempate.
2.  **Verificación del archivo de código:** La función `calculateStandings` en `ejercicios/ejercicio-028/codigo/football-league.ts` ya implementaba la lógica de ordenamiento correcta, por lo que no necesitó cambios.

```typescript
// Ejemplo de test corregido:
import { calculateStandings, Team } from '../codigo/football-league.ts';

it('should use goal difference as a tie-breaker', () => {
  const teams: Team[] = [
    { name: 'Team B', points: 7, goalDifference: 5 },
    { name: 'Team A', points: 7, goalDifference: 10 },
  ];
  const standings = calculateStandings(teams);
  expect(standings.map(t => t.name)).toEqual(['Team A', 'Team B']);
});
```

## Comando Usado para Validar

```bash
npm test -- ejercicios/ejercicio-028/tests/football-league.test.ts
```

## Resultado Final
```text
camper@campus-H610M-K-V2:~/campuslands-debugging-js-ts-node-Eve-1$ npm test -- ejercicios/ejercicio-028/tests/football-league.test.ts

> campuslands-debugging-js-ts-node@1.0.0 test
> vitest run ejercicios/ejercicio-028/tests/football-league.test.ts


 RUN  v4.1.10 /home/camper/campuslands-debugging-js-ts-node-Eve-1

 ✓ ejercicios/ejercicio-028/tests/football-league.test.ts (3 tests) 3ms
   ✓ ejercicio 028: Football League Standings (3)
     ✓ should sort teams primarily by points in descending order 1ms
     ✓ should use goal difference as a tie-breaker when points are equal 0ms
     ✓ should correctly sort a mixed list of teams 0ms

 Test Files  1 passed (1)
      Tests  3 passed (3)
   Start at  08:03:10
   Duration  106ms (transform 17ms, setup 0ms, import 26ms, tests 3ms, environment 0ms)

camper@campus-H610M-K-V2:~/campuslands-debugging-js-ts-node-Eve-1$ 

```