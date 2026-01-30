import { View, StyleSheet, FlatList } from "react-native";
import CardTitle from "@/components/ui/CardTitle";
import AddressCard from "@/components/addresses/AddressCard";
import IconButton from "@/components/ui/IconButton";
import { useState } from "react";
import NewAddressForm from "@/components/addresses/NewAddressForm";
import { MOCK_ADDRESSES } from "@/data/mockAddresses";

export default function AddressScreen() {
  const [showModal, setShowModal] = useState(false);

  function handleCancel() {
    setShowModal(false);
  }

  function handleEdit(addressId) {
    console.log("Edit Address", `Edit pressed for ${addressId}`);
  }

  function handleDelete(addressId) {
    console.log("Delete Address", `Delete pressed for ${addressId}`);
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
        {showModal && <NewAddressForm onCancel={handleCancel} />}
      </View>
      <FlatList
        data={MOCK_ADDRESSES}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <AddressCard
            address={item}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      />
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
