export async function sendEmail(data: MailInfo) {
  try {
    const response = await fetch(
      `http://localhost:4000/mail/code?address=${encodeURIComponent(data.to)}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    const result = await response.json();
    console.log("Email sent successfully:", result);
    return result;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}

export async function addNewUser(data: UserInfo) {
  try {
    const response = await fetch("http://localhost:4000/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (!response.ok) {
      console.log(result);
      return result;
    }
    console.log("register successfully:", result);
    return result;
  } catch (error) {
    console.error("register failed:");
    throw error;
  }
}

export async function authCode(email: string, code: string) {
  try {
    const response = await fetch("http://localhost:4000/user/authcode", {
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
