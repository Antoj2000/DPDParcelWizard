import { ScrollView, StyleSheet } from "react-native";
import LoginToggle from "@/components/login/LoginToggle";
import LoginCard from "@/components/login/LoginCard";

import LoginButton from "@/components/login/LoginButton";
import LoginForm from "@/components/login/LoginForm";
import RegisterForm from "@/components/login/RegisterForm";
import { useState } from "react";

export default function Playground() {
  const [loginState, setLoginState] = useState("login");
  const [loginValues, setLoginValues] = useState({
    email: "",
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

  return (
    <ScrollView style={styles.container}>
      <LoginCard>
        <LoginToggle value={loginState} onChange={setLoginState} />
        {loginState === "login" ? (
          <LoginForm
            email={loginValues.email}
            setEmail={(value) => updateLoginField("email", value)}
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
          onPress={() => {}}
          disabled={
            loginState === "login"
              ? !loginValues.email || !loginValues.password
              : !registerValues.firstName ||
                !registerValues.lastName ||
                !registerValues.email ||
                !registerValues.password ||
                !registerValues.confirmPassword
          }
        />
      </LoginCard>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
});
