import React from "react";
import { Logo } from "../assets/Icons";
import { Link } from "react-router-dom";

function Home() {
    return (
        <section id="home" className="h-screen w-screen bg-gray-900">
            <div className="z-50 flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <span className="flex items-center mb-3 text-4xl font-semibold text-white cursor-default">
                    <Logo className="mr-2" />
                    Groovify
                </span>
                <div className="w-full max-w-md my-3 text-lg font-semibold text-white text-center">
                    Listen to tracks, build playlists and discover new music. Or
                    share your own music. All for free.
                </div>
                <div className="flex items-center font-semibold text-white justify-around w-full max-w-xs mt-3">
                    <Link to="/login" className="w-1/3">
                        <button className="w-full border-2 bg-zinc-900/75 hover:bg-zinc-900 shadow px-4 py-1.5 rounded-md transition">
                            Login
                        </button>
                    </Link>
                    <Link to="/register" className="w-1/3">
                        <button className="w-full border-2 bg-zinc-900/75 hover:bg-zinc-900 shadow px-4 py-1.5 rounded-md transition">
                            Register
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default Home;
