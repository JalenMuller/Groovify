import { Sidebar } from "flowbite-react";
import {
    HomeIcon,
    MagnifyingGlassIcon,
    MusicalNoteIcon,
    PlusIcon,
} from "@heroicons/react/24/solid";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { Logo } from "../assets/Icons";
import { Link, useLocation } from "react-router-dom";
import { navLinks } from "../data/navLinks";
import { useEffect, useState } from "react";
import { Playlist } from "../interfaces/PlaylistInterface";
import axios from "../axios";

function Navigation() {
    const location = useLocation();
    const [playlists, setPlaylists] = useState<Playlist[]>([]);

    const fetchMyPlaylists: () => Promise<void> = async () => {
        try {
            const res = await axios.get("/playlist/my-playlists");
            if (res.status === 200) {
                setPlaylists(res.data);
            }
        } catch (error: any) {}
    };
    useEffect(() => {
        fetchMyPlaylists();
    }, []);

    return (
        <>
            {/*desktop/tablet navbar */}
            <aside
                id="default-sidebar"
                className="z-40 w-48 h-screen hidden md:block"
                aria-label="Sidenav"
            >
                <div className="overflow-y-auto py-5 h-full border-r bg-gray-800 border-gray-700">
                    <div className="flex items-center px-1 pb-2 mb-3 text-base rounded-lg text-white BORE">
                        <Logo className="h-8 mr-1" />
                        <span className="font-semibold text-xl">Groovify</span>
                    </div>
                    <ul className="space-y-2 px-2 py-5 border-b border-t border-gray-700">
                        {navLinks.map((link: any) => {
                            // first index contains name/path object
                            // second index contains the icon component
                            let active = false;
                            if (link[0].path == location.pathname) {
                                active = true;
                            }
                            return (
                                <li key={link[0].path}>
                                    <Link
                                        to={link[0].path}
                                        className={`flex items-center p-2 text-base  rounded-lg transition duration-75 hover:bg-gray-100 hover:bg-gray-700 text-white group ${
                                            active
                                                ? "bg-gray-600/25 !text-blue-500"
                                                : "text-white"
                                        }`}
                                    >
                                        <div className="h-7">{link[1]}</div>
                                        <span className="ml-3">
                                            {link[0].name}
                                        </span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                    {playlists.length > 0 && (
                        <div className="px-2 h-2/5 mt-2 space-y-1">
                            <div className="flex items-center py-2 px-3 text-base font-normal rounded-lg transition duration-75 text-white group">
                                <span className="font-semibold">
                                    My Playlists
                                </span>
                            </div>
                            <hr className="mx-2 my-0" />
                            <ul className="max-h-full overflow-y-auto">
                                {playlists.map((playlist) => (
                                    <li key={playlist.id}>
                                        <Link
                                            to={`playlist/${playlist.id}`}
                                            className="flex items-center p-2 text-base font-normal rounded-lg transition duration-75 hover:bg-gray-700 text-white group"
                                        >
                                            <span className="ml-1 text-sm truncate">
                                                {playlist.name}
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            <hr className="mx-2 my-0" />
                        </div>
                    )}
                </div>
            </aside>
            {/* mobile navbar */}
            <div className="flex md:hidden absolute bottom-0 left-0 justify-around items-center w-full h-16 bg-gray-800 z-20 border-r border-gray-700">
                {navLinks.map((link: any) => {
                    // first index contains name/path object
                    // second index contains the icon component
                    let active = false;
                    if (link[0].path == location.pathname) {
                        active = true;
                    }
                    return (
                        <Link to={link[0].path} key={link[0].name}>
                            <button
                                type="button"
                                className="inline-flex flex-col justify-center items-center p-2 rounded cursor-pointer hover:text-white text-gray-400 text-zinc-300"
                            >
                                <div
                                    className={`h-8 ${
                                        active ? "text-blue-500" : "text-white"
                                    }`}
                                >
                                    {link[1]}
                                </div>
                                <span
                                    className={`text-sm font-semibold ${
                                        active && "text-blue-500"
                                    }`}
                                >
                                    {link[0].name}
                                </span>
                            </button>
                        </Link>
                    );
                })}
            </div>
        </>
    );
}

export default Navigation;
