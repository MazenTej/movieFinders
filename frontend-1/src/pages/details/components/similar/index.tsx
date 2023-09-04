import { fetchDataFromApi } from "../../../../api"
import {CardsCarousel} from "../../../components/CardCarousel"
import './index.css'
import React from "react"

async function getSimilarMovies(mediaType: string, id: string) {
    const response = await fetchDataFromApi(`/${mediaType}/${id}/similar?language=en-US&page=1`)
    //transform the data for carousel
    console.log(response)
    const movies = response.results.map((movie: any) => ({
        image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        title: movie.title,
        category: movie.release_date,
        info: movie.overview,
        mediaType: mediaType,
        id: movie.id,
    }))
    return movies
}

interface SimilarProps {
    mediaType: string;
    id: string;
}

export default function Similar({ mediaType, id }: SimilarProps) {
    const [movies, setMovies] = React.useState([])
    React.useEffect(() => {
        getSimilarMovies(mediaType, id).then((movies) => 
            {
                setMovies(movies)
                console.log(movies)
            }
        )
    }, [mediaType, id])
    return (
        <div className="similar">
            <h2>People also liked</h2>
        <CardsCarousel movies={movies} />
        </div>
    )
}
