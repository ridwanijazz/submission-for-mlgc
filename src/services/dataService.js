import { Firestore } from '@google-cloud/firestore';

const db = new Firestore();

async function savePrediction(id, data) {
  try {
    const predictionsCollection = db.collection('predictions');
    await predictionsCollection.doc(id).set(data);
    return { success: true };
  } catch (error) {
    console.error('Error saving data:', error.message);
    return { success: false, error: 'Failed to save data' };
  }
}

async function getPredictionHistory() {
  try {
    const predictionsCollection = db.collection('predictions');
    const snapshot = await predictionsCollection.get();
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      history: doc.data(),
    }));
  } catch (error) {
    console.error('Error fetching data:', error.message);
    return [];
  }
}

// async function getPredictionHistory() {
//   try {
//     const predictionsCollection = db.collection('predictions');
//     const snapshot = await predictionsCollection.get();

//     const data = snapshot.docs.map((doc) => {
//       const docData = doc.data();
//       return {
//         id: doc.id,
//         history: {
//           result: docData.result,
//           createdAt: docData.createdAt,
//           suggestion: docData.suggestion,
//           id: doc.id,
//         },
//       };
//     });

//     // Langsung mengembalikan data sesuai format yang diminta
//     return {
//       status: 'success',
//       data,
//     };
//   } catch (error) {
//     console.error('Error fetching data:', error.message);
//     return {
//       status: 'error',
//       message: 'Failed to fetch data',
//     };
//   }
// }



export { savePrediction, getPredictionHistory};
