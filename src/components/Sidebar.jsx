import React, { useState } from 'react';
import { FaHome } from 'react-icons/fa';  // Importing the icons
import { RiFilePaper2Fill, RiDiscussFill } from 'react-icons/ri';
import logoWecare from '../assets/logoWecare.png';

const Sidebar = () => {
  // State to toggle sidebar
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle sidebar
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`fixed top-0 h-full ${isOpen ? 'w-64' : 'w-20'} bg-[#FFB1B1] transition-all duration-300 shadow-lg rounded-r-3xl`}>
      {/* Sidebar Logo */}
      <div className="relative flex flex-col items-start py-4 ps-4">
        <img
          src={logoWecare}
          className="w-12 h-12 cursor-pointer"
          onClick={toggleSidebar}
          alt="WeCare Logo"
        />
        {/* WeCare Text: Shown only when sidebar is open */}
        {isOpen && <h1 className="absolute left-16 top-5 text-3xl font-bold text-[#c22e2e] transition-opacity duration-300 ps-3">WeCare</h1>}
      </div>

      {/* Sidebar Menu */}
      <ul className="mt-10 space-y-4">
        {/* Home Icon and Text */}
        <li className="relative flex items-center py-8 ps-5 hover:bg-[#921A4033] border-l-4 border-transparent hover:border-[#921A40] transition-all duration-300 cursor-pointer">
          <FaHome className="text-[#c22e2e] text-2xl" />
          {/* Home Text: Shown only when sidebar is open */}
          {isOpen && <span className="absolute left-20 text-xl  text-[#c22e2e] transition-opacity duration-300">Home</span>}
        </li>
        {/* Test Icon and Text */}
        <li className="relative flex items-center py-8 ps-5 hover:bg-[#921A4033] border-l-4 border-transparent hover:border-[#921A40] transition-all duration-300cursor-pointer">
          <RiFilePaper2Fill className="text-[#c22e2e] text-2xl" />
          {/* Test Text: Shown only when sidebar is open */}
          {isOpen && <span className="absolute left-20 text-xl text-[#c22e2e] transition-opacity duration-300">Test</span>}
        </li>
        {/* Komunitas Icon and Text */}
        <li className="relative flex items-center py-8 ps-5 hover:bg-[#921A4033] border-l-4 border-transparent hover:border-[#921A40] transition-all duration-300 cursor-pointer">
          <RiDiscussFill className="text-[#c22e2e] text-2xl" />
          {/* Komunitas Text: Shown only when sidebar is open */}
          {isOpen && <span className="absolute left-20 text-xl text-[#c22e2e] transition-opacity duration-300">Komunitas</span>}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
