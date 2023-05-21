import {
    useState,
    useRef,
    useContext,
    createContext,
    useEffect,
    ChangeEvent,
    SyntheticEvent,
} from "react";
import { MusicPlayerContext } from "../../contexts/MusicPlayerContext";
import {
    SpeakerWaveIcon,
    PlayCircleIcon,
    PauseCircleIcon,
} from "@heroicons/react/24/solid";
import { SkipEndFill, SkipStartFill } from "../../assets/Icons";
import { secondsToMinutes } from "../../functions/generalFunctions";
import { constants } from "../../data/constants";
function MusicPlayer() {
    const context: any = useContext(MusicPlayerContext);
    const [playing, setPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const audioRef: any = useRef(null);

    const adjustVolume = (e: any) => {
        // percentage is decimal
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
    const forward = () => {
        if (context.queue.userQueue.length > 0) {
            context.setSong(context.queue.userQueue[0]);
            let newUserQueue = context.queue.userQueue;
            newUserQueue.splice(0, 1);
            context.setQueue({ ...context.queue, userQueue: newUserQueue });
            return;
        }
        // if no song in queue restart current song
        if (context.queue.forwardQueue.length === 0) {
            restartSong(true);
            return;
        }
        const currentSong = context.song;
        // skip to next song in the forward queue
        context.setSong(context.queue.forwardQueue[0]);
        // prepare a new queue with the forwarded song removed
        const newQueue = context.queue.forwardQueue;
        newQueue.splice(0, 1);
        // add the skipped song to the previous queue
        context.setQueue({
            ...context.queue,
            prevQueue: [...context.queue.prevQueue, currentSong],
            forwardQueue: newQueue,
        });
    };
    const previous = () => {
        // if song has been playing for a bit restart first
        if (audioRef.current.currentTime > 3) {
            restartSong(false);
            return;
        }
        // if no song in queue restart current song
        if (context.queue.prevQueue.length === 0) {
            restartSong(true);
            return;
        }
        const currentSong = context.song;
        // play the previous song in queue then remove that song from the previous queue
        context.setSong(
            context.queue.prevQueue[context.queue.prevQueue.length - 1]
        );
        const newQueue = context.queue.prevQueue;
        newQueue.splice(newQueue.length - 1, 1);
        context.setQueue({
            ...context.queue,
            prevQueue: newQueue,
            forwardQueue: [currentSong, ...context.queue.forwardQueue],
        });
    };
    const restartSong = (pauseSong: boolean) => {
        audioRef.current.currentTime = 0;
        setCurrentTime(0);
        if (pauseSong) {
            audioRef.current.pause();
            setPlaying(false);
        } else {
            setPlaying(true);
        }
    };
    useEffect(() => {
        // update current time state every second
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
                        src={`${constants.baseURL}/storage/songs/${context.song.song_path}`}
                    />
                    <div className="px-5 h-16 flex justify-between items-center bg-black border-t border-gray-700">
                        <div className="w-2/3 md:w-1/3 flex">
                            <img
                                src={`${constants.baseURL}/storage/images/covers/${context.song.cover_path}`}
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
                        <div className="w-1/3 h-full flex flex-col items-center justify-center">
                            <div className="flex flex-row h-3/5 w-full items-center justify-center">
                                <div onClick={previous}>
                                    <SkipStartFill className="h-6 mr-2 cursor-pointer" />
                                </div>
                                {playing ? (
                                    <PauseCircleIcon
                                        className="h-8 mr-3 cursor-pointer"
                                        onClick={toggleAudio}
                                    />
                                ) : (
                                    <PlayCircleIcon
                                        className="h-8 mr-3 cursor-pointer"
                                        onClick={toggleAudio}
                                    />
                                )}
                                <div onClick={forward}>
                                    <SkipEndFill className="h-6 cursor-pointer" />
                                </div>
                            </div>
                            {/* todo: make component */}
                            <div className="hidden md:flex w-full justify-center items-center ">
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
