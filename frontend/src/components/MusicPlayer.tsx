import { useState, useRef, useContext, createContext, useEffect } from "react";
import { MusicPlayerContext } from "../contexts/MusicPlayerContext";
import {
    PauseIcon,
    ForwardIcon,
    BackwardIcon,
} from "@heroicons/react/24/solid";
function MusicPlayer() {
    const context: any = useContext(MusicPlayerContext);
    const [status, setStatus] = useState({
        isPlaying: false,
        isLoop: false,
        isLoaded: false,
        error: false,
    });
    const audioRef: any = useRef(null);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.play();
        }
    }, [context.song]);

    return (
        <>
            {context.song.name && (
                <>
                    <audio
                        ref={audioRef}
                        src={`http://localhost:8000/storage/songs/${context.song.song_path}`}
                    />
                    <div className="w-full px-5 h-16 flex justify-between items-center md:h-20 bg-black">
                        <div className="w-1/3">
                            <h2 className="text-lg">{context.song.name}</h2>
                        </div>
                        <div className="w-1/3 flex flex-col items-center">
                            <div className="flex flex-row h-2/5 justify-center">
                                <BackwardIcon />
                                <PauseIcon />
                                <ForwardIcon />
                            </div>
                            ---------------------
                        </div>
                        <div className="w-1/3 flex justify-end">
                            <input
                                type="range"
                                className=" h-2 rounded-lg appearance-none cursor-pointer range-sm bg-gray-600 !accent-red-500"
                            />
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default MusicPlayer;
