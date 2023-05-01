import React from "react";

function LoadingDots(props: { className?: string; bg?: string }) {
    let background;
    if (props.bg) {
        background = props.bg;
    } else {
        background = "bg-white ";
    }
    return (
        <div className={`flex items-center flex-col`}>
            <div className="loader-dots block relative w-20 h-5 mt-2">
                <div
                    className={`absolute top-0 mt-1 w-3 h-3 rounded-full ${background}`}
                ></div>
                <div
                    className={`absolute top-0 mt-1 w-3 h-3 rounded-full ${background}`}
                ></div>
                <div
                    className={`absolute top-0 mt-1 w-3 h-3 rounded-full ${background}`}
                ></div>
                <div
                    className={`absolute top-0 mt-1 w-3 h-3 rounded-full ${background}`}
                ></div>
            </div>
        </div>
    );
}

export default LoadingDots;
