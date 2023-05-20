import {
    ArrowLeftIcon,
    CalendarIcon,
    TrashIcon,
} from "@heroicons/react/24/solid";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { ReactNode, useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Song } from "../../../interfaces/SongInterface";
import { Album } from "../../../interfaces/AlbumInterface";
import {
    getDuration,
    getFieldErrors,
    timeToPrettyDate,
} from "../../../functions/generalFunctions";
import LoadingDots from "../../../components/LoadingDots";
import { useAuth } from "../../../contexts/AuthContext";
import axios from "../../../axios";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { StatusMessageContext } from "../../../contexts/StatusMessageContext";
import { constants } from "../../../data/constants";

interface FormFields {
    name: null | string;
    song: null | string;
}
const defaultFields = {
    name: null,
    song: null,
};
function EditAlbum() {
    const { csrfToken, user } = useAuth();
    const statusContext: any = useContext(StatusMessageContext);
    const [requestLoading, setRequestLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [featureInputs, setFeatureInputs] = useState<ReactNode[]>([]);
    const [fieldErrors, setFieldErrors] = useState<FormFields>(defaultFields);
    const [songs, setSongs] = useState<Song[]>([]);
    const [album, setAlbum] = useState<Album | any>({});
    const { id } = useParams();
    const navigate = useNavigate();

    const fetchAlbum = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`/my-album/${id}`);
            if (res.status === 200) {
                setAlbum(res.data.album);
                setSongs(res.data.songs);
            }
        } catch (error: any) {
            navigate("/dashboard/mymusic/my-library/albums");
            statusContext.updateStatus(
                "error",
                error.response?.data.message ??
                    "Something went wrong, please try again."
            );
        }
        setLoading(false);
    };
    useEffect(() => {
        fetchAlbum();
    }, []);

    const HandleSubmit = async (e: any) => {
        e.preventDefault();
        setRequestLoading(true);

        const { name, song } = e.target.elements;
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
        bodyFormData.append("length", songLength);
        bodyFormData.append("album_id", album.id.toString());
        if (features.length > 0) {
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
                statusContext.updateStatus("success", res.data?.message);
                resetForm();
                setFieldErrors(defaultFields);
                fetchAlbum();
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

        setRequestLoading(false);
    };
    const resetForm = () => {
        (document.getElementById("edit-album-form") as HTMLFormElement).reset();
    };
    const deleteAlbumSong = async (id: number) => {
        setLoading(true);
        try {
            const res = await axios.delete(`/delete-album-song/${id}`);
            if (res.status === 200) {
                fetchAlbum();
                statusContext.updateStatus("deletion", res.data?.message);
                // todo: add success message
            }
        } catch (error: any) {
            statusContext.updateStatus(
                "error",
                error.response?.data.message ??
                    "Something went wrong, please try again."
            );
        }
        setLoading(false);
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
    return (
        <div className="w-full h-full flex-col p-4 md:px-5 overflow-y-auto">
            {loading ? (
                <div className="w-full h-full">
                    <LoadingSpinner className="flex items-center justify-center w-full h-full" />
                </div>
            ) : (
                <>
                    <Link
                        to="/dashboard/mymusic/my-library/albums"
                        className="absolute z-40"
                    >
                        <span className="flex items-center text-underline">
                            <ArrowLeftIcon className="h-5 mr-2" />
                            My Albums
                        </span>
                    </Link>
                    <div className="w-full md:w-3/4 mx-auto px-5 mt-10">
                        <div className="flex flex-row justify-between md:items-center">
                            <div className="flex">
                                <img
                                    src={`${constants.baseURL}/storage/images/covers/${album.cover}`}
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
                                    features = JSON.parse(song.features).join(
                                        ", "
                                    );

                                return (
                                    <div
                                        key={song.id}
                                        className="flex w-full justify-between items-center bg-zinc-800 rounded-md px-4 py-2 mb-2"
                                    >
                                        <div className="flex w-3/5 items-center">
                                            <span className="text-xl font-semibold text-gray-300 mr-3">
                                                #{song.album_order}
                                            </span>
                                            <img
                                                src={`${constants.baseURL}/storage/images/covers/${album.cover}`}
                                                className="h-10 w-10 rounded-sm"
                                            />
                                            <div className="flex w-full flex-col ml-3">
                                                <span className="text-white font-semibold truncate">
                                                    {song.name}
                                                </span>
                                                <span className="text-gray-400 text-sm truncate">
                                                    {album.artist}
                                                    {features &&
                                                        `, ${features}`}
                                                </span>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                deleteAlbumSong(song.id)
                                            }
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
                            id="edit-album-form"
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
                                    className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
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
                            </div>
                            <button
                                type="submit"
                                className="w-full text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800"
                            >
                                {requestLoading ? <LoadingDots /> : "Add Song"}
                            </button>
                        </form>
                    </div>
                </>
            )}
        </div>
    );
}

export default EditAlbum;
