import axios from 'axios';

const key = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MmRjOWZiMTg1MDFjZDNhMmE1MjljZWExMmJmNmFkYyIsInN1YiI6IjY0ZDMzOTc3YjZjMjY0MDBjNjIxN2ViNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wJQFwGXIxTf9f_Fc2C2MmjQ91G0w5XQnbjIh14U4heA';

export const fetchMovieDetails = async (movieId: string, mediatype : string) => {
  const url = `https://api.themoviedb.org/3/${mediatype}/${movieId}?language=en-US`;
  const options = {
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + key
    }
  };

  try {
    const response = await axios.get(url, options);
    return response.data;
  } catch (error) {
    throw error;  // Re-throw the error for the calling function to handle
  }
};


export const fetchMovieCredits = async (movieId: string, mediatype: string) => {
  const url = `https://api.themoviedb.org/3/${mediatype}/${movieId}/credits?language=en-US`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + key
    }
  };

  try {
    const response = await axios.get(url, options);
    return response.data;
  }
  catch (error) {
    throw error;
  }
};

export const fetchMovieVideos = async (movieId: string, mediatype: string) => {
  const url = `https://api.themoviedb.org/3/${mediatype}/${movieId}/videos`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + key
    }
  };

  try {
    const response = await axios.get(url, options);
    return response.data;
  }
  catch (error) {
    throw error;
  }
};


