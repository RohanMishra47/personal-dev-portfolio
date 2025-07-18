import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav className="bg-white shadow-[0_4px_10px_rgba(128,0,128,0.2)] fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* <NavLink to="/" className="text-xl font-bold text-purple-600">
          MySite
        </NavLink> */}

        {/* Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-600 focus:outline-none"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 text-gray-700 font-medium items-center">
          <NavLink
            to="/home"
            className={({ isActive }) =>
              isActive ? 'text-purple-600 font-semibold' : 'hover:text-purple-600'
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? 'text-purple-600 font-semibold' : 'hover:text-purple-600'
            }
          >
            Contact
          </NavLink>

          {/* Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-1 hover:text-purple-600"
            >
              More
              <ChevronDown size={16} className={`transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
            </button>
            {showDropdown && (
              <ul className="absolute top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg w-40 py-2 z-10">
                <NavLink
                  to="/blog"
                  className="block px-4 py-2 text-gray-700 hover:bg-purple-100 hover:text-purple-700"
                >
                  Blog
                </NavLink>
                <NavLink
                  to="/admin"
                  className="block px-4 py-2 text-gray-700 hover:bg-purple-100 hover:text-purple-700"
                >
                  Dashboard
                </NavLink>
              </ul>
            )}
          </div>
        </ul>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-[300px]' : 'max-h-0'
        }`}
      >
        <ul className="px-4 pb-4 space-y-2 text-gray-700 font-medium bg-white border-t border-gray-200">
          <NavLink to="/" onClick={() => setIsOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/contact" onClick={() => setIsOpen(false)}>
            Contact
          </NavLink>
          <NavLink to="/blog" onClick={() => setIsOpen(false)}>
            Blog
          </NavLink>
          <NavLink to="/admin" onClick={() => setIsOpen(false)}>
            Dashboard
          </NavLink>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;