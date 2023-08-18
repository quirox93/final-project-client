import getURL from "./getUrl";

const baseURL = getURL("api");

const api = {
  products: async () => {
    //const data = await fetch(baseURL + "/product");
    return "TEST";
  },
};
export default api;
