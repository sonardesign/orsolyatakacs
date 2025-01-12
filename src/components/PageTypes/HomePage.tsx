import RichText, { Block } from "@/components/RichText";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import MasonryGallery from "../MasonryGallery";
import LightboxGallery from "../LightboxGallery";

interface SeoMetadata {
  title: string;
  description: string;
  keywords: string;
  canonicalUrl: string;
}

export interface Photos {
  documentId: string;
  id: number;
  name: string;
  url: string;
  alternativeText: string;
  width: number;
  height: number;
}

export interface PhotoData {
  img: Photos;
  description: string;
  name: string;
  id: number;
}

export interface PageData {
  title: string;
  content: Block[];
  seoMetadata: SeoMetadata[];
  photos?: Photos[];
}
export interface HomePageData {
  title: string;
  content: Block[];
  seoMetadata: SeoMetadata;
  photos?: Photos[];
}

const HomePage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<PhotoData | null>(null);
  const [fetchedImages, setFetchedImages] = useState<PhotoData[]>([]);
  const [data, setData] = useState<HomePageData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const API_BASE_URL = import.meta.env.VITE_STRAPI_URL;
  const BASE_URL = import.meta.env.BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/home?populate=*`
        );


        
        const result = await response.json();

        if (result.data) {

          if (result.data.photos) {
            fetchImages(result.data.photos)
          }

          setData(result.data);
        } else {
          setError("Page not found");
        }
      } catch (err: any) {
        setError(err.message || "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchImages = async (images: Photos[]) => {
    const fetchedImages = await Promise.all(
      images.map((image) =>
        fetch(`${API_BASE_URL}/api/photos/${image.documentId}?populate=*`).then((res) => res.json())
      )
    );
    setFetchedImages(fetchedImages.map((item) => item.data));
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const { content, photos, seoMetadata } = data!;
  const canonicalUrl = `${BASE_URL}${seoMetadata?.canonicalUrl}`;

  return (
    <div  className="home">
      {/* SEO Metadata */}
      <Helmet>
        <title>{seoMetadata?.title}</title>
        <meta name="description" content={seoMetadata?.description} />
        <meta name="keywords" content={seoMetadata?.keywords} />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      {/* Page Content */}
      <RichText content={content} />
      {photos && <MasonryGallery images={fetchedImages} onImageClick={setSelectedImage} />}
      {selectedImage && photos && (
        <LightboxGallery
          images={fetchedImages}
          selectedImage={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
};

export default HomePage;
