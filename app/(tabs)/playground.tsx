import { ScrollView, StyleSheet } from "react-native";
import TrackingBox from "@/components/header/TrackingBox";


export default function Playground() {
  return (
    <ScrollView style={styles.container}>
      <TrackingBox />
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
