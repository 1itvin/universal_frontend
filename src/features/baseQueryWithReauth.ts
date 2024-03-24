import baseURL from "../shared/endpoints";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseQueryWithReauth = fetchBaseQuery({
  baseUrl: `${baseURL}/`,
  prepareHeaders: (headers) => {
    const accessToken = localStorage.getItem("accessToken");
    headers.set("ngrok-skip-browser-warning", "69420");
    if (accessToken) {
      headers.set("authorization", `Bearer ${accessToken}`);
    }
    return headers;
  },
});
