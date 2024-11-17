import * as multer from 'multer';
import * as path from 'path';
import * as fs from 'fs';

// Ruta de almacenamiento para los archivos subidos
const UPLOAD_PATH = path.resolve('./uploads');

// Verificar si la carpeta de subida existe, si no, crearla
if (!fs.existsSync(UPLOAD_PATH)) {
  fs.mkdirSync(UPLOAD_PATH, { recursive: true });
}

export const multerConfig = {
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, UPLOAD_PATH); // Asignar la carpeta de destino
    },
    filename: (req, file, cb) => {
      const uniqueName = `${Date.now()}-${file.originalname}`; // Nombre único para el archivo
      cb(null, uniqueName);
    },
  }),
  fileFilter: (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif']; // Tipos MIME permitidos

    if (!allowedMimeTypes.includes(file.mimetype)) {
      req.fileValidationError = 'Tipo de archivo no permitido'; // Adjuntar error al objeto de la solicitud
      return cb(null, false); // Rechazar archivo y detener el flujo
    }

    cb(null, true); // Aceptar archivo
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // Limitar el tamaño del archivo a 5 MB
  },
};
