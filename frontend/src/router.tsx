import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import ProtectedLayout from "./layouts/ProtectedLayout";
import GuestLayout from "./layouts/GuestLayout";
import MyMusic from "./pages/MyMusic/MyMusic";
import Discover from "./pages/Discover";
import EditAlbum from "./pages/MyMusic/EditAlbum";

const router = createBrowserRouter([
    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                path: "/",
                element: <Login />,
            },
            {
                path: "register",
                element: <Register />,
            },
        ],
    },
    {
        path: "/",
        element: <ProtectedLayout />,
        children: [
            {
                path: "about",
                element: <About />,
            },
            {
                path: "profile",
                element: <Profile />,
            },
            {
                path: "discover",
                element: <Discover />,
            },
            {
                path: "mymusic",
                element: <MyMusic />,
            },
            {
                path: "mymusic/edit-album/:id",
                element: <EditAlbum />,
            },
        ],
    },
]);

export default router;
