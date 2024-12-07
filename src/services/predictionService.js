import tf from '@tensorflow/tfjs-node';
import InputError from '../errors/InputError.js';

async function classifyImage(model, imageBuffer) {
  try {
    // Decode image buffer to tensor
    const tensor = tf.node
      .decodeImage(imageBuffer)
      .resizeNearestNeighbor([224, 224]) // Resize to [224, 224]
      .toFloat()
      .expandDims(); // Add batch dimension: [1, 224, 224, 3]

    // Inference with the model
    const prediction = model.predict(tensor);

    // Extract prediction data
    const scores = prediction.dataSync();
    const predictionScore = Math.max(...scores) * 100; // Convert to percentage

    // Determine result
    const result = predictionScore > 50 ? 'Cancer' : 'Non-cancer';
    const suggestion =
      result === 'Cancer'
        ? 'Segera periksa ke dokter!'
        : 'Penyakit kanker tidak terdeteksi.';

    return { predictionScore, result, suggestion };
  } catch (error) {
    console.error('Prediction error:', error.message);
    throw new InputError('Terjadi kesalahan dalam melakukan prediksi');
  }
}

export { classifyImage };
