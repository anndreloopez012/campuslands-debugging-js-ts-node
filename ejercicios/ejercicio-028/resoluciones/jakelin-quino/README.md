# Documentación del razonamiento

## ¿Qué fallaba?
`calcularPromedio` dividía el total entre todos los registros y no solo los activos. `obtenerMejor` ordenaba de menor a mayor devolviendo el peor registro.

## ¿Cómo lo encontré?
Ejecuté `npm test -- ejercicios/ejercicio-028/tests/football-league.test.ts` y la prueba falló al calcular el promedio de registros activos y al obtener el mayor puntaje.

## ¿Qué cambié?
* **En `calcularPromedio`:** Dividí el total entre `activos.length` filtrando solo los registros activos.
* **En `obtenerMejor`:** Cambié la comparación del `sort` a `b.puntos - a.puntos` para retornar el valor máximo.

## ¿Cómo lo validé?
Ejecuté nuevamente el comando de prueba:
`npm test -- ejercicios/ejercicio-028/tests/football-league.test.ts`
