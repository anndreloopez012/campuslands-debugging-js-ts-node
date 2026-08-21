import express from 'express';
import { randomUUID } from 'node:crypto';

const app = express();
app.use(express.json());

// --- Service Layer ---
// Responsable de la lógica de negocio pura, sin conocimiento de HTTP.
const userService = {
  /**
   * Crea un nuevo usuario.
   * FIX: El contrato del servicio espera un objeto con `name` y `email`.
   */
  createUser: ({ name, email }) => {
    if (!name || !email) {
      throw new Error('Name and email are required.');
    }
    // Simula la creación en una base de datos
    const newUser = { id: randomUUID(), name, email };
    return newUser;
  },
};

// --- Controller Layer ---
// Responsable de manejar la solicitud y la respuesta HTTP.
const userController = {
  /**
   * Maneja la solicitud para crear un usuario.
   */
  createUser: (req, res) => {
    try {
      // FIX: El bug original pasaba argumentos incorrectos al servicio,
      // rompiendo el contrato. Ahora se pasa el `req.body` completo.
      const newUser = userService.createUser(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      // Maneja errores de la capa de servicio y los traduce a una respuesta HTTP.
      res.status(400).json({ error: error.message });
    }
  },
};

// --- Router Layer ---
// Responsable de mapear las rutas a los controladores.
app.post('/users', userController.createUser);

export default app;
