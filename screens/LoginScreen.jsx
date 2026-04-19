import {
  ScrollView,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  View,
  Pressable,
  Text,
} from "react-native";
import { useState } from "react";
import { router } from "expo-router";

import LoginToggle from "@/components/login/LoginToggle";
import LoginCard from "@/components/login/LoginCard";
import LoginButton from "@/components/login/LoginButton";
import LoginForm from "@/components/login/LoginForm";
import RegisterForm from "@/components/login/RegisterForm";

import { createAccount } from "@/src/services/accountService";
import { useAuth } from "@/src/context/authContext";
import { Colors } from "@/constants/colors";

export default function LoginScreen() {
  const { login, skipLogin } = useAuth();

  const [loginState, setLoginState] = useState("login");
  const [loginValues, setLoginValues] = useState({
    accountNo: "",
    password: "",
  });

  const [registerValues, setRegisterValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [visibility, setVisibility] = useState({
    loginPassword: true,
    registerPassword: true,
    registerConfirmPassword: true,
  });

  function updateLoginField(field, value) {
    setLoginValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function updateRegisterField(field, value) {
    setRegisterValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function handleLogin() {
    try {
      await login(loginValues.accountNo, loginValues.password);
      router.replace("/(tabs)/deliveries");
    } catch (error) {
      Alert.alert("Login failed", error.message || "Could not log in");
    }
  }

  async function handleRegister() {
    if (registerValues.password !== registerValues.confirmPassword) {
      Alert.alert("Registration failed", "Passwords do not match");
      return;
    }

    try {
      const fullName = registerValues.firstName + " " + registerValues.lastName;

      const account = await createAccount(
        fullName,
        registerValues.email,
        registerValues.password,
      );

      Alert.alert(
        "Success",
        "Account created. Your account number is " + account.account_no,
      );

      setLoginState("login");
      setLoginValues((prev) => ({
        ...prev,
        accountNo: account.account_no,
        password: "",
      }));
    } catch (error) {
      Alert.alert("Registration failed", error.message || "Could not register");
    }
  }

  async function handleSkipLogin() {
    try {
      await skipLogin();
      router.replace("/(tabs)/deliveries");
    } catch {
      Alert.alert("Error", "Could not continue in mock mode");
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior="padding"
      //keyboardVerticalOffset={10}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <LoginCard>
          <LoginToggle value={loginState} onChange={setLoginState} />

          {loginState === "login" ? (
            <LoginForm
              accountNo={loginValues.accountNo}
              setAccountNo={(value) => updateLoginField("accountNo", value)}
              password={loginValues.password}
              setPassword={(value) => updateLoginField("password", value)}
              hidePassword={visibility.loginPassword}
              onTogglePassword={() =>
                setVisibility((prev) => ({
                  ...prev,
                  loginPassword: !prev.loginPassword,
                }))
              }
            />
          ) : (
            <RegisterForm
              firstName={registerValues.firstName}
              setFirstName={(value) => updateRegisterField("firstName", value)}
              lastName={registerValues.lastName}
              setLastName={(value) => updateRegisterField("lastName", value)}
              email={registerValues.email}
              setEmail={(value) => updateRegisterField("email", value)}
              password={registerValues.password}
              setPassword={(value) => updateRegisterField("password", value)}
              confirmPassword={registerValues.confirmPassword}
              setConfirmPassword={(value) =>
                updateRegisterField("confirmPassword", value)
              }
              hidePassword={visibility.registerPassword}
              setHidePassword={() =>
                setVisibility((prev) => ({
                  ...prev,
                  registerPassword: !prev.registerPassword,
                }))
              }
              hideConfirmPassword={visibility.registerConfirmPassword}
              setHideConfirmPassword={() =>
                setVisibility((prev) => ({
                  ...prev,
                  registerConfirmPassword: !prev.registerConfirmPassword,
                }))
              }
            />
          )}

          <LoginButton
            title={loginState === "login" ? "Login" : "Register"}
            onPress={loginState === "login" ? handleLogin : handleRegister}
            disabled={
              loginState === "login"
                ? !loginValues.accountNo || !loginValues.password
                : !registerValues.firstName ||
                  !registerValues.lastName ||
                  !registerValues.email ||
                  !registerValues.password ||
                  !registerValues.confirmPassword
            }
          />

          <View style={styles.skipWrap}>
            <Pressable onPress={handleSkipLogin} style={styles.skipButton}>
              <Text style={styles.skipText}>Dev Login</Text>
            </Pressable>
          </View>
        </LoginCard>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.dpdRed,
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "transparent",
  },
  content: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 16,
  },
  skipWrap: {
    marginTop: 12,
  },
  skipButton: {
    minHeight: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  skipText: {
    color: Colors.dpdRed,
    fontSize: 15,
    fontWeight: "600",
  },
});
