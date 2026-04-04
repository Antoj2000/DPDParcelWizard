import { View, StyleSheet} from "react-native";
import QuickActionsButton from "@/components/ui/QuickActionsButton";
import { useRouter } from "expo-router";
import useLocateUser from "@/src/hooks/useLocateUser";

export default function QuickActions({ onTrackPress }) {
  const router = useRouter();
  const { locateUser } = useLocateUser();

  function handleLocatePress() {
    locateUser();
  }

  return (
    <View style={styles.buttonRow}>
      <QuickActionsButton
        icon="search-outline"
        label="Track"
        onPress={onTrackPress}
      />
      <QuickActionsButton
        icon="qr-code-outline"
        label="Scan"
        onPress={() => router.push("/scan")}
      />
      <QuickActionsButton
        icon="map-outline"
        label="Locate"
        onPress={handleLocatePress}
      />
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
