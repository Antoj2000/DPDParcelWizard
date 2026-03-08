import { ScrollView, StyleSheet } from "react-native";
import LoginToggle from "@/components/login/LoginToggle";
import LoginCard from "@/components/login/LoginCard";
import { useState } from "react";

export default function Playground() {
  const [loginState, setLoginState] = useState("login");

  return (
    <ScrollView style={styles.container}>
      <LoginCard>
        <LoginToggle value={loginState} onChange={setLoginState} />
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
