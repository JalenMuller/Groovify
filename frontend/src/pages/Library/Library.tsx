import React from "react";
import PageHeader from "../../components/PageHeader";
import { Link } from "react-router-dom";
import { MusicalNoteIcon } from "@heroicons/react/24/solid";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import PlaylistGrid from "./PlaylistGrid";

function Library() {
    const fetchMyPlaylists = () => {};
    return (
        <div
            className="w-full h-full pt-14 flex-col p-2 overflow-y-auto"
            id="scrollable"
        >
            <div className="mx-4">
                <PageHeader
                    title="My Library"
                    // bodyText="Discover the latest music shared on Groovify."
                />
                <h1 className="text-2xl font-semibold mt-8 mb-5">
                    My playlists
                </h1>
            </div>
            <PlaylistGrid />
        </div>
    );
}

export default Library;
