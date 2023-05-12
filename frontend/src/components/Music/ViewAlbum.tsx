import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../axios";
import LoadingSpinner from "../LoadingSpinner";
import { Album } from "../../interfaces/AlbumInterface";
import { Song } from "../../interfaces/SongInterface";
import SongTable from "./SongTable";
import MusicHeader from "../MusicHeader";

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
        <div className="w-full h-full flex-col p-2 pt-20 md:px-5 overflow-y-auto">
            {loading && <LoadingSpinner />}
            {album && (
                <div className="space-y-8">
                    <MusicHeader
                        type="album"
                        title={album.title}
                        cover={album.cover}
                        artist={album.artist}
                        date={album.release_date}
                        songAmount={album.song_amount}
                    />
                    <SongTable songs={songs} tableHead={true} />
                </div>
            )}
        </div>
    );
}

export default ViewAlbum;
