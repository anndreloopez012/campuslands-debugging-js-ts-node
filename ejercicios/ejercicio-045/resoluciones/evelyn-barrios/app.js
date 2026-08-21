import express from 'express';

// No se necesita la factory `createApp`, exportamos la app directamente.
const app = express();

/**
 * Simula un servicio asíncrono que busca un usuario en una base de datos.
 * Tarda 50ms en responder.
 */
const userService = {
  findById: (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ id: id, name: 'John Doe', email: 'john.doe@example.com' });
      }, 50);
    });
  },
};

/**
 * Endpoint para obtener un usuario.
 * FIX: Se convierte el handler en una función `async` y se usa `await`.
 * El bug original no esperaba la promesa, respondiendo con un objeto vacío.
 */
app.get('/user/:id', async (req, res) => {
  // FIX: Los parámetros de la URL son strings. Se deben convertir a número.
  const userId = parseInt(req.params.id, 10);
  const user = await userService.findById(userId); // Se espera la resolución de la promesa.
  res.status(200).json(user);
});

export default app;
