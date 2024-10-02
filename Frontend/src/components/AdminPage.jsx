import React, { useEffect } from "react";

function AdminPage(){

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(!token){
            window.location.href = '/login';
        }
    },[])

    return (
        <div className="bg-zinc-900 w-[100vw] h-[100vh] text-white">
            <div className="p-10 flex justify-between">
                <h1 className="sm:text-3xl text-lg">Hello, Rohit Jadon</h1>
                <button className="bg-red-500 px-4 py-1 sm:text-base text-sm rounded-lg" onClick={() => {
                    localStorage.removeItem('token');
                    window.location.href = '/';
                }}>Logout</button>
            </div>
            <div className="p-10">
                <a href="/addPlace" className="px-4 py-1 bg-blue-500 rounded-lg">add new Place</a>
            </div>
        </div>
    )
}

export default AdminPage;