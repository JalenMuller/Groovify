import React, { useEffect, useState } from "react";
import { Song } from "../../../interfaces/SongInterface";
import axios from "../../../axios";
import { MusicalNoteIcon, TrashIcon } from "@heroicons/react/24/solid";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { timeToPrettyDate } from "../../../functions/generalFunctions";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { Link } from "react-router-dom";
import { constants } from "../../../data/constants";

function MySingles() {
    const [loading, setLoading] = useState(false);
    const [songs, setSongs] = useState<Song[]>([]);

    const deleteSong = async (id: number) => {
        setLoading(true);
        try {
            const res = await axios.delete(`/delete-song/${id}`);
            if (res.status === 200) {
                fetchMySongs();
                // todo: add success message
            }
        } catch (error: any) {
            // todo: add error message
        }
        setLoading(false);
    };

    const fetchMySongs = async () => {
        setLoading(true);
        try {
            const res = await axios.get("/my-singles");
            if (res.status === 200) {
                setSongs(res.data);
            }
        } catch (error: any) {}
        setLoading(false);
    };
    useEffect(() => {
        fetchMySongs();
    }, []);
    return (
        <div className="overflow-y-auto h-4/5 w-full md:w-3/4 px-5 md:px-10 mx-auto space-y-4 mt-5">
            <h2 className="font-semibold text-xl leading-7 mt-5 mb-3">
                My Singles
            </h2>
            <div className="w-full flex justify-center">
                {loading && <LoadingSpinner />}
            </div>
            {songs?.map((song) => (
                <div
                    key={song.id}
                    className="flex w-full justify-between items-center bg-zinc-900/50 border border-gray-600 px-4 py-2 rounded-lg mb-2 hover:bg-zinc-800/75"
                >
                    <div className="flex w-3/5 items-center">
                        <img
                            src={`${constants.baseURL}/uploads/images/covers/${song.cover_path}`}
                            className="h-10 w-10 rounded-sm"
                        />
                        <div className="flex w-full flex-col ml-3">
                            <span className="text-white font-semibold truncate">
                                {song.name}
                            </span>
                            <span className="text-gray-400 text-sm truncate">
                                {song.artist}
                            </span>
                        </div>
                    </div>

                    <button
                        type="button"
                        className="focus:ring-4 font-medium rounded-lg text-sm p-1 bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-red-800"
                        onClick={() => deleteSong(song.id)}
                    >
                        <TrashIcon className="h-6" />
                    </button>
                </div>
            ))}
            <Link
                to="/dashboard/mymusic/upload-music/single"
                className="flex w-full h-12 items-center bg-zinc-900/50 border border-gray-600 px-4 py-2 rounded-lg mb-2 hover:bg-zinc-800/75 cursor-pointer"
            >
                <PlusCircleIcon className="h-6 mr-2" />
                <span className="font-semibold">Upload a new single</span>
            </Link>
        </div>
    );
}

export default MySingles;
