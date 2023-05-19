import React from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "../axios";
import { useAuth } from "../contexts/AuthContext";
import { getFieldErrors } from "../functions/generalFunctions";
import LoadingDots from "../components/LoadingDots";
import { Logo } from "../assets/Icons";

interface FormFields {
    email: null | string;
    password: null | string;
}
export default function Login() {
    const { setUser, csrfToken } = useAuth();
    const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [fieldErrors, setFieldErrors] = React.useState({
        email: null,
        password: null,
    });
    // login user
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        const { email, password } = e.target.elements;
        const body = {
            email: email.value,
            password: password.value,
        };
        await csrfToken();
        try {
            const resp = await axios.post("/login", body);
            if (resp.status === 200) {
                setUser(resp.data.user);
                return <Navigate to="/library" />;
            }
        } catch (error: any) {
            if (error.response.status === 401) {
                setError(error.response.data.message);
            } else {
                let newState = fieldErrors;
                let errors = getFieldErrors(error.response.data.errors);
                errors.forEach((err: any) => {
                    newState[err.field as keyof FormFields] = err.errorMessage;
                });
                setFieldErrors({ ...newState });
            }
        }
        setLoading(false);
    };

    return (
        <section className="h-screen bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <span className="flex items-center mb-6 text-2xl font-semibold text-white cursor-default">
                    <Logo className="mr-2" />
                    Groovify
                </span>
                <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
                            Sign in to your account
                        </h1>
                        {error && (
                            <div
                                className="flex p-4 mb-4 text-sm rounded-lg bg-gray-800 text-red-400 border-red-800"
                                role="alert"
                            >
                                <svg
                                    aria-hidden="true"
                                    className="flex-shrink-0 inline w-5 h-5 mr-3"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                                <span className="sr-only">Info</span>
                                <div>{error}</div>
                            </div>
                        )}

                        <form
                            className="space-y-4 md:space-y-6"
                            action="#"
                            method="post"
                            onSubmit={handleSubmit}
                        >
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-white"
                                >
                                    Your email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="name@company.com"
                                    required
                                />
                                {fieldErrors.email && (
                                    <span className="text-sm text-red-500">
                                        {fieldErrors.email}
                                    </span>
                                )}
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-white"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                                {fieldErrors.password && (
                                    <span className="text-sm text-red-500">
                                        {fieldErrors.password}
                                    </span>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="w-full text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800"
                            >
                                {loading ? <LoadingDots /> : "Sign in"}
                            </button>
                            <p className="text-sm font-light text-gray-400">
                                Don't have an account yet?{" "}
                                <Link
                                    to="/register"
                                    className="font-medium hover:underline text-primary-500"
                                >
                                    Sign up
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
