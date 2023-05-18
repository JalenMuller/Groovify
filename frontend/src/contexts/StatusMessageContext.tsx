import { createContext } from "react";
import { Song } from "../interfaces/SongInterface";
import { StatusMessageInterface } from "../interfaces/StatusMessageInterface";

export const StatusMessageContext = createContext({
    statusMessage: {
        type: null,
        message: null,
        className: null,
    },
    updateStatus: (type: string, message: string, className: string) => {},
});
