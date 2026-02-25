import { ScrollView, StyleSheet } from "react-native";
import StatusSummary from "../../components/deliveries/details/StatusSummary";
import SectionCard from "../../components/deliveries/details/SectionCard";
import InfoRow from "../../components/deliveries/details/InfoRow";

export default function Playground() {
  return (
    <ScrollView style={styles.container}>
      <StatusSummary />
      <SectionCard title="Parcel Information">
        <InfoRow icon="person-outline" label="From" value="Amazon" />
        <InfoRow icon="person-outline" label="To" value="Anthony Johnson" />
        <InfoRow
          icon="location-outline"
          label="Address"
          value="50 Valleycourt, Athlone, Co. Westmeath"
        />
        <InfoRow
          icon="time-outline"
          label="Delivery Time"
          value="Today, 2 PM - 4 PM"
        />
      </SectionCard>
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
