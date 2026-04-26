import { useMemo, useState } from "react";
import {
    KeyboardAvoidingView,
    Modal,
    ScrollView,
    StyleSheet,
    View,
} from "react-native";

import AddressBookDropdown from "@/components/addresses/AddressBookDropdown";
import FormFooter from "@/components/addresses/FormFooter";
import FormHeader from "@/components/addresses/FormHeader";
import NewAddressForm from "@/components/addresses/NewAddressForm";
import Input from "@/components/ui/Input";
import { Colors } from "@/constants/colors";
import useAddresses from "@/src/hooks/useAddresses";

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
  const { addresses } = useAddresses();

  const initialCustomAddress = useMemo(
    () => ({
      line1: parcel?.address?.line1 || "",
      line2: parcel?.address?.line2 || "",
      line3: parcel?.address?.line3 || "",
      line4: parcel?.address?.line4 || "",
      eircode: parcel?.address?.eircode || "",
    }),
    [parcel],
  );

  const [inputValues, setInputValues] = useState({
    expectedAt: parcel?.expectedAt || "",
  });
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [customAddress, setCustomAddress] = useState(initialCustomAddress);
  const [showCustomAddressForm, setShowCustomAddressForm] = useState(false);

  const selectedSavedAddress = useMemo(
    () => addresses.find((address) => address.id === selectedAddressId) || null,
    [addresses, selectedAddressId],
  );

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputValues((current) => ({
      ...current,
      [inputIdentifier]: enteredValue,
    }));
  }

  function submitHandler() {
    const expectedAt = inputValues.expectedAt.trim();
    const resolvedAddress = selectedSavedAddress || customAddress;
    const line1 = resolvedAddress?.line1?.trim() || "";
    const line2 = resolvedAddress?.line2?.trim() || "";
    const line3 = resolvedAddress?.line3?.trim() || "";
    const line4 = resolvedAddress?.line4?.trim() || "";
    const eircode = resolvedAddress?.eircode?.trim().toUpperCase() || "";

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
                returnKeyType: "done",
                onSubmitEditing: submitHandler,
              }}
            />

            <AddressBookDropdown
              addresses={addresses}
              selectedAddressId={selectedAddressId}
              customAddress={customAddress}
              onSelectSavedAddress={(address) => {
                setSelectedAddressId(address.id);
              }}
              onSelectOther={() => {
                setSelectedAddressId(null);
                setShowCustomAddressForm(true);
              }}
            />
          </ScrollView>

          <FormFooter onCancel={onCancel} onSubmit={submitHandler} />
        </View>
      </KeyboardAvoidingView>

      {showCustomAddressForm && (
        <NewAddressForm
          onCancel={() => setShowCustomAddressForm(false)}
          onSubmit={(values) => {
            setCustomAddress(values);
            setSelectedAddressId(null);
            setShowCustomAddressForm(false);
          }}
          initialValues={customAddress}
          requireTitle={false}
          title="Custom Delivery Address"
          subtitle="Enter a one-time delivery address"
        />
      )}
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
