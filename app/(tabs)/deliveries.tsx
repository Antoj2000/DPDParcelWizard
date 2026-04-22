import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Keyboard } from "react-native";

import DeliveryFeed from "@/components/deliveries/DeliveryFeed";
import TrackingBox from "@/components/header/TrackingBox";
import QuickActions from "@/components/home/QuickActions";
import WelcomeCard from "@/components/home/WelcomeCard";
import SlideDownPanel from "@/components/ui/SlideDownPanel";
import useParcels from "@/src/hooks/useParcels";

export default function Deliveries() {
  const router = useRouter();

  const [isTracking, setIsTracking] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState("");

  const { arrivingToday, recentlyDelivered } = useParcels();

  function handleTrackPress() {
    setIsTracking((prev) => {
      const next = !prev;
      if (!next) Keyboard.dismiss();
      return next;
    });
  }

  function handleTrackSubmit() {
    Keyboard.dismiss();
    router.push(`/${trackingNumber}`);
    setIsTracking(false);
    setTrackingNumber("");
  }

  return (
    <>
      <SlideDownPanel
        isOpen={isTracking}
        onClose={() => setIsTracking(false)}
        headerOffset={0}
        maxHeight={88}
        duration={320}
      >
        <TrackingBox
          value={trackingNumber}
          onChangeText={setTrackingNumber}
          onSubmit={handleTrackSubmit}
          isOpen={isTracking}
        />
      </SlideDownPanel>

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
