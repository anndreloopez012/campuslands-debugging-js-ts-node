# Ejercicio 020: Depuración de Equipo de eSports

## 1. Error Encontrado

Al ejecutar el conjunto de pruebas, se detectaron tres fallos en la lógica de gestión del equipo:

1.  El tipo `Miembro` permitía que la propiedad `rol` fuera cualquier `string`, lo que posibilitaba la creación de miembros con roles que no existen en el juego.
2.  La función `ficharMiembro` no validaba si el rol del nuevo miembro era uno de los permitidos ('tanque', 'dps', 'soporte'), aceptando cualquier valor y corrompiendo el estado del equipo.
3.  La función `obtenerSuplentes` devolvía a los miembros titulares en lugar de los suplentes debido a una lógica de filtrado invertida.

## 2. Causa Raíz

-   **Tipado Débil:** La causa principal era el uso de `rol: string` en el tipo `Miembro`, lo que eliminaba la seguridad de tipos que TypeScript ofrece.
-   **Falta de Programación Defensiva:** La función `ficharMiembro` no tenía una guarda para proteger el estado del equipo, asumiendo que los datos de entrada siempre serían correctos.
-   **Lógica de Filtrado Incorrecta:** En `obtenerSuplentes`, la condición del filtro era errónea, seleccionando el subconjunto equivocado de miembros.

## 3. Cambio Aplicado

-   Se introdujo un tipo de unión `Rol` para definir un conjunto cerrado de roles válidos y se derivó de un array constante para mantener una única fuente de la verdad.

    ```typescript
    const ROLES = ['tanque', 'dps', 'soporte'] as const;
    export type Rol = typeof ROLES[number];
    ```

-   En `ficharMiembro`, se añadió una guarda para validar el rol del miembro antes de añadirlo al equipo, lanzando un error si no es válido.

    ```typescript
    if (!ROLES.includes(miembro.rol)) {
      throw new Error(`El rol '${miembro.rol}' no es válido.`);
    }
    ```

-   En `obtenerSuplentes`, se corrigió la lógica del filtro para que devuelva correctamente los miembros donde `suplente` es `true`.

    ```typescript
    return miembros.filter(m => m.suplente);
    ```

## 4. Comando Usado para Validar

Para validar la solución, primero se corrigió el entorno de pruebas (que estaba corrupto) y luego se ejecutó el comando específico del ejercicio:

```bash
npm test -- ejercicios/ejercicio-020/tests/esports-team.test.ts
```

## 5. Resultado Final

```text
camper@campus-H610M-K-V2:~/campuslands-debugging-js-ts-node-Eve$ npm test -- ejercicios/ejercicio-020/tests/esports-team.test.ts

> campuslands-debugging-js-ts-node@1.0.0 test
> vitest run ejercicios/ejercicio-020/tests/esports-team.test.ts


 RUN  v4.1.10 /home/camper/campuslands-debugging-js-ts-node-Eve

 ✓ ejercicios/ejercicio-020/tests/esports-team.test.ts (3 tests) 4ms
   ✓ ejercicio 020 (3)
     ✓ debería lanzar un error al intentar fichar un miembro con un rol inválido 2ms
     ✓ debería fichar miembros con roles válidos sin problemas 0ms
     ✓ debería devolver únicamente los miembros que son suplentes 1ms

 Test Files  1 passed (1)
      Tests  3 passed (3)
   Start at  17:02:22
   Duration  108ms (transform 18ms, setup 0ms, import 26ms, tests 4ms, environment 0ms)

camper@campus-H610M-K-V2:~/campuslands-debugging-js-ts-node-Eve$ ^C
camper@campus-H610M-K-V2:~
```text