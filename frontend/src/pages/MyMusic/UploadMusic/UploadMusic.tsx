import { useState } from "react";
import UploadSingleForm from "./UploadSingleForm";
import UploadAlbumForm from "./UploadAlbumForm";

function UploadMusic() {
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
                        <span
                            className={`inline-block p-4 border-b-2 rounded-t-lg ${
                                currentTab == "single" ? activeStyle : style
                            }`}
                        >
                            Single
                        </span>
                    </li>
                    <li
                        className="mr-2 cursor-pointer"
                        onClick={() => setCurrentTab("album")}
                    >
                        <span
                            className={`inline-block p-4 border-b-2 rounded-t-lg ${
                                currentTab == "album" ? activeStyle : style
                            }`}
                        >
                            Album
                        </span>
                    </li>
                </ul>
            </div>
            <div className="w-full h-full">{returnTab()}</div>
        </div>
    );
}

export default UploadMusic;
