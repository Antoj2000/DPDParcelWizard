import { StyleSheet } from "react-native";
import LoginInput from "./LoginInput";

export default function RegisterForm({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  hidePassword,
  setHidePassword,
  hideConfirmPassword,
  setHideConfirmPassword,
}) {
  return (
    <>
      <LoginInput
        label="First Name"
        placeholder="Enter your first name"
        value={firstName}
        onChangeText={setFirstName}
        autoComplete="name"
      />
      <LoginInput
        label="Last Name"
        placeholder="Enter your last name"
        value={lastName}
        onChangeText={setLastName}
        autoComplete="name"
      />
      <LoginInput
        label="Email"
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoComplete="email"
      />
      <LoginInput
        label="Password"
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={hidePassword}
        rightIcon={hidePassword ? "eye-off-outline" : "eye-outline"}
        onRightPress={setHidePassword}
        autoComplete="password"
      />
      <LoginInput
        label="Confirm Password"
        placeholder="Re-enter your password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry={hideConfirmPassword}
        rightIcon={hideConfirmPassword ? "eye-off-outline" : "eye-outline"}
        onRightPress={setHideConfirmPassword}
        autoComplete="password"
      />
      </>
  );
}
const styles = StyleSheet.create({
});
