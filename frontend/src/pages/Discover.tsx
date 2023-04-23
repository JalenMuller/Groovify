import { useEffect, useState } from "react";
import { ClockIcon } from "@heroicons/react/24/outline";
import axios from "../axios";
function Discover() {
    const [songs, setSongs] = useState([]);
    interface Song {
        artists: string;
        cover_path: string;
        created_at: string;
        id: number;
        name: string;
        song_path: string;
        updated_at: string;
    }
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
        <div className="w-full h-full flex-col py-6 px-2 md:px-5">
            <div className="pl-2">
                <h1 className="text-2xl font-semibold mt-5">Discover</h1>
                <p className="text-base text-zinc-300 mt-1 mb-5">
                    These are the latest songs that have been shared.
                </p>
            </div>
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-400">
                    <thead className="text-xs uppercase text-gray-400 border-b border-zinc-500">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Title
                            </th>
                            <th
                                scope="col"
                                className="hidden md:table-cell px-6 py-3"
                            >
                                Album
                            </th>
                            <th
                                scope="col"
                                className="hidden md:table-cell px-6 py-3"
                            >
                                Date
                            </th>
                            <th
                                scope="col"
                                className="hidden md:table-cell px-6 py-3"
                            >
                                <ClockIcon className="h-4" />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {songs?.map((song: Song) => (
                            <tr className="text-gray-400 rounded-lg hover:bg-gray-800/50 cursor-pointer">
                                <th
                                    scope="row"
                                    className="flex px-6 py-4 font-normal whitespace-nowrap text-white"
                                >
                                    <img
                                        src={
                                            "http://localhost:8000/storage/images/covers/" +
                                            song.cover_path
                                        }
                                        className="w-10 h-10 mr-3"
                                    />
                                    <div className="flex flex-col">
                                        <p className="text-white font-semibold">
                                            {song.name}
                                        </p>
                                        <p className="text-xs text-gray-400">
                                            {song.artists}
                                        </p>
                                    </div>
                                </th>
                                <td className="px-6 py-4 hidden md:table-cell">
                                    None
                                </td>
                                <td className="px-6 py-4 hidden md:table-cell">
                                    Jan 3, 2023
                                </td>
                                <td className="px-6 py-4 hidden md:table-cell">
                                    4:23
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Discover;
