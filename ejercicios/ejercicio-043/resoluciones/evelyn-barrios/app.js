import express from 'express';

// No se necesita la factory `createApp`, exportamos la app directamente.
const app = express();

// Base de datos simulada con suficientes datos para probar la paginación.
const items = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `Item ${i + 1}`,
}));

/**
 * Endpoint para obtener items paginados.
 * Acepta `page` y `limit` como query parameters.
 */
app.get('/items', (req, res) => {
  // FIX: Parsear y validar los parámetros de paginación.
  // El bug original no leía `page` ni `limit` de los query params.
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;

  // FIX: Calcular el offset para la paginación.
  const offset = (page - 1) * limit;

  // FIX: Cortar el array de datos usando el offset y el límite.
  const paginatedItems = items.slice(offset, offset + limit);
  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / limit);

  // FIX: Construir y devolver el objeto de respuesta con los datos y los metadatos correctos.
  // El bug original devolvía una estructura incorrecta y sin metadatos.
  res.status(200).json({
    data: paginatedItems,
    metadata: {
      totalItems,
      totalPages,
      currentPage: page,
      itemsPerPage: limit,
    },
  });
});

export default app;
