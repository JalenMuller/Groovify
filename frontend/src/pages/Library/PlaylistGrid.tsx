import { MusicalNoteIcon } from "@heroicons/react/24/solid";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NewPlaylistModal from "./NewPlaylistModal";
import axios from "../../axios";
import { Playlist } from "../../interfaces/PlaylistInterface";
import LoadingDots from "../../components/LoadingDots";
import LoadingSpinner from "../../components/LoadingSpinner";

function PlaylistGrid() {
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [playlists, setPlaylists] = useState<Playlist[]>([]);
    const toggleModal = () => {
        setModal(!modal);
    };
    const fetchMyPlaylists: () => Promise<void> = async () => {
        setLoading(true);
        try {
            const res = await axios.get("/playlist/my-playlists");
            if (res.status === 200) {
                console.log(res);
                setPlaylists(res.data);
                console.log(playlists);
            }
        } catch (error: any) {
            console.log(error);
        }
        setLoading(false);
    };
    useEffect(() => {
        fetchMyPlaylists();
    }, []);
    return (
        <>
            {modal && (
                <NewPlaylistModal
                    fetchMyPlaylists={fetchMyPlaylists}
                    toggleModal={toggleModal}
                />
            )}

            <div className="absolute w-full overflow-x-auto px-2 flex touch-auto pb-3">
                <Link>
                    <div className="inline-flex w-40 mr-3 flex-col justify-around p-3 rounded-lg bg-zinc-800 border-gray-700 hover:bg-zinc-700/50 transition">
                        <div className="flex items-center justify-center bg-zinc-700 rounded-lg h-3/4">
                            <PlusCircleIcon className="h-4/5" />
                        </div>
                        <h2 className="text-xl font-bold truncate px-1">
                            New Playlist
                        </h2>
                    </div>
                </Link>
                {loading ? (
                    <div className="w-40 flex justify-center items-center">
                        <LoadingSpinner />
                    </div>
                ) : (
                    playlists.length > 0 &&
                    playlists.map((playlist) => (
                        <Link key={playlist.id} to={`/playlist/${playlist.id}`}>
                            <div className="inline-flex w-40 mr-3 flex-col justify-around p-3 rounded-lg bg-zinc-800 border-gray-700 hover:bg-zinc-700/50 transition">
                                <div className="flex items-center justify-center bg-zinc-700 rounded-lg h-3/4">
                                    <MusicalNoteIcon className="h-4/5" />
                                </div>
                                <h2 className="text-xl font-bold truncate px-1">
                                    {playlist.name}
                                </h2>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </>
    );
}

export default PlaylistGrid;
