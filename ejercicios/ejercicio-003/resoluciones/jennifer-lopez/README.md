# Reporte de Corrección - Ejercicio 003: Tienda de Skins

## Error encontrado
1.  La función no realizaba la suma de las skins.
2. La función no ordenaba los ítems de mayor a menor puntaje.

## Causa raíz
1. La implementación anterior concatenaba los valores como texto y no como números
2. El método `sort` ordenaba en sentido ascendente en lugar de descendente.

## Cambio aplicado
1. Se implementó `reduce` junto a `Number` para retornar la suma.
2. Se aplicó `.sort((a, b) => Number(b.puntos) - Number(a.puntos))` para devolver el ranking ordenado de mayor a menor.

## Comando usado para validar
```bash
npm test -- ejercicios/ejercicio-003/tests/skins.test.js# Reporte de Corrección 
```

## Resultado final
Las 2 pruebas pasaron exitosamente.