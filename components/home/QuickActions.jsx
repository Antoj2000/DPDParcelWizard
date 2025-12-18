import { View, StyleSheet } from "react-native";
import QuickActionsButton from "@/components/ui/QuickActionsButton";

export default function QuickActions() {
  return (
    <View style={styles.buttonRow}>
      <QuickActionsButton>+</QuickActionsButton>
      <QuickActionsButton>+</QuickActionsButton>
      <QuickActionsButton>+</QuickActionsButton>
      <QuickActionsButton>+</QuickActionsButton>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonRow: {
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  //   buttonBox: {
  //     marginHorizontal: 24,
  //     paddingVertical: 12,
  //     borderWidth: 2,
  //     borderColor: "black",
  //     borderRadius: 12,
  //     alignItems: "center",
  //   },
});
