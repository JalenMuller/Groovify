import {
    CalendarIcon,
    MicrophoneIcon,
    MusicalNoteIcon,
} from "@heroicons/react/24/solid";
import { Album } from "../interfaces/AlbumInterface";
import { timeToPrettyDate } from "../functions/generalFunctions";

function AlbumHeader(props: { album: Album }) {
    const album = props.album;
    return (
        <div className="w-full mt-16">
            <div className="flex ml-7">
                <img
                    src={
                        "http://localhost:8000/storage/images/covers/" +
                        album.cover
                    }
                    className="w-20 h-20 md:w-40 md:h-40 aspect-square rounded-lg"
                />
                <div className="flex flex-col justify-center py-2 ml-5">
                    <div>
                        <p className="text-sm font-semibold text-gray-400">
                            Album
                        </p>
                        <h1 className="text-xl md:text-6xl font-bold">
                            {album.title}
                        </h1>
                    </div>
                    <div className="flex flex-row mt-2 md:mt-5 items-center text-sm font-semibold text-gray-300 ">
                        <div className="flex items-center">
                            <MicrophoneIcon className="h-4 mr-1" />
                            {album.artist}
                        </div>
                        <span className="hidden md:block mx-2">•</span>
                        <div className="hidden md:flex items-center">
                            <CalendarIcon className="h-4 mr-1" />
                            {timeToPrettyDate(album.release_date)}
                        </div>
                        <span className="block mx-2">•</span>
                        <div className="flex items-center">
                            <MusicalNoteIcon className="h-4 mr-1" />
                            {album.song_amount} songs
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AlbumHeader;
