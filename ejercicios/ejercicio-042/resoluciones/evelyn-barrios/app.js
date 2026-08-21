import express from 'express';

const app = express();

// Base de datos simulada de usuarios con tokens y roles
const users = [
  { id: 1, name: 'Evelyn', token: 'user-token-123', role: 'user' },
  { id: 2, name: 'Admin', token: 'admin-token-456', role: 'admin' },
];

/**
 * Middleware de Autenticación.
 * Verifica el token 'Bearer' en la cabecera de autorización.
 */
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided or invalid format.' });
  }

  const token = authHeader.split(' ')[1];
  const user = users.find(u => u.token === token);

  if (!user) {
    return res.status(401).json({ error: 'Invalid token.' });
  }

  // @ts-ignore - Adjuntamos el usuario al objeto request para uso posterior
  req.user = user;
  next();
};

/**
 * Middleware de Autorización por Rol.
 * Es una factory que crea un middleware para verificar roles específicos.
 */
const roleMiddleware = (allowedRoles) => {
  return (req, res, next) => {
    // @ts-ignore
    const user = req.user;
    if (!user || !allowedRoles.includes(user.role)) {
      return res.status(403).json({ error: 'Forbidden: Insufficient permissions.' });
    }
    next();
  };
};

// --- Endpoints ---

// Ruta pública, no requiere autenticación
app.get('/public', (req, res) => {
  res.status(200).json({ message: 'Public content' });
});

// Ruta protegida, requiere cualquier token válido
app.get('/profile', authMiddleware, (req, res) => {
  // @ts-ignore
  res.status(200).json({ message: `Welcome ${req.user.name}` });
});

// Ruta de administrador, requiere token y rol 'admin'
app.get('/admin', authMiddleware, roleMiddleware(['admin']), (req, res) => {
  res.status(200).json({ message: 'Admin panel access granted.' });
});

export default app;