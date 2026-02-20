import { View, StyleSheet } from "react-native";
import QuickActionsButton from "@/components/ui/QuickActionsButton";

export default function QuickActions() {
  return (
    <View style={styles.buttonRow}>
      <QuickActionsButton icon="search-outline" label="Track" />
      <QuickActionsButton icon="qr-code-outline" label="Scan" />
      <QuickActionsButton icon="map-outline" label="Locate" />
      <QuickActionsButton icon="call-outline" label="Support" />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
