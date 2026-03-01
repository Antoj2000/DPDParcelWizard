import { StyleSheet, View } from "react-native";
import { Colors } from "@/constants/colors";

export default function TimelineRail() {
  return (
    <View style={styles.container}>
      <View style={styles.dot} />
      <View style={styles.line} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: 28, 
    alignItems: "center", 
  },

  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.dpdRed,
    zIndex: 2,
  },

  line: {
    position: "absolute",
    top: 12,
    height: "90%",
    width: 2,
    backgroundColor: Colors.dpdRed, 
  },
});
