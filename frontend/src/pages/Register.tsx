import React from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "../axios";
import { useAuth } from "../contexts/AuthContext";
import { getFieldErrors } from "../functions/generalFunctions";
import LoadingDots from "../components/LoadingDots";

interface FormFields {
    name: null | string;
    email: null | string;
    password: null | string;
}

export default function Register() {
    const { setUser } = useAuth();
    const [error, setError] = React.useState(null);
    const [requestLoading, setRequestLoading] = React.useState(false);
    const [fieldErrors, setFieldErrors] = React.useState({
        name: null,
        email: null,
        password: null,
    });
    // register user
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setRequestLoading(true);
        const { name, email, password, cpassword } = e.target.elements;
        const body = {
            name: name.value,
            email: email.value,
            password: password.value,
            password_confirmation: cpassword.value,
        };
        try {
            const resp = await axios.post("/register", body);
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
        setRequestLoading(false);
    };

    return (
        <section className="bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
                <div className="w-full max-h-full rounded-lg max-w-lg p-4 shadow border bg-gray-800 border-gray-700">
                    <h1 className="text-2xl font-bold leading-tight tracking-tight md:text-2xl text-white mb-4">
                        Sign Up
                    </h1>
                    <form
                        className="space-y-2"
                        action="#"
                        method="post"
                        onSubmit={handleSubmit}
                    >
                        <div>
                            <label
                                htmlFor="name"
                                className="block mb-2 text-sm font-medium text-white"
                            >
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter your full name"
                                // required
                            />
                            {fieldErrors.name && (
                                <p className="text-sm text-red-600">
                                    {fieldErrors.name}
                                </p>
                            )}
                        </div>
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
                                placeholder="Enter your email"
                                // required
                            />
                            {fieldErrors.email && (
                                <p className="text-sm text-red-600">
                                    {fieldErrors.email}
                                </p>
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
                                placeholder="Create a password"
                                className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                                // required
                            />
                            {fieldErrors.password && (
                                <p className="text-sm text-red-600">
                                    {fieldErrors.password}
                                </p>
                            )}
                        </div>
                        <div>
                            <label
                                htmlFor="cpassword"
                                className="block mb-2 text-sm font-medium text-white"
                            >
                                Confirm password
                            </label>
                            <input
                                type="password"
                                name="cpassword"
                                id="cpassword"
                                placeholder=""
                                className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                                // required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full text-white !mt-3 mb-auto focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800"
                        >
                            {requestLoading ? <LoadingDots /> : "Register"}
                        </button>
                        <p className="text-sm font-light text-gray-400">
                            Already have an account?{" "}
                            <Link
                                to="/"
                                className="font-medium hover:underline text-primary-500"
                            >
                                Login here
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </section>
    );
}
