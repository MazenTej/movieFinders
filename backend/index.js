const express = require('express');
const searchMovies = require('./functions/search');
const axios = require('axios');
const bodyParser = require('body-parser');
const { addComment, getComments, updateMovieRating, getRating } = require('./functions/firebase');


const app = express();
const PORT = 4000;
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.send('Hey this is my API running 🥳');
});

app.post('/comments', (req, res) => {
  const movieId = req.body.movieId;
  const userID = req.body.userID;
  const userName = req.body.userName;
  const comment = req.body.comment;
  if (!movieId || !userID || !userName || !comment) {
    return res.status(400).send('Please provide a movieId, userID, userName and comment.');
  }
  addComment(movieId, { userID, userName, comment })
    .then(() => {
      res.status(201).send('Comment added successfully.');
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Something went wrong.');
    });
});

app.get('/comments', (req, res) => {
  const movieId = req.query.movieId;
  if (!movieId) {
    return res.status(400).send('Please provide a movieId.');
  }
  getComments(movieId)
    .then(comments => {
      res.json(comments);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Something went wrong.');
    });
});

app.post('/rating', (req, res) => {
  const movieId = req.body.movieId;
  const rating = req.body.rating;
  if (!movieId || !rating) {
    return res.status(400).send('Please provide a movieId and rating.');
  }
  updateMovieRating(movieId, rating)
    .then(() => {
      res.status(201).send('Rating added successfully.');
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Something went wrong.');
    });
});

app.get('/rating', (req, res) => {
  const movieId = req.query.movieId;
  if (!movieId) {
    return res.status(400).send('Please provide a movieId.');
  }
  getRating(movieId)
    .then(rating => {
      res.json(rating);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Something went wrong.');
    });
});



app.get('/search', (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.status(400).send('Please provide a search query.');
  }
  
  searchMovies(query)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.status(500).send('Something went wrong.');
    });
});

app.get('/streaming', async (req, res) => {
  const options = {
    method: 'GET',
    url: 'https://streaming-availability.p.rapidapi.com/get',
    params: {
      output_language: 'en',
      imdb_id: '603'
    },
    headers: {
      'X-RapidAPI-Key': '27c081bb14msh45367a4447b605dp152897jsn675076a6bd54',
      'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong.');
  }
});


app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

// Export the Express API
module.exports = app;
