import { NEXT_PUBLIC_SITE_URL, VERCEL_URL } from "./config";
const host = VERCEL_URL || NEXT_PUBLIC_SITE_URL;

const api = {
  product: {
    all: async () => {
      const data = await fetch(`http://${host}/api/product`);
      return await data.json();
    },
    update: async (id, body) => {
      const data = await fetch(`http://${host}/api/product/${id}`, {
        method: "PUT",
        body,
      });
      return await data.json();
    },
    bulkUpdate: async (array, values) => {
      const data = await fetch(`http://${host}/api/product/bulk`, {
        method: "PUT",
        body: JSON.stringify({ array, values }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      return await data.json();
    },
    bulkDelete: async (array) => {
      const data = await fetch(`http://${host}/api/product/bulk`, {
        method: "DELETE",
        body: JSON.stringify(array),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      return await data.json();
    },
  },
};
export default api;
