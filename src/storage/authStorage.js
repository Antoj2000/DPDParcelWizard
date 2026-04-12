import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "token";
const ACCOUNT_NO_KEY = "account_no";

export async function saveToken(token) {
  await SecureStore.setItemAsync(TOKEN_KEY, token);
}

export async function getToken() {
  return await SecureStore.getItemAsync(TOKEN_KEY);
}

export async function deleteToken() {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
}

export async function saveAccountNo(accountNo) {
  await SecureStore.setItemAsync(ACCOUNT_NO_KEY, accountNo);
}

export async function getAccountNo() {
  return await SecureStore.getItemAsync(ACCOUNT_NO_KEY);
}

export async function deleteAccountNo() {
  await SecureStore.deleteItemAsync(ACCOUNT_NO_KEY);
}

export async function clearAuth() {
  await deleteToken();
  await deleteAccountNo();
}