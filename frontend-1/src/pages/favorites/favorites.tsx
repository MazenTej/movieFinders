import MovieCard from '../components/MovieCard';
import { mov } from '../../dummydata';
import './index.css';
import { fetchFavorites } from './favoritesHandler';
import { AuthContext } from '../../context/AuthContext'
import { useContext, useEffect, useState } from 'react'
import { Container, Grid } from '@mantine/core';
import { Navbar } from '../components/Navbar';

interface Movie {
  image: string;
  title: string;
  category: string;
  mediaType: string;
  id: string;
}



function getFavoriteMovies(moviesArray: any[]): Movie[] {
  const moviesData: Movie[] = [];
  const processedTitles = new Set();

  moviesArray.forEach((movie) => {
    if (movie.streamingInfo && movie.streamingInfo.us) {
      movie.streamingInfo.us.forEach((serviceInfo: any) => {
        const movieTitle = movie.title;
  
        if (!processedTitles.has(movieTitle)) {
          const parsedMovie: Movie = {
            title: movieTitle,
            category: movie.genres?.[0]?.name || "Unknown",
            image: movie.image,
            mediaType: movie.type,
            id : '1'
          };
  
          moviesData.push(parsedMovie);
          processedTitles.add(movieTitle);
        }
      });
    }
  });

  return moviesData;
}

function Favorites() {
  const { currentUser } = useContext(AuthContext);
  var movies = getFavoriteMovies(mov);
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser && currentUser.uid) {
        try {
          const fetchedFavorites = await fetchFavorites(currentUser.uid);
          console.log('fetchedFavorites:', fetchedFavorites);
          setFavoriteMovies(fetchedFavorites);
        } catch (error) {
          console.error('Error fetching favorites:', error);
        }
      }
    };

    fetchData();
  }, [currentUser]);

  const movieCards = movies.map((item) => (
    <MovieCard {...item} />
    ));
      
  return (
      <div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h1 className='favorites-h1'>My Watchlist</h1>
          <div style={{ height: '600px',width:"100%", textAlign:"center"}}>
              {favoriteMovies ?
                <Container style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Grid>
                  {favoriteMovies.map((movie) => (
                    <div style={{ margin: '10px' }}>
                    <MovieCard {...movie}/>
                    </div>
                  ))}
                </Grid>
                </Container>
                :
                <h1 className='favorites-h1'>No favorites yet!</h1>
              }
                
          </div>
        </div>
      </div>
  );
}

export default Favorites;