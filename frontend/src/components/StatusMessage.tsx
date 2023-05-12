import { useState } from "react";
import { createPortal } from "react-dom";
import {
    CheckIcon,
    ExclamationTriangleIcon,
    TrashIcon,
    InformationCircleIcon,
} from "@heroicons/react/24/solid";
function StatusMessage(props: {
    type: "error" | "success" | "deletion" | "info";
    message: string;
    className?: string;
}) {
    const [hidden, setHidden] = useState(false);
    const returnIcon = (type: string) => {
        switch (type) {
            case "error":
                return <ExclamationTriangleIcon />;

            case "success":
                return <CheckIcon />;

            case "deletion":
                return <TrashIcon />;

            case "info":
                return <InformationCircleIcon />;
            default:
                return "";
        }
    };
    const typeProperties = {
        error: { background: "bg-red-800", icon: <ExclamationTriangleIcon /> },
        success: { background: "bg-green-800", icon: <CheckIcon /> },
        deletion: { background: "bg-red-800", icon: <TrashIcon /> },
        info: { background: "bg-gray-700", icon: <InformationCircleIcon /> },
    };

    return (
        <>
            {createPortal(
                <div
                    className={`${
                        hidden && "hidden"
                    } flex items-center w-full max-w-xs p-4 mb-4 rounded-lg shadow text-gray-400 bg-gray-800 border border-zinc-500 ${
                        props?.className
                    }`}
                    role="alert"
                >
                    <div
                        className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 p-1 rounded-lg ${
                            typeProperties[props.type].background
                        } text-green-200`}
                    >
                        {typeProperties[props.type].icon}
                        <span className="sr-only">Check icon</span>
                    </div>
                    <div className="ml-3 text-sm font-normal">
                        {props.message}
                    </div>
                    <button
                        type="button"
                        className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                        onClick={() => setHidden(true)}
                        aria-label="Close"
                    >
                        <span className="sr-only">Close</span>
                        <svg
                            aria-hidden="true"
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </button>
                </div>,
                document.body
            )}
        </>
    );
}

export default StatusMessage;
