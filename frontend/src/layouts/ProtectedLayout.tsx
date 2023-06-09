import { useEffect, useState, createContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "../axios";
import { useAuth } from "../contexts/AuthContext";
import Navigation from "../components/Navigation";
import TopBar from "../components/TopBar";
import { initFlowbite } from "flowbite";
import MusicPlayer from "../components/Music/MusicPlayer";
import { MusicPlayerContext } from "../contexts/MusicPlayerContext";
import { Song } from "../interfaces/SongInterface";
import { StatusMessageInterface } from "../interfaces/StatusMessageInterface";
import { StatusMessageContext } from "../contexts/StatusMessageContext";
import StatusMessage from "../components/StatusMessage";
import MobileNav from "../components/MobileNav";

export default function DefaultLayout() {
    const { user, setUser }: any = useAuth();
    const [song, setSong] = useState<{} | Song>({});
    const [screenWidth, setScreenWidth] = useState(0);
    const [statusMessage, setStatusMessage] = useState<any>({
        type: null,
        message: null,
        className: null,
    });
    const [queue, setQueue] = useState<any>({
        prevQueue: [],
        forwardQueue: [],
        userQueue: [],
    });
    const setSongState = (newSong: Song) => {
        setSong(newSong);
    };
    const setQueueState = (queue: any) => {
        setQueue(queue);
    };
    const updateStatus = (type: string, message: string) => {
        setStatusMessage({
            type: type,
            message: message,
        });
        setTimeout(() => {
            setStatusMessage({
                type: null,
                message: null,
            });
        }, 5000);
    };
    useEffect(() => {
        initFlowbite();
        setScreenWidth(window.innerWidth);

        // check if user is logged in or not from server
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
        } catch (error) {}
    };
    let spacing = "";
    if (Object.keys(song).length > 0) {
        spacing = "pb-32 md:pb-16";
    } else {
        spacing = "pb-16 md:pb-0";
    }
    return (
        <>
            <StatusMessageContext.Provider
                value={{
                    statusMessage: statusMessage,
                    updateStatus: (type, message) =>
                        updateStatus(type, message),
                }}
            >
                <MusicPlayerContext.Provider
                    value={{
                        song: song,
                        queue: queue,
                        setSong: (newSong: Song) => setSongState(newSong),
                        setQueue: (queue) => setQueueState(queue),
                    }}
                >
                    <StatusMessage />
                    <div className="absolute flex h-screen w-screen bg-zinc-900 overflow-hidden">
                        {screenWidth > 768 && <Navigation />}
                        <main
                            className={`relative flex flex-col h-full w-full flex-col text-white ${spacing}`}
                        >
                            <TopBar user={user} logout={handleLogout} />
                            <Outlet />
                            <div
                                className={
                                    screenWidth < 768
                                        ? "fixed w-full bottom-0"
                                        : "absolute w-full bottom-0"
                                }
                            >
                                {Object.keys(song).length > 0 && (
                                    <MusicPlayer />
                                )}
                                {screenWidth < 768 && <MobileNav />}
                            </div>
                        </main>
                    </div>
                </MusicPlayerContext.Provider>
            </StatusMessageContext.Provider>
        </>
    );
}
