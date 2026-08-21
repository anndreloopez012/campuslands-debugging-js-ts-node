# Resolución del ejercicio 📘✨: Ejercicio 018

## 🐞 Error encontrado
- Error 1: Error en la función `calcularResultado`, dicha función concatenaba valores en vez de sumarlos.
- Error 2: Error en la función `ordenarRanking`, dicha funcion realizaba un ordenamiendo ascendente, cuando el expect, esperaba los valores en ordenamiento descendente.

## 🔎 Causa raiz
- Causa error 1: La función `calcularResultado` retornaba valores usando la función map, retornaba valores mapeados, como listas y el `.join(' ')` convertia esos valores a string.
- Causa error 2: La función `ordenarRanking` tenia invertido los valores en la lógica de ordenamiento.

## 🔧 Cambio aplicado
- Cambio error 1: 
Se camió este fragmento de código:
``` js
return datos.map(item => item.puntos).join('');
```

``` js
return datos.reduce((total, elemento) => total + elemento.puntos, 0);
```

- Cambio error 2:
Se camió este fragmento de código:
``` js
return [...jugadores].sort((a, b) => a.puntos - b.puntos);
```

``` js
return [...jugadores].sort((a, b) => b.puntos - a.puntos);
```

## 🧪 Comando usado para validar
> npm test -- ejercicios/ejercicio-018/tests/formula-parser.test.js

## ✅ Resultado final
- Resultado función 1: Devolvió el valor 30
- Resultado función 2: Ordenó descendentemente para mostrar 'Pro' > 'elite' > 'novato'

