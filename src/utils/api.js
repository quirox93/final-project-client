"use server";
import { LOCAL_URL, VERCEL_URL, NEXT_PUBLIC_URL } from "./config";
let host = "https://" + VERCEL_URL + "/api";
if (LOCAL_URL) host = LOCAL_URL + "/api";
if (NEXT_PUBLIC_URL) host = "https://" + NEXT_PUBLIC_URL + "/api";
export async function getAllProducts() {
  const data = await fetch(`${host}/product`, { next: { revalidate: 0 } });
  return await data.json();
}
export async function updateProduct(id, body) {
  const data = await fetch(`${host}/product/${id}`, {
    method: "PUT",
    body,
    next: { revalidate: 0 },
  });
  return await data.json();
}
export async function deleteProduct(id) {
  const data = await fetch(`${host}/product/${id}`, {
    method: "DELETE",
    next: { revalidate: 0 },
  });
  return await data.json();
}
export async function bulkUpdateProduct(array, values) {
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
export async function bulkDeleteProduct(array) {
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
export async function addReview(id, body) {
  const data = await fetch(`${host}/review/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
    next: { revalidate: 0 },
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  return await data.json();
}

export async function updateProductStock(id, newStock) {
  const data = await fetch(`${host}/product/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ stock: newStock }),
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

export async function getUserById(clerkId) {
  const data = await fetch(`${host}/user/${clerkId}`, { next: { revalidate: 0 } });
  return await data.json();
}

export async function getAllOrders() {
  const data = await fetch(`${host}/order`, { next: { revalidate: 0 } });
  return await data.json();
}
export async function getOrderById(id) {
  const data = await fetch(`${host}/order/${id}`, { next: { revalidate: 0 } });
  return await data.json();
}
export async function newOrder(items, payer) {
  const data = await fetch(`${host}/order`, {
    method: "POST",
    body: JSON.stringify({ items, payer }),
    next: { revalidate: 0 },
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  return await data.json();
}
