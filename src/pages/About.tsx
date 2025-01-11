import { fetchPageData } from "@/api/api";
import { PageData } from "@/components/PageTypes/HomePage";
import RichText from "@/components/RichText";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

const AboutPage: React.FC = () => {
  const [pageData, setPageData] = useState<PageData | null>(null);
  const BASE_URL = import.meta.env.BASE_URL;

  useEffect(() => {
    const getPageData = async () => {
      try {
        const data = await fetchPageData(); // Replace "about" with your slug
        const aboutData = data.find((page: any) => page.uid === "about");
        console.log(aboutData);
        setPageData(aboutData);
      } catch (error) {
        console.error("Failed to fetch page data:", error);
      }
    };

    getPageData();
  }, []);

  if (!pageData) {
    return <div>Loading...</div>;
  }

  const { title, content, seoMetadata } = pageData;
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
    </div>
  );
};

export default AboutPage;
