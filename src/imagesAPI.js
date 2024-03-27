import axios from "axios";

const API_KEY = "v5dcLxRJ7u0Q_VONRgfry9-HUAtFT6niLLHl2Z0AuaA";

const getImages = async (query, page) => {
  const response = await axios("https://api.unsplash.com/search/photos", {
    params: {
      client_id: API_KEY,
      query,
      page,
      per_page: 12,
    },
  });
  return response;
};

export default getImages;
