import { ScrollView, StyleSheet } from "react-native";

import PodImage from "../../components/deliveries/details/PodImage";

export default function Playground() {
  return (
    <ScrollView style={styles.container}>
      <PodImage />
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
