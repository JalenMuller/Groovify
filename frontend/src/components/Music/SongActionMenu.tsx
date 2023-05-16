import {
    MusicalNoteIcon,
    PlusIcon,
    XMarkIcon,
} from "@heroicons/react/24/solid";
import { HeartIcon } from "@heroicons/react/24/outline";
import "./SongActionMenu.css";
import { Song } from "../../interfaces/SongInterface";
import { useContext, useEffect, useState } from "react";
import axios from "../../axios";
import { Playlist } from "../../interfaces/PlaylistInterface";
import LoadingDots from "../LoadingDots";
import { createPortal } from "react-dom";
import { useAuth } from "../../contexts/AuthContext";
import { MusicPlayerContext } from "../../contexts/MusicPlayerContext";

function SongActionMenu(props: { song: Song; toggleActions: () => void }) {
    const [playlists, setPlaylists] = useState<Playlist[]>([]);
    const [loading, setLoading] = useState(false);
    const { csrfToken } = useAuth();
    const context: any = useContext(MusicPlayerContext);

    const fetchMyPlaylists: () => Promise<void> = async () => {
        setLoading(true);
        try {
            const res = await axios.get("/playlist/my-playlists");
            if (res.status === 200) {
                setPlaylists(res.data);
            }
        } catch (error: any) {
            console.log(error);
        }
        setLoading(false);
    };
    const addPlaylistSong = async (playlist: Playlist) => {
        props.toggleActions();
        const body = {
            playlist_id: playlist.id,
            song_id: props.song.id,
        };
        await csrfToken();
        try {
            const res = await axios.post("/playlist/add-song", body);
            if (res.status === 200) {
                // todo: status message
                console.log(res);
            }
        } catch (error: any) {
            console.log(error);
        }
    };
    const addToQueue = () => {
        context.setQueue({
            ...context.queue,
            userQueue: [...context.queue.userQueue, props.song],
        });
    };
    useEffect(() => {
        fetchMyPlaylists();
    }, []);
    return (
        <>
            {createPortal(
                <div className="z-50 fixed inset-0 py-10 w-screen h-screen flex items-start md:items-center justify-center bg-zinc-900/75">
                    <div className="w-2/3 md:w-60 absolute bg-zinc-800 text-gray-400 border border-zinc-600 shadow rounded-lg p-3">
                        <div
                            onClick={props.toggleActions}
                            className="absolute top-2.5 right-3"
                        >
                            <XMarkIcon className="h-5 relative bottom-0 right-0" />
                        </div>
                        <h2 className="px-3 mb-1 text-lg text-gray-200 font-bold">
                            {props.song.name}
                        </h2>
                        <div className="group flex">
                            <ul
                                className="w-full rounded-sm
  transition duration-150 ease-in-out origin-top min-w-32"
                            >
                                <li className="w-full flex rounded-sm border-b border-zinc-100/25 items-center px-3 py-2 hover:bg-zinc-900/50">
                                    <HeartIcon className="h-4 mr-2" />
                                    Like song (soon!)
                                </li>
                                <li
                                    onClick={addToQueue}
                                    className="w-full flex rounded-sm border-b border-zinc-100/25 items-center px-3 py-2 hover:bg-zinc-900/50"
                                >
                                    <PlusIcon className="h-4 mr-2" />
                                    Add to queue
                                </li>
                                <li className="rounded-sm relative px-3 py-2 hover:bg-zinc-900/50">
                                    <button className="w-full text-left flex items-center justify-between outline-none focus:outline-none">
                                        <span className="pr-1 flex items-center">
                                            <PlusIcon className="h-4 mr-2" />
                                            Add to playlist
                                        </span>
                                        <span>
                                            <svg
                                                className="fill-current h-4 w-4
            transition duration-150 ease-in-out"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                            </svg>
                                        </span>
                                    </button>
                                    <ul
                                        className="bg-zinc-800 rounded-md absolute top-0 right-0 
  transition duration-150 ease-in-out origin-top-left
  min-w-32 max-h-60 overflow-y-auto border border-zinc-600"
                                    >
                                        {loading ? (
                                            <LoadingDots />
                                        ) : playlists.length > 0 ? (
                                            playlists.map((playlist) => (
                                                <li
                                                    key={playlist.id}
                                                    onClick={() =>
                                                        addPlaylistSong(
                                                            playlist
                                                        )
                                                    }
                                                    className="px-3 py-2 hover:bg-zinc-900/50"
                                                >
                                                    {playlist.name}
                                                </li>
                                            ))
                                        ) : (
                                            <li className="px-3 py-2 hover:bg-zinc-900/50">
                                                No playlists
                                            </li>
                                        )}
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </>
    );
}

export default SongActionMenu;
