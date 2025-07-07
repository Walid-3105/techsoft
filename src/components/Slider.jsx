import { useEffect, useState } from "react";
import axios from "axios";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const Slider = () => {
  const [sliders, setSliders] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://news-server-lyart.vercel.app/api/sliders")
      .then((res) => {
        setSliders(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load sliders");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        setCurrentSlide((prev) => (prev - 1 + sliders.length) % sliders.length);
      } else if (e.key === "ArrowRight") {
        setCurrentSlide((prev) => (prev + 1) % sliders.length);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [sliders.length]);

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % sliders.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + sliders.length) % sliders.length);

  if (loading)
    return <div className="text-center py-10">Loading sliders...</div>;
  if (error)
    return <div className="text-center py-10 text-red-500">{error}</div>;
  if (sliders.length === 0)
    return <div className="text-center py-10">No sliders available</div>;

  return (
    <div className="relative text-center  mx-auto">
      <img
        src={sliders[currentSlide].imageUrl}
        alt={`Slide ${currentSlide}`}
        className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] object-cover shadow"
        onError={(e) => console.error(`Failed to load image: ${e.target.src}`)}
      />

      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white p-2 z-10 bg-black bg-opacity-40 hover:bg-opacity-70 rounded-full"
        aria-label="Previous Slide"
      >
        <IoIosArrowBack size={30} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white p-2 z-10 bg-black bg-opacity-40 hover:bg-opacity-70 rounded-full"
        aria-label="Next Slide"
      >
        <IoIosArrowForward size={30} />
      </button>
    </div>
  );
};

export default Slider;
