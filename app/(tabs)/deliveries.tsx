import { ScrollView, StyleSheet, Alert } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import WelcomeCard from "@/components/home/WelcomeCard";
import DeliveryFeed from "@/components/deliveries/DeliveryFeed";
import QuickActions from "@/components/home/QuickActions";
import TrackingBox from "@/components/header/TrackingBox";

import useParcels from "@/hooks/useParcels";

export default function Deliveries() {
  const router = useRouter();

  const [isTracking, setIsTracking] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState("");

  const { arrivingToday, recentlyDelivered, loading, error } = useParcels();

  function handleTrackPress() {
    setIsTracking((prev) => !prev);
  }

  function handleTrackSubmit() {
    if (trackingNumber.length !== 9) {
      Alert.alert("Invalid number", "Tracking number must be 9 digits long");
      return;
    }

    router.push(`/${trackingNumber}`);

    setIsTracking(false);
    setTrackingNumber("");
  }

  return (
    <>
      {isTracking && (
        <TrackingBox
          value={trackingNumber}
          onChangeText={setTrackingNumber}
          onSubmit={handleTrackSubmit}
        />
      )}
      <ScrollView style={styles.container}>
        <WelcomeCard />
        <QuickActions onTrackPress={handleTrackPress} />
        <DeliveryFeed
          arrivingToday={arrivingToday}
          recentlyDelivered={recentlyDelivered}
        />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
});
