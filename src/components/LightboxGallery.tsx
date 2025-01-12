import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { PhotoData } from './PageTypes/HomePage';

interface LightboxGalleryProps {
  images: PhotoData[];
  selectedImage: PhotoData;
  onClose: () => void;
}

function LightboxGallery({ images, selectedImage, onClose }: LightboxGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const index = images.findIndex(img => img.id === selectedImage.id);
    setCurrentIndex(index);
  }, [selectedImage, images]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : images.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < images.length - 1 ? prevIndex + 1 : 0));
  };

  const currentImage = images[currentIndex];

  console.log(currentImage)

  return (
    <div className="lightbox-gallery">
      <div className="lightbox-content">
        <img src={currentImage.img.url} alt={currentImage.img.alternativeText} />
        <button className="close-button" onClick={onClose} aria-label="Close lightbox">
          <X size={24} />
        </button>
        <button className="nav-button prev" onClick={handlePrev} aria-label="Previous image">
          <ChevronLeft size={24} />
        </button>
        <button className="nav-button next" onClick={handleNext} aria-label="Next image">
          <ChevronRight size={24} />
        </button>
        <div className="image-description">
          <h3>
          {currentImage.name}
          </h3>
          <p>
          {currentImage.description}
          </p>
        </div>
        <div className="image-counter">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  );
}

export default LightboxGallery;