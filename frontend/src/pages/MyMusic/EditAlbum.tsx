import {
    ArrowLeftIcon,
    CalendarIcon,
    PencilIcon,
    TrashIcon,
} from "@heroicons/react/24/solid";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { ReactNode, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Song } from "../../interfaces/SongInterface";
import { useLocation, redirect } from "react-router-dom";
import { Album } from "../../interfaces/AlbumInterface";
import {
    getDuration,
    getFieldErrors,
    timeToPrettyDate,
} from "../../functions/generalFunctions";
import LoadingDots from "../../components/LoadingDots";
import GenrePicker from "../../components/GenrePicker";
import { useAuth } from "../../contexts/AuthContext";
import axios from "../../axios";
import LoadingSpinner from "../../components/LoadingSpinner";

interface FormFields {
    name: null | string;
    song: null | string;
    genre: null | string;
}
function EditAlbum() {
    const { csrfToken } = useAuth();
    const [requestLoading, setRequestLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [featureInputs, setFeatureInputs] = useState<ReactNode[]>([]);
    const [fieldErrors, setFieldErrors] = useState<FormFields>({
        name: null,
        song: null,
        genre: null,
    });
    const [songs, setSongs] = useState<Song[]>([]);
    const [statusMessage, setStatusMessage] = useState<any>(null);
    const location = useLocation();
    const album: Album = location.state.album;

    const fetchAlbum = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`/album/${album.id}`);
            if (res.status === 200) {
                setSongs(res.data.songs);
            }
        } catch (error: any) {
            console.log(error);
        }
        setLoading(false);
    };
    useEffect(() => {
        fetchAlbum();
    }, []);

    const HandleSubmit = async (e: any) => {
        e.preventDefault();
        setRequestLoading(true);

        const { name, song, genre } = e.target.elements;
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

        const bodyFormData = new FormData();
        bodyFormData.append("name", name.value);
        bodyFormData.append("song", song.files[0]);
        bodyFormData.append("genre", genre.value);
        bodyFormData.append("length", songLength);
        bodyFormData.append("album_id", album.id.toString());
        if (features.length > 0) {
            console.log(features);
            bodyFormData.append("features", JSON.stringify(features));
        }

        await csrfToken();
        axios({
            method: "post",
            url: "/upload-album-song",
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

        setRequestLoading(false);
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
                        // required
                    />
                </div>
            )
        );
    };
    return (
        <div className="w-full h-full flex-col p-4 md:px-5 overflow-y-auto">
            {loading && <LoadingSpinner />}
            <Link to="/mymusic">
                <span className="flex items-center text-underline">
                    <ArrowLeftIcon className="h-5 mr-2" />
                    My Albums
                </span>
            </Link>
            <div className="w-full md:w-3/4 mx-auto px-5 mt-10">
                <div className="flex flex-row justify-between md:items-center">
                    <div className="flex">
                        <img
                            src={
                                "http://localhost:8000/storage/images/covers/" +
                                album.cover
                            }
                            className="h-16 w-16 rounded-sm"
                        />
                        <div className="flex flex-col ml-3">
                            <h1 className="text-2xl font-bold">
                                {album.title}
                            </h1>
                            <p className="text-xl font-semibold text-gray-400">
                                {album.artist}
                            </p>
                        </div>
                    </div>
                    <div className="hidden md:flex flex-col mt-3 md:mt-0">
                        <span className="text-gray-400 font-semibold">
                            Release date
                        </span>
                        <span className="flex items-center text-lg font-semibold">
                            <CalendarIcon className="h-4 mr-2" />
                            {timeToPrettyDate(album.release_date)}
                        </span>
                    </div>
                </div>
                <div className="mt-5 mb-3">
                    {songs?.map((song) => {
                        let features;
                        if (song.features)
                            features = JSON.parse(song.features).join(", ");

                        return (
                            <div className="flex w-full justify-between items-center bg-zinc-800 rounded-md px-4 py-2 mb-2">
                                <div className="flex w-3/5 items-center">
                                    <span className="text-xl font-semibold text-gray-300 mr-3">
                                        #{song.album_order}
                                    </span>
                                    <img
                                        src={
                                            "http://localhost:8000/storage/images/covers/" +
                                            album.cover
                                        }
                                        className="h-10 w-10 rounded-sm"
                                    />
                                    <div className="flex w-full flex-col ml-3">
                                        <span className="text-white font-semibold truncate">
                                            {song.name}
                                        </span>
                                        <span className="text-gray-400 text-sm truncate">
                                            {album.artist}
                                            {features && `, ${features}`}
                                        </span>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    className="focus:ring-4 font-medium rounded-lg text-sm p-1.5 bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-red-800"
                                >
                                    <TrashIcon className="h-6" />
                                </button>
                            </div>
                        );
                    })}
                </div>
                <form
                    className="space-y-4 mt-5"
                    action="#"
                    method="post"
                    onSubmit={HandleSubmit}
                >
                    <h1 className="text-2xl font-semibold leading-4">
                        Add a new song
                    </h1>
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
                    </div>
                    <button
                        type="submit"
                        className="w-full mb-auto text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                        {requestLoading ? <LoadingDots /> : "Add Song"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EditAlbum;
