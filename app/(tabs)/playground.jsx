import {
  ScrollView,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  View,
  Button,
} from "react-native";
import { useState } from "react";

import LoginToggle from "@/components/login/LoginToggle";
import LoginCard from "@/components/login/LoginCard";
import LoginButton from "@/components/login/LoginButton";
import LoginForm from "@/components/login/LoginForm";
import RegisterForm from "@/components/login/RegisterForm";

import ParcelCard from "@/components/deliveries/cards/ParcelCard";

import { loginToAccount } from "@/src/services/authService";
import { createAccount } from "@/src/services/accountService";

import {
  getConsignmentsForAccount,
  getConsignmentByNumber,
} from "@/src/services/consignmentService";

import mapConsignmentsToParcels from "@/src/mappers/mapConsignments";

export default function Playground() {
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

  const [loggedInAccount, setLoggedInAccount] = useState(null);
  const [parcels, setParcels] = useState([]);

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
      const { account } = await loginToAccount(
        loginValues.accountNo,
        loginValues.password,
      );

      setLoggedInAccount(account);

      Alert.alert(
        "Success",
        `Login successful\nName: ${account.name}\nEmail: ${account.email}`,
      );
    } catch (error) {
      Alert.alert("Login failed", error.message);
    }
  }

  async function handleRegister() {
    if (registerValues.password !== registerValues.confirmPassword) {
      Alert.alert("Registration failed", "Passwords do not match");
      return;
    }
    try {
      const fullName = `${registerValues.firstName} ${registerValues.lastName}`;
      const account = await createAccount(
        fullName,
        registerValues.email,
        registerValues.password,
      );
      // could log in automatically here using loginToAccount(account.account_no, registerValues.password)
      Alert.alert(
        "Success",
        `Account created!\nYour account number is ${account.account_no}\nName: ${account.name}\nEmail: ${account.email}`,
      );
    } catch (error) {
      Alert.alert("Registration failed", error.message);
    }
  }

  async function handleFetchConsignments() {
    try {
      if (!loggedInAccount?.account_no) {
        Alert.alert("Error", "No logged in account found");
        return;
      }
      // Get account number; you already have it after login
      const accountNo = loggedInAccount.account_no;
      const conNumbers = await getConsignmentsForAccount(accountNo);
      console.log("Consignment numbers:", conNumbers);

      // If you want to fetch full details for each:
      const conDetails = await Promise.all(
        conNumbers.map((num) => getConsignmentByNumber(num))
      );
      console.log("Consignment details:", conDetails);

      const mappedParcels = mapConsignmentsToParcels(conDetails);
      console.log("Mapped parcels:", mappedParcels);

      setParcels(mappedParcels);

      Alert.alert("Success", `Fetched ${mappedParcels.length} consignments`);
    } catch (err) {
      console.error("Error fetching consignments:", err);
      Alert.alert("Fetch failed", err.message);
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={140}
    >
      <ScrollView style={styles.container}>
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
          {loggedInAccount && (
            <View style={styles.fetchButtonContainer}>
              <Button
                title="Fetch My Consignments"
                onPress={handleFetchConsignments}
              />
            </View>
          )}
          {parcels.length > 0 && (
            <View style={styles.parcelPreview}>
              <ParcelCard
                parcel={parcels[0]}
                onPress={() => console.log("Pressed parcel:", parcels[0])}
              />
            </View>
          )}
        </LoginCard>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
  fetchButtonContainer: {
    marginTop: 16,
  },
  parcelPreview: {
    marginTop: 16,
  },
});
