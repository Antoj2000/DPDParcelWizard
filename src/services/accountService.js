import { getAuthHeaders } from "@/src/services/api/authHeaders";
import { API_CONFIG } from "@/src/config/api";

export async function getAccountByNumber(accountNo) {
  const headers = await getAuthHeaders();

  const response = await fetch(
    `${API_CONFIG.accountsBaseUrl}/api/accounts/${accountNo}`,
    {
      method: "GET",
      headers,
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Failed to fetch account");
  }

  return data;
}