import { GlobeAltIcon } from "@heroicons/react/24/outline";
import {
    HomeIcon,
    MagnifyingGlassIcon,
    MusicalNoteIcon,
} from "@heroicons/react/24/solid";

export const navLinks = [
    // [{ name: "Home", path: "/home" }, <HomeIcon className="h-6" />],
    [
        { name: "Discover", path: "/discover" },
        <GlobeAltIcon className="h-full text-inherit" />,
    ],
    [
        { name: "Search", path: "/search" },
        <MagnifyingGlassIcon className="h-full text-inherit" />,
    ],
    [
        { name: "Library", path: "/library" },
        <MusicalNoteIcon className="h-full text-inherit" />,
    ],
];
