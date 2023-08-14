import axios from "axios";
import getURL from "./getUrl";

const baseURL = getURL("api");
const api = axios.create({
  baseURL,
});

export default api;
