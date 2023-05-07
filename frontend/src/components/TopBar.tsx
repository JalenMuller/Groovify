import {
    ChevronLeftIcon,
    ChevronRightIcon,
    UserIcon,
} from "@heroicons/react/24/solid";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import { useContext, useEffect, useState } from "react";
import { MusicPlayerContext } from "../contexts/MusicPlayerContext";
function TopBar(props: { name: string; logout: Function }) {
    // const [inDashboard, setInDashboard] = useState(false);
    const context: any = useContext(MusicPlayerContext);
    const navigate = useNavigate();
    let location = useLocation();
    let inDashboard = false;
    if (location.pathname.split("/")[1] === "dashboard") {
        inDashboard = true;
    }
    const clearCurrentSong = (e: any) => {
        e.preventDefault();
        context.setSong({});
    };
    return (
        <div
            className={`absolute w-full top-0 flex  items-center px-5  mt-4 mb-2 ${
                inDashboard ? "justify-end" : "justify-between"
            }`}
        >
            {/* Navigation buttons */}
            {!inDashboard && (
                <div className="flex ml-4 space-x-4">
                    <div
                        className="bg-zinc-800 border-2 border-gray-500 h-fit p-1 rounded-full"
                        onClick={() => navigate(-1)}
                    >
                        <ChevronLeftIcon className="h-4 fill-gray-200" />
                    </div>
                    <div
                        className="bg-zinc-800 border-2 border-gray-500 h-fit p-1 rounded-full"
                        onClick={() => navigate(1)}
                    >
                        <ChevronRightIcon className="h-4 fill-gray-200" />
                    </div>
                </div>
            )}
            {/* User dropdown */}
            <button
                id="dropdownDefaultButton"
                data-dropdown-toggle="dropdown"
                className=" text-sm"
                type="button"
            >
                <div className="hidden md:flex justify-center max-h-7 items-center border border-zinc-600 bg-zinc-900 font-semibold rounded-full text-gray-300 pl-5">
                    <span className="mr-2">{props.name.split(" ")[0]}</span>
                    <div className="border border-zinc-500  rounded-full w-8 h-8 rounded-full bg-zinc-900 p-2">
                        <UserIcon />
                    </div>
                </div>
                <div className="flex items-center justify-center text-lg md:hidden border-2 border-zinc-400 text-zinc-200 rounded-full w-8 h-8 rounded-full bg-zinc-900 m-2 p-2">
                    <span className="font-bold">{props.name[0]}</span>
                </div>
            </button>
            <div
                id="dropdown"
                className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-md w-44 dark:bg-gray-700 border border-zinc-500"
            >
                <ul
                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownDefaultButton"
                >
                    <li>
                        <a
                            href="#"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                            Profile
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                            Settings
                        </a>
                    </li>
                    <li onClick={clearCurrentSong}>
                        <Link
                            to="dashboard/mymusic"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                            My Music
                        </Link>
                    </li>
                    <li>
                        <a
                            onClick={() => props.logout()}
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                            Sign out
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default TopBar;
