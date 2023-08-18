//import getURL from "./getUrl";

//const baseURL = getURL("api");
const host = process.env["HOST"];
const api = {
  products: async () => {
    const data = await fetch(`http://${host}/api/product`);
    return await data.json();
  },
};
export default api;
