import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../axios";
import LoadingSpinner from "../LoadingSpinner";
import { Album } from "../../interfaces/AlbumInterface";
import { Song } from "../../interfaces/SongInterface";
import PageHeader from "../PageHeader";
import AlbumHeader from "../AlbumHeader";
import SongTable from "./SongTable";

function ViewAlbum() {
    const params = useParams();
    const [loading, setLoading] = useState(true);
    const [album, setAlbum] = useState<null | Album>(null);
    const [songs, setSongs] = useState<Song[]>([]);

    const fetchAlbum = async () => {
        try {
            const res = await axios.get(`/album/${params.id}`);
            if (res.status === 200) {
                console.log(res.data);
                setAlbum(res.data.album);
                setSongs(res.data.songs);
            }
        } catch (error: any) {
            console.log(error);
        }
        setLoading(false);
    };
    useEffect(() => {
        fetchAlbum();
    }, []);

    return (
        <div className="w-full h-full flex-col p-2 md:px-5 overflow-y-auto">
            {loading && <LoadingSpinner />}
            {album && (
                <div className="space-y-8">
                    <AlbumHeader album={album} />
                    <SongTable songs={songs} tableHead={true} />
                </div>
            )}
        </div>
    );
}

export default ViewAlbum;
