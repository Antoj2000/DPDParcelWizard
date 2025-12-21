import { View, StyleSheet } from "react-native";
import CardTitle from "@/components/ui/CardTitle";
import AddressCard from "@/components/addresses/AddressCard";
import IconButton from "@/components/ui/IconButton";
import { useState } from "react";
import NewAddressForm from "@/components/addresses/NewAddressForm";

export default function AddressScreen() {
  const [newAddress, setNewAddress] = useState(false);
  const [showModal, setShowModal] = useState(false);

  function addNewAddressHandler() {
    console.log("Add new address");
    setNewAddress(true);
  }

  function cancelHandler() {
    setShowModal(false);
  }
  return (
    <View style={styles.rootContainer}>
      <CardTitle
        icon="map-outline"
        text="Address Book"
        subText="Manage your delivery addresses"
      />
      <View style={styles.addButton}>
        <IconButton
          icon="add"
          size={24}
          color="red"
          onPress={() => setShowModal(true)}
          label="Add New Address"
        />
        {showModal && <NewAddressForm onCancel={cancelHandler} />}
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
  addButton: {
    marginVertical: 4,
    borderColor: "red",
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: "white",
    width: "100%",
  },
});
