import { NEXT_PUBLIC_SITE_URL, VERCEL_URL } from "./config";
import getURL from "./getUrl";
const host = getURL();

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
      const data = await fetch(`${host}/api/product/bulk`, {
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
  payment: {
    checkout: async (items, user_id) => {
      console.log(host);
      const data = await fetch(`${host}/api/payment`, {
        method: "POST",
        body: JSON.stringify({ user_id, items }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      return await data.json();
    },
  },
};

export default api;
