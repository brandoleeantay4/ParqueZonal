const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const config = require('../config');

// Configura el SDK de Cloudinary con las credenciales obtenidas del archivo de configuración.
// Esto permite que la aplicación se autentique con la API de Cloudinary para realizar operaciones como subir imágenes.
cloudinary.config({
  cloud_name: config.cloudinary.cloud_name,
  api_key: config.cloudinary.api_key,
  api_secret: config.cloudinary.api_secret,
});

// Configuración de Multer para la Subida de Archivos:
// Se define cómo Multer debe manejar los archivos entrantes.
// `multer.memoryStorage()` indica que los archivos se almacenarán temporalmente en la memoria RAM del servidor
// como un Buffer, en lugar de escribirlos en el disco.
// El `fileFilter` asegura que solo se acepten archivos cuyo tipo MIME comience con 'image/',
// rechazando cualquier otro tipo de archivo para mantener la integridad y seguridad.
// Además, se establece un límite de `fileSize` de 5 MB para prevenir subidas excesivamente grandes.
const storage = multer.memoryStorage();
const uploadMulter = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten archivos de imagen!'), false);
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});


// Middleware Principal para la Subida a Cloudinary:
// `uploadToCloudinary` es una función middleware diseñada para ser utilizada en las rutas de Express.js.
// Internamente, utiliza `uploadMulter.single('image')` para procesar un único archivo con el nombre de campo 'image'
// proveniente del formulario.
// Este bloque maneja los posibles errores de Multer (como tamaño de archivo excedido o tipo incorrecto)
// y verifica si se ha adjuntado un archivo. Si no hay errores y un archivo está presente:
// 1. Convierte el archivo (que está en un Buffer en memoria) a una cadena Base64.
// 2. Crea una Data URI a partir del tipo MIME y la cadena Base64. Esta es la forma en que Cloudinary recibe el archivo.
// 3. Llama al método `cloudinary.uploader.upload()` para enviar la Data URI a Cloudinary, especificando la carpeta
//    de destino ('parque_chavin') en la cuenta de Cloudinary.
// 4. Incluye un bloque `try-catch` para manejar cualquier error que pueda ocurrir durante el proceso de subida a Cloudinary,
//    proporcionando una respuesta adecuada al cliente en caso de fallo.
const uploadToCloudinary = (req, res, next) => {
  uploadMulter.single('image')(req, res, async (err) => {
    if (err) {
      console.error('Error de Multer:', err.message);
      return res.status(400).json({ message: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ message: 'No se ha seleccionado ningún archivo.' });
    }

    try {
      const b64 = Buffer.from(req.file.buffer).toString('base64');
      let dataURI = 'data:' + req.file.mimetype + ';base64,' + b64;

      const result = await cloudinary.uploader.upload(dataURI, {
        folder: 'parque_chavin',
      });

      req.cloudinaryUrl = result.secure_url;
      next();
    } catch (cloudinaryError) {
      console.error('Error al subir a Cloudinary:', cloudinaryError);
      return res.status(500).json({ message: 'Error al subir la imagen a Cloudinary.' });
    }
  });
};

module.exports = uploadToCloudinary;