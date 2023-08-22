"use server";
import { VERCEL_URL } from "./config";
let host = VERCEL_URL + "/api";
//import getURL from "./getUrl";
//if (!VERCEL_URL) host = getURL("api");

export async function prodGetAll() {
  const data = await fetch(`${host}/product`);
  return await data.json();
}
export async function prodUpdate(id, body) {
  const data = await fetch(`${host}/product/${id}`, {
    method: "PUT",
    body,
  });
  return await data.json();
}
export async function prodDelete(id) {
  const data = await fetch(`${host}/product/${id}`, {
    method: "DELETE",
  });
  return await data.json();
}

export async function prodBulkUpdate(array, values) {
  const data = await fetch(`${host}/product/bulk`, {
    method: "PUT",
    body: JSON.stringify({ array, values }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  return await data.json();
}

export async function prodBulkDelete(array) {
  const data = await fetch(`${host}/product/bulk`, {
    method: "DELETE",
    body: JSON.stringify(array),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  return await data.json();
}

export async function payment(items, user_id) {
  const data = await fetch(`${host}/payment`, {
    method: "POST",
    body: JSON.stringify({ user_id, items }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  return await data.json();
}
