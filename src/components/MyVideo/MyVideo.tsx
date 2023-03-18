import React from "react";
import ReactPlayer from "react-player";
import styled from "styled-components";
import { useAppDispatch } from "../../redux/store";
import { setWatchedLessons } from "../../redux/watchedLessonsSlice";

const VideoWrapperCSS = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
`;
const VideoCSS = styled.div``;
const PlayerCSS = styled(ReactPlayer)``;
const VideoTextCSS = styled.div`
    width: 100%;
    text-align: center;
    @media(max-width: 480px){
        font-size: 12px;
    }
    @media(max-width: 357px){
        font-size: 10px;
    }
`;

interface MyVideoProps {
    url: string;
    width?: any;
    height?: any;
    videoId?: string;
    autoPlay?: boolean;
    volume?: number;
}

interface PlayerProgressEvent {
    played: number;
    playedSeconds: number;
    loaded: number;
    loadedSeconds: number;
}

const MyVideo: React.FC<MyVideoProps> = ({
    url,
    height,
    width,
    videoId,
    autoPlay = false,
    volume = 1,
}) => {
    const dispatch = useAppDispatch();

    // зміна швидкості клавішами
    const [speed, setSpeed] = React.useState(1);
    const increaseSpeed = () => {
        setSpeed((prevRate) => prevRate + 0.25);
    };
    const decreaseSpeed = () => {
        setSpeed((prevRate) => prevRate - 0.25);
    };
    React.useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "+") {
                increaseSpeed();
            } else if (event.key === "-") {
                decreaseSpeed();
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    //Прогрес перегляду відео. Отримання його та передача в стейт. В стейті він зберігається в local storage
    const [progress, setProgress] = React.useState(0);

    const handleProgress = (state: PlayerProgressEvent) => {
        setProgress(state.played);
        if (state.played > 0) {
            if (videoId) {
                dispatch(setWatchedLessons({ id: videoId, progress }));
            }
        }
    };

    return (
        <VideoWrapperCSS>
            <VideoCSS>
                <PlayerCSS
                    url={url}
                    controls={true}
                    playbackRate={speed}
                    width={width}
                    height={height}
                    onProgress={handleProgress}
                    playing={autoPlay}
                    volume={volume}
                />
            </VideoCSS>
            <VideoTextCSS>
                Press the "+" key to speed up the video and "-" to slow it down.
            </VideoTextCSS>
        </VideoWrapperCSS>
    );
};

export default MyVideo;
