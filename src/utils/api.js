import { NEXT_PUBLIC_SITE_URL, VERCEL_URL } from "./config";
//import getURL from "./getUrl";
const host = "http://" + (VERCEL_URL || NEXT_PUBLIC_SITE_URL) + "/api";
console.log({ VERCEL_URL, NEXT_PUBLIC_SITE_URL });
const api = {
  product: {
    all: async () => {
      const data = await fetch(`${host}/product`);
      return await data.json();
    },
    update: async (id, body) => {
      const data = await fetch(`${host}/product/${id}`, {
        method: "PUT",
        body,
      });
      return await data.json();
    },
    bulkUpdate: async (array, values) => {
      const data = await fetch(`${host}/product/bulk`, {
        method: "PUT",
        body: JSON.stringify({ array, values }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      return await data.json();
    },
    bulkDelete: async (array) => {
      const data = await fetch(`${host}/product/bulk`, {
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
      const data = await fetch(`${host}/payment`, {
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
