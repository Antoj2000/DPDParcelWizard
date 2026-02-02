import QuickActions from "@/components/home/QuickActions";
import { ScrollView, StyleSheet } from "react-native";
import WelcomeCard from "@/components/home/WelcomeCard";

export default function DeliveriesHomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <WelcomeCard />
      <QuickActions />
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
