# Reporte de Corrección - Ejercicio 001

## Error encontrado
1. En calcular resultado se unian los puntos como una cadena de texto en lugar de realizar una suma.

2. Al ordenar ranking ordenaba a los jugadores de menor a mayor de manera ascendente.

## Causa raíz
1. Se estaba utilizando `join` sobre la propiedad puntos, lo hacia la conversión a texto.

2. La comparación en `.sort((a, b) => a.puntos - b.puntos)` ordenaba en dirección opuesta a la requerida para un ranking gamer.

## Cambio aplicado
1. Se reemplazó `join` por `reduce` asegurando que la salida sea un número mediante `Number(item.puntos)`.

2. Se invirtió la resta en el método `sort` a `Number(b.puntos) - Number(a.puntos)` para obtener un orden descendente.

## Comando usado para validar
```bash
 npm test -- ejercicios/ejercicio-001/tests/scoreboard.test.js
```

## Resultado final
Todos los casos de prueba del archivo scoreboard.test.js pasaron exitosamente, retornando la suma correcta como valor numérico y el ranking adecuadamente ordenado de mayor a menor puntaje.