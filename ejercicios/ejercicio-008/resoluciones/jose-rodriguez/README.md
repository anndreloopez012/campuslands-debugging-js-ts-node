# Resolucion Ejercicio 008: Futbol sala

## Error encontrado
- El codigo base itentaba ejecutar una concatenacion simple con `.join('')` y un ordenamiento por puntos ascendente.

## Causa raiz
- Ausencia de la funcion para el calculo numerico de la diferencia de goles (`gf - gc`) y logica de desempate en el ordenamiento de la tabla.

## Cambio aplicado
- Se implemento `calcularDiferenciaGoles()` para obtener la resta entre goles anotados y recibidos.
- Se creo `ordenarTablaFulsal()` aplicando `.sort()` sobre una copia inmutable del arreglo, ordenando por mayor puntaje y utilizando la direrencia de goles como criterio de desempate.

## Comando usado para validar
```bash
npm test -- ejercicios/ejercicio-008/resoluciones/jose-rodriguez/futsal-table.test.js