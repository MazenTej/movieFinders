import React, { useContext, useState } from "react";
import { fetchMovieDetails, fetchMovieCredits, fetchMovieVideos } from './fetchMovieDetails'
import Img from "./Img";
import { Rating } from '@mantine/core';
import Heart from "react-animated-heart";

import PosterFallback from "../../../assets/no-poster.png";
import dayjs from "dayjs";
import { PlayIcon } from "./playIcon";
import MovieRate from "./movieRate";
import "./details.css";
import { useParams } from "react-router-dom";
import VideoPopup from "./videoPopUp";
import AvailableServices from "./services"
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";
import { API_URL } from "../../../api";
// import Videos from "./videos";

type Person = {
    adult: boolean;
    credit_id: string;
    department: string;
    gender: number;  // Assuming 1 for female, 2 for male, and 0 for unknown
    id: number;
    job: string;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string | null;  // Can be a string or null
  };
  
type PeopleArray = Person[];

interface RequiredDetails{
    name : string;
    release_date : string;
    tagline : string;
    genres : [number];
    poster_path? : string;
    rating : number;
    overview : string;
    status : string;
    runtime? : number;
    director? : PeopleArray;
    writer? : PeopleArray;
    createdBy? : [number];

}

export const Details = () => {
    const { mediaType, id } = useParams();
    const { currentUser } = useContext(AuthContext);
    const [movieDetails, setMovieDetails] = useState<RequiredDetails>();
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [relatedVideos, setRelatedVideos] = useState([]);
    const [isClick, setClick] = useState(false);
    
    React.useEffect(() => {
        if(mediaType && id){
        let obj : RequiredDetails;
        fetchMovieDetails(id, mediaType).then((data) => {
            const _genres = data?.genres?.map((g: { id: any; }) => g.id)
            obj = {
                name : data.title || data.name,
                release_date : data.release_date,
                tagline : data.tagline,
                genres : _genres,
                rating : data.vote_average.toFixed(1),
                overview : data.overview,
                status : data.status,
                runtime : data.runtime,
                poster_path : `https://image.tmdb.org/t/p/original/${data.poster_path}`,
            }
            setMovieDetails(obj);
        }).catch((err) => {
            console.log(err);
        })

        fetchMovieCredits(id, mediaType).then((data) => {
            const director = data?.crew.filter((f: { job: string; }) => f.job === "Director");
            const writer = data?.crew.filter(
                (f: { job: string; }) => f.job === "Screenplay" || f.job === "Story" || f.job === "Writer"
            );
            
            obj = {
                ...obj,
                director: director,
                writer: writer,
            }
            console.log(data);
            setMovieDetails(obj);
            setLoading(false);
        }).catch((err) => {
            console.log(err);
        })

        fetchMovieVideos(id, mediaType).then((data) => {
            setVideoId(data?.results[0]?.key);
            setRelatedVideos(data?.results);
        }).catch((err) => {
            console.log(err);
        })
    }
    }, [id, mediaType]);
    const toHoursAndMinutes = (totalMinutes: number) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    };

    React.useEffect(() => {
        if (isClick && currentUser?.uid !== undefined) {
            const favourites = {
                uuid: currentUser.uid,
                image: movieDetails?.poster_path,
                title: movieDetails?.name,
                category: movieDetails?.genres,
                mediaType: mediaType,
                id : id
            };
    
            axios.post(`${API_URL}/favourites`, favourites)
            .then((response: { data: any; }) => {
                console.log('Favourite added successfully: ', response.data);
            })
            .catch((error: any) => {
                console.log('Failed to add favourite: ', error);
            });
        }
    }, [isClick, movieDetails, mediaType, id]);
    
    return (
        <section className="details section">
            {!loading ? (
        <><div className="details-container container">
                    <div className="details-left details-banner img-holder">
                        {movieDetails && movieDetails.poster_path ? (
                            <Img className="details-img" src={movieDetails.poster_path} />
                        ) : (
                            <Img className="details-img" src={PosterFallback} />
                        )}
                    </div>
                    <div className="details-right">
                        <h1 className="movie-title">
                            {`${movieDetails?.name} (${dayjs(
                                movieDetails?.release_date
                            ).format("YYYY")})`}
                        </h1>
                        <h3 className="movie-subtitle">
                            {movieDetails?.tagline}
                        </h3>
                        {<div className="movie-trailer roww">
                            <MovieRate rating={movieDetails?.rating} />
                            <div
                                className="playbtn"
                                onClick={() => {
                                    setShow(true);
                                } }
                            >
                                <PlayIcon />
                                <span className="text">
                                    Watch Trailer
                                </span>
                            </div>
                            <Heart isClick={isClick} onClick={() => setClick(!isClick)} />
                                <span className="text" style={{
                                    marginLeft: "-40px"
                                }}>
                                    Add to Watchlist
                                </span>
                            
                        </div>}
                        <div className="movie-overview">
                            <p className="overview-desc">
                                {movieDetails?.overview}
                            </p>
                        </div>
                        <div className="movie-info">
                            {movieDetails?.status && (
                                <div className="info-item">
                                    <span className="info-text info-bold">
                                        Status:{" "}
                                    </span>
                                    <span className="info-desc">
                                        {movieDetails.status}
                                    </span>
                                </div>
                            )}
                        </div>
                        <div className="movie-info">
                            {movieDetails?.release_date && (
                                <div className="info-item">
                                    <span className="info-text info-bold">
                                        Release Date:{" "}
                                    </span>
                                    <span className="info-desc">
                                        {dayjs(
                                            movieDetails?.release_date
                                        ).format("MMM D, YYYY")}
                                    </span>
                                </div>
                            )}
                        </div>
                        <div className="movie-info">
                            {movieDetails?.runtime && (
                                <div className="info-item">
                                    <span className="info-text info-bold">
                                        Runtime:{" "}
                                    </span>
                                    <span className="info-desc">
                                        {toHoursAndMinutes(
                                            movieDetails.runtime
                                        )}
                                    </span>
                                </div>
                            )}
                        </div>
                        {movieDetails?.director && movieDetails?.director?.length > 0 && (
                            <div className="movie-info">
                                <span className="info-text info-bold">
                                    Director:{" "}
                                </span>
                                <span className="info-desc">
                                    {movieDetails.director?.map((d, i) => (
                                        <span key={i}>
                                            {d.name}
                                            {//@ts-ignore
                                                movieDetails.director.length -
                                                1 !==
                                                i && ", "}
                                        </span>
                                    ))}
                                </span>
                            </div>
                        )}
                        {movieDetails?.writer && movieDetails.writer?.length > 0 && (
                            <div className="movie-info">
                                <span className="info-text info-bold">
                                    Writer:{" "}
                                </span>
                                <span className="info-desc">
                                    {movieDetails.writer?.map((d, i) => (
                                        <span key={i}>
                                            {d.name}
                                            {//@ts-ignore
                                                movieDetails.writer.length - 1 !== i && ", "}
                                        </span>
                                    ))}
                                </span>
                            </div>
                        )}
                        {
                            mediaType && id && <AvailableServices mediaType={mediaType} id={id} />
                        }
                    </div>


                </div><VideoPopup
                        show={show}
                        setShow={setShow}
                        videoId={videoId}
                        setVideoId={setVideoId} />
                        {/* <Videos data={relatedVideos} loading={loading} /> */}
                        </>
                        ) : (
            <div className="details-skeleton">
                <div className="details-skeleton-container container">
                    <div className="skeleton-left skeleton"></div>
                    <div className="skeleton-right">
                        <div className="skeleton-row skeleton"></div>
                        <div className="skeleton-row skeleton"></div>
                        <div className="skeleton-row skeleton"></div>
                        <div className="skeleton-row skeleton"></div>
                        <div className="skeleton-row skeleton"></div>
                        <div className="skeleton-row skeleton"></div>
                        <div className="skeleton-row skeleton"></div>
                    </div>
                </div>
            </div>
        )}
        </section>
    );
    }