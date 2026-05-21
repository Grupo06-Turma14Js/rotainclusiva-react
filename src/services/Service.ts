import axios from "axios";

export const api = axios.create({
  baseURL: "https://rotainclusiva.onrender.com"
});