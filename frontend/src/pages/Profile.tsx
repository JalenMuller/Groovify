import React, { useState, useEffect, useRef, useContext } from "react";
import { useAuth } from "../contexts/AuthContext";
import PageHeader from "../components/PageHeader";
import { UserIcon } from "@heroicons/react/24/solid";
import axios from "../axios";
import { getFieldErrors } from "../functions/generalFunctions";
import LoadingDots from "../components/LoadingDots";
import StatusMessage from "../components/StatusMessage";
import LoadingSpinner from "../components/LoadingSpinner";
import { StatusMessageContext } from "../contexts/StatusMessageContext";
import { constants } from "../data/constants";

interface FormFields {
    name: null | string;
    email: null | string;
    avatar: null | string;
}
const defaultFields = {
    name: null,
    email: null,
    avatar: null,
};
export default function Profile() {
    const { csrfToken }: any = useAuth();
    const statusContext: any = useContext(StatusMessageContext);
    const [user, setUser] = useState<any>(null);
    const [avatarSrc, setAvatarSrc] = useState<any>("");
    const [requestLoading, setRequestLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [fieldErrors, setFieldErrors] = useState<FormFields>(defaultFields);

    const fileInput: any = useRef(null);
    const openFileInput = () => {
        fileInput.current.click();
    };

    function previewFile(e: any) {
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.onloadend = function () {
            setAvatarSrc(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    }
    // don't get user from localstorage so we can refresh on update profile
    const fetchUser = async () => {
        setLoading(true);
        try {
            const res = await axios.get("/user");
            if (res.status === 200) {
                setUser(res.data.data);
            }
        } catch (error: any) {}
        setLoading(false);
    };
    useEffect(() => {
        fetchUser();
    }, []);

    const updateProfile = async (e: any) => {
        e.preventDefault();
        setRequestLoading(true);

        const { name, email } = e.target.elements;

        const bodyFormData = new FormData();
        bodyFormData.append("name", name.value);
        bodyFormData.append("email", email.value);
        if (fileInput.current.files[0]) {
            bodyFormData.append("avatar", fileInput.current.files[0]);
        }

        await csrfToken();
        axios({
            method: "post",
            url: "/update-profile",
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then((res) => {
                fetchUser();
                statusContext.updateStatus(
                    "success",
                    "Your changes have been saved"
                );
                setFieldErrors(defaultFields);
            })
            .catch((err) => {
                const errors = getFieldErrors(err.response.data.errors);
                if (errors.length === 0) {
                    // No errors returned? Send basic error message.
                    statusContext.updateStatus(
                        "success",
                        "Something went wrong, please try again."
                    );
                } else {
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
    return (
        <div
            className="w-full h-full pt-14 flex-col p-2 md:px-5 overflow-y-auto"
            id="scrollable"
        >
            {loading ? (
                <div className="w-full h-full">
                    <LoadingSpinner className="flex items-center justify-center w-full h-full" />
                </div>
            ) : (
                <>
                    <input
                        className="hidden"
                        type="file"
                        id="avatar"
                        ref={fileInput}
                        accept="image/png, image/jpeg, image/jpg"
                        onChange={(e) => previewFile(e)}
                    />
                    <div className="w-full md:w-3/4 mx-auto px-2">
                        <PageHeader title="My Profile" />
                        <form
                            className="space-y-4 mt-7"
                            action="#"
                            method="post"
                            onSubmit={updateProfile}
                        >
                            <div className="flex justify-around md:justify-start">
                                <div
                                    className="h-20 w-20 flex items-center justify-center rounded-full border mr-2 hover:border-2 transition"
                                    onClick={openFileInput}
                                >
                                    <img
                                        src={avatarSrc}
                                        className="h-full w-full rounded-full"
                                    />
                                    {user?.avatar && !avatarSrc ? (
                                        <img
                                            className="h-full w-full rounded-full"
                                            src={`${constants.baseURL}/storage/images/avatars/${user.avatar}`}
                                        />
                                    ) : (
                                        !avatarSrc && (
                                            <UserIcon className="h-10" />
                                        )
                                    )}
                                </div>
                                <div className="md:ml-5">
                                    <label
                                        htmlFor="title"
                                        className="block mb-2 text-sm font-medium text-gray-200"
                                    >
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        className="sm:text-sm rounded-lg block w-full bg-zinc-900 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                                        defaultValue={user?.name}
                                        required
                                    />
                                    {fieldErrors.name && (
                                        <p className="text-sm text-red-600">
                                            {fieldErrors.name}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor="title"
                                    className="block mb-2 text-sm font-medium text-gray-200"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="sm:text-sm rounded-lg block w-full bg-zinc-900 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                                    defaultValue={user?.email}
                                    required
                                />
                                {fieldErrors.email && (
                                    <p className="text-sm text-red-600">
                                        {fieldErrors.email}
                                    </p>
                                )}
                            </div>
                            <button
                                type="submit"
                                className="w-full mb-auto focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800"
                            >
                                {requestLoading ? (
                                    <LoadingDots />
                                ) : (
                                    "Update Profile"
                                )}
                            </button>
                        </form>
                    </div>
                </>
            )}
        </div>
    );
}
