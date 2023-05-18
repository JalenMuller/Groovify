import { useState, useEffect, useContext } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import axios from "../../../axios";
import LoadingDots from "../../../components/LoadingDots";
import {
    getFieldErrors,
    timeToPrettyDate,
} from "../../../functions/generalFunctions";
import GenrePicker from "../../../components/GenrePicker";
import { Album } from "../../../interfaces/AlbumInterface";
import { CalendarIcon, PencilIcon } from "@heroicons/react/24/solid";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { Link, useNavigate } from "react-router-dom";
import { StatusMessageContext } from "../../../contexts/StatusMessageContext";

interface FormFields {
    title: null | string;
    artist: null | string;
    cover: null | string;
    release_date: null | string;
    genre: null | string;
}

function UploadAlbumForm() {
    const { csrfToken } = useAuth();
    const statusContext: any = useContext(StatusMessageContext);
    const [requestLoading, setRequestLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [statusMessage, setStatusMessage] = useState<any>(false);
    const [fieldErrors, setFieldErrors] = useState<FormFields>({
        title: null,
        artist: null,
        cover: null,
        release_date: null,
        genre: null,
    });
    const navigate = useNavigate();

    const createAlbum = async (e: any) => {
        e.preventDefault();
        setRequestLoading(true);

        const { title, artist, cover, release_date, genre } = e.target.elements;
        let features: string[] = [];
        let featureInputElements = document.querySelectorAll("#feature");
        featureInputElements.forEach((input) => {
            const value = (input as HTMLInputElement).value;
            if (value) {
                features.push(value);
            }
        });

        let time = new Date(release_date.value).getTime();
        const bodyFormData = new FormData();
        bodyFormData.append("title", title.value);
        bodyFormData.append("artist", artist.value);
        bodyFormData.append("cover", cover.files[0]);
        bodyFormData.append("genre", genre.value);
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
            url: "/create-album",
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then((res) => {
                navigate("/dashboard/mymusic/my-library/albums");
            })
            .catch((err) => {
                const errors = getFieldErrors(err.response.data.errors);
                console.log(errors);
                if (errors.length === 0)
                    // No errors returned? Send basic error message.
                    statusContext.updateStatus(
                        "error",
                        "Something went wrong, please try again."
                    );
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

        setRequestLoading(false);
    };
    return (
        <>
            {loading ? (
                <div className="w-full h-full">
                    <LoadingSpinner className="flex items-center justify-center w-full h-full" />
                </div>
            ) : (
                <div className="overflow-y-auto h-4/5 w-full md:w-3/4 mx-auto px-5 md:px-10 py-2">
                    <form
                        className="space-y-4 mt-2"
                        action="#"
                        method="post"
                        onSubmit={createAlbum}
                    >
                        <h2 className="font-semibold text-xl leading-7">
                            Create a new album
                        </h2>
                        <div>
                            <label
                                htmlFor="title"
                                className="block mb-2 text-sm font-medium text-gray-200"
                            >
                                Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                className="border sm:text-sm rounded-lg block w-full bg-gray-700 border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                                // required
                            />
                            {fieldErrors.title && (
                                <span className="text-sm text-red-500">
                                    {fieldErrors.title}
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
                                className="border sm:text-sm rounded-lg block w-full bg-gray-700 border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                                // required
                            />
                            {fieldErrors.artist && (
                                <span className="text-sm text-red-500">
                                    {fieldErrors.artist}
                                </span>
                            )}
                        </div>
                        <div>
                            <GenrePicker />
                            {fieldErrors.genre && (
                                <span className="text-sm text-red-500">
                                    {fieldErrors.genre}
                                </span>
                            )}
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
                                Album cover
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
                        <button
                            type="submit"
                            className="w-full mb-auto text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        >
                            {requestLoading ? <LoadingDots /> : "Create Album"}
                        </button>
                    </form>
                </div>
            )}
        </>
    );
}

export default UploadAlbumForm;
