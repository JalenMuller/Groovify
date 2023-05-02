import { createContext } from "react";
import { Song } from "../interfaces/SongInterface";

export const MusicPlayerContext = createContext({
    song: {},
    setSong: (newSong: Song) => {},
});
