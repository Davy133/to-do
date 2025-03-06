import React, { useEffect } from "react";
import api from "../services/api";
import { FaHome, FaUser, FaCog } from "react-icons/fa";
import { Sidebar } from "../components";
import Header from "../components/Header";

const Home: React.FC = () => {
  const [user, setUser] = React.useState<string | null>(null);

  useEffect(() => {
    api.get("/user").then((response) => {
      setUser(response.data.data.name);
    });
  }, []);

  return (
    <>
      {/*TODO: Fix this import issue*/}
      <div className="flex bg-[#1E1F22] text-white min-h-screen">
        <Sidebar.Sidebar>
          <Sidebar.SidebarItem icon={<FaHome />} link="/" />
          <Sidebar.SidebarItem icon={<FaUser />} link="/profile" />
          <Sidebar.SidebarItem icon={<FaCog />} link="/settings" />
          {/* <Sidebar.SidebarItem icon={<FaStickyNote />} link="/notes" />
          <Sidebar.SidebarItem icon={<FaFlag />} link="/tasks" />
          <Sidebar.SidebarItem icon={<FaCalendarAlt />} link="/calendar" />
          <Sidebar.SidebarItem icon={<FaLayerGroup />} link="/projects" />
          <Sidebar.SidebarItem icon={<FaLifeRing />} link="/support" /> */}
        </Sidebar.Sidebar>

        {/* Main Content Area */}
        <div className="flex-1 p-8">
          <Header title={`Bem vindo de volta, ${user ? user.split(' ')[0].charAt(0).toUpperCase() + user.split(' ')[0].slice(1) : ''}👋`} />
        </div>
      </div>
    </>
  );
};

export default Home;
