import { useState } from "react";
import UploadMusic from "./UploadMusic";
import { useParams } from "react-router-dom";

function MyMusic() {
    const [currentTab, setCurrentTab] = useState("upload-music");
    let { id } = useParams();
    console.log(id);
    const returnTab = () => {
        switch (currentTab) {
            case "upload-music":
                return <UploadMusic />;
            case "my-music":
                return <div className="w-full h-full">test</div>;
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
                            className={`inline-flex w-full py-2 bg-gray-600/25 group rounded-md cursor-pointer ${
                                currentTab == "upload-music"
                                    ? "text-blue-500"
                                    : "text-white"
                            }`}
                            onClick={() => setCurrentTab("upload-music")}
                        >
                            <span className="m-auto">Upload Music</span>
                        </li>
                        <li
                            className={`inline-flex w-full py-2 px-4 bg-gray-600/25 group rounded-md cursor-pointer ${
                                currentTab == "my-music"
                                    ? "text-blue-500"
                                    : "text-white"
                            }`}
                            onClick={() => setCurrentTab("my-music")}
                        >
                            <span className="m-auto">My Music</span>
                        </li>
                        <li
                            className={`inline-flex w-full py-2 px-4 text-white bg-gray-600/25 group rounded-md cursor-pointer ${
                                currentTab == "artist-profile"
                                    ? "text-blue-500"
                                    : "text-white"
                            }`}
                            onClick={() => setCurrentTab("artist-profile")}
                        >
                            <span className="m-auto">Artist Profile</span>
                        </li>
                    </ul>
                </div>
            </aside>
            {returnTab()}
        </div>
    );
}

export default MyMusic;
