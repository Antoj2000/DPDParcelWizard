import { useState, useRef } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  ScrollView,
  StyleSheet,
  View,
  Alert,
} from "react-native";
import { Colors } from "@/constants/colors";

import Input from "@/components/ui/Input";
import FormHeader from "@/components/addresses/FormHeader";
import FormFooter from "@/components/addresses/FormFooter";

export default function NewEmailForm({ onCancel, onSubmit, initialValues }) {
  const [email, setEmail] = useState(initialValues?.value || "");

  const emailRef = useRef();

  function submitHandler() {
    const cleanedEmail = email.trim().toLowerCase();

    if (!cleanedEmail) {
      return;
    }

    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanedEmail);

    if (!emailIsValid) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }
    onSubmit({
      ...initialValues,
      value: cleanedEmail,
    });
  }

  const isEditing = !!initialValues;

  return (
    <Modal animationType="slide" transparent>
      <KeyboardAvoidingView style={styles.overlay} behavior="padding">
        <View style={styles.sheet}>
          <FormHeader
            icon="mail-outline"
            title={isEditing ? "Edit Email Address" : "New Email Address"}
            subtitle={
              isEditing
                ? "Update your saved email address"
                : "Add a new email address to your account"
            }
            onClose={onCancel}
          />

          <ScrollView
            contentContainerStyle={styles.content}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <Input
              ref={emailRef}
              label="Email Address"
              placeholder="e.g. youremail@gmail.com"
              textInputConfig={{
                keyboardType: "email-address",
                autoComplete: "email",
                textContentType: "emailAddress",
                autoCapitalize: "none",
                autoCorrect: false,
                onChangeText: setEmail,
                value: email,
                returnKeyType: "done",
                onSubmitEditing: submitHandler,
              }}
            />
          </ScrollView>

          <FormFooter onCancel={onCancel} onSubmit={submitHandler} />
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "flex-end",
  },

  sheet: {
    backgroundColor: Colors.background,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    borderWidth: 2,
    borderColor: "#EFEFF3",
    maxHeight: "90%",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
  },

  content: {
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
});
