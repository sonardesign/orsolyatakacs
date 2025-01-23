import { fetchPageData } from "@/api/api";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface SeoMetadata {
  canonicalUrl: string;
}

interface PageSummary {
  id: number;
  documentId: string;
  uid: string;
  title: string;
  seoMetadata: SeoMetadata;
}

const Header: React.FC = () => {
  const [pages, setPages] = useState<PageSummary[]>([]);
  const [homePage, setHomePage] = useState<PageSummary | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPages = async () => {
      setLoading(true);
      try {
        const response = await fetchPageData();

        const homePage = response.find(
          (page: PageSummary) => page.title === "Home"
        );

        const finalPages = response.filter(
          (page: PageSummary) => page.title !== "Home"
        );

        setPages(finalPages);
        setHomePage(homePage);
      } catch (err: any) {
        setError(err.message || "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchPages();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!homePage) return;

  console.log(homePage);

  return (
    <header>
      <nav>
        <ul>
          <li key={homePage.documentId}>
            <Link
              state={{ id: homePage.documentId }}
              to={homePage.seoMetadata?.canonicalUrl}
            >
              {homePage.title}
            </Link>
          </li>
          {pages.map((page) => (
            <li key={page.documentId}>
              <Link
                state={{ id: page.documentId }}
                to={page.seoMetadata?.canonicalUrl}
              >
                {page.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
