import { fetchPageData } from "@/api/api";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface PageSummary {
  id: number;
  attributes: {
    title: string;
    slug: string;
  };
}

const HomePage: React.FC = () => {
  const [pages, setPages] = useState<PageSummary[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPages = async () => {
      setLoading(true);
      try {
        const response = await fetchPageData();

        console.log(response)
        setPages(response);
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

  return (
    <header>
      <nav>
        <ul>
          {pages.map((page) => (
            <li key={page.id}>
              <Link to={`/page/${page.attributes.slug}`}>
                {page.attributes.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default HomePage;
