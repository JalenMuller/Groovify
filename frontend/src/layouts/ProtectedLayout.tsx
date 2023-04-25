import { useEffect, useState, createContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "../axios";
import { useAuth } from "../contexts/AuthContext";
import Navigation from "../components/Navigation";
import ProfileDropdown from "../components/ProfileDropdown";
import { initFlowbite } from "flowbite";
import MusicPlayer from "../components/MusicPlayer";
import { MusicPlayerContext } from "../contexts/MusicPlayerContext";
import { Song } from "../interfaces/SongInterface";

export default function DefaultLayout() {
    const { user, setUser }: any = useAuth();
    const [song, setSong] = useState({});

    const setState = (newSong: Song) => {
        setSong(newSong);
    };
    // check if user is logged in or not from server
    useEffect(() => {
        initFlowbite();
        (async () => {
            try {
                const resp = await axios.get("/user");
                if (resp.status === 200) {
                    setUser(resp.data.data);
                }
            } catch (error: any) {
                if (error.response.status === 401) {
                    localStorage.removeItem("user");
                    window.location.href = "/";
                }
            }
        })();
    }, []);

    // if user is not logged in, redirect to login page
    if (!user) {
        return <Navigate to="/" />;
    }

    // logout user
    const handleLogout = async () => {
        try {
            const resp = await axios.post("/logout");
            if (resp.status === 200) {
                localStorage.removeItem("user");
                window.location.href = "/";
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <MusicPlayerContext.Provider
                value={{
                    song: song,
                    setSong: (newSong: Song) => setState(newSong),
                }}
            >
                <div className="flex h-screen w-screen bg-zinc-900 overflow-hidden">
                    <Navigation />
                    <main className="flex flex-col h-full w-full pb-16 md:pb-0 flex-col text-white">
                        {/* <div className="h-12 bg-transparent" id="topbar-spacer" /> */}
                        <ProfileDropdown
                            name={user.name}
                            logout={handleLogout}
                        />
                        <Outlet />
                        <MusicPlayer />
                    </main>
                </div>
            </MusicPlayerContext.Provider>
        </>
    );
}
