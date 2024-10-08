import { useState } from 'react';
import { FaUser } from "react-icons/fa";
import LoginForm from './LoginForm';

function Header({ isLoggedIn, loggedInUser, setIsLoggedIn, setShowLogin }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false); // Logout
      setDropdownOpen(false);
    } else {
      setShowLogin(true); // Tampilkan form login jika belum login
      setDropdownOpen(false);
    }
  };

  return (
    <header className="bg-main-color p-4">
      <nav className="flex justify-end items-center">
        <div className="relative flex items-center space-x-2">
          <FaUser 
            alt="User Icon"
            className="w-10 h-10 rounded-full border-2 p-1 border-[#c22e2e] cursor-pointer text-[#c22e2e]"
            onClick={toggleDropdown}
          />
          {isLoggedIn && (
            <span
              className="ml-2 text-lg font-semibold text-[#c22e2e] max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap"
              title={loggedInUser} // Tooltip untuk menampilkan nama lengkap jika terpotong
            >
              {loggedInUser}
            </span>
          )}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2" style={{ transform: 'translateY(60px)' }}>
              <a
                href="#"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                onClick={handleLoginLogout}
              >
                {isLoggedIn ? 'Log Out' : 'Log In'}
              </a>
            </div>
          )}
        </div>
      </nav>
      <br /><hr className="ml-auto" />
    </header>

  );
}

export default Header;
