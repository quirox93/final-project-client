//import getURL from "./getUrl";

import { NEXT_PUBLIC_SITE_URL } from "./config";

//const baseURL = getURL("api");
const host = NEXT_PUBLIC_SITE_URL;
console.log(host);
const api = {
  products: async () => {
    const data = await fetch(`http://${host}/api/product`);
    return await data.json();
  },
};
export default api;
