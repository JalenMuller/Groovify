import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import axios from "../../axios";
import { XMarkIcon } from "@heroicons/react/24/solid";
import LoadingDots from "../../components/LoadingDots";
import { useNavigate } from "react-router-dom";

function NewPlaylistModal(props: {
    toggleModal: () => void;
    fetchMyPlaylists: () => Promise<void>;
}) {
    const [loading, setLoading] = useState(false);
    const { csrfToken } = useAuth();
    const navigate = useNavigate();
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        const { name } = e.target.elements;
        const body = {
            name: name.value,
        };
        await csrfToken();
        try {
            const res = await axios.post("/playlist/create", body);
            if (res.status === 200) {
                handleClose();
                navigate(`/playlist/${res.data?.playlist.id}`);
            }
        } catch (error: any) {}
        setLoading(false);
    };
    const handleClose = () => {
        props.toggleModal();
        props.fetchMyPlaylists();
    };
    return (
        <div className="z-50 fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-zinc-900/75">
            <div className="w-full md:w-1/2 absolute bg-zinc-800 border border-zinc-600 shadow rounded-lg p-3">
                <div
                    onClick={props.toggleModal}
                    className="absolute top-2.5 right-3"
                >
                    <XMarkIcon className="h-10" />
                </div>
                <h1 className="text-2xl font-bold text-center">
                    Name your playlist
                </h1>
                <form
                    className="space-y-4 md:space-y-6 mx-3 mt-5"
                    action="#"
                    method="post"
                    onSubmit={handleSubmit}
                >
                    <div>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            className="bg-zinc-800 text-lg border-0 border-b block w-3/4 py-1 px-2 text-center border-gray-600 text-white focus:ring-0 mx-auto"
                            autoFocus
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800"
                    >
                        {loading ? <LoadingDots /> : "Create Playlist"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default NewPlaylistModal;
