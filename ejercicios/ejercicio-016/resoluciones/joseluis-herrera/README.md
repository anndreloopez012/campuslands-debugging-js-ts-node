# 🛠️ Reporte de Debugging — Ejercicio 016
---

## 📋 Resumen

Durante la revisión del ejercicio se identificaron **2 errores diferentes** que provocaban resultados incorrectos en la suma de puntajes y en el ordenamiento del ranking.

| Errores   
|------------------------------------
| Uso incorrecto de `map()` + `join()`
| Comparación incorrecta en `sort()` 

---

# 🐞 Error 1 — Suma de puntajes

## Problema

Se utilizaba `map()` para obtener los puntajes y luego `join('')`, lo que **concatenaba los números como texto** en lugar de sumarlos.

### Código con error

```js
return datos.map(item => item.puntos).join('');
```

### Solución aplicada

Se reemplazó por `reduce()` para acumular correctamente los valores numéricos.

```js
return datos.reduce((total, item) => total + item.puntos, 0);
```

---
# 🐞 Error 2 — Ordenamiento del ranking

## Problema

La función `sort()` tenía la comparación incorrecta, provocando que el ranking no se ordenara adecuadamente de mayor a menor.

### Código corregido

```js
return [...jugadores].sort((a, b) => b.puntos - a.puntos);
```

ordena los jugadores en **orden descendente**, dejando primero al que tiene más puntos.


## Comando ejecutado

```bash
npm test -- ejercicios/ejercicio-016/tests/racing-laps.test.js
```

## Resultado
### ✅ Validación
```text
> campuslands-debugging-js-ts-node@1.0.0 test
> vitest run ejercicios/ejercicio-016/tests/racing-laps.test.js


 RUN  v4.1.10 /home/joselo/Documentos/campuslands-debugging-js-ts-node

 ✓ ejercicios/ejercicio-016/tests/racing-laps.test.js (2 tests) 5ms
   ✓ ejercicio 016 (2)
     ✓ calcula suma numerica y no concatena texto 2ms
     ✓ ordena ranking de mayor a menor puntaje 1ms

 Test Files  1 passed (1)
      Tests  2 passed (2)
   Start at  16:27:47
   Duration  277ms (transform 47ms, setup 0ms, import 71ms, tests 5ms, environment 0ms)
```