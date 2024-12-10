import qs from "qs";

const API_BASE_URL = import.meta.env.VITE_STRAPI_URL;

export const fetchPageData = async () => {
  try {
    const query = qs.stringify(
      {
        populate: {
          generic_pages: {
            fields: ["seoMetadata"],
          },
          home_page: {
            fields: ["seoMetadata"],
          },
          blog_post_pages: {
            fields: ["seoMetadata"],
          },
          /* relationName: {
            populate: {
              generic_pages: {
                fields: ["seoMetadata"],
              },
              home_page: {
                fields: ["seoMetadata"],
              },
              blog_post_pages: {
                fields: ["seoMetadata"],
              },
            },
          }, */
        },
      },
      { encodeValuesOnly: true } // Ensure the query string is URL-safe
    );
    const response = await fetch(`${API_BASE_URL}/api/page-types?${query}`);
    //const response = await fetch(`${API_BASE_URL}/api/pages?populate=*`);

    //const data01 = await response01.json();

    if (!response.ok) {
      throw new Error(`Failed to fetch page data: ${response.statusText}`);
    }
    const data = await response.json();
    console.log(data.data);
    return data.data[0]; // Assuming 'slug' is unique
  } catch (error) {
    console.error("Error fetching page data:", error);
    throw error;
  }
};
