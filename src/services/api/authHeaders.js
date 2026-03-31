import { getToken } from "@/src/storage/authStorage";

export async function getAuthHeaders() {
  const token = await getToken();

  if (!token) {
    throw new Error("No auth token found");
  }

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}
