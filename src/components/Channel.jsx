import React, { useEffect, useState } from "react";
import axios from "axios";

const Channel = () => {
  const [channels, setChannels] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [collapsed, setCollapsed] = useState({});

  useEffect(() => {
    axios
      .get("https://news-server-lyart.vercel.app/api/channels")
      .then((res) => {
        const grouped = res.data.reduce((acc, channel) => {
          const category = channel.category || "Uncategorized";
          if (!acc[category]) acc[category] = [];
          acc[category].push(channel);
          return acc;
        }, {});
        setChannels(grouped);

        const initialCollapseState = Object.keys(grouped).reduce((acc, cat) => {
          acc[cat] = true;
          return acc;
        }, {});
        setCollapsed(initialCollapseState);

        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError("Failed to load channels");
        setLoading(false);
      });
  }, []);

  const toggleCollapse = (category) => {
    setCollapsed((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  if (loading)
    return <div className="text-center py-10">Loading channels...</div>;
  if (error)
    return <div className="text-center py-10 text-red-500">{error}</div>;
  if (Object.keys(channels).length === 0)
    return <div className="text-center py-10">No channels available</div>;

  return (
    <div className="w-full  mx-auto p-5">
      {Object.keys(channels).map((category) => (
        <div key={category} className="mb-5 border border-gray-300 rounded-lg">
          <div
            onClick={() => toggleCollapse(category)}
            className="flex justify-between items-center bg-gray-200 p-4 cursor-pointer rounded-t-lg select-none"
          >
            <h3 className="text-lg font-semibold m-0">{category}</h3>
            <span className="text-xl">{collapsed[category] ? "▼" : "▲"}</span>
          </div>

          {!collapsed[category] && (
            <div className="p-4 flex flex-wrap gap-4">
              {channels[category].map((channel) => (
                <div
                  key={channel._id}
                  className="w-[173px] h-[175px] text-center border rounded-md border-blue-400"
                >
                  <img
                    src={channel.imageUrl}
                    alt={channel.name || "No Name"}
                    className="w-full h-full object-cover rounded-md mb-1"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Channel;
