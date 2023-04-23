import React from "react";
import { useAuth } from "../contexts/AuthContext";

export default function Profile() {
    const { user }: { user: any } = useAuth();
    return (
        <>
            <div className="text-6xl font-bold ">User Profile</div>
            <hr className="bg-slate-400 h-1 w-full my-4" />
            <div className="block p-10 border shadow-xl rounded-lg shadowdark:border-gray-700">
                <h5 className="my-2 text-2xl font-bold tracking-tight">
                    Name: {user.name}
                </h5>
                <p className="font-normal">Email: {user.email}</p>
                <p className="font-normal">Created At: {user.created_at}</p>
            </div>
        </>
    );
}
