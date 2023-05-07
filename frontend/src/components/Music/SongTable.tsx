import { ClockIcon } from "@heroicons/react/24/solid";
import { useContext } from "react";
import { Song } from "../../interfaces/SongInterface";
import SongRow from "./SongRow";
import { MusicPlayerContext } from "../../contexts/MusicPlayerContext";

function SongTable(props: {
    songs: Song[];
    tableHead: boolean;
    rowStyle?: string;
}) {
    const context: any = useContext(MusicPlayerContext);
    const songs = props.songs;
    const playSong = (song: Song, i: number) => {
        context.setSong(song);
        let queue = songs.slice(i + 1);
        let prevQueue = songs.slice(0, i);
        context.setQueue({ prevQueue: prevQueue, forwardQueue: queue });
    };
    return (
        <table className="w-full table-fixed text-sm text-left text-gray-400">
            <colgroup>
                <col className="w-[15%] md:w-[5%]" />
                <col style={{ width: "35%" }} />
                <col style={{ width: "25%" }} />
                <col style={{ width: "30%" }} />
                <col style={{ width: "10%" }} />
            </colgroup>
            <thead className="text-xs uppercase text-gray-400 border-b border-zinc-500">
                {props.tableHead && (
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            #
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Title
                        </th>
                        <th
                            scope="col"
                            className="hidden md:table-cell px-6 py-3"
                        >
                            Album
                        </th>
                        <th
                            scope="col"
                            className="hidden md:table-cell px-6 py-3"
                        >
                            Date
                        </th>
                        <th
                            scope="col"
                            className="hidden md:table-cell px-6 py-3"
                        >
                            <ClockIcon className="h-4 mx-auto" />
                        </th>
                    </tr>
                )}
            </thead>
            <tbody>
                {songs?.map((song: Song, i: number) => {
                    return (
                        <SongRow
                            rowStyle={props?.rowStyle}
                            playSong={(song: Song) => playSong(song, i)}
                            song={song}
                            i={i}
                            key={song.id}
                        />
                    );
                })}
            </tbody>
        </table>
    );
}

export default SongTable;
