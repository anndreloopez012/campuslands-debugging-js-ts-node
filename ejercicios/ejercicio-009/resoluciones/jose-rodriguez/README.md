# Resolucion Ejercicio 009: Autos hiperdeportivos

## Error encontrado
- El codigo base realizaba concatenaciones de strings y ordenamiento basico ascendente en lugar de conversiones numericas de velocidad.

## Causa raiz
- Ausencia de funciones matematicas para transformacion de unidades de velocidad ($km/h \leftrightarrow mph$) con precision de 2 decimales.

## Cambio aplicado
- Se crearon las funciones `kmhAMph` y `mphAkmh` utilizando la constante `0.621371` y `.toFixes(2)`.
- Se implemento `ordenarPorVelocidad` para ordenar el arreglo de vehiculos de forma descendente segun su velocidad maxima.

## Comando usado para validar 
```bash
npm test -- ejercicios/ejercicio-009/resoluciones/jose-rodriguez/hypercar.test.js