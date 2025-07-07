import React, { useState, useEffect, useCallback, useRef } from "react";
import toast from "react-hot-toast";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const SliderPanel = () => {
  const [sliderImage, setSliderImage] = useState(null);
  const [sliders, setSliders] = useState([]);
  const fileInputRef = useRef(null);
  const axiosPublic = useAxiosPublic();

  const fetchSliders = useCallback(async () => {
    try {
      const res = await axiosPublic.get("/api/sliders");
      setSliders(res.data);
    } catch {
      toast.error("Failed to fetch sliders");
    }
  }, [axiosPublic]);

  useEffect(() => {
    fetchSliders();
  }, [fetchSliders]);

  const handleSliderUpload = async (e) => {
    e.preventDefault();
    if (!sliderImage) return toast.error("Please select an image");

    const formData = new FormData();
    formData.append("image", sliderImage);

    try {
      await axiosPublic.post("/api/sliders", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Slider uploaded successfully");
      setSliderImage(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      fetchSliders();
    } catch (err) {
      console.log(err.message);
      toast.error(err.response?.data?.error || "Upload failed");
    }
  };

  const handleSliderDelete = async (id) => {
    try {
      await axiosPublic.delete(`/api/sliders/${id}`);
      setSliders((prev) => prev.filter((slider) => slider._id !== id));
      toast.success("Slider deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="mb-10">
      <h2 className="text-xl font-bold mb-2">Slider Panel</h2>
      <form onSubmit={handleSliderUpload}>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => setSliderImage(e.target.files[0])}
          className="mb-2"
        />
        <button className="btn btn-primary mt-2" type="submit">
          Upload Slider
        </button>
      </form>

      <div className="mt-4">
        {sliders.map((slider) => (
          <div key={slider._id} className="flex items-center gap-4 mb-2">
            <img
              src={slider.imageUrl}
              alt="slider"
              className="w-20 h-20 object-cover rounded"
            />
            <button
              onClick={() => handleSliderDelete(slider._id)}
              className="btn btn-error"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SliderPanel;
