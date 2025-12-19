import { View, Text, StyleSheet, Button } from "react-native";
import CardTitle from "@/components/ui/CardTitle";
import AddressCard from "@/components/addresses/AddressCard";

export default function AddressScreen() {
  function addNewAddressHandler() {
    console.log("Add new address");
  }
  return (
    <View style={styles.rootContainer}>
      <CardTitle
        icon="map-outline"
        text="Address Book"
        subText="Manage your delivery addresses"
      />
      <View>
        <Text>Add new address button</Text>
        <Button title="Add new Address" onPress={addNewAddressHandler} />
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
