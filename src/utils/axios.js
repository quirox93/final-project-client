import axios from "axios";
import getURL from "./getUrl";

const baseURL = getURL("api");
const api = axios.create({
  baseURL,
});
export default api;

export const iApi = {
  products: {
    fetch: async () => {
      const data = await fetch(baseURL + "/product");
      const products = await data.json();
      return products.results;
    },
  },
};
