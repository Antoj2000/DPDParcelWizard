import QuickActions from "@/components/home/QuickActions";
import { ScrollView, StyleSheet } from "react-native";
import WelcomeCard from "@/components/home/WelcomeCard";
import DeliveryFeed from "@/components/deliveries/DeliveryFeed";

import { mockDeliveryDetails } from "@/data/mockDeliveryDetails";

export default function Deliveries() {

  const arrivingToday = mockDeliveryDetails.filter((d) => d.status !== "DELIVERED");
  const recentlyDelivered = mockDeliveryDetails.filter((d) => d.status === "DELIVERED");
  return (
    <ScrollView style={styles.container}>
      <WelcomeCard />
      <QuickActions />
      <DeliveryFeed
        arrivingToday={arrivingToday}
        recentlyDelivered={recentlyDelivered}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
});
