import MovieCard from '../components/MovieCard';
import { mov } from '../../dummydata';
import './index.css';

interface Movie {
  image: string;
  title: string;
  category: string;
  info: string;
  type: string;
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
            info: movie.type === 'series' ? `${movie.firstAirYear} - ${movie.lastAirYear}` : `${movie.year}`,
            image: movie.image,
            type: movie.type
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
  const testMovies = getFavoriteMovies(mov);

  const movieCards = testMovies.map((item) => (
      <MovieCard {...item} />
  ));
      
  return (
      <div>
          <h1 className='favorites-h1'>My Favorites</h1>
          <div style={{ height: '600px',width:"1100px", overflowY: 'scroll', position:"relative" }}>
              {movieCards}
          </div>
      </div>
  );
}

export default Favorites;