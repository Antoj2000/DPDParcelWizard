import { getAuthHeaders } from "@/src/services/api/authHeaders";
import { API_CONFIG } from "@/src/config/api";

// Fetch list of consignment numbers for the current account
export async function getConsignmentsForAccount(accountNo) {
  const headers = await getAuthHeaders();
  const response = await fetch(
    `${API_CONFIG.consignmentBaseUrl}/api/consignment/account/${accountNo}`,
    { method: "GET", headers }
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.detail || "Failed to fetch consignments");
  }
  return data.consignments; 
}

// Fetch details for a single consignment (returns a ConRead object)
export async function getConsignmentByNumber(consignmentNumber) {
  const headers = await getAuthHeaders();
  const response = await fetch(
    `${API_CONFIG.consignmentBaseUrl}/api/consignment/${consignmentNumber}`,
    { method: "GET", headers }
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.detail || "Failed to fetch consignment details");
  }
  return data;
}