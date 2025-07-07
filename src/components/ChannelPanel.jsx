import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const defaultCategories = [
  "ENTERTAINMENT",
  "NEWS",
  "MOVIES",
  "INFOTAINMENT",
  "KIDS",
  "MUSIC",
  "RELIGIOUS",
  "SPORTS",
];

const ChannelPanel = () => {
  const [channelImage, setChannelImage] = useState(null);
  const [channelCategory, setChannelCategory] = useState("ENTERTAINMENT");
  const [channels, setChannels] = useState([]);
  const [categories, setCategories] = useState(defaultCategories);
  const [newCategory, setNewCategory] = useState("");
  const fileInputRef = useRef(null);

  const fetchChannels = async () => {
    try {
      const res = await axios.get(
        "https://techsoft-server.onrender.com/api/channels"
      );
      setChannels(res.data);
    } catch {
      toast.error("Error fetching channels");
    }
  };

  useEffect(() => {
    fetchChannels();
  }, []);

  const handleAddCategory = () => {
    const trimmed = newCategory.trim().toUpperCase();
    if (!trimmed) return toast.error("Category name cannot be empty");
    if (categories.includes(trimmed))
      return toast.error("Category already exists");

    setCategories((prev) => [...prev, trimmed]);
    setChannelCategory(trimmed);
    setNewCategory("");
    toast.success(`Category "${trimmed}" added`);
  };

  const handleDeleteCategory = (catToDelete) => {
    const inUse = channels.some((ch) => ch.category === catToDelete);
    if (inUse) {
      toast.error("Cannot delete category in use by a channel");
      return;
    }

    setCategories((prev) => prev.filter((cat) => cat !== catToDelete));
    if (channelCategory === catToDelete) {
      setChannelCategory(categories[0] || ""); // fallback
    }
    toast.success(`Category "${catToDelete}" deleted`);
  };

  const handleChannelUpload = async (e) => {
    e.preventDefault();
    if (!channelImage) return toast.error("Please select an image");

    const formData = new FormData();
    formData.append("image", channelImage);
    formData.append("category", channelCategory);

    try {
      await axios.post(
        "https://techsoft-server.onrender.com/api/channels",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      toast.success("Channel uploaded successfully");
      fetchChannels();
      setChannelImage(null);
      setChannelCategory("ENTERTAINMENT");
      fileInputRef.current.value = "";
    } catch (err) {
      toast.error(err.response?.data?.error || "Upload failed");
    }
  };

  const handleDeleteChannel = async (id) => {
    try {
      await axios.delete(
        `https://techsoft-server.onrender.com/api/channels/${id}`
      );
      setChannels((prev) => prev.filter((ch) => ch._id !== id));
      toast.success("Channel deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="mb-10 max-w-xl mx-auto p-4 bg-white shadow rounded">
      <h2 className="text-2xl font-semibold mb-4">Channel Panel</h2>

      <form onSubmit={handleChannelUpload} className="space-y-3">
        <select
          value={channelCategory}
          onChange={(e) => setChannelCategory(e.target.value)}
          className="select select-bordered w-full"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Add + Delete Category Section */}
        <div className="space-y-2">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add new category"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="input input-bordered w-full"
            />
            <button
              type="button"
              onClick={handleAddCategory}
              className="btn btn-secondary"
            >
              Add
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {categories.map((cat) => {
              const inUse = channels.some((ch) => ch.category === cat);
              return (
                <div
                  key={cat}
                  className="flex items-center justify-between bg-gray-100 px-3 py-1 rounded"
                >
                  <span>{cat}</span>
                  <button
                    type="button"
                    className="btn btn-xs btn-error"
                    disabled={inUse}
                    onClick={() => handleDeleteCategory(cat)}
                  >
                    ✕
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => setChannelImage(e.target.files[0])}
          className="file-input file-input-bordered w-full"
          accept="image/*"
        />

        <button type="submit" className="btn btn-primary w-full">
          Upload Channel
        </button>
      </form>

      {/* Display uploaded channels */}
      <div className="mt-6 space-y-4">
        {channels.map((ch) => (
          <div
            key={ch._id}
            className="flex items-center gap-4 p-3 border rounded shadow-sm"
          >
            <img
              src={`https://techsoft-server.onrender.com${ch.imageUrl}`}
              alt="channel"
              className="w-20 h-20 object-cover rounded"
            />
            <div className="flex-1">
              <p className="font-medium">{ch.category || "Uncategorized"}</p>
            </div>
            <button
              onClick={() => handleDeleteChannel(ch._id)}
              className="btn btn-error btn-sm"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChannelPanel;
