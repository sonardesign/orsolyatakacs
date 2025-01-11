const API_BASE_URL = import.meta.env.VITE_STRAPI_URL;

export const fetchPageData = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/page-types?populate=*`);
    //const response = await fetch(`${API_BASE_URL}/api/pages?populate=*`);

    //const data01 = await response01.json();

    if (!response.ok) {
      throw new Error(`Failed to fetch page data: ${response.statusText}`);
    }
    const data = await response.json();
    console.log("api", data.data[0]);
    return data.data[0]; // Assuming 'slug' is unique
  } catch (error) {
    console.error("Error fetching page data:", error);
    throw error;
  }
};
