import { View, StyleSheet } from "react-native";
import QuickActionsButton from "@/components/ui/QuickActionsButton";
import { useRouter } from "expo-router";

export default function QuickActions() {
  const router = useRouter();

  return (
    <View style={styles.buttonRow}>
      <QuickActionsButton icon="search-outline" label="Track" />
      <QuickActionsButton
        icon="qr-code-outline"
        label="Scan"
        onPress={() => router.push("/scan")}
      />
      <QuickActionsButton icon="map-outline" label="Locate" />
      <QuickActionsButton
        icon="call-outline"
        label="Support"
        onPress={() => router.push("/support")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
