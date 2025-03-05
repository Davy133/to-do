import React, { useEffect } from "react";
import api from "../services/api";
import { FaHome, FaTachometerAlt, FaStickyNote, FaFlag, FaCalendarAlt, FaLayerGroup, FaCogs, FaLifeRing } from "react-icons/fa";
import { Sidebar } from "../components";

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
      <div className="flex bg-[#2A2B2F] text-white min-h-screen">
        <Sidebar.Sidebar>
          <Sidebar.SidebarItem icon={<FaHome />} link="/" />
          <Sidebar.SidebarItem icon={<FaTachometerAlt />} link="/dashboard" />
          <Sidebar.SidebarItem icon={<FaStickyNote />} link="/notes" />
          <Sidebar.SidebarItem icon={<FaFlag />} link="/tasks" />
          <Sidebar.SidebarItem icon={<FaCalendarAlt />} link="/calendar" />
          <Sidebar.SidebarItem icon={<FaLayerGroup />} link="/projects" />
          <Sidebar.SidebarItem icon={<FaCogs />} link="/settings" />
          <Sidebar.SidebarItem icon={<FaLifeRing />} link="/support" />
        </Sidebar.Sidebar>

        {/* Main Content Area */}
        <div className="flex-1 p-8">
          <h3 className="text-3xl font-bold">Welcome back, {user} 👋</h3>
          <p className="mt-4 text-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vulputate commodo sapien in faucibus. Duis arcu enim, maximus at lorem vitae, commodo accumsan lectus. Morbi tempor ante sit amet metus maximus tempus. Etiam a mollis elit. Duis viverra malesuada feugiat. Etiam condimentum porttitor magna accumsan faucibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur at varius libero, in ultrices risus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Morbi sodales massa vitae quam ornare, vel molestie nunc condimentum. Proin eu arcu dictum, pharetra eros vitae, iaculis magna.

Sed egestas semper diam, ut fringilla ipsum tristique a. Morbi efficitur vitae lorem a hendrerit. Ut at dictum dui, nec imperdiet eros. Donec a nisi venenatis, tristique justo a, condimentum metus. Sed quis dui at nulla euismod scelerisque in nec dolor. Morbi eget felis tincidunt felis mollis sodales. Proin luctus ut diam nec facilisis. Aenean venenatis pulvinar erat nec vehicula. Nulla eu elit ac ante finibus blandit. Vivamus euismod faucibus ante, ut sodales urna pretium quis. Phasellus leo orci, dignissim sed varius vitae, mattis mattis elit.

Aenean viverra eu massa non finibus. Aenean sodales erat a dui mollis, eget rutrum nulla egestas. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras imperdiet sollicitudin feugiat. Proin et egestas nulla. Fusce non molestie diam. Praesent porta enim sed aliquam lobortis. Praesent volutpat purus sapien, in consequat nisi accumsan a. Duis efficitur nisl vel mi cursus sodales.

Mauris a sagittis velit. Curabitur a ultricies velit. Phasellus laoreet iaculis euismod. Etiam elementum, magna id condimentum viverra, turpis enim laoreet dolor, dictum efficitur nulla justo eu nunc. Vivamus dui mauris, blandit vitae ultrices eget, venenatis scelerisque elit. Ut tristique accumsan faucibus. Pellentesque sollicitudin, elit et iaculis sodales, augue risus iaculis tortor, nec egestas enim massa eu risus.

Nam imperdiet blandit posuere. Sed ornare diam et auctor egestas. Sed quis tortor dolor. Praesent semper enim tellus, ut pellentesque est convallis at. Nulla malesuada, leo quis lobortis auctor, felis lorem placerat nisi, vel suscipit mauris urna quis odio. Maecenas a leo eu ante aliquam malesuada in a nunc. Vestibulum sit amet elit consectetur est convallis sagittis id at erat. Sed egestas, augue et fermentum viverra, turpis neque molestie arcu, ut consectetur sem tellus ac purus. In accumsan nisi nec leo scelerisque, vel venenatis quam tempus. Ut viverra sapien eget odio aliquam lacinia. Donec laoreet mi eget arcu pulvinar fermentum. In ut porttitor orci. Aenean varius ante ac dapibus commodo. Sed placerat nisi sed dapibus placerat. Aliquam id justo justo. Nullam hendrerit mi eget metus aliquam, non rutrum nisi vehicula.</p>
        </div>
      </div>
    </>
  );
};

export default Home;
