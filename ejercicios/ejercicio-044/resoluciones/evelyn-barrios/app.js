import express from 'express';
import { z } from 'zod';

const app = express();
app.use(express.json());

// Base de datos en memoria para simular el almacenamiento.
const products = [];

// FIX: Se define un esquema con Zod para validar los datos de entrada.
// El bug original no tenía ninguna validación.
const productSchema = z.object({
  name: z.string({
    invalid_type_error: 'Name must be a string',
  }).min(1, { message: 'Name cannot be empty' }),
  price: z.number({
    required_error: 'Price is required',
  }).positive({ message: 'Number must be greater than 0' }),
  inStock: z.boolean({
    required_error: 'inStock is required',
    invalid_type_error: 'inStock must be a boolean',
  }),
});

// FIX: Se crea un middleware para aplicar la validación del esquema.
const validateProduct = (req, res, next) => {
  // Usamos safeParse en lugar de parse para evitar el bloque try/catch, es una mejor práctica.
  const result = productSchema.safeParse(req.body);

  if (!result.success) {
    // Si la validación falla, se devuelve un error 400 con los detalles.
    return res.status(400).json({ errors: result.error.errors });
  }

  // Es una buena práctica reemplazar el body con los datos validados y sanitizados por Zod.
  // Esto elimina cualquier campo adicional que el cliente haya enviado.
  req.body = result.data;
  next();
};

app.post('/products', validateProduct, (req, res) => {
  const newProduct = req.body;
  products.push(newProduct);
  res.status(201).json(newProduct);
});

export default app;