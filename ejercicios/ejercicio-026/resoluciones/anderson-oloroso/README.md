# Resolución del ejercicio 📘✨: Ejercicio 026

## 🐞 Error encontrado
- Error 1: Error en la función `calcularPromedio`, dicha función calculaba el promedio tomando en cuenta el total de registros, pero tiene un filtro para contar solo los activos, por ende falla.
- Error 2: Error en la función `obtenerMejor`, dicha funcion realizaba un ordenamiendo ascendente, cuando el expect, esperaba los valores en ordenamiento descendente para obtener el registro con el puntaje más alto.

## 🔎 Causa raiz
- Causa error 1: La función `calcularPromedio` retornaba un valor no esperaba, retornaba cedimales, cuando la funcion solo esperaba el valor `80`.
- Causa error 2: La función `obtenerMejor` tenia invertido los valores en la lógica de ordenamiento.

## 🔧 Cambio aplicado
- Cambio error 1: 
Se camió este fragmento de código:
``` js
return total / registros.length;
```

``` js
return total / activos.length;
```

- Cambio error 2:
Se camió este fragmento de código:
``` js
return [...registros].sort((a, b) => a.puntos - b.puntos)[0];
```

``` js
return [...registros].sort((a, b) =>b.puntos - a.puntos)[0];
```

## 🧪 Comando usado para validar
> npm test -- ejercicios/ejercicio-026/tests/book-progress.test.ts

## ✅ Resultado final
- Resultado función 1: Devolvió el valor 80
- Resultado función 2: Ordenó descendentemente para mostrar y obtuvo `render-2` que es el que tiene el puntaje más alto.

