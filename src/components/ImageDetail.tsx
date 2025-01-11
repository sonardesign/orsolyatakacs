import { useEffect, useState } from "react";

interface Media {
  id: number;
  url: string;
  name: string;
}

const ImageGallery = ({ documentId }: { documentId: string }) => {
  const [image, setImage] = useState<Media>();
  const BASE_API_URL = import.meta.env.VITE_STRAPI_URL;

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          `${BASE_API_URL}/api/photos/${documentId}?populate=*`
        ); // Replace with your endpoint
        console.log(response);
        const data = await response.json();


        // Adjust this structure to match your API response
        const media = {
          id: data.data.id,
          url: `${data.data.img.url}`, // Adjust based on Strapi's response
          name: data.data.img.name,
        };

        setImage(media);
      } catch (error) {
        console.error("Failed to fetch images:", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div>
      <img
        key={image?.id}
        src={image?.url}
        alt={image?.name}
        style={{ width: "200px", margin: "10px" }}
      />
    </div>
  );
};

export default ImageGallery;
