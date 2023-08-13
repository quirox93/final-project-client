import axios from "axios";

const PORT = process.env.PORT || 3000;
const baseURL = `http://localhost:${PORT}/api`;
const api = axios.create({
  baseURL,
});

export default api;
