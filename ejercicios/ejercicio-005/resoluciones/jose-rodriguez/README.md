# Resolucion Ejercicio 005: Motos en taller

## Error encontrado
- La plantilla base generica no contenia las funciones requeridas para la tematica de taller mecanico.

## Causa raiz 
- Ausencia de la logica para comparar kilometraje y filtrar mantenimientos vencidos sin mutar arreglos.

## Cambio aplicado 
- Se creo `requiereManimiento` para validar los limites por fabricante.
- Se implemento `obtenerMotosConServiceVencido` utilizando `.filter()`
```bash
npm test -- ejercicios/ejercicio-005/resoluciones/jose-rodriguez/moto-service.test.js