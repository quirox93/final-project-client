import axios from "axios";

const PORT = process.env.PORT || 3000;

const hostname = "http://" + window?.location.hostname;
const baseURL = `${hostname}:${PORT}/api`;
const api = axios.create({
  baseURL,
});

export default api;
