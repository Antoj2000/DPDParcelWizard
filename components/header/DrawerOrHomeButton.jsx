import { Ionicons } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import { router, useNavigation, useSegments } from "expo-router";
import { Pressable } from "react-native";

export default function DrawerOrHomeButton() {
  const segments = useSegments();
  const navigation = useNavigation();
  const isTabsRoute = segments[1] === "(tabs)";

  function handlePress() {
    if (isTabsRoute) {
      const state = navigation.getState();
      const drawerRoute = state?.routes?.find(
        (route) => route.name === "(drawer)",
      );
      const drawerKey = drawerRoute?.state?.key;

      if (drawerKey) {
        navigation.dispatch({
          ...DrawerActions.openDrawer(),
          target: drawerKey,
        });
      }
      return;
    }

    router.replace("/(tabs)/deliveries");
  }

  return (
    <Pressable
      onPress={handlePress}
      style={{
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: 6,
      }}
      hitSlop={10}
    >
      <Ionicons
        name={isTabsRoute ? "menu-outline" : "home-outline"}
        size={24}
        color="#fff"
      />
    </Pressable>
  );
}
