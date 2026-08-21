# Resolución Ejercicio 020: Equipo de esports

## Error encontrado
- `calcularPromedio()` dividía la suma total entre el tamaño completo del arreglo en lugar de dividir únicamente entre el número de jugadores activos[cite: 29].
- `obtenerMejor()` ordenaba en sentido ascendente (`a.puntos - b.puntos`), devolviendo al jugador con menor puntaje[cite: 29].

## Causa raíz
- División por la propiedad incorrecta (`registros.length` en vez de `activos.length`)[cite: 29].
- Criterio de ordenamiento inverso en la función de comparación de `.sort()`[cite: 29].
- Falta de tipado específico para roles de esports (`RolEsports`) y banderas de suplente[cite: 30].

## Cambio aplicado
- Se definieron los tipos de TypeScript `RolEsports` y `JugadorEsports`[cite: 30].
- Se ajustó la división en `calcularPromedio()` utilizando `totalPuntos / activos.length`[cite: 29].
- Se corrigió la función comparadora de `obtenerMejor()` a `(a, b) => b.puntos - a.puntos` para ordenar de mayor a menor[cite: 29].

## Comando usado para validar
```bash
npm test -- ejercicios/ejercicio-020/resoluciones/jose-rodriguez/esports-team.test.ts