import { StyleSheet, Text, View } from "react-native";
import { Colors } from "@/constants/colors";
import TimelineRail from "./TimelineRail";
export default function TimelineItem({ status, location, date, time }) {
  return (
    <View style={styles.row}>
      <TimelineRail />
      <View style={styles.content}>
        <Text style={styles.status}>{status}</Text>

        <Text style={styles.location}>{location}</Text>

        <Text style={styles.date}>{date}</Text>
      </View>

      <View style={styles.timeWrap}>
        <Text style={styles.time}>{time}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    paddingVertical: 14,
  },

  content: {
    flex: 1,
    paddingRight: 12,
  },

  status: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.darkText,
    marginBottom: 6,
  },

  location: {
    fontSize: 14,
    color: Colors.greyText,
    marginBottom: 4,
  },

  date: {
    fontSize: 13,
    color: "#9CA3AF",
  },

  timeWrap: {
    alignItems: "flex-end",
    paddingTop: 2,
  },

  time: {
    fontSize: 13,
    color: "#9CA3AF",
    fontWeight: "500",
  },
});
