# Solución Ejercicio 039: API de Películas

## Error Encontrado

El endpoint `GET /movies` no implementaba correctamente la funcionalidad de filtrado por género. Aunque aceptaba un parámetro de consulta `genre` (`/movies?genre=Action`), lo ignoraba por completo y siempre devolvía la lista completa de películas.

Esto provocaba que las pruebas que esperaban una lista filtrada fallaran.

## Causa Raíz

La causa del error era la falta de una lógica condicional para aplicar el filtro. El código obtenía el parámetro `genre` de `req.query`, pero nunca lo utilizaba para filtrar el array de `movies` antes de enviarlo en la respuesta.

```javascript
// Código original con el bug
app.get('/movies', (req, res) => {
  const { genre } = req.query;
  // 'genre' no se usa, siempre se devuelve el array completo.
  res.json(movies);
});
```

## Cambio Aplicado

La corrección consistió en añadir un bloque `if (genre)` que se ejecuta solo si el parámetro de consulta existe. Dentro de este bloque, se utiliza el método `filter()` para crear un nuevo array con las películas que coinciden con el género solicitado (comparando en minúsculas para hacerlo insensible a mayúsculas/minúsculas). Si no se proporciona un género, la función continúa y devuelve la lista completa como antes.

## Comando Usado para Validar

```bash
npm test -- ejercicios/ejercicio-039/tests/movies.api.test.js
```

## Resultado Final

Las pruebas ahora pasan, confirmando que la API maneja correctamente tanto los casos de éxito como los de error para la eliminación de items.