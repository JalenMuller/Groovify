import { UserIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

function ProfileDropdown(props: { name: string; logout: Function }) {
    return (
        <>
            <button
                id="dropdownDefaultButton"
                data-dropdown-toggle="dropdown"
                className="absolute top-0 right-0 h-12 text-sm"
                type="button"
            >
                <div className="hidden md:flex justify-center max-h-7 mr-5 items-center border border-zinc-600 bg-zinc-900 font-semibold rounded-full text-gray-300 pl-5">
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
                    <li>
                        <Link
                            to="/mymusic"
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
        </>
    );
}

export default ProfileDropdown;
