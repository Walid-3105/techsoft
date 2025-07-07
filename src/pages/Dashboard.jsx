import React, { useState } from "react";
import ChannelPanel from "../components/ChannelPanel";
import FooterPanel from "../components/FooterPanel";
import SliderPanel from "../components/SliderPanel";

const AdminDashboard = () => {
  const [activePanel, setActivePanel] = useState("slider");

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-800 text-white p-6">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <ul className="space-y-4">
          <li>
            <button
              onClick={() => setActivePanel("slider")}
              className={`w-full text-left px-4 py-2 rounded ${
                activePanel === "slider" ? "bg-gray-700" : "hover:bg-gray-700"
              }`}
            >
              Slider
            </button>
          </li>
          <li>
            <button
              onClick={() => setActivePanel("channel")}
              className={`w-full text-left px-4 py-2 rounded ${
                activePanel === "channel" ? "bg-gray-700" : "hover:bg-gray-700"
              }`}
            >
              Channel
            </button>
          </li>
          <li>
            <button
              onClick={() => setActivePanel("footer")}
              className={`w-full text-left px-4 py-2 rounded ${
                activePanel === "footer" ? "bg-gray-700" : "hover:bg-gray-700"
              }`}
            >
              Footer
            </button>
          </li>
        </ul>
      </aside>

      <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
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
