import DrawerContent from "@/components/drawer/DrawerContent";
import { Colors } from "@/constants/colors";
import { Drawer } from "expo-router/drawer";
import { Dimensions } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const DRAWER_WIDTH = Math.min(300, Math.round(SCREEN_WIDTH * 0.7));

export default function DrawerLayout() {
  return (
    <Drawer
      drawerContent={() => <DrawerContent />}
      screenOptions={{
        headerShown: false,

        // Behavior
        drawerType: "slide",
        swipeEnabled: true,
        swipeEdgeWidth: 28,

        // Visuals
        overlayColor: "rgba(0,0,0,0.28)",
        drawerStyle: {
          width: DRAWER_WIDTH,
          backgroundColor: Colors.background,
          borderTopRightRadius: 20,
          borderBottomRightRadius: 20,
        },
        sceneStyle: {
          backgroundColor: Colors.lightGray,
        },
      }}
    >
      <Drawer.Screen name="(tabs)" />
      <Drawer.Screen name="addresses" />
    </Drawer>
  );
}
