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

    const deleteAlbum = async (id: number) => {
        // return console.log(id);
        setLoading(true);
        try {
            const res = await axios.delete(`/delete-album/${id}`);
            if (res.status === 200) {
                fetchMyAlbums();
                // todo: add success message
            }
        } catch (error: any) {
            // todo: add error message
        }
        setLoading(false);
    };

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
    useEffect(() => {
        fetchMyAlbums();
    }, []);
    return (
        <div className="overflow-y-auto h-4/5 w-full md:w-4/5 px-5 md:px-10 mx-auto space-y-4 mt-5">
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
                    <div className="flex w-full overflow-x-hidden items-center">
                        <img
                            src={
                                "http://localhost:8000/storage/images/covers/" +
                                album.cover
                            }
                            className="h-10 w-10 rounded-sm hidden md:block"
                        />
                        <div className="flex flex-col md:ml-3 truncate">
                            <span className="text-white font-semibold truncate">
                                {album.title}
                            </span>
                            <span className="text-gray-400 text-sm truncate">
                                {album.artist}
                            </span>
                        </div>
                    </div>
                    <div className="hidden md:flex items-center font-semibold text-lg mr-1">
                        <MusicalNoteIcon className="h-5 mr-1" />
                        {album.song_amount}
                    </div>
                    <div className="flex">
                        <Link
                            to={`/dashboard/mymusic/edit-album/${album.id}`}
                            state={{ album }}
                            key={album.id}
                        >
                            <button
                                type="button"
                                className="focus:ring-4 rounded-lg p-1 mr-2 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-blue-800"
                            >
                                <PencilIcon className="h-5 md:h-6" />
                            </button>
                        </Link>
                        <button
                            type="button"
                            onClick={() => deleteAlbum(album.id)}
                            className="focus:ring-4 rounded-lg p-1 bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-red-800"
                        >
                            <TrashIcon className="h-5 md:h-6" />
                        </button>
                    </div>
                </div>
            ))}
            <Link
                to="/dashboard/mymusic/upload-music/album"
                className="flex w-full h-12 items-center bg-zinc-900/50 border border-gray-600 px-4 py-2 rounded-lg mb-2 hover:bg-zinc-800/75 cursor-pointer"
            >
                <PlusCircleIcon className="h-6 mr-2" />
                <span className="font-semibold">New album</span>
            </Link>
        </div>
    );
}

export default MyAlbums;
