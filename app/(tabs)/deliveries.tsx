import QuickActions from "@/components/home/QuickActions";
import { ScrollView, StyleSheet } from "react-native";
import WelcomeCard from "@/components/home/WelcomeCard";
import DeliveryFeed from "@/components/deliveries/DeliveryFeed";

import { arrivingToday, recentlyDelivered } from "@/data/mockDeliveries";

export default function Deliveries() {
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
