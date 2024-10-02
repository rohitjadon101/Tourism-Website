import React, { useState } from "react";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

function LoginPage(){

    const [formdata, setFormData] = useState({email: '',password: ''});

    const handleChange = (e) => {
      setFormData({...formdata, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
          const res = await fetch(`${backendUrl}/api/places/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formdata)
          })
          const data = await res.json();
          
          if(data.token){
            localStorage.setItem('token', data.token);
            alert("login Successfully");
            window.location.href = '/admin';
          }
          else{
            alert(data.message);
          }
        } catch (error) {
          alert("Error in login");
        }
    };

    return (
        <div className="h-[100vh] bg-zinc-900 flex justify-center items-center">
            <div className="sm:w-1/3 h-1/2 border-2 border-zinc-600 rounded-lg overflow-hidden flex justify-center items-center">
                <form onSubmit={handleSubmit} className="flex flex-col p-4 text-white w-full">
                    <input type="email" name="email" value={formdata.email} onChange={handleChange} placeholder="email" className="px-4 py-2 bg-zinc-800 rounded-lg outline-none"/>
                    <input type="password" name="password" value={formdata.password} onChange={handleChange} placeholder="password" className="px-4 py-2 bg-zinc-800 rounded-lg outline-none mt-2"/>
                    <div className="flex gap-4 mt-10">
                        <button className="px-4 py-1 bg-blue-600 rounded-lg">Login</button>
                        <a href="/" className="px-4 py-1 bg-zinc-600 rounded-lg">Back</a>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage;