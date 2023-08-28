import React, { useEffect, useState } from 'react';
import { Card, Container, Grid, Text, Title } from '@mantine/core';
import { Navbar } from '../components/Navbar';
import { CardsCarousel } from '../components/CardCarousel';
import { dummyService, mov, servList } from './dummydata';
interface Movie {
  image: string;
  title: string;
  category: string;
  info: string;
  type: string;
}
interface MovieService {
  [serviceName: string]: Movie[];
}



function transformMoviesArray(moviesArray: any[]): Record<string, Movie[]> {
  const transformedData: Record<string, Movie[]> = {};
  const processedTitles = new Set();

  moviesArray.forEach((movie) => {
    if (movie.streamingInfo && movie.streamingInfo.us) {
      movie.streamingInfo.us.forEach((serviceInfo: any) => {
        const serviceName = serviceInfo.service;
        const movieTitle = movie.title;

        if (!transformedData[serviceName]) {
          transformedData[serviceName] = [];
        }

        if (!processedTitles.has(movieTitle)) {
          const transformedMovie: Movie = {
            title: movieTitle,
            category: movie.genres?.[0]?.name || "Unknown",
            info: movie.type === 'series' ? `${movie.firstAirYear} - ${movie.lastAirYear}` : `${movie.year}`,
            image: movie.image,
            type: movie.type
          };

          transformedData[serviceName].push(transformedMovie);
          processedTitles.add(movieTitle);
        }
      });
    }
  });

  return transformedData;
}





function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function Home() {
  const [services, setServices] = useState<Record<string, any>>({});
  const [showsByService, setShowsByService] = useState<MovieService>({});
  const [selectedGenre, setSelectedGenre] = useState<string>("all");


  



// useEffect(()=>{
  


//   fetch(`http://localhost:4000/moviesByServices/${servList}`)
//   .then((response)=> response.json())
//   .then((data)=> {
//     const movies=transformMoviesArray(data)
//     setShowsByService(movies)
    
//   })
// },[])


useEffect(()=> {
  const movies=transformMoviesArray(mov)
  setShowsByService(movies)
},[showsByService])
// useEffect(()=> {
//   fetch(`http://localhost:4000/moviesByServices/${servList}`)
//   .then((response)=> response.json())
//   .then((moviesData)=> {
//     const movies = mapDataToMovie(moviesData);
//     console.log("before",moviesData)
//     console.log("after",movies)
//   })
// },[])
const filteredMovies: Record<string, Movie[]> = Object.keys(showsByService).reduce(
  (filteredData, serviceName) => {
    const filteredServiceMovies = showsByService[serviceName].filter(
      (movie) => selectedGenre === "all" || movie.category.toLowerCase() === selectedGenre.toLowerCase()
    );
    if (filteredServiceMovies.length > 0) {
      filteredData[serviceName] = filteredServiceMovies;
    }
    return filteredData;
  },
  {} as Record<string, Movie[]> // Initialize with empty object
);



  // useEffect(() => {
  //   Object.keys(services).forEach((serviceName) => {
  //     fetch(`http://localhost:4000/moviesByServices/${serviceName}`)
  //       .then((response) => response.json())
  //       .then((moviesData) => {
  //         const movies = mapDataToMovie(moviesData);
  //         setShowsByService(prevState => ({
  //           ...prevState,
  //           [serviceName]: movies
  //         }));
  //       })
  //       .catch((err) => setError(err.message));
  //   });
  // }, [services]);

  // useEffect(() => {
  //   fetch(`http://localhost:4000/services`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setServices(data);
  //     })
  //     .catch((err) => setError(err.message));
  // }, []);

  // useEffect(()=> {
  //   const movies=transformMoviesArray(mov)
  //   setShowsByService(movies)
  // },[showsByService])
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Navbar user="Mazen Tej" selectedGenre={selectedGenre} setSelectedGenre={setSelectedGenre} />
      <Container>
      <div style={{ height: '600px',width:"1000px", overflowY: 'scroll' }}>

        {Object.keys(showsByService).map((serviceName) => (
          <div key={serviceName}>
            <Title order={2}>
              {capitalize(serviceName)}
            </Title>

            {filteredMovies[serviceName] && filteredMovies[serviceName].length > 0 ? (
              <CardsCarousel movies={filteredMovies[serviceName]} />
            ) : (
              <Text>No movies available for the selected genre</Text>
            )}          </div>
        ))}
                </div>



      </Container>
    </div>
  );
}

export default Home;
