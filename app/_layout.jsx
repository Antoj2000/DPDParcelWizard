import { Colors } from "@/constants/colors";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import DrawerOrHomeButton from "@/components/header/DrawerOrHomeButton";
import LogoutButton from "@/components/header/LogoutButton";
import { AccountProvider } from "@/src/context/accountContext";
import { AuthProvider } from "@/src/context/authContext";
import { ParcelProvider } from "@/src/context/parcelContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <AccountProvider>
        <ParcelProvider>
          <StatusBar style="light" />
          <Stack>
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen
              name="(drawer)"
              options={{
                headerShown: true,
                title: "DPD Ireland",
                headerStyle: { backgroundColor: Colors.dpdRed },
                headerTintColor: "#fff",
                headerTitleStyle: { fontWeight: 700, fontSize: 18 },
                headerLeft: () => <DrawerOrHomeButton />,
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
        </ParcelProvider>
      </AccountProvider>
    </AuthProvider>
  );
}
