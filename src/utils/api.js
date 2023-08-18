import { NEXT_PUBLIC_SITE_URL, VERCEL_URL } from "./config";
const host = VERCEL_URL || NEXT_PUBLIC_SITE_URL;

const api = {
  products: async () => {
    const data = await fetch(`http://${host}/api/product`);
    return await data.json();
  },
};
export default api;
