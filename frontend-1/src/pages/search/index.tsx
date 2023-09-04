import { useEffect, useState } from "react";
import { fetchDataFromApi } from "../../api";
import MovieCard from "../components/MovieCard";
import { Container, Grid } from '@mantine/core';
import './index.css'

interface Movie {
    image: string;
    title: string;
    category: string;
    info: string;
    mediaType: string;
    id: string;
}
  
interface CardsCarouselProps {
    movies: Movie[];
}

interface SearchContentProps {
    searchValue: string;
}

async function getSearchResults(searchValue: string) : Promise<CardsCarouselProps> {
    const movieResponse = await fetchDataFromApi(`/search/movie?query=${searchValue}&language=en-US&page=1&include_adult=false`)
    const tvResponse = await fetchDataFromApi(`/search/tv?query=${searchValue}&language=en-US&page=1&include_adult=false`)
    console.log('searchResultsFunction', movieResponse)
    const movies = movieResponse.results.map((movie: any) => {
        return {
            image: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
            title: movie.title,
            category: "Movie",
            mediaType: "movie",
            id: movie.id
        }
    }
    )
  
    const tvs = tvResponse.results.map((tv: any) => {
        return {
            image: `https://image.tmdb.org/t/p/original${tv.poster_path}`,
            title: tv.name,
            category: "TV",
            mediaType: "tv",
            id: tv.id
        }
    }
    )
      //return top 5 results
    return {
        movies: [...movies, ...tvs].slice(0, 8)
    }
}

export const SearchContent = ({ searchValue }: SearchContentProps) => {
    const [searchResults, setSearchResults] = useState<Movie[]>([]);
    const [searchValueState, setSearchValueState] = useState<string>('');

    useEffect(() => {
        //if searchValue is empty, don't do anything
        if (searchValue === '') {
            return;
        }
        //if searchValue is not empty and has changed since the last time, fetch new search results every 2 seconds
        if (searchValue !== searchValueState) {
            setSearchValueState(searchValue);
            const interval = setInterval(() => {
                getSearchResults(searchValue).then((searchResults) => {
                    setSearchResults(searchResults.movies)
                })
            }
            , 2000);
            return () => clearInterval(interval);
        }
    }, [searchValue]);
    
    return(
        <Container size={1200} style={{ marginTop: '40%' }}>
            <h1>Search Results for {searchValue}</h1>
            <Grid>
            {
                
                searchResults.length >= 0 && searchResults.map((movie) => {
                    return (
                        <Grid.Col span={3}>
                        <MovieCard
                            image={movie.image}
                            title={movie.title}
                            category={movie.category}
                            mediaType={movie.mediaType}
                            id={movie.id}
                        />
                        </Grid.Col>
                    )
                }
                )
            }
        </Grid>
        </Container>
    )
}

