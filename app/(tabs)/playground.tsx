import { ScrollView, StyleSheet } from "react-native";
import LoginToggle from "@/components/login/LoginToggle";
import LoginCard from "@/components/login/LoginCard";
import LoginInput from "@/components/login/LoginInput";
import LoginButton from "@/components/login/LoginButton";
import { useState } from "react";

export default function Playground() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginState, setLoginState] = useState("login");
  const [hidePassword, setHidePassword] = useState(true);

  return (
    <ScrollView style={styles.container}>
      <LoginCard>
        <LoginToggle value={loginState} onChange={setLoginState} />
        <LoginInput
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCompleteType="email"
        />
        <LoginInput
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={hidePassword}
          rightIcon={hidePassword ? "eye-off-outline" : "eye-outline"}
          onRightPress={() => setHidePassword((prev) => !prev)}
          autoCompleteType="password"
        />
        <LoginButton
          title="Login"
          onPress={() => {}}
          disabled={!email || !password}
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
