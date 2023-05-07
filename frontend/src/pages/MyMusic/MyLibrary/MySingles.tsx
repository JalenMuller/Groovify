import React, { useEffect, useState } from "react";
import { Song } from "../../../interfaces/SongInterface";
import axios from "../../../axios";

function MySingles() {
    const [loading, setLoading] = useState(false);
    const [songs, setSongs] = useState<Song[]>([]);

    useEffect(() => {
        const fetchMySongs = async () => {
            setLoading(true);
            try {
                const res = await axios.get("/my-singles");
                if (res.status === 200) {
                    setSongs(res.data);
                    console.log(res.data);
                }
            } catch (error: any) {
                console.log(error);
            }
            setLoading(false);
        };
        fetchMySongs();
    }, []);
    return <div>MySingles</div>;
}

export default MySingles;
