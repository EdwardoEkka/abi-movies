import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { path: "/", label: "Home" },
    { path: "/favorites", label: "Favorites" },
    { path: "/genres", label: "Genres" },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 bg-gray-900 dark:bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo / Title */}
            <div className="flex-shrink-0 text-2xl font-bold text-purple-500 tracking-wide">
              ABI-MOVIES
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex space-x-8">
              {links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-white font-medium transition-colors hover:text-purple-400 ${
                    location.pathname === link.path ? "text-purple-500" : ""
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile Hamburger */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(true)}
                className="text-white focus:outline-none"
              >
                <FaBars size={26} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar & Overlay */}
      <div
        className={`fixed inset-0 z-40 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setIsOpen(false)}
        ></div>

        {/* Sidebar */}
        <div className="relative w-64 bg-gray-900 dark:bg-gray-800 h-full shadow-lg p-6 flex flex-col">
          <button
            onClick={() => setIsOpen(false)}
            className="self-end text-white mb-6"
          >
            <FaTimes size={24} />
          </button>

          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`text-white font-medium text-lg py-2 transition-colors hover:text-purple-400 ${
                location.pathname === link.path ? "text-purple-500" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
