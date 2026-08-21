# Reporte de Corrección - Ejercicio 002

## Error encontrado
1. `calcularResultado`: No realizaba la suma numérica correctamente.
2. `ordenarRanking`: Ordenaba los elementos en sentido ascendente en lugar de descendente.

## Causa raíz
1. La función realizaba una concatenación de cadenas en lugar de parsear los valores con `Number` y sumarlos.
2. El método `sort` utilizaba la resta `a.puntos - b.puntos` ordenando de menor a mayor.

## Cambio aplicado
1. Se implementó `reduce` junto con `Number(item.puntos)` para retornar la suma aritmética.
2. Se ajustó el callback de `sort` a `Number(b.puntos) - Number(a.puntos)` para obtener el orden de mayor a menor.

## Comando usado para validar
```bash
npm test -- ejercicios/ejercicio-002/tests/inventory.test.js
```

## Resultado final
Ambas pruebas en inventory.test.js pasaron de forma exitosa .