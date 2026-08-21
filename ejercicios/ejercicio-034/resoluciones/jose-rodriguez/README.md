# Resolución Ejercicio 034: Turismo

## Error encontrado
- `calcularPromedio`: Dividía la suma entre `registros.length` en lugar de `activos.length`.
- `obtenerMejor`: El método `sort()` ordenaba ascendentemente (`a.puntos - b.puntos`), devolviendo el menor puntaje.

## Causa raíz
- Denominador incorrecto al promediar arreglos filtrados y lógica de ordenación invertida para obtener el máximo.

## Cambio aplicado
- Se usó `activos.length` como divisor en `calcularPromedio`.
- Se invirtió el criterio de `sort` a descendente (`b.puntos - a.puntos`) en `obtenerMejor`.

## Comando usado para validar
```bash
npm test -- ejercicios/ejercicio-034/resoluciones/jose-rodriguez/tourism.test.ts