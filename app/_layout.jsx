import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { Colors } from "@/constants/colors";

import { AuthProvider } from "@/src/context/authContext";
import LogoutButton from "@/components/header/LogoutButton";

export default function RootLayout() {
  return (
    <AuthProvider>
      <StatusBar style="light" />
      <Stack>
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: true,
            title: "DPD Ireland",
            headerStyle: { backgroundColor: Colors.dpdRed },
            headerTintColor: "#fff",
            headerTitleStyle: { fontWeight: 700, fontSize: 18 },
            headerRight: () => <LogoutButton />,
          }}
        />
        <Stack.Screen name="scan" options={{ headerShown: false }} />
        <Stack.Screen
          name="support"
          options={{
            headerShown: true,
            title: "Support",
            headerStyle: { backgroundColor: Colors.dpdRed },
            headerTintColor: "#fff",
            headerTitleStyle: { fontWeight: 700, fontSize: 18 },
            headerBackTitle: "Back",
          }}
        />
        <Stack.Screen
          name="map"
          options={{
            headerShown: true,
            title: "DPD Locator",
            headerStyle: { backgroundColor: Colors.dpdRed },
            headerTintColor: "#fff",
            headerTitleStyle: { fontWeight: 700, fontSize: 18 },
            headerBackTitle: "Back",
          }}
        />
        <Stack.Screen
          name="[trackingNumber]"
          options={{
            headerShown: true,
            title: "Parcel Details",
            headerStyle: { backgroundColor: Colors.dpdRed },
            headerTintColor: "#fff",
            headerTitleStyle: { fontWeight: 700, fontSize: 18 },
            headerBackTitle: "Back",
          }}
        />
      </Stack>
    </AuthProvider>
  );
}
