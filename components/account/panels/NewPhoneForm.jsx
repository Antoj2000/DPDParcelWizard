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

const PREFIX = "+353 ";

export default function NewPhoneForm({ onCancel, onSubmit, initialValues }) {
  const [phoneNumber, setPhoneNumber] = useState(
    initialValues?.value || PREFIX,
  );

  const phoneRef = useRef();

  function handleChange(text) {
    if (!text.startsWith(PREFIX)) {
      text = PREFIX + text.replace("+353", "").trim();
    }

    const digits = text.slice(PREFIX.length).replace(/[^0-9]/g, "");

    setPhoneNumber(PREFIX + digits);
  }

  function submitHandler() {
    const digits = phoneNumber.slice(PREFIX.length);

    if (!digits) {
      return;
    }

    if (digits.length !== 9) {
      Alert.alert("Invalid Number", "Please enter a valid mobile number.");
      return;
    }

    onSubmit({
      ...initialValues,
      value: phoneNumber,
    });
  }

  const isEditing = !!initialValues;

  return (
    <Modal animationType="slide" transparent>
      <KeyboardAvoidingView style={styles.overlay} behavior="padding">
        <View style={styles.sheet}>
          <FormHeader
            icon="call-outline"
            title={isEditing ? "Edit Mobile Number" : "New Mobile Number"}
            subtitle={
              isEditing
                ? "Update your saved mobile number"
                : "Add a new mobile number to your account"
            }
            onClose={onCancel}
          />

          <ScrollView
            contentContainerStyle={styles.content}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <Input
              ref={phoneRef}
              label="Mobile Number"
              placeholder="e.g. +353 87 123 4567"
              textInputConfig={{
                keyboardType: "phone-pad",
                autoComplete: "tel",
                textContentType: "telephoneNumber",
                onChangeText: handleChange,
                value: phoneNumber,
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
