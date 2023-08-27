"use server";
import { LOCAL_URL, VERCEL_URL, NEXT_PUBLIC_URL } from "./config";
let host = "https://" + VERCEL_URL + "/api";
if (LOCAL_URL) host = LOCAL_URL + "/api";
if (NEXT_PUBLIC_URL) host = "https://" + NEXT_PUBLIC_URL + "/api";
export async function prodGetAll() {
  const data = await fetch(`${host}/product`, { next: { revalidate: 0 } });
  return await data.json();
}
export async function prodUpdate(id, body) {
  const data = await fetch(`${host}/product/${id}`, {
    method: "PUT",
    body,
    next: { revalidate: 0 },
  });
  return await data.json();
}
export async function prodDelete(id) {
  const data = await fetch(`${host}/product/${id}`, {
    method: "DELETE",
    next: { revalidate: 0 },
  });
  return await data.json();
}

export async function prodBulkUpdate(array, values) {
  const data = await fetch(`${host}/product/bulk`, {
    method: "PUT",
    body: JSON.stringify({ array, values }),
    next: { revalidate: 0 },
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
    next: { revalidate: 0 },
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  return await data.json();
}
export async function getAllUsers() {
  const data = await fetch(`${host}/user`, { next: { revalidate: 0 } });
  return await data.json();
}

export async function payment(items, user_id) {
  const data = await fetch(`${host}/payment`, {
    method: "POST",
    body: JSON.stringify({ user_id, items }),
    next: { revalidate: 0 },
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  return await data.json();
}
