// index.js
const express = require('express');
const axios = require("axios");
const { addComment, getComments, updateMovieRating, getRating } = require('./functions/firebase');

const app = express();
const PORT = 4000;

let apiFile = require("./env.json");
let rapidApiKey = apiFile["rapid_api_key"];
let rapidBaseUrl = apiFile["rapid_api_url"];
let tmdbApiToken = apiFile["tmdb_api_token"];
let tmdbBaseUrl = apiFile["tmdb_api_url"];

app.get('/', (req, res) => {
  res.send('Hey this is my API running 🥳')
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



app.get('/services', (req, res) => {
  let services = {};
  axios(`${rapidBaseUrl}/services?rapidapi-key=${rapidApiKey}`).then(response => {
    let results = response.data.result;

    for (const [service, details] of Object.entries(results)) {
      let isAvailableInUs = details.countries["us"] !== undefined ? true : false;
      if (isAvailableInUs) {
        services[service] = details;
      }
    };

    // TO-DO the key values should be added as the data value for frontend elements
    // this should not be hard coded since it can be changed and we may need to pass it on click events

    return res.json(services);
  }).catch(error => {
    console.log(error);
    return res.status(400).json({error: "Something went wrong, cannot retrieve services at this time"})
  })
});

app.get('/moviesByServices', (req, res) => {
  let query = req.query;

  if (!query.services && !(query.services instanceof String)) {
    console.log("Error: request should have a query called services that is a comma delimited list of services.");
    return res.status(400).json({error: "Something went wrong, can not show these movies at this time. Try again at a later time."})
  }

  axios(`${rapidBaseUrl}/search/filters?services=${query.services}&country=us&rapidapi-key=${rapidApiKey}`).then(response => {
    let result = response.data.result;

    return res.status(200).json(result);
  }).catch(error => {
    console.log(error);
    return res.status(400).json({error: "Something went wrong, cannot retrieve movies at this time"})
  })
});

app.get('/genres', (req, res) => {
  axios(`${rapidBaseUrl}/genres&rapidapi-key=${rapidApiKey}`).then(response => {
    let result = response.data.result;
    // TO-DO the key values should be added as the data value for frontend elements
    // this should not be hard coded since genres can be added in the future I believe
    return res.status(200).json(result);
  }).catch(error => {
    console.log(error);
    return res.status(400).json({error: "Something went wrong, cannot retrieve genres at this time"})
  })
});

app.get('/moviesByGenres', (req, res) => {

  if (!isValidGenresRequest(req)) {
    console.log("Request requires genres in the query and should be a comma delimited list of their associated key numbers.");
    return res.status(400).json({error: "This is not a valid genre request. Please try again at a later time."})
  }

  axios(`${rapidBaseUrl}/search/filters?genres=${req.query.genres}&country=us&rapidapi-key=${rapidApiKey}`).then(response => {
    let result = response.data.result;
    
    return res.status(200).json(result);
  }).catch(error => {
    console.log(error);
    return res.status(400).json({error: `Something went wrong, cannot retrieve movies at this time for genre key numbers ${req.query.genres}.`})
  })
});

function isValidGenresRequest(req) {

  if (!req.query || !req.query.genres || genres === "") {
    return false;
  }

  let list = req.query.genres.split(',');

  list.forEach(genre => {
    let genreKeys = Object.keys(genresId);
    let selectedKey;

    try { 
      selectedKey = Integer.parseInt(genre); 
    } catch (e) { 
        return false; 
    }

    if (!genreKeys.contains(selectedKey)) {
      return false;
    }
  });

  return true;
}


app.listen(PORT, () => {
  console.log(`API listening on PORT ${PORT} `)
});
// Export the Express API
module.exports = app;
