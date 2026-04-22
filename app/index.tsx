import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/src/context/authContext";

export default function Index() {
  const router = useRouter();
  const { isHydrating, isAuthenticated, isMockMode } = useAuth();

  // Redirect to appropriate screen based on auth status
  useEffect(() => {
    // Wait for hydration to complete before redirecting
    if (isHydrating) return;

    // If authenticated or in mock mode, go to deliveries; otherwise, go to login
    if (isAuthenticated || isMockMode) {
      router.replace("/(drawer)/deliveries");
    } else {
      router.replace("/login");
    }
  }, [isHydrating, isAuthenticated, isMockMode, router]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  );
}
