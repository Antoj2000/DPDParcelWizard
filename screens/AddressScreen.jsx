import { View, StyleSheet, FlatList, Alert } from "react-native";
import CardTitle from "@/components/ui/CardTitle";
import AddressCard from "@/components/addresses/AddressCard";
import IconButton from "@/components/ui/IconButton";
import { useState } from "react";
import NewAddressForm from "@/components/addresses/NewAddressForm";
import { MOCK_ADDRESSES } from "@/data/mockAddresses";
import { Colors } from "@/constants/colors";

export default function AddressScreen() {
  const [showModal, setShowModal] = useState(false);
  const [addresses, setAddresses] = useState(MOCK_ADDRESSES);

  const [editingAddress, setEditingAddress] = useState(null);

  function openAddModal() {
    setEditingAddress(null);
    setShowModal(true);
  }

  function openEditModal(address) {
    setEditingAddress(address);
    setShowModal(true);
  }

  function handleCancel() {
    setEditingAddress(null);
    setShowModal(false);
  }

  function handleSubmit(formValues) {
    if (editingAddress) {
      // EDIT
      setAddresses((prev) =>
        prev.map((a) =>
          a.id === editingAddress.id ? { ...a, ...formValues } : a,
        ),
      );
    } else {
      // ADD
      const addressToAdd = {
        id: Date.now().toString(),
        type: "home",
        isDefault: false,
        ...formValues,
      };

      setAddresses((prev) => [addressToAdd, ...prev]);
    }

    setShowModal(false);
    setEditingAddress(null);
  }

  function handleDelete(address) {
    if (address.isDefault) {
      Alert.alert(
        "Can't delete default address",
        "Set another address as default before deleting this one.",
      );
      return;
    }

    Alert.alert(
      "Delete address?",
      `Remove "${address.title}" from your address book?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setAddresses((prev) => prev.filter((a) => a.id !== address.id));
          },
        },
      ],
    );
  }

  return (
    <View style={styles.rootContainer}>
      {/* <CardTitle
        icon="map-outline"
        text="Address Book"
        subText="Manage your delivery addresses"
      /> */}
      <View style={styles.addButton}>
        <IconButton
          icon="add"
          size={24}
          color="white"
          onPress={openAddModal}
          label="Add New Address"
          textStyle={{ color: "white", fontWeight: "600", fontSize: 15 }}
        />
        {showModal && (
          <NewAddressForm 
            onCancel={handleCancel}
            onSubmit={handleSubmit}
            initialValues={editingAddress}
          />
        )}
      </View>
      <FlatList
        data={addresses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <AddressCard
            address={item}
            onEdit={openEditModal}
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
    marginTop: 16,
    borderColor: "red",
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: Colors.dpdRed,
    width: "100%",
  },
});
