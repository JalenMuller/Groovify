import { ReactNode, useContext, useEffect, useState } from "react";
import axios from "../../../axios";
import { useAuth } from "../../../contexts/AuthContext";
import {
    getDuration,
    getFieldErrors,
} from "../../../functions/generalFunctions";
import LoadingDots from "../../../components/LoadingDots";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import GenrePicker from "../../../components/GenrePicker";
import { StatusMessageContext } from "../../../contexts/StatusMessageContext";
interface FormFields {
    name: null | string;
    artist: null | string;
    song: null | string;
    cover: null | string;
    release_date: null | string;
    genre: null | string;
}
const defaultFields = {
    name: null,
    artist: null,
    song: null,
    cover: null,
    release_date: null,
    genre: null,
};
function UploadSingleForm() {
    const { csrfToken } = useAuth();
    const statusContext: any = useContext(StatusMessageContext);
    const [loading, setLoading] = useState(false);
    const [featureInputs, setFeatureInputs] = useState<ReactNode[]>([]);
    const [fieldErrors, setFieldErrors] = useState<FormFields>(defaultFields);

    const resetForm = () => {
        (
            document.getElementById("upload-single-form") as HTMLFormElement
        ).reset();
    };
    const addFeatureInput = () => {
        setFeatureInputs(
            featureInputs.concat(
                <div className="flex items-center h-10 mb-2">
                    <input
                        type="text"
                        name="feature"
                        id="feature"
                        className="block h-full w-full text-sm border rounded-lg text-white focus:outline-none bg-gray-700 border-gray-600 placeholder-gray-400"
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
                statusContext.updateStatus("success", res.data?.message);
                setFieldErrors(defaultFields);
                resetForm();
            })
            .catch((err) => {
                const errors = getFieldErrors(err.response.data.errors);
                if (errors.length === 0)
                    // No errors returned? Send basic error message.
                    statusContext.updateStatus(
                        "error",
                        "Something went wrong, please try again."
                    );
                else {
                    // Field errors found? Loop through and set the field errors state
                    let newState = defaultFields;
                    errors.forEach((error: any) => {
                        newState[error.field as keyof FormFields] =
                            error.errorMessage;
                    });

                    setFieldErrors({ ...newState });
                }
            });

        setLoading(false);
    };
    const todayDateString = new Date().toISOString().split("T")[0];
    return (
        <>
            <form
                className="overflow-y-auto h-4/5 w-full md:w-3/4 px-5 md:px-10 mx-auto space-y-4 mt-5 bg-zinc-800"
                action="#"
                method="post"
                onSubmit={handleSubmit}
                id="upload-single-form"
            >
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
                        className="block w-full text-sm border rounded-lg cursor-pointer focus:outline-none bg-gray-700 border-gray-600 placeholder-gray-400"
                        required
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
                        required
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
                        max={todayDateString}
                        className="block cursor-pointer text-sm md:min-w-1/3 bg-gray-700 border border-gray-600 text-white rounded-lg"
                        required
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
                        className="block w-full text-sm border rounded-lg cursor-pointer focus:outline-none bg-gray-700 border-gray-600 placeholder-gray-400"
                        accept="image/png, image/jpeg, image/jpg"
                        required
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
                        className="block w-full text-sm border rounded-lg cursor-pointer focus:outline-none bg-gray-700 border-gray-600 placeholder-gray-400"
                        accept=".mp3"
                        required
                    />
                    {fieldErrors.song && (
                        <span className="text-sm text-red-500">
                            {fieldErrors.song}
                        </span>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full mb-auto focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800"
                >
                    {loading ? <LoadingDots /> : "Publish Song"}
                </button>
            </form>
        </>
    );
}

export default UploadSingleForm;
