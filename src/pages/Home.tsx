import { useState } from "react";
import LightboxGallery from "../components/LightboxGallery";
import MasonryGallery from "../components/MasonryGallery";
import { ImageData, images } from "../imageData";

function Home() {
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);

  return (
    <div className="home">
      <h1>Welcome to Orsolya Takacs Art Gallery</h1>
      <MasonryGallery images={images} onImageClick={setSelectedImage} />
      {selectedImage && (
        <LightboxGallery
          images={images}
          selectedImage={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
      {/* <ImageGallery /> */}
    </div>
  );
}

export default Home;
