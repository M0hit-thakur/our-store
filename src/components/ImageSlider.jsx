import { useState, useEffect, useRef } from 'react';
import './ImageSlider.css';

const ImageSlider = ({ products }) => {
  const images = products.slice(0, 5).map(product => product.imageUrl); // Take first 5 products

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const sliderRef = useRef(null);

  useEffect(() => {
    if (images.length === 0) return;
    const interval = setInterval(() => {
      if (!isDragging) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [images.length, isDragging]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setCurrentTranslate(0);
  };

  // Touch event handlers
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartPos(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const currentPos = e.touches[0].clientX;
    const diff = startPos - currentPos;
    setCurrentTranslate(diff);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const threshold = 50; // Minimum swipe distance

    if (Math.abs(currentTranslate) > threshold) {
      if (currentTranslate > 0) {
        // Swipe left - next slide
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      } else {
        // Swipe right - previous slide
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
      }
    }

    setCurrentTranslate(0);
  };

  // Mouse event handlers for desktop testing
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartPos(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const currentPos = e.clientX;
    const diff = startPos - currentPos;
    setCurrentTranslate(diff);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const threshold = 50;

    if (Math.abs(currentTranslate) > threshold) {
      if (currentTranslate > 0) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      } else {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
      }
    }

    setCurrentTranslate(0);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleMouseUp();
    }
  };

  if (images.length === 0) {
    return <div className="slider">Loading products...</div>;
  }

  const translateValue = -(currentIndex * 100) + (currentTranslate / sliderRef.current?.offsetWidth) * 100;

  return (
    <div className="slider">
      <div
        className="slider-container"
        ref={sliderRef}
        style={{
          transform: `translateX(${translateValue}%)`,
          transition: isDragging ? 'none' : 'transform 0.5s ease-in-out'
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        {images.map((image, index) => (
          <div key={index} className="slide">
            <img src={image} alt={`Product ${index + 1}`} />
          </div>
        ))}
      </div>
      <div className="slider-dots">
        {images.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;