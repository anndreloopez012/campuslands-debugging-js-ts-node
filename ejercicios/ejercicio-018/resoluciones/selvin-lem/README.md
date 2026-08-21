# Ejercicio 018

## Error #1 — Cálculo de puntos

**Qué fallaba:**  
La función concatenaba los puntos como texto en lugar de sumarlos. El test esperaba el total de puntos como un número.

**Cómo lo encontré:**  
Al ejecutar el test observé que el resultado recibido no coincidía con el total esperado. Revisando la función encontré que se utilizaba `join()`, que concatenaba los valores.

**Qué cambié:**  
Reemplacé `join()` por `reduce()` para acumular los puntos numéricamente.

    return datos.map(item => item.puntos).reduce((acumulador, numeroActual) => acumulador + numeroActual, 0);

**Cómo lo validé:**  
Ejecuté nuevamente el test y comprobé que la prueba de cálculo de puntos pasó correctamente.

---

## Error #2 — Orden del ranking

**Qué fallaba:**  
El ranking se ordenaba de menor a mayor, pero el test esperaba que los jugadores fueran ordenados de mayor a menor puntaje.

**Cómo lo encontré:**  
El test esperaba el siguiente orden:

    pro → 22
    elite → 18
    novato → 7

Pero la función devolvía:

    elite → 18
    pro → 22
    novato → 7

Al revisar `sort()`, encontré que la comparación `a.puntos - b.puntos` producía un orden ascendente.

**Qué cambié:**  
Invertí la comparación para ordenar los puntos de mayor a menor.

    return [...jugadores].sort((a, b) => b.puntos - a.puntos);

**Cómo lo validé:**  
Ejecuté nuevamente el test y comprobé que el ranking quedó ordenado correctamente de mayor a menor.