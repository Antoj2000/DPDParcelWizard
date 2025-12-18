import { Redirect } from 'expo-router';

export default function RedirectToLogin() {
  return <Redirect href="/(tabs)/deliveries" />;
}
