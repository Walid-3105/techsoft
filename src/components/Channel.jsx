import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";

const Channel = () => {
  const [channelData, setChannelData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [collapsed, setCollapsed] = useState({});

  useEffect(() => {
    axios
      .get("https://news-server-lyart.vercel.app/api/channels")
      .then((res) => {
        setChannelData(res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError("Failed to load channels");
        setLoading(false);
      });
  }, []);

  const groupedChannels = useMemo(() => {
    const grouped = channelData.reduce((acc, channel) => {
      const category = channel.category || "Uncategorized";
      if (!acc[category]) acc[category] = [];
      acc[category].push(channel);
      return acc;
    }, {});

    const initialCollapseState = Object.keys(grouped).reduce((acc, cat) => {
      acc[cat] = true;
      return acc;
    }, {});
    setCollapsed((prev) =>
      Object.keys(prev).length ? prev : initialCollapseState
    );

    return grouped;
  }, [channelData]);

  const toggleCollapse = (category) => {
    setCollapsed((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-[300px]">
        <div className="w-12 h-12 border-4 border-green-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );

  if (error)
    return <div className="text-center py-10 text-red-500">{error}</div>;

  if (Object.keys(groupedChannels).length === 0)
    return <div className="text-center py-10">No channels available</div>;

  return (
    <div className="w-full mx-auto p-5">
      {Object.keys(groupedChannels).map((category) => (
        <div key={category} className="mb-5 border border-green-500 rounded-lg">
          <div
            onClick={() => toggleCollapse(category)}
            className="flex justify-between items-center p-3 cursor-pointer rounded-t-lg select-none border-b border-green-200"
          >
            <h3 className="text-lg text-green-600 font-bold m-0">{category}</h3>
            <span className="text-xl text-green-600">
              {collapsed[category] ? "▼" : "▲"}
            </span>
          </div>

          {!collapsed[category] && (
            <div className="p-4 flex flex-wrap gap-4">
              {groupedChannels[category].map((channel) => (
                <div
                  key={channel._id}
                  className="w-[173px] h-[175px] text-center border rounded-xl shadow-2xl border-green-500"
                >
                  <img
                    loading="lazy"
                    src={channel.imageUrl}
                    alt={channel.name || "No Name"}
                    className="w-full h-full object-cover rounded-xl mb-1"
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
