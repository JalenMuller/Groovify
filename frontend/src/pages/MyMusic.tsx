import { useState } from "react";
import axios from "../axios";
import { useAuth } from "../contexts/AuthContext";
import StatusMessage from "../components/StatusMessage";

function MyMusic() {
    const { setUser, csrfToken } = useAuth();
    // prettier-ignore
    const [statusMessage, setStatusMessage] = useState<any>(false);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const { name, artists, cover, song } = e.target.elements;
        console.log(song.files[0]);
        var bodyFormData = new FormData();
        bodyFormData.append("name", name.value);
        bodyFormData.append("artists", artists.value);
        bodyFormData.append("cover", cover.files[0]);
        bodyFormData.append("song", song.files[0]);
        // console.log(body);
        await csrfToken();
        try {
            axios({
                method: "post",
                url: "/upload-song",
                data: bodyFormData,
                headers: { "Content-Type": "multipart/form-data" },
            })
                .then(function (res) {
                    setStatusMessage({
                        type: "success",
                        message: res.data?.message,
                    });
                    console.log(res);
                })
                .catch(function (res) {
                    //handle error
                    setStatusMessage({
                        type: "error",
                        message: res.data?.message,
                    });
                    console.log(res);
                });
        } catch (error: any) {
            if (error.response.status === 401) {
                console.log("status 401 oops!");
            }
        }
    };
    return (
        // <div className="w-full">
        <div className="w-full md:w-3/4 h-fit m-auto px-5 md:px-1 bg-zinc-800 border border-gray-700 bg-gray-800 rounded-lg shadow">
            <form
                className="md:w-3/4 mx-auto space-y-4 md:space-y-6 m-5"
                action="#"
                method="post"
                onSubmit={handleSubmit}
            >
                {statusMessage && (
                    <StatusMessage
                        type={statusMessage.type}
                        message={statusMessage.message}
                        className="absolute top-5 left-0 right-0 mx-auto md:mr-48"
                    />
                )}
                <h2 className="font-semibold text-xl leading-7">
                    Publish a new song
                </h2>
                <div>
                    <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Song name
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    />
                </div>
                <div>
                    <label
                        htmlFor="artists"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Artist(s)
                    </label>
                    <input
                        type="text"
                        name="artists"
                        id="artists"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    />
                </div>
                <div>
                    <label
                        htmlFor="cover"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Cover image
                    </label>
                    <input
                        type="file"
                        name="cover"
                        id="cover"
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        accept="image/png, image/jpeg"
                        required
                    />
                </div>
                <div>
                    <label
                        htmlFor="song"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Upload song
                    </label>
                    <input
                        type="file"
                        name="song"
                        id="song"
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        accept=".mp3"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full mb-auto text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                    Publish song
                </button>
            </form>
        </div>
        // </div>
    );
}

export default MyMusic;
