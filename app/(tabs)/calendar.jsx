import { StyleSheet, Text, View } from "react-native";
import CalendarScreen from "@/screens/CalendarScreen";

export default function Calendar() {
  
  return (
    <View style={styles.rootContainer}>
      <CalendarScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    margin: 12,
    justifyContent: "center",
  }
});
