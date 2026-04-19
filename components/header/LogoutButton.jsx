import { Alert, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useAuth } from "@/src/context/authContext";

export default function LogoutButton() {
  const { logout } = useAuth();

  function confirmLogout() {
    Alert.alert("Logout", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: handleLogout,
      },
    ]);
  }

  async function handleLogout() {
    await logout();
    router.replace("/login");
  }

  return (
    <Pressable
      onPress={confirmLogout}
      style={{ alignItems: "center", justifyContent: "center", paddingLeft: 8 }}
      hitSlop={10}
    >
      <Ionicons name="log-out-outline" size={22} color="#fff" />
    </Pressable>
  );
}
