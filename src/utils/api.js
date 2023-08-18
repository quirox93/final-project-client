import getURL from "./getUrl";

const baseURL = getURL("api");

const api = {
  products: async () => {
    const data = await fetch("http://localhost:3000/api/product");
    return await data.json();
  },
};
export default api;
