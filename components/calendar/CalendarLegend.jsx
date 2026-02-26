import { StyleSheet, Text, View } from "react-native";
import LegendItem from "./LegendItem";
import { Colors } from '@/constants/colors'

export default function CalendarLegend() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Calendar Legend</Text>
      </View>

      <View style={styles.row}>
        <LegendItem symbol="H" label="Hold Delivery" />
        <LegendItem symbol="A" label="Alternate Address" />
      </View>

      <View style={styles.row}>
        <LegendItem symbol="C" label="Collect from DPD" />
        <LegendItem dot label="Delivery" />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    borderRadius: 16,
    marginBottom: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "#EFEFF3",

    
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },

  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16, 
    marginBottom: 10,
  },
});
