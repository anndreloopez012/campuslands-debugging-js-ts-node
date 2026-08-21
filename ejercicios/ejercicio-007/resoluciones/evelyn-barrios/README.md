 # Solución Ejercicio 007: Horror Film Awards

## Error Encontrado

El archivo de pruebas inicial estaba desactualizado. Tras corregirlo, se pudo identificar el bug en el código original: la función para contar votos determinaba incorrectamente al ganador cuando existía un empate. Devolvía solo al primer candidato que encontraba con el máximo número de votos, ignorando a los demás que también habían alcanzado esa cifra.

## Causa Raíz

La causa del problema era una lógica de procesamiento de resultados incompleta. El algoritmo encontraba el número máximo de votos, pero no estaba diseñado para recopilar a todos los candidatos que habían alcanzado ese máximo. Simplemente se detenía en el primero que encontraba.

## Cambio Aplicado

1.  **Corrección del Test**: Se actualizó `ejercicios/ejercicio-007/tests/horror-awards.test.js` para incluir casos de prueba específicos para un ganador claro, un empate entre dos o más candidatos y la ausencia de votos.
2.  **Implementación de la Función**: Se refactorizó la función `getVoteResults` para manejar empates. La nueva lógica primero cuenta todos los votos usando `reduce`, luego identifica el número máximo de votos, y finalmente filtra para encontrar a **todos** los candidatos que igualan ese número. Un condicional al final devuelve el formato de objeto correcto dependiendo de si se encontró uno o más ganadores.

## Comando Usado para Validar

```bash
npm test -- ejercicios/ejercicio-007/tests/horror-awards.test.js
```

## Resultado Final (Ejemplo)

```text
 PS C:\Users\barri\campuslands-debugging-js-ts-node-Eve> npm test -- ejercicios/ejercicio-007/tests/horror-awards.test.js

> campuslands-debugging-js-ts-node@1.0.0 test
> vitest run ejercicios/ejercicio-007/tests/horror-awards.test.js


 RUN  v4.1.10 C:/Users/barri/campuslands-debugging-js-ts-node-Eve

 ✓ ejercicios/ejercicio-007/tests/horror-awards.test.js (4 tests) 3ms
   ✓ ejercicio 007: getVoteResults (4)
     ✓ debe declarar un ganador claro si no hay empates 2ms
     ✓ debe declarar un empate si dos o más películas tienen los mismos votos máximos 0ms
     ✓ debe devolver null si no hay votos 0ms
     ✓ debe manejar un empate entre todas las películas 0ms

 Test Files  1 passed (1)
      Tests  4 passed (4)
   Start at  21:49:30
   Duration  156ms (transform 18ms, setup 0ms, import 30ms, tests 3ms, environment 0ms)

PS C:\Users\barri\campuslands-debugging-js-ts-node-Eve> 
```