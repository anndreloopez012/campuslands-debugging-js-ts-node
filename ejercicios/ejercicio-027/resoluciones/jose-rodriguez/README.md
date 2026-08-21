# Resolución Ejercicio 027: Música

## Error encontrado
- El archivo inicial incluía utilidades genéricas (`calcularPromedio`, `obtenerMejor`) sin tipos ni lógica para auditar el tempo o ritmo (BPM) de pistas musicales según su género.

## Causa raíz
- Ausencia del diccionario de límites de tempo `RANGOS_BPM_GENERO`, de los tipos `GeneroMusical` y `PistaMusical`, y del algoritmo de verificación por rangos.

## Cambio aplicado
- Se definieron los tipos de TypeScript `GeneroMusical`, `PistaMusical`, `RangoBPM` y `ResultadoValidacionBPM`.
- Se estableció el mapa `RANGOS_BPM_GENERO` con las cotas mínimas y máximas de BPM para géneros como House, Techno, Reggaeton, etc.
- Se implementó `validarBPM()` para corroborar que el tempo de la canción sea `>= min` y `<= max`.
- Se construyó `obtenerPistasFueraDeRango()` para filtrar anomalous tempos dentro de un conjunto de canciones.

## Comando usado para validar
```bash
npm test -- ejercicios/ejercicio-027/resoluciones/jose-rodriguez/bpm-validator.test.ts