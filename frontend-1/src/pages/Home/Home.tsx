import React, { useEffect, useState } from 'react';
import { Card, Container, Grid, Text, Title } from '@mantine/core';
import { Navbar } from '../components/Navbar';
import { CardsCarousel } from '../components/CardCarousel';
import { dummyService, mov, servList } from './dummydata';
import { useLocation } from 'react-router-dom';

interface Movie {
  image: string;
  title: string;
  category: string;
  info: string;
}
interface MovieService {
  [serviceName: string]: Movie[];
}

function mapDataToMovie(data: any): Movie[] {
  return data.map((item: any) => ({
    title: item.title,
    category: item.genres[0]?.name || "Unknown", // Using the first genre as category
    info: item.type === 'series' ? `${item.firstAirYear} - ${item.lastAirYear}` : `${item.year}`, // Displaying years
    image: `https://image.tmdb.org/t/p/w500${item.tmdbId}.jpg`, // Assuming you can get images via TMDB with tmdbId (you might need to adjust this)
  }));
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
  const [error, setError] = useState("");
  const location = useLocation();
  let userName = location.state?.userName;

  



// useEffect(()=>{
  


//   fetch(`http://localhost:4000/moviesByServices/${servList}`)
//   .then((response)=> response.json())
//   .then((data)=> {
//     const movies=transformMoviesArray(data)
//     setShowsByService(movies)
    
//   })
// },[])


useEffect(()=> {
  console.log("shows",showsByService)
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
      <Navbar user={userName}/>
      <Container size={1200} style={{ marginTop: '1300px' }}>
        {Object.keys(showsByService).map((serviceName) => (
          <div key={serviceName}>
            <Title order={2}>
              {capitalize(serviceName)}
            </Title>
            <CardsCarousel movies={showsByService[serviceName] || []} />
          </div>
        ))}
      </Container>
    </div>
  );
}

export default Home;
