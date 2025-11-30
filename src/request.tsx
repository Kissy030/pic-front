import { API_BASE_URL } from "../config";
import { ACCESS_TOKEN } from "./pages/constants";

export async function request(
  method: "GET" | "POST",
  path: string,
  body?: any
) {
  try {
    const access_token = sessionStorage.getItem(ACCESS_TOKEN);
    const response = await fetch(`${API_BASE_URL}/${path}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify(body),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}
