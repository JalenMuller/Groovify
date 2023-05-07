import { ReactNode, useEffect, useState } from "react";
import axios from "../../../axios";
import { useAuth } from "../../../contexts/AuthContext";
import StatusMessage from "../../../components/StatusMessage";
import {
    getDuration,
    getFieldErrors,
} from "../../../functions/generalFunctions";
import LoadingDots from "../../../components/LoadingDots";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import GenrePicker from "../../../components/GenrePicker";
interface FormFields {
    name: null | string;
    artist: null | string;
    song: null | string;
    cover: null | string;
    release_date: null | string;
    genre: null | string;
}
function UploadSingleForm() {
    const { csrfToken } = useAuth();
    const [statusMessage, setStatusMessage] = useState<any>(false);
    const [loading, setLoading] = useState(false);
    const [featureInputs, setFeatureInputs] = useState<ReactNode[]>([]);
    const [fieldErrors, setFieldErrors] = useState<FormFields>({
        name: null,
        artist: null,
        song: null,
        cover: null,
        release_date: null,
        genre: null,
    });
    const addFeatureInput = () => {
        console.log("added?");
        setFeatureInputs(
            featureInputs.concat(
                <div className="flex items-center h-10 mb-2">
                    <input
                        type="text"
                        name="feature"
                        id="feature"
                        className="block h-full w-full text-sm border rounded-lg text-white focus:outline-none bg-gray-700 border-gray-600 placeholder-gray-400"
                        // required
                    />
                </div>
            )
        );
    };
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);

        const { name, artist, song, cover, release_date, genre } =
            e.target.elements;
        let features: string[] = [];
        let featureInputElements = document.querySelectorAll("#feature");
        featureInputElements.forEach((input) => {
            const value = (input as HTMLInputElement).value;
            if (value) {
                features.push(value);
            }
        });
        let songLength = "";
        // client is able to manipulate song length client side, possible to-do
        await getDuration(song.files[0]).then(function (value: any) {
            songLength = Math.floor(value).toString();
        });
        let time = new Date(release_date.value).getTime();
        const bodyFormData = new FormData();
        bodyFormData.append("name", name.value);
        bodyFormData.append("artist", artist.value);
        bodyFormData.append("cover", cover.files[0]);
        bodyFormData.append("song", song.files[0]);
        bodyFormData.append("genre", genre.value);
        bodyFormData.append("length", songLength);
        if (time) {
            bodyFormData.append("release_date", time.toString());
        }
        if (features.length > 0) {
            console.log(features);
            bodyFormData.append("features", JSON.stringify(features));
        }

        await csrfToken();
        axios({
            method: "post",
            url: "/upload-song",
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then((res) => {
                setStatusMessage({
                    type: "success",
                    message: res.data?.message,
                });
                console.log(res);
            })
            .catch((err) => {
                const errors = getFieldErrors(err.response.data.errors);
                if (errors.length === 0)
                    // No errors returned? Send basic error message.
                    setStatusMessage({
                        type: "error",
                        message:
                            "Something went wrong, please try again later.",
                    });
                else {
                    // Field errors found? Loop through and set the field errors state
                    let newState = fieldErrors;
                    errors.forEach((error: any) => {
                        newState[error.field as keyof FormFields] =
                            error.errorMessage;
                    });
                    setFieldErrors({ ...newState });
                }
                // console.log(res);
            });

        setLoading(false);
    };

    // useEffect(() => {}, [fieldErrors]);
    return (
        <>
            <form
                className="overflow-y-auto h-4/5 w-full md:w-3/4 px-5 md:px-10 mx-auto space-y-4 mt-5 bg-zinc-800"
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
                        // required
                    />
                    {fieldErrors.name && (
                        <span className="text-sm text-red-500">
                            {fieldErrors.name}
                        </span>
                    )}
                </div>
                <div>
                    <label
                        htmlFor="artist"
                        className="block mb-2 text-sm font-medium text-gray-200"
                    >
                        Artist
                    </label>
                    <input
                        type="text"
                        name="artist"
                        id="artist"
                        className="block w-full text-sm border rounded-lg text-white focus:outline-none bg-gray-700 border-gray-600 placeholder-gray-400"
                        // required
                    />
                    {fieldErrors.artist && (
                        <span className="text-sm text-red-500">
                            {fieldErrors.artist}
                        </span>
                    )}
                </div>
                <div>
                    <label
                        htmlFor="feature"
                        className="block mb-2 text-sm font-medium text-gray-200"
                    >
                        Features
                    </label>
                    <div className="flex items-center h-10 mb-2">
                        <input
                            type="text"
                            name="feature"
                            id="feature"
                            className="block h-full w-full text-sm border rounded-lg text-white focus:outline-none bg-gray-700 border-gray-600 placeholder-gray-400"
                            // required
                        />
                        <div
                            onClick={() => addFeatureInput()}
                            className="flex items-center px-1 h-full ml-2 border border-gray-300 text-white rounded-lg focus:ring-primary-600 focus:border-primary-600 bg-gray-700 border-gray-600 cursor-pointer "
                        >
                            <PlusCircleIcon className="h-8" />
                        </div>
                    </div>
                    {featureInputs}
                </div>
                <div>
                    <GenrePicker />
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
                        id="release_date"
                        name="release_date"
                        className="block cursor-pointer text-sm md:min-w-1/3 bg-gray-700 border border-gray-600 text-white rounded-lg"
                        // required
                    />
                    {fieldErrors.release_date && (
                        <span className="text-sm text-red-500">
                            {fieldErrors.release_date}
                        </span>
                    )}
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
                        // required
                    />
                    {fieldErrors.cover && (
                        <span className="text-sm text-red-500">
                            {fieldErrors.cover}
                        </span>
                    )}
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
                        // required
                    />
                    {fieldErrors.song && (
                        <span className="text-sm text-red-500">
                            {fieldErrors.song}
                        </span>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full mb-auto text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                    {loading ? <LoadingDots /> : "Publish Song"}
                </button>
            </form>
        </>
    );
}

export default UploadSingleForm;
