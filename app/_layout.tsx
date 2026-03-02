import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { Colors } from "@/constants/colors";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: true,
            title: "DPD Ireland",
            headerStyle: { backgroundColor: Colors.dpdRed },
            headerTintColor: "#fff",
            headerTitleStyle: { fontWeight: 700, fontSize: 18 },
            
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
    </>
  );
}
