import { createContext } from "react";
import { Song } from "../interfaces/SongInterface";
import { SongObject } from "../data/SongObject";
export const MusicPlayerContext = createContext({
    song: {},
    setSong: (newSong: Song) => {},
});
