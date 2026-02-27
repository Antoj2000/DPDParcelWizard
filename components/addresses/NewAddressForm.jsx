import { useState, useRef } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Colors } from "@/constants/colors";
import Input from "../ui/Input";
import FormHeader from "./FormHeader";
import FormFooter from "./FormFooter";

export default function NewAddressForm({ onCancel, onSubmit, initialValues }) {
  const [inputValues, setInputValues] = useState({
    title: initialValues?.title || "",
    line1: initialValues?.line1 || "",
    line2: initialValues?.line2 || "",
    line3: initialValues?.line3 || "",
    line4: initialValues?.line4 || "",
    eircode: initialValues?.eircode || "",
  });

  const line1Ref = useRef();
  const line2Ref = useRef();
  const line3Ref = useRef();
  const line4Ref = useRef();
  const eircodeRef = useRef();

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputValues((curInputValues) => {
      return {
        ...curInputValues,
        [inputIdentifier]: enteredValue,
      };
    });
  }

  function submitHandler() {
    if (
      !inputValues.title.trim() ||
      !inputValues.line1.trim() ||
      !inputValues.line4.trim() ||
      !inputValues.eircode.trim()
    ) {
      return;
    }
    onSubmit({
      ...inputValues,
      eircode: inputValues.eircode.trim().toUpperCase(),
    });
  }

  const isEditing = !!initialValues;

  return (
    <Modal animationType="slide" transparent>
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior="padding"
        
      >
        <View style={styles.sheet}>
          <FormHeader
            icon="map-outline"
            title={isEditing ? "Edit Address" : "New Address"}
            subtitle={
              isEditing
                ? "Update your saved delivery address"
                : "Add a new delivery address to your book"
            }
            onClose={onCancel}
          />

          <ScrollView
            contentContainerStyle={styles.content}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <Input
              label="Title"
              placeholder="e.g. Home, Work, Mam's"
              textInputConfig={{
                onChangeText: (v) => inputChangedHandler("title", v),
                value: inputValues.title,
                returnKeyType: "next",
                blurOnSubmit: false,
                onSubmitEditing: () => line1Ref.current?.focus(),
              }}
            />

            <Input
              ref={line1Ref}
              label="Address Line 1"
              placeholder="House number + street"
              textInputConfig={{
                autoComplete: "address-line1",
                onChangeText: (v) => inputChangedHandler("line1", v),
                value: inputValues.line1,
                returnKeyType: "next",
                blurOnSubmit: false,
                onSubmitEditing: () => line2Ref.current?.focus(),
              }}
            />

            <Input
              ref={line2Ref}
              label="Address Line 2"
              placeholder="Area (Optional)"
              textInputConfig={{
                autoComplete: "off",
                onChangeText: (v) => inputChangedHandler("line2", v),
                value: inputValues.line2,
                returnKeyType: "next",
                blurOnSubmit: false,
                onSubmitEditing: () => line3Ref.current?.focus(),
              }}
            />

            <Input
              ref={line3Ref}
              label="Address Line 3"
              placeholder="Town / city"
              textInputConfig={{
                textContentType: "addressCity",
                onChangeText: (v) => inputChangedHandler("line3", v),
                value: inputValues.line3,
                returnKeyType: "next",
                blurOnSubmit: false,
                onSubmitEditing: () => line4Ref.current?.focus(),
              }}
            />

            <Input
              ref={line4Ref}
              label="Address Line 4"
              placeholder="County"
              textInputConfig={{
                textContentType: "addressState",
                onChangeText: (v) => inputChangedHandler("line4", v),
                value: inputValues.line4,
                returnKeyType: "next",
                blurOnSubmit: false,
                onSubmitEditing: () => eircodeRef.current?.focus(),
              }}
            />

            <Input
              ref={eircodeRef}
              label="Eircode"
              placeholder="e.g. D02 X285"
              textInputConfig={{
                autoComplete: "postal-code",
                onChangeText: (v) => inputChangedHandler("eircode", v),
                value: inputValues.eircode,
                autoCapitalize: "characters",
                maxLength: 8,
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
