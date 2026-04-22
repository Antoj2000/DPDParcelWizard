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

export async function createAccount(name, email, password) {
  const response = await fetch(`${API_CONFIG.accountsBaseUrl}/api/accounts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.detail || "Failed to create account");
  }
  return data;  
}

// Phone number APIs

export async function addPhoneNumber(accountNo, phone) {
  const headers = await getAuthHeaders();
  headers["Content-Type"] = "application/json";
  const response = await fetch(
    `${API_CONFIG.accountsBaseUrl}/api/accounts/${accountNo}/phone-numbers`,
    {
      method: "POST",
      headers,
      body: JSON.stringify(phone),
    },
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.detail || "Failed to add phone number");
  }
  return data;
}

export async function updatePhoneNumber(accountNo, phoneId, phone) {
  const headers = await getAuthHeaders();
  headers["Content-Type"] = "application/json";
  const response = await fetch(
    `${API_CONFIG.accountsBaseUrl}/api/accounts/${accountNo}/phone-numbers/${phoneId}`,
    {
      method: "PUT",
      headers,
      body: JSON.stringify(phone),
    },
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.detail || "Failed to update phone number");
  }
  return data;
}

export async function deletePhoneNumber(accountNo, phoneId) {
  const headers = await getAuthHeaders();
  const response = await fetch(
    `${API_CONFIG.accountsBaseUrl}/api/accounts/${accountNo}/phone-numbers/${phoneId}`,
    {
      method: "DELETE",
      headers,
    },
  );
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.detail || "Failed to delete phone number");
  }
}

// Email APIs

export async function addEmailAddress(accountNo, email) {
  const headers = await getAuthHeaders();
  headers["Content-Type"] = "application/json";
  const response = await fetch(
    `${API_CONFIG.accountsBaseUrl}/api/accounts/${accountNo}/emails`,
    {
      method: "POST",
      headers,
      body: JSON.stringify(email),
    },
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.detail || "Failed to add email address");
  }
  return data;
}

export async function updateEmailAddress(accountNo, emailId, email) {
  const headers = await getAuthHeaders();
  headers["Content-Type"] = "application/json";
  const response = await fetch(
    `${API_CONFIG.accountsBaseUrl}/api/accounts/${accountNo}/emails/${emailId}`,
    {
      method: "PUT",
      headers,
      body: JSON.stringify(email),
    },
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.detail || "Failed to update email address");
  }
  return data;
}

export async function deleteEmailAddress(accountNo, emailId) {
  const headers = await getAuthHeaders();
  const response = await fetch(
    `${API_CONFIG.accountsBaseUrl}/api/accounts/${accountNo}/emails/${emailId}`,
    {
      method: "DELETE",
      headers,
    },
  );
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.detail || "Failed to delete email address");
  }
}

// Address APIs

export async function addAddress(accountNo, address) {
  const headers = await getAuthHeaders();
  headers["Content-Type"] = "application/json";
  const response = await fetch(
    `${API_CONFIG.accountsBaseUrl}/api/accounts/${accountNo}/addresses`,
    {
      method: "POST",
      headers,
      body: JSON.stringify(address),
    },
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.detail || "Failed to add address");
  }
  return data;
}

export async function updateAddress(accountNo, addressId, address) {
  const headers = await getAuthHeaders();
  headers["Content-Type"] = "application/json";
  const response = await fetch(
    `${API_CONFIG.accountsBaseUrl}/api/accounts/${accountNo}/addresses/${addressId}`,
    {
      method: "PUT",
      headers,
      body: JSON.stringify(address),
    },
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.detail || "Failed to update address");
  }
  return data;
}

export async function deleteAddress(accountNo, addressId) {
  const headers = await getAuthHeaders();
  const response = await fetch(
    `${API_CONFIG.accountsBaseUrl}/api/accounts/${accountNo}/addresses/${addressId}`,
    {
      method: "DELETE",
      headers,
    },
  );
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.detail || "Failed to delete address");
  }
}