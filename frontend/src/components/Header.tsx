import React from "react";
import { FaCalendar } from "react-icons/fa";
import { useAvatar } from "../hooks/useAvatar";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const avatarUrl = useAvatar();

  return (
    <header className="flex flex-col md:flex-row items-center justify-between mb-8 p-2">
      <div className="hidden md:flex flex-col md:flex-row items-center">
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>
      <div
        className="hidden md:flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4"
      >
        <div className="flex items-center text-gray-400">
          <FaCalendar size={16} />
          <span className="ml-2">
            {new Date()
              .toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })
              .replace(/ /g, " ")}
          </span>
        </div>
        <img
          src={
            avatarUrl ||
            "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
          }
          alt="User"
          className="rounded-full w-8 h-8"
        />
      </div>
    </header>
  );
};

export default Header;
