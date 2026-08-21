# Solución Ejercicio 034: Filtro de Paquetes de Turismo

## Error Encontrado

Tanto el archivo de código como el de pruebas contenían código de un ejercicio anterior. Una vez reemplazados por la lógica correcta, el bug original inferido en la función `filterPackages` era que no aplicaba los filtros de manera acumulativa. Si se proporcionaban tanto un presupuesto máximo como una temporada, la función solo consideraba uno de los dos filtros, o ninguno, devolviendo un resultado incorrecto.

## Causa Raíz

La causa raíz del bug hipotético era una implementación deficiente de la lógica de filtrado. En lugar de aplicar cada filtro de forma secuencial sobre el resultado del filtro anterior, la función original probablemente contenía una estructura condicional (`if/else if`) que impedía que ambos filtros se aplicaran simultáneamente.

## Cambio Aplicado

La solución implementa un enfoque de filtrado en cadena:

1.  Se inicializa una variable `filteredPackages` con la lista completa de paquetes.
2.  Se comprueba si existe un filtro `maxBudget`. Si es así, se sobrescribe `filteredPackages` con el resultado de filtrar por precio (`p.price <= filters.maxBudget`).
3.  A continuación, se comprueba si existe un filtro `season`. Si es así, se vuelve a filtrar la lista (que ya puede estar filtrada por presupuesto) para incluir solo los paquetes disponibles en esa temporada (`p.seasons.includes(filters.season)`).
4.  Finalmente, se devuelve la lista `filteredPackages`, que ha pasado por todos los filtros aplicables.

## Comando Usado para Validar

```bash
npm test -- ejercicios/ejercicio-034/tests/tourism.test.ts
```

## Resultado Final

```text
camper@campus-H610M-K-V2:~/campuslands-debugging-js-ts-node-Eve-1$ npm test -- ejercicios/ejercicio-034/tests/tourism.test.ts

> campuslands-debugging-js-ts-node@1.0.0 test
> vitest run ejercicios/ejercicio-034/tests/tourism.test.ts


 RUN  v4.1.10 /home/camper/campuslands-debugging-js-ts-node-Eve-1

 ✓ ejercicios/ejercicio-034/tests/tourism.test.ts (5 tests) 3ms
   ✓ ejercicio 034 - Tourism Package Filter (5)
     ✓ should filter packages by max budget 1ms
     ✓ should filter packages by season 0ms
     ✓ should filter packages by both budget and season 0ms
     ✓ should return an empty array if no packages match the criteria 0ms
     ✓ should return all packages if no filters are provided 0ms

 Test Files  1 passed (1)
      Tests  5 passed (5)
   Start at  09:35:46
   Duration  104ms (transform 18ms, setup 0ms, import 26ms, tests 3ms, environment 0ms)

camper@campus-H610M-K-V2:~/campuslands-debugging-js-ts-node-Eve-1$ 
```