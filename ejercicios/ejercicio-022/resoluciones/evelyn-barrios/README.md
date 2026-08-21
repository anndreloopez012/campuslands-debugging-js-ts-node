# Ejercicio 022: Depuración de Proceso de Soldadura

## 1. Error Encontrado

Al ejecutar las pruebas, se observó que la función `esSoldaduraSegura` devolvía `true` para procesos que estaban claramente fuera de los parámetros de seguridad. Por ejemplo, una soldadura de acero con una presión demasiado alta era marcada como segura.

## 2. Causa Raíz

La función tenía dos errores lógicos:

1.  **Validación Incompleta:** El código solo verificaba si la temperatura estaba dentro del rango permitido, pero ignoraba por completo la validación de la presión.
2.  **Retorno Incorrecto:** La función retornaba el resultado de la validación de temperatura directamente, sin combinarlo con el resultado de la validación de presión.

## 3. Cambio Aplicado

-   Se crearon dos variables booleanas, `tempValida` y `presionValida`, para verificar de forma independiente que tanto la temperatura como la presión estuvieran dentro de sus respectivos rangos seguros para el material dado.

    ```typescript
    const tempValida = proceso.temperatura >= limites.tempMin && proceso.temperatura <= limites.tempMax;
    const presionValida = proceso.presion >= limites.presMin && proceso.presion <= limites.presMax;
    ```

-   Se modificó la sentencia `return` para que solo devuelva `true` si ambas validaciones (`tempValida` y `presionValida`) son verdaderas, utilizando el operador lógico `&&`.

    ```typescript
    return tempValida && presionValida;
    ```

## 4. Comando Usado para Validar

Para validar la solución, primero se corrigió el entorno de pruebas (que estaba corrupto) y luego se ejecutó el comando específico del ejercicio:

```bash
npm test -- ejercicios/ejercicio-022/tests/welding.test.ts
```

## 5. Resultado Final

Tras aplicar las correcciones, todas las pruebas pasaron, asegurando que el sistema de validación de seguridad de soldadura funciona correctamente.

```text
 camper@campus-H610M-K-V2:~/campuslands-debugging-js-ts-node-Eve$ npm test -- ejercicios/ejercicio-022/tests/welding.test.ts

> campuslands-debugging-js-ts-node@1.0.0 test
> vitest run ejercicios/ejercicio-022/tests/welding.test.ts


 RUN  v4.1.10 /home/camper/campuslands-debugging-js-ts-node-Eve

 ✓ ejercicios/ejercicio-022/tests/welding.test.ts (2 tests) 2ms
   ✓ ejercicio 022 (2)
     ✓ debería devolver false si los parámetros de soldadura están fuera de los límites de seguridad 1ms
     ✓ debería devolver true si los parámetros de soldadura están dentro de los límites de seguridad 0ms

 Test Files  1 passed (1)
      Tests  2 passed (2)
   Start at  19:48:08
   Duration  110ms (transform 16ms, setup 0ms, import 25ms, tests 2ms, environment 0ms)

camper@campus-H610M-K-V2:~/campuslands-debugging-js-ts-node-Eve$ 
```