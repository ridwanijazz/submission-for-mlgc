import tf from '@tensorflow/tfjs-node';
import dotenv from 'dotenv';

dotenv.config();

async function loadModel() {
  const modelUrl = process.env.MODEL_URL || '' ;  //Change this to your model URL if process.env.MODEL_URL is undefined

  try {
    const model = await tf.loadGraphModel(modelUrl);
    console.log('Model loaded successfully.');
    return model;
  } catch (error) {
    console.error('Error loading model:', error);
    throw new Error('Failed to load the TensorFlow model. Check the MODEL_URL or network connectivity.');
  }
}

export { loadModel };
