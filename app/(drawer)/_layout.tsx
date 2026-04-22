import { Colors } from "@/constants/colors";
import { Drawer } from "expo-router/drawer";
import { Dimensions } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const DRAWER_WIDTH = Math.min(300, Math.round(SCREEN_WIDTH * 0.70));

export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        headerShown: false,

        // Behavior
        drawerType: "slide",
        drawerPosition: "left",
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

        // Item styling
        drawerActiveTintColor: Colors.dpdRed,
        drawerInactiveTintColor: Colors.darkText,
        drawerItemStyle: {
          borderRadius: 10,
          marginHorizontal: 2,
        },
        drawerLabelStyle: {
          fontWeight: "600",
          fontSize: 15,
        },

      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerLabel: "Home",
          title: "Home",
        }}
      />
    </Drawer>
  );
}
