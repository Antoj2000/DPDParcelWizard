import CardTitle from "@/components/ui/CardTitle";
import { StyleSheet, Text, View } from "react-native";
export default function CalendarScreen() {
  return (
    <View style={styles.rootContainer}>
      <CardTitle
        icon="calendar"
        text="Calendar"
        subText="Manage your delivery calendar"
      />
      <Text>Calendar Screen Content Goes Here</Text>
        
    </View>
  );
}
const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
});
