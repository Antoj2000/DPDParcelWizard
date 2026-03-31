import { saveToken } from "@/src/storage/authStorage";
import { getAccountByNumber } from "@/src/services/accountService";
import { API_CONFIG } from "@/src/config/api";


export async function login(accountNo, password) {
  const response = await fetch(`${API_CONFIG.authBaseUrl}/api/auth/token`, {
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

export async function loginToAccount(accountNo, password) {
  const result = await login(accountNo, password);

  await saveToken(result.access_token);

  const account = await getAccountByNumber(accountNo);

  return {
    token: result.access_token,
    account,
  };
}
