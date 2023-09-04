import React from "react"
import { fetchDataFromApi } from "../../api"
import { CardsCarousel } from "../components/CardCarousel";
import { Navbar } from "../components/Navbar";
import { AppShell, Container } from "@mantine/core";
import './index.css'
import { SearchContent } from "../search";
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

async function getTopRated() {
    const movieResponse = await fetchDataFromApi('/movie/top_rated?language=en-US&page=1')
    const tvResponse = await fetchDataFromApi('/tv/top_rated?language=en-US&page=1')
    
    const movies = movieResponse.results.map((movie: any) => {
        return {
            image: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
            title: movie.title,
            category: "Movie",
            mediaType: "movie",
            id: movie.id
        }
    })
    const tvs = tvResponse.results.map((tv: any) => {
        return {
            image: `https://image.tmdb.org/t/p/original${tv.poster_path}`,
            title: tv.name,
            category: "TV",
            mediaType: "tv",
            id: tv.id
        }
    })
    return {
        movies: [...movies, ...tvs]
    }
}

async function getDiscover() {
    //https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.asc'
    const movieResponse = await fetchDataFromApi('/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc')

    //pick a random movie from the response
    const movie = movieResponse.results[Math.floor(Math.random() * movieResponse.results.length)]
    console.log(movie)
    return {
        image: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
        title: movie.title,
        category: "Movie",
        mediaType: "movie",
        id: movie.id,
        info : movie.overview
    }
}

async function getTrending() {
    const movieResponse = await fetchDataFromApi('/trending/movie/day?language=en-US')
    const tvResponse = await fetchDataFromApi('/trending/tv/day?language=en-US')

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
    return {
        movies: [...movies, ...tvs]
    }
}

interface HomePageProps {
    searchValue: string;
}
export function HomePage1( {searchValue}: HomePageProps) {
    const [topRated, setTopRated] = React.useState<CardsCarouselProps>()
    const [discover, setDiscover] = React.useState<Movie>()
    const [trending, setTrending] = React.useState<CardsCarouselProps>()
    React.useEffect(() => {
        getTopRated().then((topRated) => {
            setTopRated(topRated)
        })
        getDiscover().then((discover) => {
            setDiscover(discover)
        })
        getTrending().then((trending) => {
            setTrending(trending)
        }
        )
    }, [])

    //update discover every 5 seconds
    React.useEffect(() => {
        const interval = setInterval(() => {
            getDiscover().then((discover) => {
                console.log(discover)
                setDiscover(discover)
            })
        }, 10000)
        return () => clearInterval(interval)
    }, [])

    return (
            <>
             
             <Container size={1200} style={{ marginTop: '5%' }}> 
           
            <div className="discover">
                <div className="discoverInfo">
                    <h1 className="discoverTitle">
                        {discover?.title}
                    </h1>
                    <div className="discoverDescription">
                        {discover?.info}
                    </div>
                    <div className = "LearnMoreButton">
                    <a className="button" href={`/movie/${discover?.id}`}>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            Learn More
                        </a>
                    </div>
                </div>
                <div className="discoverImage">
                <img src={discover?.image} alt="discover"/>
                <div className="overlay"></div>
                </div>
            </div>
            <div >
                <h1 style={{color: "white", paddingBottom: '20px'}}>trending</h1>
            </div>
            <Container size={1200} style={{
                marginBottom: '20px'
            }}>
                {trending ? <CardsCarousel movies={trending.movies} /> : null}
            </Container>
            <div >
                <h1 style={{color: "white", paddingBottom: '20px'}}>Top Rated</h1>
            </div>
            <Container size={1200} style={{
                paddingBottom: '70px'
            }}>
                {topRated ? <CardsCarousel movies={topRated.movies} /> : null}
            </Container>
        </Container>
        </>
    )
}
