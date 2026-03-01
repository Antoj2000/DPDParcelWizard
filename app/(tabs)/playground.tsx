import { ScrollView, StyleSheet } from "react-native";

import PodImage from "../../components/deliveries/details/PodImage";
import TrackingHistory from "../../components/deliveries/details/TrackingHistory";
import SectionCard from "@/components/deliveries/details/SectionCard";
import TimelineItem from "@/components/deliveries/details/TimelineItem";

export default function Playground() {
  return (
    <ScrollView style={styles.container}>
      <SectionCard title="Tracking History">
        <TimelineItem />
        <TimelineItem />
      </SectionCard>
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
