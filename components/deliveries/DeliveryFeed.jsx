import { StyleSheet, View } from "react-native";
import ArrivingToday from "./sections/ArrivingToday";
export default function DeliveryFeed({ arrivingToday }) {
  return (
    <View style={styles.container}>
      <ArrivingToday parcels={arrivingToday} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingBottom: 30,
  },
});
