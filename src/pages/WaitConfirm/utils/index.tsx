import { API_BASE_URL } from "../../../../config";
export async function authCode(email: string, code: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/user/authCode`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        code: code,
      }),
    });
    const result = await response.json();

    return result;
  } catch (error) {
    console.error("Login fail:", error);
    throw error;
  }
}
