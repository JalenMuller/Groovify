import { useEffect, useState } from "react";
import axios from "../../axios";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";
import { Playlist as PlaylistInterface } from "../../interfaces/PlaylistInterface";
import MusicHeader from "../../components/MusicHeader";

function ViewPlaylist() {
    const [loading, setLoading] = useState(false);
    const [playlist, setPlaylist] = useState<PlaylistInterface>({});
    const { id } = useParams();
    const fetchMyPlaylists: () => Promise<void> = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`/playlist/${id}`);
            if (res.status === 200) {
                setPlaylist(res.data);
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
            {loading ? (
                <div className="w-full h-full">
                    <LoadingSpinner className="flex items-center justify-center w-full h-full" />
                </div>
            ) : (
                <div
                    className="w-full h-full pt-20 flex-col p-2 md:px-5 overflow-y-auto"
                    id="scrollable"
                >
                    <MusicHeader type="playlist" title={playlist.name} />
                </div>
            )}
        </>
    );
}

export default ViewPlaylist;
