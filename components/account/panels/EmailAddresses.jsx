import { useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { Colors } from "@/constants/colors";

import ContactCard from "../ContactCard";
import IconButton from "@/components/ui/IconButton";
import NewEmailForm from "./NewEmailForm";
import useAccount from "@/src/hooks/useAccount";

export default function EmailAddresses() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingEmail, setEditingEmail] = useState(null);

  const { account, addEmailAddress, updateEmailAddress, deleteEmailAddress } =
    useAccount();

  function openAddModal() {
    setEditingEmail(null);
    setIsFormVisible(true);
  }

  function openEditModal(email) {
    setEditingEmail(email);
    setIsFormVisible(true);
  }

  function handleCancel() {
    setEditingEmail(null);
    setIsFormVisible(false);
  }

  function handleSubmit(emailData) {
    if (editingEmail) {
      updateEmailAddress({
        ...editingEmail,
        ...emailData,
      });
    } else {
      addEmailAddress(emailData);
    }

    handleCancel();
  }

  function handleDelete(email) {
    if (email.isPrimary) {
      Alert.alert(
        "Can't delete primary email address",
        "Set another email address as primary before deleting this one.",
      );
      return;
    }

    Alert.alert(
      "Delete email address?",
      `Remove "${email.value}" from your email addresses?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            deleteEmailAddress(email.id);
          },
        },
      ],
    );
  }

  return (
    <View>
      {account.emails.map((email) => (
        <ContactCard
          key={email.id}
          value={email.value}
          isPrimary={email.isPrimary}
          onEdit={() => openEditModal(email)}
          onDelete={() => handleDelete(email)}
        />
      ))}
      <View style={styles.addButton}>
        <IconButton
          icon="add"
          size={24}
          color="white"
          onPress={openAddModal}
          label="Add New Address"
          textStyle={styles.addButtonText}
        />
      </View>
      {isFormVisible && (
        <NewEmailForm
          onCancel={handleCancel}
          onSubmit={handleSubmit}
          initialValues={editingEmail}
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
