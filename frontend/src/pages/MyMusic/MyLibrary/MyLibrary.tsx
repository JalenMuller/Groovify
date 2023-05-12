import { useState, useEffect } from "react";
import MySingles from "./MySingles";
import MyAlbums from "./MyAlbums";
import { Link } from "react-router-dom";

function MyLibrary(props: { subTab: string }) {
    const [currentTab, setCurrentTab] = useState("singles");
    const returnTab = () => {
        switch (currentTab) {
            case "singles":
                return <MySingles />;
            case "albums":
                return <MyAlbums />;
            default:
                return <MySingles />;
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
                        onClick={() => setCurrentTab("singles")}
                    >
                        <Link
                            to="/dashboard/mymusic/my-library/singles"
                            className={`inline-block p-4 border-b-2 rounded-t-lg ${
                                currentTab == "singles" ? activeStyle : style
                            }`}
                        >
                            Singles
                        </Link>
                    </li>
                    <li
                        className="mr-2 cursor-pointer"
                        onClick={() => setCurrentTab("albums")}
                    >
                        <Link
                            to="/dashboard/mymusic/my-library/albums"
                            className={`inline-block p-4 border-b-2 rounded-t-lg ${
                                currentTab == "albums" ? activeStyle : style
                            }`}
                        >
                            Albums
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="w-full h-full">{returnTab()}</div>
        </div>
    );
}

export default MyLibrary;
