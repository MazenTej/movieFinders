import React from "react"
import { fetchDataFromApi } from "../../api"
import { CardsCarousel } from "../components/CardCarousel";
import { Navbar } from "../components/Navbar";
import { AppShell, Container } from "@mantine/core";
import { SearchContent } from "../search";

async function getMoviesByProviders() {
    const providers = await fetchDataFromApi('/watch/providers/movie?language=en-US&watch_region=us');
    const moviesBaseUrl = '/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&watch_region=us&with_watch_providers=';

    const providersMovies = providers.results.map(async (provider: any) => {
        const name = provider.provider_name;
        const moviesResponse = await fetchDataFromApi(moviesBaseUrl + name);
        const movies = moviesResponse.results.map((movie: any) => {
            return {
                image: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
                title: movie.title,
                category: "Movie",
                mediaType: "movie",
                id: movie.id
            }
        })

        return ( <div> 
           
                    <div >
                        <h1 style={{color: "white", paddingBottom: '20px'}}>{name}</h1>
                    </div>
                    <Container size={1200} style={{
                            marginBottom: '20px'
                            }}>
                        {movies ? <CardsCarousel movies={movies} /> : null}
                    </Container>
                </div>)
    })

    return (<Container size={1200} style={{ marginTop: '5%', overflow: 'scroll'}}>{providersMovies}</Container>)
}

interface MoviesPageProps {
    searchValue: string;
}

export function MoviesPage( {searchValue}: MoviesPageProps) {
    const [movies, setMovies] = React.useState<''>()

    return (<Container size={1200} style={{ marginTop: '5%', overflow: 'scroll'}}>{movies}</Container>)
}