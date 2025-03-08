import React, { useState } from "react";
import { FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";
import { NavLink } from "react-router-dom";

const SidebarItem: React.FC<{ icon: React.ReactNode; link: string }> = ({ icon, link }) => {
  return (
    <NavLink
      to={link}
      className={({ isActive }) =>
        isActive
          ? "w-12 h-12 flex justify-center items-center mb-8 bg-gray-700 text-white rounded-full"
          : "w-12 h-12 flex justify-center items-center mb-8 text-gray-300"
      }
    >
      {icon}
    </NavLink>
  );
};

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hamburger Button (only visible on small screens) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-gray-800 text-white p-3 rounded-md"
      >
        {isOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
      </button>

      {/* Sidebar */}

      {/* Overlay when sidebar is open on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
      <aside
        className={`fixed lg:relative top-0 left-0 h-screen w-64 bg-[#1C1D22] text-white transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:w-20`}
      >
        <nav className="flex flex-col items-center h-full py-5">
          {children}
          <div className="mt-auto mb-8 text-gray-300 cursor-pointer" onClick={logout}>
            <FaSignOutAlt className="w-6 h-6" />
          </div>
        </nav>
      </aside>
    </>
  );
};

export default { Sidebar, SidebarItem };
