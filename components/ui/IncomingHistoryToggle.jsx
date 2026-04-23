import { Colors } from "@/constants/colors";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function IncomingHistoryToggle({
  value,
  onChange,
  incomingCount = 0,
  historyCount = 0,
  incomingLabel = "Incoming",
  historyLabel = "History",
}) {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => onChange("incoming")}
        style={[styles.tab, value === "incoming" && styles.activeTab]}
      >
        <Text
          style={[styles.tabText, value === "incoming" && styles.activeTabText]}
        >
          {incomingLabel} ({incomingCount})
        </Text>
      </Pressable>

      <Pressable
        onPress={() => onChange("history")}
        style={[styles.tab, value === "history" && styles.activeTab]}
      >
        <Text
          style={[styles.tabText, value === "history" && styles.activeTabText]}
        >
          {historyLabel} ({historyCount})
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    backgroundColor: "#ECECEF",
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#111827",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  tabText: {
    fontSize: 17,
    color: Colors.mutedText,
    fontWeight: "600",
  },
  activeTabText: {
    color: Colors.darkText,
    fontWeight: "700",
  },
});
