import React from "react";
import { Link } from "react-router-dom";
import { navLinks } from "../data/navLinks";

function MobileNav() {
    return (
        <>
            {/* mobile navbar */}
            <div className="flex md:hidden justify-around items-center w-full h-16 bg-gray-800 z-20 border-r border-gray-700">
                {navLinks.map((link: any) => {
                    // first index contains name/path object
                    // second index contains the icon component
                    let active = false;
                    if (link[0].path == location.pathname) {
                        active = true;
                    }
                    return (
                        <Link to={link[0].path} key={link[0].name}>
                            <button
                                type="button"
                                className="inline-flex flex-col justify-center items-center p-2 rounded cursor-pointer hover:text-white text-gray-400 text-zinc-300"
                            >
                                <div
                                    className={`h-8 ${
                                        active ? "text-blue-500" : "text-white"
                                    }`}
                                >
                                    {link[1]}
                                </div>
                                <span
                                    className={`text-sm font-semibold ${
                                        active && "text-blue-500"
                                    }`}
                                >
                                    {link[0].name}
                                </span>
                            </button>
                        </Link>
                    );
                })}
            </div>
        </>
    );
}

export default MobileNav;
