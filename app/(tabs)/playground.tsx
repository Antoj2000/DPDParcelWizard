import { ScrollView, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SectionHeader from "@/components/deliveries/SectionHeader";
import ParcelCard from "@/components/deliveries/cards/ParcelCard";
import { Colors } from '@/constants/colors'

export default function Playground() {
  return (
    <ScrollView style={styles.container}>
      <SectionHeader
        title="Arriving Today"
        icon={<Ionicons name="cube-outline" size={14} color={Colors.dpdRed} iconBg = {Colors.bgIcon}/>}
        iconBg="#FDEBEC"
      />
      <ParcelCard />
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
