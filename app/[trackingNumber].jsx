import { ScrollView, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import StatusSummary from "../components/deliveries/details/StatusSummary";
import SectionCard from "../components/deliveries/details/SectionCard";
import InfoRow from "../components/deliveries/details/InfoRow";
import PodImage from "../components/deliveries/details/PodImage";

import { mockDeliveryDetails } from "@/data/mockDeliveryDetails";

export default function ParcelDetails() {
  const { trackingNumber } = useLocalSearchParams();
  const delivery = mockDeliveryDetails.find(
    (d) => d.trackingNumber === trackingNumber,
  );

  const isDelivered = delivery.status === "DELIVERED";

  return (
    <ScrollView style={styles.container}>
      <StatusSummary delivery={delivery} />
      <SectionCard title="Parcel Information">
        <InfoRow icon="person-outline" label="From" value={delivery.fromName} />
        <InfoRow icon="person-outline" label="To" value={delivery.toName} />
        <InfoRow
          icon="location-outline"
          label="Address"
          value={
            delivery.address.line1 +
            ", " +
            delivery.address.line3 +
            ", " +
            delivery.address.line4 +
            ", " +
            delivery.address.eircode
          }
        />
        <InfoRow
          icon="time-outline"
          label="Delivery Time"
          value={delivery.eta.label}
        />
      </SectionCard>
      {isDelivered && <PodImage />}
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
