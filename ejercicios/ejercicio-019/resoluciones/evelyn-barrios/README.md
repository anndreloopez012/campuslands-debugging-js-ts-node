# Ejercicio 019: Depuración de Personajes RPG

## 1. Error Encontrado

Al ejecutar las pruebas, se detectaron dos fallos principales:

1.  La función `calcularPromedio` retornaba un valor incorrecto porque, aunque sumaba correctamente los puntos de los personajes activos, dividía el total entre el número total de personajes (incluyendo inactivos).
2.  La función `obtenerMejor` devolvía el personaje con el puntaje más bajo en lugar del más alto, debido a una lógica de ordenamiento incorrecta.

## 2. Causa Raíz

-   **`calcularPromedio`**: El error estaba en la línea `return total / registros.length;`. El divisor (`registros.length`) no coincidía con los elementos que se habían sumado (solo los `activos`). Además, no se manejaba el caso de que no hubiera personajes activos, lo que podría resultar en una división por cero (`NaN`).

-   **`obtenerMejor`**: El error se encontraba en la función de comparación del `sort`: `(a, b) => a.puntos - b.puntos`. Esta expresión ordena los elementos en orden ascendente. Para obtener el valor más alto, se necesita un orden descendente.

## 3. Cambio Aplicado

-   En `calcularPromedio`, modifiqué el divisor para que fuera `activos.length`, que es la cantidad real de elementos considerados en la suma. Añadí una validación para devolver `0` si no hay personajes activos y así evitar la división por cero.

    ```typescript
    return activos.length > 0 ? total / activos.length : 0;
    ```

-   En `obtenerMejor`, invertí la lógica de la función de ordenamiento a `(a, b) => b.puntos - a.puntos` para que ordene los personajes de mayor a menor puntaje, devolviendo así el mejor.

## 4. Comando Usado para Validar

Para validar la corrección, ejecuté el conjunto de pruebas específico para este ejercicio:

```bash
npm test -- ejercicios/ejercicio-019/tests/rpg-character.test.ts
```

## 5. Resultado Final

Tras aplicar las correcciones, todos los tests pasaron exitosamente, confirmando que los bugs fueron resueltos.

```text
camper@campus-H610M-K-V2:~/campuslands-debugging-js-ts-node-Eve$ npm test -- ejercicios/ejercicio-019/tests/rpg-character.test.ts

> campuslands-debugging-js-ts-node@1.0.0 test
> vitest run ejercicios/ejercicio-019/tests/rpg-character.test.ts


 RUN  v4.1.10 /home/camper/campuslands-debugging-js-ts-node-Eve

 ✓ ejercicios/ejercicio-019/tests/rpg-character.test.ts (2 tests) 2ms
   ✓ ejercicio 019 (2)
     ✓ calcula promedio solo con registros activos 1ms
     ✓ obtiene el registro con mayor puntaje 0ms

 Test Files  1 passed (1)
      Tests  2 passed (2)
   Start at  16:08:56
   Duration  108ms (transform 16ms, setup 0ms, import 25ms, tests 2ms, environment 0ms)

camper@campus-H610M-K-V2:~/campuslands-debugging-js-ts-node-Eve$ 

```