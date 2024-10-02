import React, { useState } from "react";
const coordinatesKey = import.meta.env.VITE_coordinatesKey;
const directionKey = import.meta.env.VITE_directionKey;

function Header(){
    const [dropdown, setDropdown] = useState(false);
    const toggleDropdown = () => {
        setDropdown(!dropdown);
    }

    const [result, setResult] = useState();
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let res1 = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${from}&key=${coordinatesKey}`);
            let data1 = await res1.json();
            let lat1 = data1.results[0].geometry.lat;
            let long1 = data1.results[0].geometry.lng;
    
            let res2 = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${to}&key=${coordinatesKey}`);
            let data2 = await res2.json();
            let lat2 = data2.results[0].geometry.lat;
            let long2 = data2.results[0].geometry.lng;
            
            let finalRes = await fetch(`https://api.openrouteservice.org/v2/directions/driving-car?api_key=${directionKey}&start=${[long1,lat1]}&end=${[long2,lat2]}`);
            let finalData = await finalRes.json();
            let distance = (finalData.features[0].properties.summary.distance / 1000).toFixed(2);
            setResult(<span className="text-blue-500 font-bold">{distance} KM</span>);
        } catch (error) {
            setResult(<span className="text-red-500 text-sm">unable to fetch distance</span>);
        }
    }

    return (
        <div className="flex flex-col justify-center items-center sm:gap-4 gap-2 sm:p-4 p-2 bg-[#272727] text-white w-full">
          <div>
              <h1 className="sm:text-3xl text-xl">Enjoy Vacations</h1>
          </div>
          <div>
              <button onClick={toggleDropdown} className="px-2 py-1 bg-blue-800 hover:bg-blue-900 rounded-md sm:text-sm text-[10px]">Find Distance</button>
              {dropdown && (
                <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-2 sm:text-base text-[10px]">
                    <p>From : <input type="text" onChange={(e) => setFrom(e.target.value)} className="bg-transparent border-[1px] border-zinc-400 rounded-lg outline-none px-2 ml-3" placeholder="Enter..."/></p>
                    <p>To : <input type="text" onChange={(e) => setTo(e.target.value)} className="bg-transparent border-[1px] border-zinc-400 rounded-lg outline-none px-2 ml-8" placeholder="Enter..."/></p>
                    <p className="text-sm text-zinc-500">( Enter full address with country name)</p>
                    <button className="px-8 py-1 bg-zinc-600 hover:bg-zinc-700 rounded-lg">Find</button>
                    <div>Result is : {result}</div>
                </form>
              )}
          </div>
        </div>
    )
}

export default Header;