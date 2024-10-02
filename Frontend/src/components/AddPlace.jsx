import React, { useState } from "react";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

function AddPlace() {
  const [formData, setFormData] = useState({title1: '',title2: '',img1: '',img2: '',img3: '',content: '',category: ''});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      alert("No token found. Please login first.");
      window.location.href = '/login';
    }

    fetch(`${backendUrl}/api/places/addPlace`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': token  // Include the token here
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
      if (data.message) {
        alert('Error: ' + data.message);
      } else {
        alert('Place added successfully');
        window.location.href = "/addPlace";
      }
    })
  };

  return (
    <div className="bg-zinc-900 w-[100vw] h-[100vh]">
      <div className="p-10">
        <a href="/admin" className="px-4 py-1 rounded-lg bg-slate-600 text-white">Back</a>
        <h1 className="text-3xl text-white mb-10 mt-2">Add new Place</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:w-1/2 w-3/4 text-white">
          <input name="title1" value={formData.title1} onChange={handleChange} placeholder="place name" required className="p-2 rounded bg-transparent border-2 border-zinc-600 outline-none" />
          <input name="title2" value={formData.title2} onChange={handleChange} placeholder="address of place" required className="p-2 rounded bg-transparent border-2 border-zinc-600 outline-none" />
          <input name="img1" value={formData.img1} onChange={handleChange} placeholder="Image URL 1" required className="p-2 rounded bg-transparent border-2 border-zinc-600 outline-none" />
          <input name="img2" value={formData.img2} onChange={handleChange} placeholder="Image URL 2" className="p-2 rounded bg-transparent border-2 border-zinc-600 outline-none" />
          <input name="img3" value={formData.img3} onChange={handleChange} placeholder="Image URL 3" className="p-2 rounded bg-transparent border-2 border-zinc-600 outline-none" />
          <textarea name="content" value={formData.content} onChange={handleChange} placeholder="Content..." required className="p-2 rounded bg-transparent border-2 border-zinc-600 outline-none resize-none" />
          <input name="category" value={formData.category} onChange={handleChange} placeholder="category" required className="p-2 rounded bg-transparent border-2 border-zinc-600 outline-none" />
          <button type="submit" className="p-2 bg-zinc-600 rounded text-white hover:bg-zinc-700">Add Place</button>
        </form>
      </div>
    </div>
  );
}

export default AddPlace;