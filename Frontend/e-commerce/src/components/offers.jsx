import { useEffect, useState } from "react";
import banner11 from '../assets/banner11.jpg';
import banner22 from '../assets/banner22.webp';
import banner33 from '../assets/banner33.webp';
import banner44 from '../assets/banner44.webp';

const images = [banner11, banner22, banner33, banner44];

function Offers() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval); 
  }, []);

  const goToPrev = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="relative w-full mb-5">
      <div className="w-full h-34 md:h-66 overflow-hidden rounded-lg shadow-lg">
        <img
          src={images[currentSlide]}
          className="w-full h-full object-cover transition-all duration-700"
          alt={`Banner ${currentSlide + 1}`}
        />
      </div>
      <div className="absolute left-5 right-5 top-1/2 flex justify-between transform -translate-y-1/2">
        <button onClick={goToPrev} className="btn btn-circle">❮</button>
        <button onClick={goToNext} className="btn btn-circle">❯</button>
      </div>
    </div>
  );
}

export default Offers;
