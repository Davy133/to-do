import React from "react";
import { FaSignOutAlt } from "react-icons/fa";
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

const Sidebar: React.FC<SidebarProps> = (props) => {
  const { logout } = useAuth();

  return (
    <aside className="w-20 bg-[#1C1D22] h-screen">
      <nav className="text-white flex flex-col items-center h-full py-5">
        {props.children}
        <div className="mt-auto mb-8 text-gray-300 cursor-pointer" onClick={logout}>
          <FaSignOutAlt className="w-6 h-6" />
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
