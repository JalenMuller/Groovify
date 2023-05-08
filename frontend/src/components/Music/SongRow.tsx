import { useContext } from "react";
import { Song } from "../../interfaces/SongInterface";
import {
    secondsToMinutes,
    timeToPrettyDate,
} from "../../functions/generalFunctions";
import { ChartBarIcon } from "@heroicons/react/24/solid";
import { MusicPlayerContext } from "../../contexts/MusicPlayerContext";

function SongRow(props: {
    playSong: (song: Song) => void;
    song: Song;
    i: number;
    rowStyle?: string;
}) {
    const context: any = useContext(MusicPlayerContext);
    const song = props.song;
    let active = false;
    if (context.song.id === song.id) {
        active = true;
    } else {
        active = false;
    }
    let features = "";
    if (song.features) {
        features = JSON.parse(song.features).join(", ");
    }
    return (
        <tr
            className={`text-gray-400 rounded-lg hover:bg-gray-800/50 cursor-pointer ${props.rowStyle}`}
            onClick={() => props.playSong(song)}
            key={song.id}
        >
            <td scope="row" className="px-6 py-2 font-normal text-white">
                {active ? (
                    <ChartBarIcon className="h-4 fill-blue-600" />
                ) : (
                    props.i + 1
                )}
            </td>
            <td
                scope="row"
                className="flex px-6 py-2 font-normal whitespace-nowrap text-white"
            >
                <img
                    src={
                        "http://localhost:8000/storage/images/covers/" +
                        song.cover_path
                    }
                    className="h-12 w-12 md:h-10 md:w-10 mr-3 rounded-sm"
                />
                <div className="flex flex-col">
                    <p
                        className={`${
                            context.song.id === song.id
                                ? "text-blue-500"
                                : "text-white"
                        } text-base md:text-sm md:leading-6 font-semibold max-w-12 truncate`}
                    >
                        {song.name}
                    </p>
                    <p className="text-sm md:text-xs text-gray-400 max-w-12 truncate">
                        {song.artist}
                        {features && `, ${features}`}
                    </p>
                </div>
            </td>
            <td className="px-6 py-2 hidden md:table-cell truncate">
                {song.album_title ?? "None"}
            </td>
            <td className="px-6 py-2 hidden md:table-cell">
                {timeToPrettyDate(song.release_date)}
            </td>
            <td className="px-6 py-2 hidden md:table-cell">
                {secondsToMinutes(song.length)}
            </td>
        </tr>
    );
}

export default SongRow;