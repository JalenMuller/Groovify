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

function Navigation() {
    const location = useLocation();
    return (
        <>
            {/*desktop/tablet navbar */}
            <aside
                id="default-sidebar"
                className="z-40 w-48 h-screen hidden md:block"
                aria-label="Sidenav"
            >
                <div className="overflow-y-auto py-5 h-full bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex items-center px-1 py-2 mb-3 text-base rounded-lg text-white">
                        <Logo className="h-8 mr-1" />
                        <span className="font-semibold text-xl">Groovify</span>
                    </div>
                    <ul className="space-y-2 px-2">
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
                                        {link[1]}
                                        <span className="ml-3">
                                            {link[0].name}
                                        </span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                    <ul className="pt-5 px-2 mt-5 space-y-1 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center py-2 px-3 text-base font-normal text-gray-900 rounded-lg transition duration-75 dark:text-white group">
                            <span className="font-semibold">My Playlists</span>
                        </div>
                        <hr className="mx-2 my-0" />
                        <li>
                            <a
                                href="#"
                                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
                            >
                                <span className="ml-1 text-sm truncate">
                                    Beast Mode
                                </span>
                            </a>
                        </li>

                        <li>
                            <a
                                href="#"
                                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
                            >
                                <span className="ml-1 text-sm truncate">
                                    PHONKYTOWN
                                </span>
                            </a>
                        </li>
                        <hr className="mx-2 my-0" />
                        <li>
                            <a
                                href="#"
                                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
                            >
                                <PlusIcon className="h-4" />
                                <span className="ml-1 text-sm">
                                    New playlist
                                </span>
                            </a>
                        </li>
                    </ul>
                </div>
            </aside>
            {/* mobile navbar */}
            <div className="flex md:hidden absolute bottom-0 left-0 justify-around items-center w-full h-16 bg-white dark:bg-gray-800 z-20 border-r border-gray-200 dark:border-gray-700">
                <button
                    type="button"
                    className="inline-flex flex-col justify-center items-center p-2 rounded cursor-pointer hover:text-white text-gray-400 text-zinc-300"
                >
                    <HomeIcon className="h-8" />
                    <span className="text-sm font-semibold">Home</span>
                </button>
                <button
                    type="button"
                    className="inline-flex flex-col justify-center items-center p-2 rounded cursor-pointer hover:text-white text-gray-400 text-zinc-300"
                >
                    <GlobeAltIcon className="h-8" />
                    <span className="text-sm font-semibold">Discover</span>
                </button>
                <button
                    type="button"
                    className="inline-flex flex-col justify-center items-center p-2 rounded cursor-pointer hover:text-white text-gray-400 text-zinc-300"
                >
                    <MagnifyingGlassIcon className="h-8" />
                    <span className="text-sm font-semibold">Search</span>
                </button>
                <button
                    type="button"
                    className="inline-flex flex-col justify-center items-center p-2 rounded cursor-pointer hover:text-white text-gray-400 text-zinc-300"
                >
                    <MusicalNoteIcon className="h-8" />
                    <span className="text-sm font-semibold">Library</span>
                </button>
            </div>
        </>
    );
}

export default Navigation;
