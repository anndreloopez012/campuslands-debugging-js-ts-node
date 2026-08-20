# Resolucion ejercicio 006: Playlist de entrenamiento

## Error Encontrado 
- El codigo base intentabba concatenear propoedades con `.join('')` y ordenar de forma simple, perdiendo la estructura de objetos y datos de las canciones.

## Causa raiz
- Falta de funciones para filtrado por atribbutos (`energia`) y para la acumulacion numerica de duraciones (`duracionSegundos`).

## Cambio aplicado
- Se creo `filtrarPorEnergia()` usando `.filter()` para extraer canciones con `energia >= nivelMinimo` manteniendo la integridad inmutable del objeto original.
- Se implemento `calcularDuracionTotal()` mediante `.reduce()` transformando la duracion a valor numerico real.

## Comando usado para validar
```bash
npm test -- ejercicios/ejercicio-006/resoluciones/jose-rodriguez/playlist.test.js