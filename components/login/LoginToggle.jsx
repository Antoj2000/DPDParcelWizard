import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from '@/constants/colors'
export default function LoginToggle({ value, onChange }) {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => onChange("login")}
        style={[styles.tab, value === "login" && styles.activeTab]}
      >
        <Text
          style={[styles.tabText, value === "login" && styles.activeTabText]}
        >
          Login
        </Text>
      </Pressable>

      <Pressable
        onPress={() => onChange("register")}
        style={[styles.tab, value === "register" && styles.activeTab]}
      >
        <Text
          style={[styles.tabText, value === "register" && styles.activeTabText]}
        >
          Register
        </Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#f1eff2",
    borderRadius: 20,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 14,
    alignItems: "center",
    borderRadius: 16,
  },
  activeTab: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  tabText: {
    fontSize: 16,
    color: "#7b7b8b",
    fontWeight: "500",
  },
  activeTabText: {
    color: Colors.darkText,
    fontWeight: "600",
  },
});
