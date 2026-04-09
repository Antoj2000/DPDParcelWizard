import { useLocalSearchParams } from "expo-router";
import { useMemo } from "react";
import { ScrollView, StyleSheet } from "react-native";
import InfoRow from "../components/deliveries/details/InfoRow";
import PodImage from "../components/deliveries/details/PodImage";
import SectionCard from "../components/deliveries/details/SectionCard";
import StatusSummary from "../components/deliveries/details/StatusSummary";
import TrackingHistory from "../components/deliveries/details/TrackingHistory";

import { mockDeliveryDetails } from "@/data/mockDeliveryDetails";
import {
  deliveredParcelTracking,
  outForDeliveryTracking,
} from "@/data/mockTrackingData";
import { getParcelStatus, getParcelStatusDisplay } from "@/utils/parcels";

export default function ParcelDetails() {
  const { trackingNumber } = useLocalSearchParams();
  const delivery = useMemo(() => {
    const parcel = mockDeliveryDetails.find(
      (d) => d.trackingNumber === trackingNumber,
    );

    if (!parcel) {
      return null;
    }

    const status = getParcelStatus(parcel.expectedAt);

    return {
      ...parcel,
      status,
      statusDisplay: getParcelStatusDisplay(status),
    };
  }, [trackingNumber]);

  if (!delivery) {
    return <ScrollView style={styles.container} />;
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
});
