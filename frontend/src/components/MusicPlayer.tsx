import {
    useState,
    useRef,
    useContext,
    createContext,
    useEffect,
    ChangeEvent,
    SyntheticEvent,
} from "react";
import { MusicPlayerContext } from "../contexts/MusicPlayerContext";
import {
    ForwardIcon,
    BackwardIcon,
    SpeakerWaveIcon,
    PlayCircleIcon,
    PauseCircleIcon,
} from "@heroicons/react/24/solid";
import { secondsToMinutes } from "../functions/generalFunctions";
function MusicPlayer() {
    const context: any = useContext(MusicPlayerContext);
    const [playing, setPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const audioRef: any = useRef(null);

    const adjustVolume = (e: any) => {
        let percentage = parseInt(e.target.value) / 100;
        audioRef.current.volume = percentage;
    };
    const toggleAudio = () => {
        if (!audioRef.current) return;
        if (audioRef.current.paused) {
            audioRef.current.play();
            setPlaying(true);
        } else {
            audioRef.current.pause();
            setPlaying(false);
        }
    };
    useEffect(() => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        } else {
            return;
        }
        const interval = setInterval(() => {
            if (!audioRef.current.paused) {
                setCurrentTime(audioRef.current.currentTime);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [audioRef.current]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.play();
            setPlaying(true);
        }
    }, [context.song]);
    useEffect(() => {
        function handleKeyDown(e: any) {
            if (e.keyCode === 32) {
                toggleAudio();
            }
        }

        document.addEventListener("keydown", handleKeyDown);

        return function cleanup() {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <>
            {context.song.song_path && (
                <>
                    <audio
                        ref={audioRef}
                        src={`http://localhost:8000/storage/songs/${context.song.song_path}`}
                    />
                    <div className="w-full px-5 h-20 md:h-16 flex justify-between items-center md:h-20 bg-black border-t border-gray-700">
                        <div className="w-1/3 flex">
                            <img
                                src={
                                    "http://localhost:8000/storage/images/covers/" +
                                    context.song.cover_path
                                }
                                className="w-10 h-10 mr-3"
                            />
                            <div className="flex flex-col">
                                <p className="text-blue-500 font-semibold">
                                    {context.song.name}
                                </p>
                                <p className="text-xs text-gray-300">
                                    {context.song.artist}
                                </p>
                            </div>
                        </div>
                        <div className="w-1/3 h-full flex flex-col items-center">
                            <div className="flex flex-row h-3/5 w-full items-center pt-3 justify-center">
                                <BackwardIcon className="h-6 mr-2" />
                                {playing ? (
                                    <PauseCircleIcon
                                        className="h-8 mr-3"
                                        onClick={toggleAudio}
                                    />
                                ) : (
                                    <PlayCircleIcon
                                        className="h-8 mr-3"
                                        onClick={toggleAudio}
                                    />
                                )}
                                <ForwardIcon className="h-6" />
                            </div>
                            {/* todo: make component */}
                            <div className="hidden md:flex w-full pt-1 justify-center items-center ">
                                <span className="text-xs text-gray-400 font-semibold mr-2">
                                    {secondsToMinutes(currentTime)}
                                </span>
                                <div className="w-3/4 h-1 rounded-full bg-gray-700 mr-2">
                                    <div
                                        className="bg-blue-600 h-1 rounded-full"
                                        style={{
                                            width:
                                                (currentTime /
                                                    context.song.length) *
                                                    100 +
                                                "%",
                                        }}
                                    ></div>
                                </div>
                                <span className="text-xs text-gray-400 font-semibold">
                                    {secondsToMinutes(context.song.length)}
                                </span>
                            </div>
                        </div>
                        <div className="hidden md:flex w-1/3 h-full items-center justify-end">
                            <SpeakerWaveIcon className="h-5 mr-2 fill-gray-100" />
                            <input
                                type="range"
                                defaultValue="100"
                                onChange={(e) => adjustVolume(e)}
                                className=" h-1 rounded-lg appearance-none cursor-pointer range-sm bg-gray-300"
                            />
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default MusicPlayer;
