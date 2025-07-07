import React, { useState } from "react";
import ChannelPanel from "../components/ChannelPanel";
import FooterPanel from "../components/FooterPanel";
import SliderPanel from "../components/SliderPanel";
import { IoMenu } from "react-icons/io5";

const AdminDashboard = () => {
  const [activePanel, setActivePanel] = useState("slider");
  const [showSidebar, setShowSidebar] = useState(false); // for mobile toggle

  return (
    <div className="md:flex h-screen">
      {/* Mobile menu toggle */}
      <div className="md:hidden bg-gray-800 text-white flex items-center justify-between px-4 py-3">
        <h2 className="text-xl font-bold">Admin Panel</h2>
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className="text-white"
        >
          <IoMenu size={24} />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`bg-gray-800 text-white w-full md:w-64 p-6 space-y-4 transition-all duration-300 ease-in-out ${
          showSidebar ? "block" : "hidden"
        } md:block`}
      >
        <h2 className="text-xl font-bold mb-6 hidden md:block">Admin Panel</h2>
        <ul className="space-y-4">
          <li>
            <button
              onClick={() => {
                setActivePanel("slider");
                setShowSidebar(false);
              }}
              className={`w-full text-left px-4 py-2 rounded ${
                activePanel === "slider" ? "bg-gray-700" : "hover:bg-gray-700"
              }`}
            >
              Slider
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                setActivePanel("channel");
                setShowSidebar(false);
              }}
              className={`w-full text-left px-4 py-2 rounded ${
                activePanel === "channel" ? "bg-gray-700" : "hover:bg-gray-700"
              }`}
            >
              Channel
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                setActivePanel("footer");
                setShowSidebar(false);
              }}
              className={`w-full text-left px-4 py-2 rounded ${
                activePanel === "footer" ? "bg-gray-700" : "hover:bg-gray-700"
              }`}
            >
              Footer
            </button>
          </li>
        </ul>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-4 md:p-6 bg-gray-100 overflow-y-scroll max-h-full">
        {activePanel === "slider" && (
          <section className="bg-white rounded-xl shadow p-4">
            <h3 className="text-lg font-semibold mb-2">🎞️ Slider</h3>
            <SliderPanel />
          </section>
        )}
        {activePanel === "channel" && (
          <section className="bg-white rounded-xl shadow p-4">
            <h3 className="text-lg font-semibold mb-2">📺 Channel</h3>
            <ChannelPanel />
          </section>
        )}
        {activePanel === "footer" && (
          <section className="bg-white rounded-xl shadow p-4">
            <h3 className="text-lg font-semibold mb-2">🔗 Footer</h3>
            <FooterPanel />
          </section>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
