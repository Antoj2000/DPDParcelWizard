import LoginInput from "@/components/login/LoginInput";
export default function LoginForm({
  accountNo,
  setAccountNo,
  password,
  setPassword,
  hidePassword,
  onTogglePassword,
}) {
  return (
    <>
      <LoginInput
        label="Account Number"
        placeholder="Enter your account number"
        value={accountNo}
        onChangeText={setAccountNo}
        keyboardType="default"
        autoCapitalize="characters"
        autoCorrect={false}
        autoComplete="off"
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

