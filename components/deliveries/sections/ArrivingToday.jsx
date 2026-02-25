import { StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";
import SectionHeader from "../SectionHeader";
import ParcelCard from "../cards/ParcelCard";
import { useRouter } from "expo-router";

export default function ArrivingToday({ parcels }) {
  const router = useRouter();
  return (
    <View style={styles.section}>
      <SectionHeader
        title="Arriving Today"
        icon={
          <Ionicons
            name="cube-outline"
            size={14}
            color={Colors.dpdRed}
            iconBg={Colors.bgIcon}
          />
        }
        iconBg="#FDEBEC"
      />
      {parcels.map((parcel) => (
        <ParcelCard
          key={parcel.trackingNumber}
          parcel={parcel}
          status="Out for Delivery"
          onPress={() => router.push(`/${parcel.trackingNumber}`)}
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
