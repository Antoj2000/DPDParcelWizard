import { View, Text, StyleSheet } from "react-native";
import TitleCard from "@/components/ui/TitleCard";
import AddressCard from "@/components/addresses/AddressCard";

export default function AddressScreen() {
  return (
    <View style={styles.rootContainer}>
      <TitleCard
        icon="map-outline"
        text="Address Book"
        subText="Manage your delivery addresses"
      />
      <View>
        <Text>Add new address button</Text>
      </View>
      <AddressCard />
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "white",
  },
});
