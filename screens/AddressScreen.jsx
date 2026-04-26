import { View, StyleSheet, FlatList, Alert, Text } from "react-native";
import { useState } from "react";
import { Colors } from "@/constants/colors";

import AddressCard from "@/components/addresses/AddressCard";
import IconButton from "@/components/ui/IconButton";
import NewAddressForm from "@/components/addresses/NewAddressForm";
import useAddresses from "@/src/hooks/useAddresses";

export default function AddressScreen() {

  const [showModal, setShowModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  const {
    addresses,
    loading,
    error,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
  } = useAddresses();

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
      updateAddress({
        ...editingAddress,
        ...formValues,
      });
    } else {
      const addressToAdd = {
        id: Date.now().toString(),
        type: "home",
        isDefault: false,
        ...formValues,
      };

      addAddress(addressToAdd);
    }

    handleCancel();
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
            deleteAddress(address.id);
          },
        },
      ],
    );
  }

  function handleSetDefault(address) {
    setDefaultAddress(address.id);
  }

  if (loading) {
    return (
      <View style={styles.centered}>
        <Text>Loading addresses...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.rootContainer}>
      <View style={styles.addButton}>
        <IconButton
          icon="add"
          size={24}
          color="white"
          onPress={openAddModal}
          label="Add New Address"
          textStyle={styles.addButtonText}
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
            onSetDefault={handleSetDefault}
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
    backgroundColor: Colors.background,
  },
  addButton: {
    marginTop: 16,
    borderRadius: 8,
    paddingVertical: 8,
    backgroundColor: Colors.dpdRed,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
