import React, { useEffect } from "react"
import { fetchDataFromApi } from "../../api"
import { CardsCarousel } from "../components/CardCarousel";
import { Navbar } from "../components/Navbar";
import { AppShell, Container } from "@mantine/core";
import { SearchContent } from "../search";

async function getMoviesByProviders() {

    const movieResponse = await fetchDataFromApi('/movie/top_rated?language=en-US&page=1')
        const movies = movieResponse.results.map((movie: any) => {
            return {
                image: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
                title: movie.title,
                category: "Movie",
                mediaType: "movie",
                id: movie.id
            }
        })
  
        return movies
    


}

interface Movie {
    image: string;
    title: string;
    category: string;
    info: string;
    mediaType: string;
    id: string;
}

interface MoviesPageProps {
    searchValue: string;
}

export function MoviesPage( {searchValue}: MoviesPageProps) {
    const [movies, setMovies] = React.useState<Movie[]>([]); // Initialize with an empty array

    useEffect(()=> {
        getMoviesByProviders().then((gotMovies)=> {
            setMovies(gotMovies)
        })
    },[])

    return (<Container size={1200} style={{ marginTop: '5%', overflow: 'scroll'}}>
        <CardsCarousel movies={movies}/>
    </Container>)
}