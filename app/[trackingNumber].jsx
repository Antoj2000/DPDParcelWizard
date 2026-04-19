import { useLocalSearchParams } from "expo-router";
import { useMemo } from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";

import InfoRow from "../components/deliveries/details/InfoRow";
import PodImage from "../components/deliveries/details/PodImage";
import SectionCard from "../components/deliveries/details/SectionCard";
import StatusSummary from "../components/deliveries/details/StatusSummary";
import TrackingHistory from "../components/deliveries/details/TrackingHistory";

import useParcels from "@/src/hooks/useParcels";
import {
  deliveredParcelTracking,
  outForDeliveryTracking,
} from "@/data/mockTrackingData";

export default function ParcelDetails() {
  const { trackingNumber } = useLocalSearchParams();
  const { parcels, loading } = useParcels();

  const delivery = useMemo(() => {
    return parcels.find(
      (parcel) => parcel.trackingNumber === String(trackingNumber)
    );
  }, [parcels, trackingNumber]);

  if (loading) {
    return <ScrollView style={styles.container} />;
  }

  if (!delivery) {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.emptyState}>
          <Text>Parcel not found</Text>
        </View>
      </ScrollView>
    );
  }

  const isDelivered = delivery.status === "DELIVERED";
  const timelineEvents = isDelivered
    ? deliveredParcelTracking
    : outForDeliveryTracking;

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

      <TrackingHistory events={timelineEvents} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});
