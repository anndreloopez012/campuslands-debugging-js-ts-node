# Resolucion ejercicio 007: peliculas de miedo

## Error encontrado 
- El codigo base intentaba concatenar propiedades genericas sin calcular conteno de votos ni evaliar empates entre candidatas.

## Causa raiz
- Ausencia de logica para identificar la puntuacion maxima (`maxVotos`) y evaluar si multiples peliculas comparten el primer lugar.

## Cambio aplicado
- Se construyo `obtenerGanadorHorror()` calculando el valor maximo mediante `Math.max()` y filtrando la lista de nominadas.
- Se anadio la propiedad booleana `esEmpate` evaluando si la cantidad de ganadoras supera la unidad.

## Comando usado para validar
```bash
npm test -- ejercicios/ejercicio-007/resoluciones/jose-rodriguez/horror-awards.test.js