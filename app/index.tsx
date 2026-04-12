import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { useRouter } from "expo-router";
import { getToken, getAccountNo } from "@/src/storage/authStorage";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;
    async function routeOnBoot() {
      const [token, accountNo] = await Promise.all([
        getToken(),
        getAccountNo(),
      ]);

      if (!isMounted) return;

      if (token && accountNo) {
        router.replace("/(tabs)/deliveries");
      } else {
        router.replace("/login");
      }
    }

    routeOnBoot();

    return () => {
      isMounted = false;
    };
  }, [router]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  );
}
