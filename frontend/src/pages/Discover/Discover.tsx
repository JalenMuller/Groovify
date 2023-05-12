import { ReactNode, useEffect, useState } from "react";
import axios from "../../axios";
import { Song } from "../../interfaces/SongInterface";
import SongTable from "../../components/Music/SongTable";
import { Album } from "../../interfaces/AlbumInterface";
import AlbumGrid from "../../components/Music/AlbumGrid";
import PageHeader from "../../components/PageHeader";

function Discover() {
    const [loading, setLoading] = useState(false);
    const [songs, setSongs] = useState<Song[]>([]);
    const [albums, setAlbums] = useState<Album[]>([]);
    const [currentTab, setCurrentTab] = useState("songs");
    const renderTab = (): ReactNode => {
        switch (currentTab) {
            case "songs":
                return <SongTable songs={songs} tableHead={true} />;
            case "albums":
                return <AlbumGrid albums={albums} />;
            default:
                return <SongTable songs={songs} tableHead={true} />;
        }
    };
    useEffect(() => {
        const fetchRecentSongs = async () => {
            try {
                const res = await axios.get("/recent-songs");
                if (res.status === 200) {
                    setSongs(res.data);
                }
            } catch (error: any) {
                console.log(error);
            }
        };
        const fetchRecentAlbums = async () => {
            try {
                const res = await axios.get("/recent-albums");
                if (res.status === 200) {
                    setAlbums(res.data);
                }
            } catch (error: any) {
                console.log(error);
            }
        };
        setLoading(true);
        fetchRecentSongs();
        fetchRecentAlbums();
        setLoading(false);
    }, []);
    return (
        <div
            className="w-full h-full pt-14 flex-col p-2 md:px-5 overflow-y-auto"
            id="scrollable"
        >
            <div className="mx-5 mb-3 mt-2">
                <PageHeader
                    title="Discover"
                    bodyText="Discover the latest music shared on Groovify."
                />
                <div className="mt-5">
                    <button
                        type="button"
                        className={`${
                            currentTab === "songs"
                                ? "border-blue-600 text-blue-700"
                                : "border-gray-500 text-gray-300"
                        } border bg-gray-800 focus:outline-none font-semibold rounded-full text-sm px-3 py-1.5 mr-2 mb-2 hover:text-white hover:border-white focus:ring-gray-700 transition duration-75`}
                        onClick={() => setCurrentTab("songs")}
                    >
                        Songs
                    </button>
                    <button
                        type="button"
                        className={`${
                            currentTab === "albums"
                                ? "border-blue-600 text-blue-700"
                                : "border-gray-500 text-gray-300"
                        } border bg-gray-800 focus:outline-none font-semibold rounded-full text-sm px-3 py-1.5 mr-2 mb-2 hover:text-white hover:border-white focus:ring-gray-700 transition duration-75`}
                        onClick={() => setCurrentTab("albums")}
                    >
                        Albums
                    </button>
                </div>
            </div>

            <div className=" overflow-x-hidden overflow-y-hidden">
                {renderTab()}
            </div>
        </div>
    );
}

export default Discover;
