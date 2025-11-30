export async function authCode(email: string, code: string) {
  try {
    const response = await fetch("http://localhost:4000/user/authCode", {
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
