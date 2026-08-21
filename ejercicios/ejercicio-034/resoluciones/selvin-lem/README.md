# Ejercicio 034

## Error #1 — Cálculo de promedio

**Qué fallaba:**
La función sumaba correctamente solo los puntos de los registros activos, pero dividía el total entre la cantidad total de registros (incluyendo los inactivos), en lugar de dividir entre la cantidad de registros activos.

**Cómo lo encontré:**
Al ejecutar el test, el promedio recibido (`53.33`) fue menor al esperado (`80`). Revisando la función encontré que `total` se calculaba a partir de `activos`, pero la división final usaba `registros.length` (el arreglo original, sin filtrar).

**Qué cambié:**
Cambié el denominador de la división para que use la cantidad de registros activos, consistente con la suma.
````
    const activos = registros.filter((registro) => registro.activo !== false);
    const total = activos.reduce((suma, registro) => suma + registro.puntos, 0);
    return total / activos.length;
````
**Cómo lo validé:**
Ejecuté nuevamente el test y comprobé que la prueba de cálculo de promedio pasó correctamente.

---

## Error #2 — Obtener el mejor registro

**Qué fallaba:**
La función `obtenerMejor` devolvía el registro con **menor** puntaje en lugar del de mayor puntaje.

**Cómo lo encontré:**
El test esperaba `"render-2"` (puntaje 80), pero la función devolvía `"render-1"`. Al revisar `sort()`, encontré que la comparación `a.puntos - b.puntos` ordenaba de forma ascendente, y al tomar `[0]` se quedaba con el de menor puntaje.

**Qué cambié:**
Invertí la comparación para ordenar de mayor a menor, de modo que `[0]` corresponda al de mayor puntaje.
````
    return [...registros].sort((a, b) => b.puntos - a.puntos)[0];
````

**Cómo lo validé:**
Ejecuté nuevamente el test y comprobé que la prueba de "obtiene el registro con mayor puntaje" pasó correctamente.