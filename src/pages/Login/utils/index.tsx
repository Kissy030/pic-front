import { ACCESS_TOKEN } from "../../constants";
export async function signIn(username: string, pass: string) {
  try {
    const response = await fetch("http://localhost:4000/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: pass,
      }),
    });
    const result = await response.json();
    if (result.token) {
      console.log(`${username}登录成功111`);
      console.log(result);
      sessionStorage.setItem(ACCESS_TOKEN, result.token);
    }

    return result;
  } catch (error) {
    console.error("Login fail:", error);
    throw error;
  }
}
