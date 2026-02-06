import { Tabs } from "expo-router";
import { HapticTab } from "@/components/expo/haptic-tab";
import { IconSymbol } from "@/components/expo/icon-symbol";
import { View, StyleSheet } from "react-native";
import DpdHeader from "@/components/header/DpdHeader";

export default function TabLayout() {
  return (
    <View style={styles.container}>
      <DpdHeader title="DPD Ireland"/>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "red",
          headerShown: false,
          tabBarButton: HapticTab,
        }}
      >
        <Tabs.Screen
          name="deliveries"
          options={{
            title: "Deliveries",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="shippingbox.fill" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="calendar"
          options={{
            title: "Calendar",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="calendar" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="addresses"
          options={{
            title: "Addresses",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="house" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="account"
          options={{
            title: "Account",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="person.fill" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="playground"
          options={{
            title: "Playground",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="play.circle.fill" color={color} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
});
