import RichText from "@/components/RichText";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import ImageGallery from "../ImageDetail";

interface SeoMetadata {
  title: string;
  description: string;
  keywords: string;
  canonicalUrl: string;
}

interface Photos {
  documentId: string;
  id: number;
  name: string;
}

interface PageData {
  title: string;
  content: string;
  seoMetadata: SeoMetadata[];
  photos: Photos[];
}

const HomePage: React.FC = () => {
  const location = useLocation();

  const [data, setData] = useState<PageData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const API_BASE_URL = import.meta.env.VITE_STRAPI_URL;
  const BASE_URL = import.meta.env.BASE_URL;

  const pageId = location.state?.id; // Access the id from state

  useEffect(() => {
    if (!pageId) {
      setError("Page ID is missing");
      setLoading(false);
      return;
    }
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/pages/${pageId}?populate=*`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch page data");
        }

        const result = await response.json();

        if (result.data) {
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

    if (pageId) {
      fetchData();
    }
  }, [pageId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const { title, content, photos, seoMetadata } = data!;
  const canonicalUrl = `${BASE_URL}${seoMetadata?.[0].canonicalUrl}`;

  return (
    <div>
      {/* SEO Metadata */}
      <Helmet>
        <title>{seoMetadata?.[0].title}</title>
        <meta name="description" content={seoMetadata?.[0].description} />
        <meta name="keywords" content={seoMetadata?.[0].keywords} />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      {/* Page Content */}
      <h1>{title}</h1>
      <RichText content={content} />
      {photos.map((photo) => {
        return <ImageGallery key={photo.id} documentId={photo.documentId} />;
      })}
    </div>
  );
};

export default HomePage;
