import { fetchPageData } from "@/api/api";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface SeoMetadata {
  canonicalUrl: string;
}

interface PageTypes {
  blog_post_pages: PageSummary[];
  generic_pages: PageSummary[];
  home_page: PageSummary;
}

interface PageSummary {
  id: number;
  documentId: string;
  uid: string;
  title: string;
  seoMetadata: SeoMetadata[];
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
        const {
          home_page: response,
          blog_post_pages: blogs,
          generic_pages: generic,
        } = (await fetchPageData()) as PageTypes;

        const rest = [...blogs, ...generic];

        setHomePage(response);
        setPages(rest);
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

  return (
    <header>
      <nav>
        <ul>
          <li key={homePage.documentId}>
            <Link
              state={{ id: homePage.documentId }}
              to={homePage.seoMetadata?.[0].canonicalUrl}
            >
              {homePage.title}
            </Link>
          </li>
          {pages.map((page) => (
            <li key={page.documentId}>
              <Link
                state={{ id: page.documentId }}
                to={page.seoMetadata?.[0].canonicalUrl}
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
