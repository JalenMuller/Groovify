import { useState } from "react";
import axios from "../../axios";
import { useAuth } from "../../contexts/AuthContext";
import StatusMessage from "../../components/StatusMessage";
import { getDuration } from "../../functions/generalFunctions";

function UploadSingleForm() {
    const { csrfToken } = useAuth();
    const [statusMessage, setStatusMessage] = useState<any>(false);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const { name, artist, song, cover, release_date, genre_id } =
            e.target.elements;
        let songLength: string = "";
        // client is able to manipulate song length client side, possible to-do
        await getDuration(song.files[0]).then(function (value: any) {
            songLength = Math.floor(value).toString();
        });
        let time = new Date(release_date.value).getTime().toString();
        const bodyFormData = new FormData();
        bodyFormData.append("name", name.value);
        bodyFormData.append("artist", artist.value);
        bodyFormData.append("cover", cover.files[0]);
        bodyFormData.append("song", song.files[0]);
        bodyFormData.append("release_date", time);
        bodyFormData.append("genre_id", genre_id.value);
        bodyFormData.append("length", songLength);
        // return console.log(
        //     bodyFormData.forEach((value, key) =>
        //         console.log({ key: key, value: value })
        //     )
        // );
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
            console.log(error);
        }
    };
    return (
        <form
            className=" w-full md:w-3/4 px-5 mx-auto space-y-4 mt-5 bg-zinc-800"
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
                    className="block mb-2 text-sm font-medium text-gray-200"
                >
                    Song name
                </label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-white sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                />
            </div>
            <div>
                <label
                    htmlFor="artists"
                    className="block mb-2 text-sm font-medium text-gray-200"
                >
                    Artist
                </label>
                <input
                    type="text"
                    name="artist"
                    id="artist"
                    className="block w-full text-sm border rounded-lg cursor-pointer text-white focus:outline-none bg-gray-700 border-gray-600 placeholder-gray-400"
                    required
                />
            </div>
            <div>
                <label
                    htmlFor="genre_id"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Genre
                </label>
                <select
                    name="genre_id"
                    id="genre_id"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                >
                    <option value="" selected>
                        Choose a genre
                    </option>
                    <option value="1">Blues</option>
                    <option value="2">Classical</option>
                    <option value="3">Country</option>
                    <option value="4">Electronic</option>
                    <option value="5">Folk</option>
                    <option value="6">Hip-hop</option>
                    <option value="7">Reggae</option>
                    <option value="8">Rock</option>
                    <option value="9">Other</option>
                </select>
            </div>

            <div>
                <label
                    htmlFor="release_date"
                    className="block mb-2 text-sm font-medium text-gray-200"
                >
                    Release Date
                </label>
                <input
                    type="date"
                    required
                    id="release_date"
                    name="release_date"
                    className="cursor-pointer text-sm md:min-w-1/3 bg-gray-700 border border-gray-600 text-white rounded-lg"
                />
            </div>
            <div>
                <label
                    htmlFor="cover"
                    className="block mb-2 text-sm font-medium text-gray-200"
                >
                    Cover image
                </label>
                <input
                    type="file"
                    name="cover"
                    id="cover"
                    className="block w-full text-sm border rounded-lg cursor-pointer text-gray-400 focus:outline-none bg-gray-700 border-gray-600 placeholder-gray-400"
                    accept="image/png, image/jpeg"
                    required
                />
            </div>
            <div>
                <label
                    htmlFor="song"
                    className="block mb-2 text-sm font-medium text-gray-200"
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
    );
}

export default UploadSingleForm;
