import { useEffect, useState } from "react";
import UploadMusic from "./UploadMusic/UploadMusic";
import { Link, useParams } from "react-router-dom";
import MyLibrary from "./MyLibrary/MyLibrary";

function MyMusic() {
    const [currentTab, setCurrentTab] = useState("upload-music");
    const params = useParams();

    useEffect(() => {
        setCurrentTab(params.tab ?? "upload-music");
    }, [params.tab]);
    const returnTab = () => {
        switch (currentTab) {
            case "upload-music":
                return <UploadMusic />;
            case "my-library":
                return <MyLibrary />;
            case "artist-profile":
                return <div className="w-full h-full">profile</div>;
            default:
                return <UploadMusic />;
        }
    };
    return (
        <div className="w-full h-full flex m-auto bg-zinc-800 border border-gray-700 bg-gray-800 shadow">
            <aside
                className="w-2/4 md:w-3/12 h-full inline-block"
                aria-label="Sidenav"
            >
                <div className="flex flex-col items-center overflow-y-auto py-6 h-full border-r bg-gray-800 border-gray-700">
                    <h2 className="mb-5 text-xl text-white font-semibold">
                        My Music
                    </h2>
                    <ul className="space-y-2 px-2 text-xs md:text-sm">
                        <li
                            className={`inline-flex w-full bg-gray-600/25 group rounded-md cursor-pointer ${
                                currentTab == "upload-music"
                                    ? "text-blue-500"
                                    : "text-white"
                            }`}
                            onClick={() => setCurrentTab("upload-music")}
                        >
                            <Link
                                to="/dashboard/mymusic/upload-music"
                                className="w-full h-full py-2 text-center"
                            >
                                Upload Music
                            </Link>
                        </li>
                        <li
                            className={`inline-flex w-full bg-gray-600/25 group rounded-md cursor-pointer ${
                                currentTab == "my-library"
                                    ? "text-blue-500"
                                    : "text-white"
                            }`}
                            onClick={() => setCurrentTab("my-library")}
                        >
                            <Link
                                to="/dashboard/mymusic/my-library"
                                className="w-full py-2 text-center"
                            >
                                My Library
                            </Link>
                        </li>

                        <li
                            className={`inline-flex w-full text-white bg-gray-600/25 group rounded-md cursor-pointer ${
                                currentTab == "artist-profile"
                                    ? "text-blue-500"
                                    : "text-white"
                            }`}
                            onClick={() => setCurrentTab("artist-profile")}
                        >
                            <Link
                                to="/dashboard/mymusic/artist-profile"
                                className="w-full h-full py-2 text-center"
                            >
                                Artist Profile
                            </Link>
                        </li>
                    </ul>
                </div>
            </aside>
            {returnTab()}
        </div>
    );
}

export default MyMusic;
