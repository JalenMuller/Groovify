import { createContext } from "react";
import { Song } from "../interfaces/SongInterface";

export const MusicPlayerContext = createContext({
    song: {},
    queue: { prevQueue: {}, queue: {} },
    setSong: (newSong: Song) => {},
    setQueue: (queue: Song[]) => {},
});
