import { useEffect, useState } from "react";
import UploadSingleForm from "./UploadSingleForm";
import UploadAlbumForm from "./UploadAlbumForm";
import { Link } from "react-router-dom";

function UploadMusic(props: { subTab: string }) {
    const [currentTab, setCurrentTab] = useState("single");
    const returnTab = () => {
        switch (currentTab) {
            case "single":
                return <UploadSingleForm />;
            case "album":
                return <UploadAlbumForm />;
            default:
                return <UploadSingleForm />;
        }
    };
    useEffect(() => {
        if (props.subTab) {
            setCurrentTab(props.subTab);
        }
    }, []);
    const style =
        "border-transparent hover:border-gray-300 hover:text-gray-300";
    const activeStyle = "active text-blue-600 border-blue-600";
    return (
        <div className="w-full h-full overflow-y-hidden">
            <div className="text-xs mt-2 md:mt-5 md:text-sm font-medium text-center border-b text-gray-400 border-gray-700">
                <ul className="flex flex-wrap">
                    <li
                        className="mr-2 cursor-pointer"
                        onClick={() => setCurrentTab("single")}
                    >
                        <Link
                            to="/dashboard/mymusic/upload-music/single"
                            className={`inline-block w-full h-full p-4 border-b-2 rounded-t-lg ${
                                currentTab == "single" ? activeStyle : style
                            }`}
                        >
                            Single
                        </Link>
                    </li>
                    <li
                        className="mr-2 cursor-pointer"
                        onClick={() => setCurrentTab("album")}
                    >
                        <Link
                            to="/dashboard/mymusic/upload-music/album"
                            className={`inline-block p-4 border-b-2 rounded-t-lg ${
                                currentTab == "album" ? activeStyle : style
                            }`}
                        >
                            Album
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="w-full h-full">{returnTab()}</div>
        </div>
    );
}

export default UploadMusic;
