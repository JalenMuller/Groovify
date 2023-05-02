import { useEffect, useState, useContext } from "react";
import { ClockIcon } from "@heroicons/react/24/outline";
import axios from "../axios";
import { Song } from "../interfaces/SongInterface";
import SongRow from "../components/SongRow";

function Discover() {
    const [songs, setSongs] = useState([]);
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
                <table className="w-full table-fixed text-sm text-left text-gray-400">
                    <colgroup>
                        <col className="w-[15%] md:w-[5%]" />
                        <col style={{ width: "35%" }} />
                        <col style={{ width: "25%" }} />
                        <col style={{ width: "30%" }} />
                        <col style={{ width: "10%" }} />
                    </colgroup>
                    <thead className="text-xs uppercase text-gray-400 border-b border-zinc-500">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                #
                            </th>
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
                                <ClockIcon className="h-4 mx-auto" />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {songs?.map((song: Song, i: number) => {
                            return <SongRow song={song} i={i} key={song.id} />;
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Discover;
