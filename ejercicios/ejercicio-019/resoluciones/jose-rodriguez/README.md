# Resolución Ejercicio 019: Personajes RPG

## Error encontrado
- El código base exportaba un tipo genérico `Registro` y realizaba divisiones de promedios/ordenamientos incorrectos que no correspondían al cálculo de poder de un personaje RPG en TypeScript[cite: 27, 28].

## Causa raíz
- Definición de interfaces tipadas ausente (`Atributos`, `ItemEquipamiento`, `PersonajeRPG`) y falta de lógica para relacionar el nivel, la suma de atributos y el equipamiento acumulado.

## Cambio aplicado
- Se crearon las interfaces de TypeScript para tipar la entidad `PersonajeRPG` sin recurrir a `any`[cite: 27].
- Se implementó `calcularPoderTotal()` sumando la base de atributos ponderada por el nivel más el bonus del equipamiento mapeado con `.reduce()`[cite: 27].
- Se ajustó `obtenerPersonajeMasFuerte()` ordenando de forma descendente[cite: 27, 28].

## Comando usado para validar
```bash
npm test -- ejercicios/ejercicio-019/resoluciones/jose-rodriguez/rpg-character.test.ts