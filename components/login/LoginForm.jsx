import { StyleSheet, Text, View } from "react-native";
import LoginInput from "@/components/login/LoginInput";
export default function LoginForm({
  email,
  setEmail,
  password,
  setPassword,
  hidePassword,
  onTogglePassword,
}) {
  return (
    <>
      <LoginInput
        label="Email"
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="email"
      />
      <LoginInput
        label="Password"
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={hidePassword}
        rightIcon={hidePassword ? "eye-off-outline" : "eye-outline"}
        onRightPress={onTogglePassword}
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="password"
      />
    </>
  );
}
const styles = StyleSheet.create({});
