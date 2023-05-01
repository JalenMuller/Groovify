import { useEffect, useState, useContext } from "react";
import { ClockIcon } from "@heroicons/react/24/outline";
import axios from "../axios";
import {
    secondsToMinutes,
    timeToPrettyDate,
} from "../functions/generalFunctions";
import { MusicPlayerContext } from "../contexts/MusicPlayerContext";
import { Song } from "../interfaces/SongInterface";
import { ChartBarIcon, PlayIcon } from "@heroicons/react/24/solid";

function Discover() {
    const [songs, setSongs] = useState([]);
    const context: any = useContext(MusicPlayerContext);
    const fetchSongs = async () => {
        try {
            const res = await axios.get("/songs");
            if (res.status === 200) {
                console.log(res.data);
                setSongs(res.data);
            }
        } catch (error: any) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchSongs();
    }, []);
    return (
        <div className="w-full h-full flex-col p-2 md:px-5 overflow-y-auto">
            <div className="pl-2">
                <h1 className="text-2xl font-semibold mt-5">Discover</h1>
                <p className="text-base text-zinc-300 mt-1 mb-7">
                    Discover the latest music shared on Groovify.
                </p>
            </div>
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-400">
                    <thead className="text-xs uppercase text-gray-400 border-b border-zinc-500">
                        <tr>
                            <th scope="col" className="w-1/12 px-6 py-3">
                                #
                            </th>
                            <th scope="col" className="w-4/12 px-6 py-3">
                                Title
                            </th>
                            <th
                                scope="col"
                                className="hidden md:table-cell w-2/12 px-6 py-3"
                            >
                                Album
                            </th>
                            <th
                                scope="col"
                                className="hidden md:table-cell w-4/12 px-6 py-3"
                            >
                                Date
                            </th>
                            <th
                                scope="col"
                                className="hidden md:table-cell w-1/12 px-6 py-3"
                            >
                                <ClockIcon className="h-4" />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {songs?.map((song: Song, i: number) => {
                            let active;
                            if (context.song.id === song.id) active = true;
                            return (
                                <tr
                                    className="text-gray-400 rounded-lg hover:bg-gray-800/50 cursor-pointer"
                                    onClick={() => context.setSong(song)}
                                    key={song.id}
                                >
                                    <th
                                        scope="row"
                                        className="w-1/12 px-6 py-2 font-normal text-white"
                                    >
                                        {active ? (
                                            <ChartBarIcon className="h-4 fill-blue-600" />
                                        ) : (
                                            i + 1
                                        )}
                                    </th>
                                    <td
                                        scope="row"
                                        className="w-4/12 flex px-6 py-2 font-normal whitespace-nowrap text-white"
                                    >
                                        <img
                                            src={
                                                "http://localhost:8000/storage/images/covers/" +
                                                song.cover_path
                                            }
                                            className="w-10 h-10 mr-3"
                                        />
                                        <div className="flex flex-col">
                                            <p
                                                className={`${
                                                    context.song.id === song.id
                                                        ? "text-blue-500"
                                                        : "text-white"
                                                } font-semibold`}
                                            >
                                                {song.name}
                                            </p>
                                            <p className="text-xs text-gray-400">
                                                {song.artist}
                                            </p>
                                        </div>
                                    </td>
                                    <td className="w-2/12 px-6 py-2 hidden md:table-cell">
                                        None
                                    </td>
                                    <td className="w-4/12 px-6 py-2 hidden md:table-cell">
                                        {timeToPrettyDate(song.release_date)}
                                    </td>
                                    <td className="w-1/12 px-6 py-2 hidden md:table-cell">
                                        {secondsToMinutes(song.length)}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Discover;
