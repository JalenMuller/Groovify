import {
    ChevronLeftIcon,
    ChevronRightIcon,
    UserIcon,
} from "@heroicons/react/24/solid";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import { useContext, useEffect, useState } from "react";
import { MusicPlayerContext } from "../contexts/MusicPlayerContext";
import { constants } from "../data/constants";

function TopBar(props: { user: any; logout: Function }) {
    const [background, setBackground] = useState(false);
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
    const handleScroll = () => {
        const scroll = document.querySelector("#scrollable")?.scrollTop;
        if ((scroll ?? 0) > 10) {
            setBackground(true);
        } else {
            setBackground(false);
        }
    };

    useEffect(() => {
        handleScroll();
        document
            .querySelector("#scrollable")
            ?.addEventListener("scroll", handleScroll);
    });

    return (
        <div
            className={`absolute top-0 right-0 flex  items-center px-2 md:px-5 md:py-3 transition ${
                inDashboard ? "justify-end w-1/4" : "justify-between w-full"
            } ${background && "bg-zinc-800"}`}
        >
            {/* Navigation buttons */}
            {!inDashboard && (
                <div className="flex ml-4 space-x-4">
                    <div
                        className="bg-zinc-800 border-2 border-gray-500 h-fit p-1 rounded-full cursor-pointer"
                        onClick={() => navigate(-1)}
                    >
                        <ChevronLeftIcon className="h-4 fill-gray-200" />
                    </div>
                    <div
                        className="bg-zinc-800 border-2 border-gray-500 h-fit p-1 rounded-full cursor-pointer"
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
                <div className="hidden md:flex justify-center text-sm max-h-7 items-center border border-white bg-zinc-900 font-semibold rounded-full text-white pl-5">
                    <span className="mr-2 max-w-[5rem] overflow-x-hidden truncate">
                        {props.user.name.split(" ")[0]}
                    </span>
                    <div className="border-2 border-white  rounded-full w-10 h-10 rounded-full bg-zinc-900">
                        {props.user.avatar ? (
                            <img
                                className="w-full h-full rounded-full"
                                src={`${constants.baseURL}/storage/images/avatars/${props.user.avatar}`}
                            />
                        ) : (
                            <UserIcon className="p-2" />
                        )}
                    </div>
                </div>
                <div className="flex w-10 h-10 items-center justify-center text-lg md:hidden border-2 border-zinc-400 text-zinc-200 rounded-full rounded-full bg-zinc-900 mt-2 mr-2">
                    {props.user.avatar ? (
                        <img
                            className="w-full h-full rounded-full"
                            src={`${constants.baseURL}/storage/images/avatars/${props.user.avatar}`}
                        />
                    ) : (
                        <span className="font-bold">
                            {props.user.name[0].toUpperCase()}
                        </span>
                    )}
                </div>
            </button>
            <div
                id="dropdown"
                className="z-10 hidden divide-y divide-gray-100 rounded-lg shadow-md w-44 bg-gray-700 border border-zinc-500"
            >
                <ul
                    className="py-2 text-sm text-gray-200"
                    aria-labelledby="dropdownDefaultButton"
                >
                    <li onClick={clearCurrentSong}>
                        <Link
                            to="dashboard/profile"
                            className="block px-4 py-2 hover:bg-gray-600 hover:text-white"
                        >
                            Profile
                        </Link>
                    </li>
                    <li onClick={clearCurrentSong}>
                        <Link
                            to="dashboard/mymusic/upload-music"
                            className="block px-4 py-2 hover:bg-gray-600 hover:text-white"
                        >
                            My Music
                        </Link>
                    </li>
                    <li>
                        <a
                            onClick={() => props.logout()}
                            className="block px-4 py-2 hover:bg-gray-600 hover:text-white cursor-pointer"
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
