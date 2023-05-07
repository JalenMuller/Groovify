import { Link } from "react-router-dom";
import { Album } from "../../interfaces/AlbumInterface";

function AlbumGrid(props: { albums: Album[] }) {
    console.log(props.albums);
    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-2">
                {props.albums.map((album) => (
                    <Link
                        to={`/album/${album.id}`}
                        className="inline-block w-full h-64 p-3 rounded-lg bg-zinc-800 border-gray-700 hover:bg-zinc-700/75"
                    >
                        <img
                            src={
                                "http://localhost:8000/storage/images/covers/" +
                                album.cover
                            }
                            className="mr-3 rounded-lg"
                        />
                        <div className="px-1 my-2">
                            <h2 className="text-lg font-semibold">
                                {album.title}
                            </h2>
                            <p className="text-sm text-gray-300">
                                {album.artist}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
}

export default AlbumGrid;
