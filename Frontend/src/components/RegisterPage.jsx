import React, { useState } from "react";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

function RegisterPage(){

    const [formdata, setFormdata] = useState({
        name: '',
        email: '',
        password: ''
    });
    const handleChange = (e) => {
        setFormdata({...formdata, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch(`${backendUrl}/api/places/register`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formdata)
        }).then((res) => {
            if(res.ok){
                alert("Admin Registered Successfully");
            }else{
                alert("Error in Admin Registration");
            }
        }).catch((err) => console.error("Error in fetching", err));
    };

    return (
        <div className="w-[100vw] h-[100vh] bg-zinc-900 text-white">
            <div className="p-10">
                <h1 className="text-2xl mb-5">Admin Register</h1>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-5 w-1/3">
                        <input type="text" name="name" value={formdata.name} onChange={handleChange} placeholder="Full name" className="px-4 py-1 bg-transparent border-2 border-zinc-600 rounded-md outline-none"/>
                        <input type="email" name="email" value={formdata.email} onChange={handleChange} placeholder="Email" className="px-4 py-1 bg-transparent border-2 border-zinc-600 rounded-md outline-none"/>
                        <input type="password" name="password" value={formdata.password} onChange={handleChange} placeholder="Password" className="px-4 py-1 bg-transparent border-2 border-zinc-600 rounded-md outline-none"/>
                        <div className="w-full flex gap-10">
                            <button className="px-4 py-1 bg-blue-500 rounded-md hover:bg-blue-700">Register</button>
                            <a href="/" className="px-4 py-1 bg-zinc-500 rounded-md hover:bg-zinc-700">Back</a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage;