# Resolución Ejercicio 016: Carreras

## Error encontrado
- El código base concatenaba propiedades irrelevantes y ordenaba arreglos sin procesar tiempos numéricos de vuelta ni penalizaciones de carrera[cite: 23, 24].

## Causa raíz
- Ausencia de funciones matemáticas para sumar las penalizaciones en segundos a los tiempos base de vuelta antes de calcular el acumulado total.

## Cambio aplicado
- Se implementó `calcularTiempoVueltaConPenalizacion()` para realizar la suma `tiempoBase + penalizacion`.
- Se creó `calcularTiempoTotalCarrera()` usando `.reduce()` para obtener la sumatoria total del tiempo consumido en la carrera.

## Comando usado para validar
```bash
npm test -- ejercicios/ejercicio-016/resoluciones/jose-rodriguez/racing-laps.test.js