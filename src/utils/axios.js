import axios from "axios";
import getURL from "./getUrl";

const baseURL = getURL("api");
console.log(baseURL);
const api = axios.create({
  baseURL,
});

export default api;
