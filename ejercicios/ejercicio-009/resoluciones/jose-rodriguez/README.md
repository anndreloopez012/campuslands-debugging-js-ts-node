# Resolucion Ejercicio 009: Autos hiperdeportivos 

## Error encontrado
- El codigo base generico incluia metodos desalineados que concatenaban textos en lugar de realizar conversiones numericos de unidades.

## Causa raiz
- Ausencia de formulas de conversion de velocidad (mph a km/h) y ordenamiento numerico descendente.

## Cambio aplicado

- Se implemento `convertirMphAKmh` multiplicando por la constante fisica `1.60934` y redondeando a 2 decimales con `.toFixed(2).
- Se creo `ordenamientoPorVelocidad` realizando un `.srot()` descendente e inmutable.

## Comando usado para validar
```bash
npm test -- ejercicios/ejercicio-009/resoluciones/jose-rodriguez/hypercar.test.js