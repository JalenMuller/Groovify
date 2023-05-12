import {
    CalendarIcon,
    MicrophoneIcon,
    MusicalNoteIcon,
} from "@heroicons/react/24/solid";
import { Album } from "../interfaces/AlbumInterface";
import { timeToPrettyDate } from "../functions/generalFunctions";

function MusicHeader(props: {
    type: "album" | "playlist";
    title: string;
    cover?: string;
    artist?: string;
    date?: number;
    songAmount?: string;
}) {
    return (
        <div className="w-full">
            <div className="flex ml-2 md:ml-7">
                {props.cover ? (
                    <img
                        src={
                            "http://localhost:8000/storage/images/covers/" +
                            props.cover
                        }
                        className="w-20 h-20 md:w-40 md:h-40 aspect-square rounded-lg bg-zinc-700"
                    />
                ) : (
                    <div className="w-20 h-20 md:w-40 md:h-40 aspect-square rounded-lg bg-zinc-700">
                        <MusicalNoteIcon className="" />
                    </div>
                )}
                <div className="flex flex-col justify-center py-2 ml-5">
                    <div>
                        <p className="text-sm font-semibold text-gray-400">
                            {props.type}
                        </p>
                        <h1 className="text-xl md:text-6xl font-bold">
                            {props.title}
                        </h1>
                    </div>
                    {props.artist && props.date && props.songAmount && (
                        <div className="flex flex-row mt-2 md:mt-5 items-center text-sm font-semibold text-gray-300 ">
                            <div className="flex items-center">
                                <MicrophoneIcon className="h-4 mr-1" />
                                {props.artist}
                            </div>
                            <span className="hidden md:block mx-2">•</span>
                            <div className="hidden md:flex items-center">
                                <CalendarIcon className="h-4 mr-1" />
                                {props.date && timeToPrettyDate(props.date)}
                            </div>
                            <span className="block mx-2">•</span>
                            <div className="flex items-center">
                                <MusicalNoteIcon className="h-4 mr-1" />
                                {props.songAmount} songs
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MusicHeader;
