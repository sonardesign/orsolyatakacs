import { ImageData } from '../imageData';

interface MasonryGalleryProps {
  images: ImageData[];
  onImageClick: (image: ImageData) => void;
}

function MasonryGallery({ images, onImageClick }: MasonryGalleryProps) {
  return (
    <div className="masonry-gallery">
      {images.map((image) => (
        <div
          key={image.id}
          className="masonry-item"
          style={{ width: `${image.width}px`, height: `${image.height}px` }}
          onClick={() => onImageClick(image)}
        >
          <img src={image.src} alt={image.alt} />
        </div>
      ))}
    </div>
  );
}

export default MasonryGallery;