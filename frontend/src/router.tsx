import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import ProtectedLayout from "./layouts/ProtectedLayout";
import GuestLayout from "./layouts/GuestLayout";
import MyMusic from "./pages/MyMusic/MyMusic";
import Discover from "./pages/Discover/Discover";
import EditAlbum from "./pages/MyMusic/UploadMusic/EditAlbum";
import ViewAlbum from "./components/Music/ViewAlbum";
import Search from "./pages/Search";

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
                path: "search",
                element: <Search />,
            },
            {
                path: "dashboard/mymusic/:tab?",
                element: <MyMusic />,
            },
            {
                path: "album/:id",
                element: <ViewAlbum />,
            },
            {
                path: "dashboard/mymusic/edit-album/:id",
                element: <EditAlbum />,
            },
        ],
    },
]);

export default router;
