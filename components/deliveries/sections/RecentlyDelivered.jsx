import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";
import SectionHeader from "../SectionHeader";
import ParcelCard from "../cards/ParcelCard";
import { useRouter } from "expo-router";

export default function RecentlyDelivered({ parcels }) {
  const router = useRouter();

  return (
    <View style={styles.section}>
      <SectionHeader
        title="Recently Delivered"
        icon={<Ionicons name="checkmark-done" size={14} color={Colors.green} />}
        iconBg="#E7F7EE"
      />

      {parcels.map((p) => (
        <ParcelCard
          key={p.trackingNumber}
          parcel={p}
          onPress={() => router.push(`/${p.trackingNumber}`)}
        />
      ))}
    </View>
  );
}
const styles = StyleSheet.create({
  section: {
    marginBottom: 20,
  },
});
