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
                return <UploadMusic subTab={params.subTab ?? ""} />;
            case "my-library":
                return <MyLibrary subTab={params.subTab ?? ""} />;
            default:
                return <UploadMusic subTab={params.subTab ?? ""} />;
        }
    };
    return (
        <div className="w-full h-full flex flex-col m-auto bg-zinc-800 border border-gray-700 bg-gray-800 shadow">
            <div className="w-full h-10 border-b py-7 bg-gray-800 border-gray-700 font-semibold">
                <div className="w-4/5 flex justify-between md:justify-start items-center px-2  h-full text-sm">
                    <h2 className="text-lg md:text-xl text-white font-bold md:mr-4">
                        My Music
                    </h2>
                    <div className="flex overflow-x-auto ">
                        <li
                            className={`inline-flex px-2 py-1.5 h-fit bg-gray-600/25 group rounded-md mr-1 md:mr-2 border border-zinc-600 cursor-pointer ${
                                currentTab == "upload-music"
                                    ? "text-blue-500"
                                    : "text-white"
                            }`}
                            onClick={() => setCurrentTab("upload-music")}
                        >
                            <Link
                                to="/dashboard/mymusic/upload-music"
                                className="w-full h-full text-center"
                            >
                                Upload Music
                            </Link>
                        </li>
                        <li
                            className={`inline-flex px-2 py-1.5 h-fit bg-gray-600/25 group rounded-md border border-zinc-600 cursor-pointer ${
                                currentTab == "my-library"
                                    ? "text-blue-500"
                                    : "text-white"
                            }`}
                            onClick={() => setCurrentTab("my-library")}
                        >
                            <Link
                                to="/dashboard/mymusic/my-library"
                                className="w-full text-center"
                            >
                                My Library
                            </Link>
                        </li>
                    </div>
                </div>
            </div>
            {returnTab()}
        </div>
    );
}

export default MyMusic;
