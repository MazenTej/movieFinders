import React, { useEffect } from "react"
import { fetchDataFromApi } from "../../api"
import { CardsCarousel } from "../components/CardCarousel";
import { Navbar } from "../components/Navbar";
import { AppShell, Container } from "@mantine/core";
import { SearchContent } from "../search";

async function getseriesByProviders() {

    const movieResponse = await fetchDataFromApi('/tv/top_rated?language=en-US&page=1')
        const movies = movieResponse.results.map((tv: any) => {
            return {
                image: `https://image.tmdb.org/t/p/original${tv.poster_path}`,
                title: tv.name,
                category: "TV",
                mediaType: "tv",
                id: tv.id
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

export function SeriesPage( {searchValue}: MoviesPageProps) {
    const [movies, setMovies] = React.useState<Movie[]>([]); // Initialize with an empty array

    useEffect(()=> {
        getseriesByProviders().then((gotMovies)=> {
            setMovies(gotMovies)
        })
    },[])

    return (<Container size={1200} style={{ marginTop: '5%', overflow: 'scroll'}}>
        <CardsCarousel movies={movies}/>
    </Container>)
}