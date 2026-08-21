import express from 'express';
import multer from 'multer';

const app = express();

// FIX: Se configura multer para manejar archivos en memoria.
// El bug original era la ausencia de un middleware para parsear multipart/form-data.
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

/**
 * Endpoint para subir un archivo.
 * Se utiliza el middleware `upload.single('avatar')` para procesar un
 * único archivo enviado en el campo 'avatar'.
 */
app.post('/upload', upload.single('avatar'), (req, res) => {
  // El middleware de multer añade el objeto `file` al request.
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }

  // Se devuelve la información del archivo subido.
  res.status(200).json({
    filename: req.file.originalname,
    mimetype: req.file.mimetype,
    size: req.file.size,
  });
});

export default app;