import { useEffect, useState } from "react";
import Img from "../Img";
import { PlayIcon } from "../playIcon";
import VideoPopup from "../videoPopUp";
import './index.css'

const Videos = ({ data, loading } : 
    {
        data: any;
        loading: boolean;
    }
    ) => {
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);
    useEffect(() => {
        console.log(data);
    }, [data]);
    const loadingSkeleton = () => {
        return (
            <div className="skItem">
                <div className="thumb skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };

  return (
    <section className="cast">
        <h3 className="movie-section-title container">Official Videos</h3>
        <div className="cast-container container">
            {!loading ? (
                <div className="movie-videos">
                    {data?.results?.map((video : any) => (
                        <div
                            key={video.id}
                            className="movie-videoitem"
                            onClick={() => {
                                setVideoId(video.key);
                                setShow(true);
                            }}
                        >
                            <div className="movie-videothumbnail">
                                <Img
                                    src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                                />
                                <PlayIcon />
                            </div>
                            <div className="movie-videotitle">{video.name}</div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="videoSkeleton">
                    {loadingSkeleton()}
                    {loadingSkeleton()}
                    {loadingSkeleton()}
                    {loadingSkeleton()}
                </div>
            )}
        </div>
        <VideoPopup
            show={show}
            setShow={setShow}
            videoId={videoId}
            setVideoId={setVideoId}
        />
    </section>
  )
}

export default Videos