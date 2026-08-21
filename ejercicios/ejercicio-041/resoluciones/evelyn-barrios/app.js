import express from 'express';
import { randomUUID } from 'node:crypto';

const app = express();

// Middleware para añadir un ID de request a cada solicitud entrante.
app.use((req, res, next) => {
  // @ts-ignore - Se extiende el objeto Request de Express dinámicamente.
  req.id = randomUUID();
  next();
});

// Ruta de ejemplo que siempre genera un error para probar el flujo.
app.get('/error', (req, res, next) => {
  const err = new Error('Error de prueba para verificar la propagación del requestId.');
  next(err);
});

/**
 * Middleware de manejo de errores.
 * Este middleware se activa cuando se llama a `next(err)`.
 */
// @ts-ignore
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Algo salió mal en el servidor.';

  res.status(status).json({
    error: message,
    // FIX: El bug original no incluía el `requestId` en las respuestas de error.
    // Se añade aquí para asegurar la trazabilidad.
    requestId: req.id,
  });
});

export default app;