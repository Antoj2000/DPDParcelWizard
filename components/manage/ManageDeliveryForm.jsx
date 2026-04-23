import { useRef, useState } from "react";
import {
    KeyboardAvoidingView,
    Modal,
    ScrollView,
    StyleSheet,
    View,
} from "react-native";

import FormFooter from "@/components/addresses/FormFooter";
import FormHeader from "@/components/addresses/FormHeader";
import Input from "@/components/ui/Input";
import { Colors } from "@/constants/colors";

function isValidDateKey(dateText) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateText)) {
    return false;
  }

  const [yearText, monthText, dayText] = dateText.split("-");
  const year = Number(yearText);
  const month = Number(monthText);
  const day = Number(dayText);
  const parsed = new Date(year, month - 1, day);

  return (
    parsed.getFullYear() === year &&
    parsed.getMonth() === month - 1 &&
    parsed.getDate() === day
  );
}

export default function ManageDeliveryForm({ parcel, onCancel, onSubmit }) {
  const [inputValues, setInputValues] = useState({
    expectedAt: parcel?.expectedAt || "",
    line1: parcel?.address?.line1 || "",
    line2: parcel?.address?.line2 || "",
    line3: parcel?.address?.line3 || "",
    line4: parcel?.address?.line4 || "",
    eircode: parcel?.address?.eircode || "",
  });

  const line1Ref = useRef();
  const line2Ref = useRef();
  const line3Ref = useRef();
  const line4Ref = useRef();
  const eircodeRef = useRef();

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputValues((current) => ({
      ...current,
      [inputIdentifier]: enteredValue,
    }));
  }

  function submitHandler() {
    const expectedAt = inputValues.expectedAt.trim();
    const line1 = inputValues.line1.trim();
    const line2 = inputValues.line2.trim();
    const line3 = inputValues.line3.trim();
    const line4 = inputValues.line4.trim();
    const eircode = inputValues.eircode.trim().toUpperCase();

    if (!expectedAt || !line1 || !line4 || !eircode) {
      return;
    }

    if (!isValidDateKey(expectedAt)) {
      return;
    }

    onSubmit({
      expectedAt,
      address: {
        line1,
        line2,
        line3,
        line4,
        eircode,
      },
    });
  }

  return (
    <Modal animationType="slide" transparent>
      <KeyboardAvoidingView style={styles.overlay} behavior="padding">
        <View style={styles.sheet}>
          <FormHeader
            icon="create-outline"
            title="Manage Delivery"
            subtitle="Change delivery date or destination address"
            onClose={onCancel}
          />

          <ScrollView
            contentContainerStyle={styles.content}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <Input
              label="Delivery Date"
              placeholder="YYYY-MM-DD"
              textInputConfig={{
                onChangeText: (v) => inputChangedHandler("expectedAt", v),
                value: inputValues.expectedAt,
                autoCapitalize: "none",
                autoCorrect: false,
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
