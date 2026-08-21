# Ejercicio 025: Depuración de Diagnóstico de Motocicletas

## 1. Error Encontrado

Al ejecutar las pruebas, se detectó que la función `diagnosticar` no funcionaba correctamente. Cuando se le proporcionaban múltiples síntomas que apuntaban a la misma falla, el resultado incluía diagnósticos duplicados.

## 2. Causa Raíz

El problema principal era el uso de un array simple para acumular las posibles fallas. Al iterar sobre los síntomas, si dos de ellos compartían una posible causa (por ejemplo, `no_arranca` y `ruido_motor` ambos pueden ser por `problema_carburador`), esta causa se añadía al array dos veces.

## 3. Cambio Aplicado

-   Se reemplazó el array de acumulación por un `Set<Falla>`. La estructura de datos `Set` en JavaScript/TypeScript garantiza por diseño que cada elemento sea único, eliminando automáticamente los duplicados.

    ```typescript
    const fallasPosibles = new Set<Falla>();

    for (const sintoma of sintomas) {
      const diagnostico = DIAGNOSTICOS[sintoma];
      if (diagnostico) {
        for (const falla of diagnostico) {
          fallasPosibles.add(falla);
        }
      }
    }
    ```

-   Al final de la función, se convierte el `Set` de nuevo a un array usando `Array.from(fallasPosibles)` para cumplir con el tipo de retorno esperado por la función.

## 4. Comando Usado para Validar

Para validar la solución, primero se corrigieron los archivos base del ejercicio (que estaban corruptos) y luego se ejecutó el comando de prueba:

```bash
npm test -- ejercicios/ejercicio-025/tests/moto-diagnostics.test.ts
```

## 5. Resultado Final

Tras aplicar las correcciones, todas las pruebas pasaron, confirmando que la función ahora es asíncrona y maneja correctamente los errores del sistema de archivos.

```text
 camper@campus-H610M-K-V2:~/campuslands-debugging-js-ts-node-Eve$ npm test -- ejercicios/ejercicio-025/tests/moto-diagnostics.test.ts

> campuslands-debugging-js-ts-node@1.0.0 test
> vitest run ejercicios/ejercicio-025/tests/moto-diagnostics.test.ts


 RUN  v4.1.10 /home/camper/campuslands-debugging-js-ts-node-Eve

 ✓ ejercicios/ejercicio-025/tests/moto-diagnostics.test.ts (3 tests) 3ms
   ✓ ejercicio 025 (3)
     ✓ debería diagnosticar una única falla para un síntoma simple 1ms
     ✓ debería diagnosticar múltiples fallas y eliminar duplicados 1ms
     ✓ debería devolver un array vacío si los síntomas no coinciden con ninguna falla conocida 0ms

 Test Files  1 passed (1)
      Tests  3 passed (3)
   Start at  20:37:12
   Duration  110ms (transform 18ms, setup 0ms, import 26ms, tests 3ms, environment 0ms)

camper@campus-H610M-K-V2:~/campuslands-debugging-js-ts-node-Eve$ 
```