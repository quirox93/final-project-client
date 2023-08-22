import { VERCEL_URL } from "./config";

// utils/getURL.ts
const IS_SERVER = typeof window === "undefined";
const NEXT_PUBLIC_SITE_URL = VERCEL_URL || "http://localhost:3000";
export default function getURL(path: string) {
  const baseURL = IS_SERVER ? NEXT_PUBLIC_SITE_URL! : window.location.origin;
  return new URL(path, baseURL).toString();
}
