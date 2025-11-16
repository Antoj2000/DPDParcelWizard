// File to serve as flags for login status 

import * as SecureStore from 'expo-secure-store';

export async function setLoggedIn() {
  await SecureStore.setItemAsync("loggedIn", "true");
}

export async function clearLoggedIn() {
  await SecureStore.deleteItemAsync("loggedIn");
}

export async function isLoggedIn() {
  return await SecureStore.getItemAsync("loggedIn");
}