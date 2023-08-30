const admin = require('firebase-admin');

const serviceAccount = require('../serviceKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const addComment = async (movieId, comment) => {
    const newComment = {
    author: comment.author,
    body: comment.body,
    postedAt: comment.postedAt,
    replies: [],
    uuid: admin.firestore().collection('random').doc().id // Generate a random ID
    };
  
    const movieRef = db.collection('movies').doc(movieId);
    await movieRef.set({
        comments: admin.firestore.FieldValue.arrayUnion(newComment)
      }, { merge: true });
  };

  const addReply = async (movieId, commentUuid, reply) => {
    // Define the reply structure
    const newReply = {
        author: reply.author,
        body: reply.body,
        postedAt: reply.postedAt,
    };
  
    const movieRef = db.collection('movies').doc(movieId);
    const movieSnapshot = await movieRef.get();

    if (!movieSnapshot.exists) {
        console.error('Movie not found');
        return;
    }

    const movieData = movieSnapshot.data();
    if (!movieData || !movieData.comments) {
        console.error('No comments found on movie');
        return;
    }

    // Find the comment using the UUID and append the reply
    const updatedComments = movieData.comments.map((comment) => {
        if (comment.uuid === commentUuid) {
            return {
                ...comment,
                replies: [...(comment.replies || []), newReply]
            };
        }
        return comment;
    });

    // Update the movie with the appended reply
    await movieRef.update({
        comments: updatedComments
    });
};


const getCommentsForMovie = async (movieId) => {
    const movieRef = db.collection('movies').doc(movieId);
    const napshot = await movieRef.get();
    return napshot.data().comments;
  };
  

  

module.exports = {
    addComment,
    addReply,
    getCommentsForMovie
};
// Path: functions\index.js