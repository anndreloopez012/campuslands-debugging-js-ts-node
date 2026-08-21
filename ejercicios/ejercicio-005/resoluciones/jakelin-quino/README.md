# Documentación del razonamiento

## ¿Qué fallaba?
`calcularResultado` concatenaba los puntos como texto en vez de sumarlos numéricamente. `ordenarRanking` no comparaba los puntos numéricamente para ordenar de mayor a menor.

## ¿Cómo lo encontré?
Ejecuté `npm test -- ejercicios/ejercicio-005/tests/moto-service.test.js` y obtuve fallos en la suma de puntos concatenada ('10155') y en el orden descendente del ranking.

## ¿Qué cambié?
* **En `calcularResultado`:** Utilicé `reduce` con `parseInt(item.puntos, 10)` para realizar la suma numérica de los puntos.
* **En `ordenarRanking`:** Ajusté la comparación en `sort` a `parseInt(b.puntos, 10) - parseInt(a.puntos, 10)` para ordenar de mayor a menor.

## ¿Cómo lo validé?
Ejecuté nuevamente el comando de prueba:
`npm test -- ejercicios/ejercicio-005/tests/moto-service.test.js`
