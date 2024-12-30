  import React, { useState } from "react";
  import Header from "../components/header";
  import Sidebar from "../components/sidebar";
  import YouTubeSlider from "../components/slider";
  import YouTubeBody from "../components/YouTubeBody/body";

  const Home = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

    return (
      <div className="flex min-h-screen h-auto">
        <Sidebar isSidebarOpen={isSidebarOpen} />
        <div className="flex flex-col">
          <Header toggleSidebar={toggleSidebar} />
          <div
            className={`flex flex-col transition-all duration-300 ${
              isSidebarOpen ? "ml-64" : "ml-0"
            } pt-16 bg-gray-100`}
          >
            <div className="fixed px-2 top-16 overflow-x-auto scrollbar-hide z-40 w-full">
              <YouTubeSlider />
            </div>
            <div className="mt-24">
              <YouTubeBody />
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default Home;
