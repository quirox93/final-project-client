//import getURL from "./getUrl";

//const baseURL = getURL("api");

const api = {
  products: async (host) => {
    const data = await fetch(`http://${host}/api/product`);
    return await data.json();
  },
};
export default api;
