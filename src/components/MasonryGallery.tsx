import { PhotoData } from "./PageTypes/HomePage";

interface MasonryGalleryProps {
  images: PhotoData[];
  onImageClick: (image: PhotoData) => void;
}

function MasonryGallery({ images, onImageClick }: MasonryGalleryProps) {

  return (
    <div className="masonry-gallery">
      {images.map((image) => (
        <div
          key={image.img.id}
          className="masonry-item"
          style={{ width: `${image.img.width}px`, height: `${image.img.height}px` }}
          onClick={() => onImageClick(image)}
        >
          <img
            src={`${image.img.url}`}
            alt={image.img.alternativeText || "Image"}
          />
        </div>
      ))}
    </div>
  );
}

export default MasonryGallery;
