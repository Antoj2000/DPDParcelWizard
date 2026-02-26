import { ScrollView, StyleSheet } from "react-native";
import CalendarLegend from "../../components/calendar/CalendarLegend";
import SelectDatesCard from "../../components/calendar/schedule/SelectDatesCard";

export default function Playground() {
  return (
    <ScrollView style={styles.container}>
      <CalendarLegend />
      <SelectDatesCard />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
});
