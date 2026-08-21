# Solución Ejercicio 006: Playlist de Entrenamiento

## Error Encontrado

El archivo de pruebas inicial estaba desactualizado. Tras corregirlo, el bug potencial en el código original se hizo evidente: al filtrar las canciones, la función devolvía un array de strings (solo los nombres de las canciones) en lugar de un array con los objetos de canción completos. Esto provocaba una pérdida de datos, ya que se perdía la información de la energía y cualquier otra propiedad del objeto.

## Causa Raíz

La causa del problema era un uso incorrecto de los métodos de array. La función probablemente encadenaba un `.map()` después del `.filter()`, extrayendo solo una propiedad del objeto en lugar de devolver el objeto entero que pasaba el filtro.

## Cambio Aplicado

1.  **Corrección del Test**: Se actualizó `ejercicios/ejercicio-006/tests/playlist.test.js` para que validara que la función `filterByEnergy` devuelve un array de objetos completos, no solo strings.
2.  **Implementación de la Función**: Se implementó la función `filterByEnergy` usando únicamente el método `.filter()`. Esto asegura que los elementos que pasan la condición del filtro se devuelven en su forma original (como objetos completos), cumpliendo con el requisito de no perder datos.

## Comando Usado para Validar

```bash
npm test -- ejercicios/ejercicio-006/tests/playlist.test.js
```

## Resultado Final (Ejemplo)

```text
 PS C:\Users\barri\campuslands-debugging-js-ts-node-Eve> npm test -- ejercicios/ejercicio-006/tests/playlist.test.js

> campuslands-debugging-js-ts-node@1.0.0 test
> vitest run ejercicios/ejercicio-006/tests/playlist.test.js


 RUN  v4.1.10 C:/Users/barri/campuslands-debugging-js-ts-node-Eve

 ✓ ejercicios/ejercicio-006/tests/playlist.test.js (3 tests) 3ms
   ✓ ejercicio 006: filterByEnergy (3)
     ✓ debe filtrar canciones por encima de un umbral de energía 2ms
     ✓ debe devolver un array vacío si ninguna canción cumple el criterio 0ms
     ✓ debe devolver objetos de canción completos, no solo nombres 0ms

 Test Files  1 passed (1)
      Tests  3 passed (3)
   Start at  21:42:34
   Duration  168ms (transform 15ms, setup 0ms, import 27ms, tests 3ms, environment 0ms)

PS C:\Users\barri\campuslands-debugging-js-ts-node-Eve> 
```