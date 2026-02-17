import { StyleSheet, View } from "react-native";
import ArrivingToday from "./sections/ArrivingToday";
import RecentlyDelivered from "./sections/RecentlyDelivered";
export default function DeliveryFeed({ arrivingToday, recentlyDelivered }) {
  return (
    <View style={styles.container}>
      <ArrivingToday parcels={arrivingToday} />
      <RecentlyDelivered parcels={recentlyDelivered} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingBottom: 30,
  },
});
