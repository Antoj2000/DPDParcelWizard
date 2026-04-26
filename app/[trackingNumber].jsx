import { useLocalSearchParams } from "expo-router";
import { useState, useMemo } from "react";
import { Alert, ScrollView, StyleSheet, View, Text } from "react-native";
import { Colors } from "@/constants/colors";

import InfoRow from "../components/deliveries/details/InfoRow";
import PodImage from "../components/deliveries/details/PodImage";
import SectionCard from "../components/deliveries/details/SectionCard";
import StatusSummary from "../components/deliveries/details/StatusSummary";
import TrackingHistory from "../components/deliveries/details/TrackingHistory";
import IconButton from "../components/ui/IconButton";
import ParcelSupportForm from "../components/support/ParcelSupportForm";

import useParcels from "@/src/hooks/useParcels";
import {
  deliveredParcelTracking,
  outForDeliveryTracking,
} from "@/data/mockTrackingData";

export default function ParcelDetails() {
  const { trackingNumber } = useLocalSearchParams();
  const { parcels, loading } = useParcels();

  const [isSupportOpen, setIsSupportOpen] = useState(false);

  const delivery = useMemo(() => {
    return parcels.find(
      (parcel) => parcel.trackingNumber === String(trackingNumber),
    );
  }, [parcels, trackingNumber]);

  function handleSupportSubmit() {
    Alert.alert("Support Query Submitted", "Your query has been sent to DPD.");
    setIsSupportOpen(false);
  }

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
    <>
      <ScrollView style={styles.container}>
        <StatusSummary delivery={delivery} />
        <SectionCard title="Parcel Information">
          <InfoRow
            icon="person-outline"
            label="From"
            value={delivery.fromName}
          />
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
        <View style={styles.contactButton}>
          <IconButton
            icon="call-outline"
            size={24}
            color="white"
            onPress={() => setIsSupportOpen(true)}
            label="Contact Support"
            textStyle={styles.contactButtonText}
          />
        </View>
      </ScrollView>
      {isSupportOpen && (
        <ParcelSupportForm
          trackingNumber={delivery.trackingNumber}
          onCancel={() => setIsSupportOpen(false)}
          onSubmit={handleSupportSubmit}
        />
      )}
    </>
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
  contactButton: {
    marginTop: 16,
    marginBottom: 30,
    marginHorizontal: 16,
    borderRadius: 18,
    paddingVertical: 8,
    backgroundColor: Colors.dpdRed,
  },
  contactButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});