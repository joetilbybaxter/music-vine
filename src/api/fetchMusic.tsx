export const searchTypesense = async (
    searchQuery: string,
    collection: string,
    page: number,
    per_page: number
  ) => {
    const params = new URLSearchParams({
      q: searchQuery,
      query_by: 'name', // Field to search by (adjust if needed)
      collection: collection,
      page: page.toString(), // Convert page to string for URL
      per_page: per_page.toString(), // Results per page
    });
  
    const response = await fetch(
      `https://3feynu8vjgbqkl27p.a1.typesense.net/collections/${collection}/documents/search?${params}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-TYPESENSE-API-KEY': 'MqZdBn4VL8k7IqhuMKOSNuBxmU0isNLk',
        },
      }
    );
  
    if (!response.ok) {
      throw new Error('Error fetching search results');
    }
  
    const data = await response.json();
    return data; // Return the entire data object (including hits and found)
  };
  