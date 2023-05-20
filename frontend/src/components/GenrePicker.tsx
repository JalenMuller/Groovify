import { useEffect, useState } from "react";
import axios from "../axios";

interface Genre {
    id: number;
    name: string;
}

function GenrePicker() {
    const [genres, setGenres] = useState<null | Genre[]>(null);

    const fetchGenres = async () => {
        try {
            const res = await axios.get("/genres");
            if (res.status === 200) {
                setGenres(res.data);
            }
        } catch (error: any) {
        }
    };
    useEffect(() => {
        fetchGenres();
    }, []);

    return (
        <>
            <label
                htmlFor="genre"
                className="block mb-2 text-sm font-medium text-white"
            >
                Genre
            </label>
            <select
                name="genre"
                id="genre"
                className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
                // required
            >
                <option value="" defaultChecked>
                    Choose a genre
                </option>
                {genres?.map((genre) => (
                    <option value={genre.id} key={genre.id}>
                        {genre.name}
                    </option>
                ))}
            </select>
        </>
    );
}

export default GenrePicker;
