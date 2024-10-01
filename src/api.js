import axios from "axios";

const API_URL = "https://api.coingecko.com/api/v3";

export const getCryptoList = async () => {
  const response = await axios.get(`${API_URL}/coins/markets`, {
    params: {
      vs_currency: "usd",
      order: "market_cap_desc",
      per_page: 10,
      page: 1,
    },
  });
  return response.data;
};

export const getCryptoDetails = async (id) => {
  const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
};
