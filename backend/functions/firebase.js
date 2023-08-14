const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');

const serviceAccount = require('../serviceKey.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

function addComment(movieId, comment) {
  const commentRef = db.collection('movies').doc(movieId).collection('comments');
  return commentRef.add(comment);
}

function getComments(movieId) {
    const commentRef = db.collection('movies').doc(movieId).collection('comments');
    return commentRef.get()
        .then(snapshot => {
            const comments = [];
            snapshot.forEach(doc => {
                comments.push(doc.data());
            });
            return comments;
        })
        .catch(err => {
            console.error('Error getting documents', err);
            throw err;
        });
}

async function updateMovieRating(movieId, rating) {
    const movieRef = db.collection('movies').doc(movieId);
    
    try {
        await db.runTransaction(async (transaction) => {
            const movieDoc = await transaction.get(movieRef);

            if (!movieDoc.exists) {
                transaction.set(movieRef, {
                    averageRating: rating,
                    numberOfRatings: 1
                });
            } else {
                const movieData = movieDoc.data();
                const currentAverageRating = movieData.averageRating || 0;
                const numberOfRatings = movieData.numberOfRatings || 0;
                const newAverageRating = ((currentAverageRating * numberOfRatings) + rating) / (numberOfRatings + 1);
                transaction.update(movieRef, {
                    averageRating: newAverageRating,
                    numberOfRatings: numberOfRatings + 1
                });
            }
        });
    } catch (err) {
        console.error('Error updating or creating movie', err);
        throw err;
    }
}

async function getRating(movieId) {
    const movieRef = db.collection('movies').doc(movieId);
    const movieDoc = await movieRef.get();
    if (!movieDoc.exists) {
        return null;
    }
    const movieData = movieDoc.data();
    return {
        averageRating: movieData.averageRating || 0,
        numberOfRatings: movieData.numberOfRatings || 0
    };
}

module.exports = {
    addComment,
    getComments,
    updateMovieRating,
    getRating
};
// Path: functions\index.js