# Resolución Ejercicio 045: Servicios asincronicos

## Error encontrado
- Los handlers de Express no utilizaban la palabra clave `async` ni esperaban mediante `await` las promesas del servicio asincrónico.
- `GET /items/:id`: Retornaba código `200 OK` en recursos no existentes y comparaba `req.params.id` de tipo string contra el id numérico.
- `POST /items`: No esperaba la resolución de promesas en la persistencia y enviaba respuestas sincrónicas incompletas o sin esperar los resultados.

## Causa raíz
- Desincronización en el manejo de promesas en las rutas de Express, lo que provocaba que se enviaran respuestas al cliente antes de resolver la lógica de consulta/persistencia.

## Cambio aplicado
- Se marcaron las funciones de los middleware/handlers como `async` y se aplicó `await` en las llamadas a los métodos asincrónicos.
- Se convirtió `req.params.id` a `Number` y se devolvió el status HTTP `404 Not Found` en caso de no hallar el elemento.
- Se implementaron bloques `try/catch` para capturar posibles excepciones no controladas durante la ejecución de promesas.

## Comando usado para validar
```bash
npm test -- ejercicios/ejercicio-045/resoluciones/jose-rodriguez/async.api.test.js