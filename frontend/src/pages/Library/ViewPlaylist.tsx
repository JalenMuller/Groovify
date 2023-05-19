import { useContext, useEffect, useState } from "react";
import axios from "../../axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";
import { Playlist as PlaylistInterface } from "../../interfaces/PlaylistInterface";
import MusicHeader from "../../components/MusicHeader";
import { Song } from "../../interfaces/SongInterface";
import SongTable from "../../components/Music/SongTable";
import { StatusMessageContext } from "../../contexts/StatusMessageContext";
import { GlobeAltIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

function ViewPlaylist() {
    const [loading, setLoading] = useState(false);
    const [playlist, setPlaylist] = useState<null | PlaylistInterface>(null);
    const [songs, setSongs] = useState<Song[]>([]);
    const { id } = useParams();
    const statusContext: any = useContext(StatusMessageContext);
    const navigate = useNavigate();

    const fetchMyPlaylists: () => Promise<void> = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`/playlist/${id}`);
            if (res.status === 200) {
                setPlaylist(res.data.playlist_info);
                setSongs(res.data.songs);
            }
        } catch (error: any) {
            statusContext.updateStatus(
                "error",
                "Something went wrong, please try again."
            );
            navigate("/library");
        }
        setLoading(false);
    };
    useEffect(() => {
        fetchMyPlaylists();
    }, []);
    return (
        <>
            {loading ? (
                <div className="w-full h-full">
                    <LoadingSpinner className="flex items-center justify-center w-full h-full" />
                </div>
            ) : (
                <div
                    className="w-full h-full pt-20 flex-col p-2 md:px-5 overflow-y-auto"
                    id="scrollable"
                >
                    <MusicHeader
                        type="playlist"
                        title={playlist?.name ?? "unknown"}
                    />
                    <div className="mt-5 mx-2">
                        {songs.length > 0 ? (
                            <SongTable songs={songs} tableHead={true} />
                        ) : (
                            <div className="flex flex-col mx-1 md:flex-row items-center justify-between space-y-2 md:space-y-0 md:space-x-2">
                                <Link
                                    to="/discover"
                                    className="flex w-full md:w-1/2 items-center bg-zinc-800/50 border border-zinc-500 text-gray-200 hover:border-blue-500 hover:text-blue-500 cursor-pointer py-2 px-5 rounded-lg text-lg font-semibold"
                                >
                                    <GlobeAltIcon className="h-8 mr-3" />
                                    Discover songs to add
                                </Link>
                                <Link
                                    to="/search"
                                    className="flex w-full md:w-1/2 items-center bg-zinc-800/50 border border-zinc-500 text-gray-200 hover:border-blue-500 hover:text-blue-500 cursor-pointer py-2 px-5 rounded-lg text-lg font-semibold"
                                >
                                    <MagnifyingGlassIcon className="h-8 mr-3" />
                                    Search for songs to add
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default ViewPlaylist;
