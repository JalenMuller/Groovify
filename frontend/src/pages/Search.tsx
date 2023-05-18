import React, { FormEvent, useContext, useState } from "react";
import PageHeader from "../components/PageHeader";
import { Song } from "../interfaces/SongInterface";
import { Album } from "../interfaces/AlbumInterface";
import axios from "../axios";
import SongTable from "../components/Music/SongTable";
import AlbumGrid from "../components/Music/AlbumGrid";
import { StatusMessageContext } from "../contexts/StatusMessageContext";

function Search() {
    const [searchType, setSearchType] = useState("songs");
    const [songs, setSongs] = useState<Song[]>([]);
    const [albums, setAlbums] = useState<Album[]>([]);
    const statusContext: any = useContext(StatusMessageContext);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        let inputValue = e.target.search.value;
        if (searchType == "songs") {
            searchSongs(inputValue);
        } else {
            searchAlbums(inputValue);
        }
    };
    const switchSearchType = (type: string) => {
        setSongs([]);
        setAlbums([]);
        setSearchType(type);
    };
    const searchSongs = async (inputValue: string) => {
        const params = new URLSearchParams([
            ["type", "songs"],
            ["value", inputValue],
        ]);
        try {
            const res = await axios.get("/search", { params: params });
            if (res.status === 200) {
                setSongs(res.data);
            }
        } catch (error: any) {
            statusContext.updateStatus(
                "error",
                "Something went wrong, please try again"
            );
        }
    };
    const searchAlbums = async (inputValue: string) => {
        const params = new URLSearchParams([
            ["type", "albums"],
            ["value", inputValue],
        ]);
        try {
            const res = await axios.get("/search", { params: params });
            if (res.status === 200) {
                console.log(res.data);
                setAlbums(res.data);
            }
        } catch (error: any) {
            statusContext.updateStatus(
                "error",
                "Something went wrong, please try again"
            );
        }
    };

    return (
        <div
            className="w-full h-full px-8 pt-14 md:px-10 overflow-y-auto"
            id="scrollable"
        >
            <form
                className="mt-5 md:mt-3"
                onSubmit={(e) => handleSubmit(e)}
                action="#"
                method="post"
            >
                <PageHeader
                    title="Search"
                    bodyText="Search for a song or album on Groovify"
                />
                <div className="relative w-4/5 md:w-2/3 mt-5">
                    <input
                        type="search"
                        id="search"
                        className="block p-2.5 w-full z-20 px-5 text-sm text-gray-100 bg-gray-700 rounded-full border border-gray-500 focus:ring-gray-300 focus:border-gray-300 placeholder:text-gray-300"
                        placeholder="Search for music"
                        required
                    />
                    <button
                        type="submit"
                        className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-gray-500 rounded-r-full border border-gray-500 hover:bg-gray-500/50 focus:ring-4 focus:outline-none focus:ring-blue-300"
                    >
                        <svg
                            aria-hidden="true"
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            ></path>
                        </svg>
                        <span className="sr-only">Search</span>
                    </button>
                </div>
                <div className="w-4/5 md:w-2/3 mt-3">
                    <button
                        type="button"
                        className={`${
                            searchType === "songs"
                                ? "border-blue-600 text-blue-700"
                                : "border-gray-500 text-gray-300"
                        } border bg-gray-800 focus:outline-none font-semibold rounded-full text-sm px-3 py-1.5 mr-2 mb-2 hover:text-white hover:border-white focus:ring-gray-700 transition duration-75`}
                        onClick={() => switchSearchType("songs")}
                    >
                        Songs
                    </button>
                    <button
                        type="button"
                        className={`${
                            searchType === "albums"
                                ? "border-blue-600 text-blue-700"
                                : "border-gray-500 text-gray-300"
                        } border bg-gray-800 focus:outline-none font-semibold rounded-full text-sm px-3 py-1.5 mr-2 mb-2 hover:text-white hover:border-white focus:ring-gray-700 transition duration-75`}
                        onClick={() => switchSearchType("albums")}
                    >
                        Albums
                    </button>
                </div>
            </form>
            <div className="mt-3">
                {searchType === "songs" ? (
                    songs.length > 0 && (
                        <SongTable songs={songs} tableHead={false} />
                    )
                ) : (
                    <AlbumGrid albums={albums} />
                )}
            </div>
        </div>
    );
}

export default Search;
