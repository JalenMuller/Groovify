import React, { useEffect, useState } from "react";
import axios from "../../../axios";
import {
    CalendarIcon,
    MusicalNoteIcon,
    PencilIcon,
    TrashIcon,
} from "@heroicons/react/24/solid";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { timeToPrettyDate } from "../../../functions/generalFunctions";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { Album } from "../../../interfaces/AlbumInterface";
import { Link } from "react-router-dom";

function MyAlbums() {
    const [loading, setLoading] = useState(false);
    const [albums, setAlbums] = useState<Album[]>([]);

    useEffect(() => {
        const fetchMyAlbums = async () => {
            setLoading(true);
            try {
                const res = await axios.get("/my-albums");
                if (res.status === 200) {
                    setAlbums(res.data);
                    console.log(res.data);
                }
            } catch (error: any) {
                console.log(error);
            }
            setLoading(false);
        };
        fetchMyAlbums();
    }, []);
    return (
        <div className="overflow-y-auto h-4/5 w-full md:w-3/4 px-5 md:px-10 mx-auto space-y-4 mt-5">
            <h2 className="font-semibold text-xl leading-7 mt-5 mb-3">
                My Albums
            </h2>
            <div className="w-full flex justify-center">
                {loading && <LoadingSpinner />}
            </div>
            {albums?.map((album) => (
                <div
                    key={album.id}
                    className="flex w-full justify-between items-center bg-zinc-900/50 border border-gray-600 px-4 py-2 rounded-lg mb-2 hover:bg-zinc-800/75"
                >
                    <div className="flex w-3/5 items-center">
                        <img
                            src={
                                "http://localhost:8000/storage/images/covers/" +
                                album.cover
                            }
                            className="h-10 w-10 rounded-sm"
                        />
                        <div className="flex w-full flex-col ml-3">
                            <span className="text-white font-semibold truncate">
                                {album.title}
                            </span>
                            <span className="text-gray-400 text-sm truncate">
                                {album.artist}
                            </span>
                        </div>
                    </div>
                    <div>
                        <Link
                            to={`/dashboard/mymusic/edit-album/${album.id}`}
                            state={{ album }}
                            key={album.id}
                        >
                            <button
                                type="button"
                                className="focus:ring-4 rounded-lg p-1 mr-2 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-red-800"
                            >
                                <PencilIcon className="h-6" />
                            </button>
                        </Link>
                        <button
                            type="button"
                            className="focus:ring-4 rounded-lg p-1 bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-red-800"
                        >
                            <TrashIcon className="h-6" />
                        </button>
                    </div>
                </div>
            ))}
            <div className="flex w-full h-12 items-center bg-zinc-900/50 border border-gray-600 px-4 py-2 rounded-lg mb-2 hover:bg-zinc-800/75 cursor-pointer">
                <PlusCircleIcon className="h-6 mr-2" />
                <span className="font-semibold">Create a new album</span>
            </div>
        </div>
    );
}

export default MyAlbums;