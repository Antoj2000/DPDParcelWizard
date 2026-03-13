import { useState } from "react";
import { StyleSheet, View, Alert} from "react-native";
import { Colors } from "@/constants/colors";

import ContactCard from "../ContactCard";
import IconButton from "@/components/ui/IconButton";
import NewPhoneForm from "./NewPhoneForm";
import useAccount from "@/src/hooks/useAccount";

export default function MobileNumbers() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingPhone, setEditingPhone] = useState(null);

  const { account, addPhoneNumber, updatePhoneNumber, deletePhoneNumber } =
    useAccount();

  function openAddModal() {
    setEditingPhone(null);
    setIsFormVisible(true);
  }

  function openEditModal(phone) {
    setEditingPhone(phone);
    setIsFormVisible(true);
  }

  function handleCancel() {
    setEditingPhone(null);
    setIsFormVisible(false);
  }

  function handleSubmit(phoneData) {
    if (editingPhone) {
      updatePhoneNumber({
        ...editingPhone,
        ...phoneData,
      });
    } else {
      addPhoneNumber(phoneData);
    }

    handleCancel();
  }

  function handleDelete(phone) {
      if (phone.isPrimary) {
        Alert.alert(
          "Can't delete primary phone number",
          "Set another phone number as primary before deleting this one.",
        );
        return;
      }
  
      Alert.alert(
        "Delete phone number?",
        `Remove "${phone.value}" from your phone numbers?`,
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Delete",
            style: "destructive",
            onPress: () => {
              deletePhoneNumber(phone.id);
            },
          },
        ],
      );
    }

  return (
    <View>
      {account.mobileNumbers.map((phone) => (
        <ContactCard
          key={phone.id}
          value={phone.value}
          isPrimary={phone.isPrimary}
          onEdit={() => openEditModal(phone)}
          onDelete={() => handleDelete(phone)}
        />
      ))}
      <View style={styles.addButton}>
        <IconButton
          icon="add"
          size={24}
          color="white"
          onPress={openAddModal}
          label="Add New Mobile Number"
          textStyle={styles.addButtonText}
        />
      </View>
      {isFormVisible && (
        <NewPhoneForm
          onCancel={handleCancel}
          onSubmit={handleSubmit}
          initialValues={editingPhone}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  addButton: {
    marginTop: 2,
    borderRadius: 16,
    paddingVertical: 4,
    backgroundColor: Colors.dpdRed,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },
});
