import 'dotenv/config.js';
import Hapi from '@hapi/hapi';
import routes from './routes.js';
import { loadModel } from '../services/loadModel.js';
import InputError from '../errors/InputError.js';

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 8080,
    host: '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'],
      },
      payload: {
        maxBytes: 1000000, // Maksimum ukuran file 1 MB
      },
    },
  });

  // Load TensorFlow model
  try {
    const model = await loadModel();
    server.app.model = model;
    console.log('Model loaded successfully.');
  } catch (error) {
    console.error('Error loading model:', error.message);
    process.exit(1); // Keluar jika model gagal dimuat
  }

  // Register routes
  server.route(routes);

  // Middleware untuk log permintaan masuk
  server.ext('onRequest', (request, h) => {
    console.log(`[${new Date().toISOString()}] Incoming request: ${request.method.toUpperCase()} ${request.path}`);
    return h.continue;
  });

  // Middleware untuk menangani error
  server.ext('onPreResponse', (request, h) => {
    const { response } = request;

    if (response instanceof InputError) {
      return h.response({
        status: 'fail',
        message: response.message,
      }).code(response.statusCode || 400);
    }

    if (response.isBoom) {
      const statusCode = response.output.statusCode;

      if (statusCode === 404) {
        return h.response({
          status: 'fail',
          message: 'Endpoint tidak ditemukan',
        }).code(404);
      }

      if (statusCode === 413) {
        return h.response({
          status: 'fail',
          message: 'Payload content length greater than maximum allowed: 1000000',
        }).code(413);
      }

      return h.response({
        status: 'fail',
        message: response.message || 'Terjadi kesalahan pada server',
      }).code(statusCode);
    }

    return h.continue;
  });

  // Start server
  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};

// Initialize the server
init();
