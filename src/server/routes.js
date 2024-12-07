//  routes.js
import Joi from 'joi';
import controller from './controller.js';

const routes = [
  {
    path: '/predict',
    method: 'POST',
    handler: controller.handlePrediction,
    options: {
      validate: {
        headers: Joi.object({
          'content-type': Joi.string()
            .required()
            .pattern(/multipart\/form-data/, 'multipart/form-data'), // Validasi untuk content-type
        }).unknown(), // Allow other headers
      },
      payload: {
        allow: 'multipart/form-data',
        multipart: true,
        maxBytes: 1 * 1024 * 1024, // Maksimum ukuran file (1 MB)
        output: 'stream', // Output berupa stream untuk mempermudah membaca file
        parse: true, // Parsing otomatis untuk multipart/form-data
      },
    },
  },
  {
    path: '/predict/histories',
    method: 'GET',
    handler: controller.getPredictionHistory,
  },
];

export default routes;

