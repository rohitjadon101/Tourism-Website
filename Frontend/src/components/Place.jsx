import React, { useEffect, useRef, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

function Place(){

    // Functionality for dropdown menu
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    // Image Scroll Functionality
    const imgDivRefs = useRef([]);  //it is defined as an array to store the references of each place
    const prevScroll = (index) => {
        if (imgDivRefs.current[index]) {
            imgDivRefs.current[index].scrollBy({ left: -300, behavior: 'smooth' });
        }
    };
    const nextScroll = (index) => {
        if (imgDivRefs.current[index]) {
            imgDivRefs.current[index].scrollBy({ left: 300, behavior: 'smooth' });
        }
    };


    // Data Fetching from Backend
    const [places, setPlaces] = useState([]);

    // On Startup (by default)
    useEffect(() => {
        fetch(`${backendUrl}/api/places`)
        .then((res) => res.json())
        .then((data) => setPlaces(data))
        .catch((error) => console.error("Error fetching data:", error));
    }, []);

    // For all places
    const solveAll = () => {
        fetch(`${backendUrl}/api/places`)
        .then((res) => res.json())
        .then((data) => setPlaces(data))
        .catch((error) => console.error("Error fetching data:", error));
    }

    // For categories
    const [category, setCategory] = useState("");
    const solve = (e) => {
      setCategory(e.target.innerText);
    }

    useEffect(() => {
      if (category) {
        fetch(`${backendUrl}/api/places/${category}`)
          .then((res) => res.json())
          .then((data) => setPlaces(data))
          .catch((error) => console.error("Error fetching data:", error));
      }
    }, [category]);

    return (
    <>
      <div className="flex p-4 bg-[#363535] text-white w-full sm:text-base text-sm">
        <div className="flex items-center sm:gap-4 gap-2 overflow-x-scroll md:overflow-hidden">
          <div>
            <p onClick={toggleDropdown} className="cursor-pointer mr-2"><RxHamburgerMenu /></p>
            {dropdownOpen && (
              <div className="absolute bg-[#363535] text-white p-4 mt-2 rounded shadow-lg flex flex-col gap-2">
                <p className="hover:text-zinc-500 hover:cursor-pointer" onClick={solve}>Wildlife Sanctuaries</p>
                <p className="hover:text-zinc-500 hover:cursor-pointer" onClick={solve}>Forest</p>
                <p className="hover:text-zinc-500 hover:cursor-pointer" onClick={solve}>Mountains</p>
                <p className="hover:text-zinc-500 hover:cursor-pointer" onClick={solve}>South Places</p>
              </div>
            )}
          </div>
          <p className="hover:text-zinc-500 hover:cursor-pointer" onClick={solveAll}>All</p>
          <p className="hover:text-zinc-500 hover:cursor-pointer" onClick={solve}>Temple</p>
          <p className="hover:text-zinc-500 hover:cursor-pointer" onClick={solve}>Fort</p>
          <p className="hover:text-zinc-500 hover:cursor-pointer" onClick={solve}>National Parks</p>
        </div>
      </div>


      <div className="bg-[rgb(36,34,34)] flex justify-center items-center -z-1">
      <div className="w-4/5 min-h-screen p-5 flex flex-col gap-20 text-[#c6b8b8] bg-[rgb(36,34,34)]">
        {places.length > 0 ? (
          places.map((p, index) => (
            <div key={p._id}>
              <section className="flex flex-col justify-center items-center sm:gap-2 gap-1 pb-2">
                <p className="sm:text-2xl text-lg font-bold">{p.title1}</p>
                <p className="sm:text-lg font-semibold">{p.title2}</p>
                <div className="flex justify-center items-center pt-4 pb-2 flex-shrink">
                  <div className="text-2xl">
                    <p onClick={() => prevScroll(index)}><FaAngleLeft /></p>
                  </div>
                  <div ref={(i) => (imgDivRefs.current[index] = i)} className="flex rounded-lg sm:w-[300px] sm:h-[300px] w-[200px] h-[200px] overflow-hidden" id="imgDiv">
                    <img src={p.img1} alt="Image1" className="w-full h-full object-cover" />
                    <img src={p.img2} alt="Image2" className="w-full h-full object-cover" />
                    <img src={p.img3} alt="Image3" className="w-full h-full object-cover" />
                  </div>
                  <div className="text-2xl">
                    <p onClick={() => nextScroll(index)}><FaAngleRight /></p>
                  </div>
                </div>
                <div className="sm:p-8 sm:text-lg text-sm">{p.content}</div>
                <div className=""><button className="px-4 py-1 bg-zinc-700 hover:bg-zinc-800 rounded-lg text-gray-400">Hindi</button></div>
              </section>
              <div className="h-[2px] bg-[gray] w-full"></div>
            </div>
          ))
        ) : (
          <div>
            <p>No places found.</p>
          </div>
        )}
      </div>
    </div>
    </>
  );
}

export default Place;