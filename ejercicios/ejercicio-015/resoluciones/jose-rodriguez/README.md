# Resolución Ejercicio 015: Dibujo digital

## Error encontrado
- El código base ejecutaba concatenaciones de datos irrelevantes en lugar de manipular la visibilidad y normalización de propiedades de capas[cite: 21, 22].

## Causa raíz
- Falta de lógica para filtrar elementos inactivos (`visible === false`), sanear cadenas de texto en los nombres y acotar los valores numéricos de opacidad entre `0` y `100`.

## Cambio aplicado
- Se construyó `normalizarCapasVisibles()` mediante `.filter()` para evaluar la propiedad `visible` y `.map()` para aplicar `.trim()` en `nombre` junto a `Math.max(0, Math.min(100, opacidad))`.

## Comando usado para validar
```bash
npm test -- ejercicios/ejercicio-015/resoluciones/jose-rodriguez/layers.test.js