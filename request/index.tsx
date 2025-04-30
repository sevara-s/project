import axios from "axios";
import Cookies from "js-cookie";
export const request = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${Cookies.get("token")}`,
  },
});