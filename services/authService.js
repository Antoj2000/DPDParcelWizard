const AUTH_BASE_URL = "http://192.168.1.13:8004";

export async function login(accountNo, password) {
  const response = await fetch(`${AUTH_BASE_URL}/api/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      account_no: accountNo,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Login failed");
  }

  return data;
}
