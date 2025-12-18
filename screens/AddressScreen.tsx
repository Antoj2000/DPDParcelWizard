import { View, Text, StyleSheet } from "react-native";
import Title from "@/components/header/Title";
import TitleCard from "@/components/ui/TitleCard";

export default function AddressScreen() {
  return (
    <View style={styles.rootContainer}>
      <Title>Address Screen</Title>
      <TitleCard
        icon="map-outline"
        text="Address Book"
        subText="Manage your delivery addresses"
      />
      <View>
        <Text>Add new address button</Text>
      </View>
      <View>
        <Text>Address Card DEFAULT</Text>
        <Text>Other address cards</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: "white",
  },
});
