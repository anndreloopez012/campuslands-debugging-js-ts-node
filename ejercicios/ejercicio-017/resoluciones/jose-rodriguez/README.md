# Resolución Ejercicio 017: Pingpong

## Error encontrado
- El código base concatenaba propiedades genéricas sin implementar reglas de puntuación o ventaja de tenis de mesa[cite: 22].

## Causa raíz
- Ausencia de validaciones de condiciones de finalización (`puntos >= 11` y `diferencia >= 2`), estados de `Deuce` y `Ventaja`.

## Cambio aplicado
- Se construyó `evaluarMarcadorPingpong()` verificando las diferencias absolutas de puntos (`Math.abs(p1 - p2)`) para determinar si un set está en juego, en deuce, en ventaja o finalizado[cite: 21].

## Comando usado para validar
```bash
npm test -- ejercicios/ejercicio-017/resoluciones/jose-rodriguez/pingpong.test.js