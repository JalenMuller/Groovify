import { ClockIcon, EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import { useContext } from "react";
import { Song } from "../../interfaces/SongInterface";
import SongRow from "./SongRow";
import { MusicPlayerContext } from "../../contexts/MusicPlayerContext";
import LoadingSpinner from "../LoadingSpinner";

function SongTable(props: {
    songs: Song[];
    tableHead: boolean;
    rowStyle?: string;
    hiddenColumns?: string[];
}) {
    const context: any = useContext(MusicPlayerContext);
    const songs = props.songs;
    const playSong = (song: Song, i: number) => {
        context.setSong(song);
        let queue = songs.slice(i + 1);
        let prevQueue = songs.slice(0, i);
        context.setQueue({
            ...context.queue,
            prevQueue: prevQueue,
            forwardQueue: queue,
        });
    };
    console.log(props.hiddenColumns?.includes("album"));
    return (
        <>
            <table className="w-full text-sm text-left text-gray-400">
                <colgroup>
                    <col className="w-10" />
                    <col className="w-auto" />
                    <col className="w-auto" />
                    <col className="w-auto" />
                    <col className="w-auto" />
                    <col className="w-4 mr-auto" />
                </colgroup>
                <thead className="text-xs uppercase text-gray-400 border-b border-zinc-500">
                    {props.tableHead && (
                        <tr>
                            {!props.hiddenColumns?.includes("index") && (
                                <th
                                    scope="col"
                                    className="mx-auto px-2 text-center py-3"
                                >
                                    #
                                </th>
                            )}
                            <th scope="col" className="px-6 py-3">
                                Title
                            </th>
                            {!props.hiddenColumns?.includes("album") && (
                                <th
                                    scope="col"
                                    className="hidden md:table-cell px-6 py-3"
                                >
                                    Album
                                </th>
                            )}
                            {!props.hiddenColumns?.includes("date") && (
                                <th
                                    scope="col"
                                    className="hidden md:table-cell px-6 py-3"
                                >
                                    Date
                                </th>
                            )}
                            {!props.hiddenColumns?.includes("length") && (
                                <th
                                    scope="col"
                                    className="hidden md:table-cell px-6 py-3"
                                >
                                    <ClockIcon className="h-4 ml-auto" />
                                </th>
                            )}
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
                                hiddenColumns={props?.hiddenColumns ?? []}
                            />
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}

export default SongTable;
