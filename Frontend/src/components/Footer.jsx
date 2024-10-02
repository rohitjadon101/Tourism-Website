import React from "react";

function Footer() {

    return (
      <div className="bg-[#272727] text-white sm:p-4 p-2 sm:text-base text-[8px] flex justify-between items-center">
        <div>
          <p>All Rights Reserved 2024</p>
        </div>
        <div className="flex sm:gap-3 gap-1.5">
          <p>Facebook</p>
          <p>GMAIL</p>
          <p>Instagram</p>
          <p>Twitter</p>
        </div>
        <div>
          <a href="/login" className="text-blue-500 cursor-pointer hover:text-blue-800">Admin Login</a>
        </div>
      </div>
    )
  }
  
  export default Footer;