import { ScrollView, StyleSheet } from "react-native";
import DeliveryFeed from "@/components/deliveries/DeliveryFeed";
import { arrivingToday} from "@/data/mockDeliveries";
import { Colors } from '@/constants/colors'

export default function Playground() {
  return (
    <ScrollView style={styles.container}>
      <DeliveryFeed arrivingToday={arrivingToday} />
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
