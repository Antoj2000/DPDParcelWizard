import AddressDropdownOption from "@/components/addresses/AddressDropdownOption";
import { Colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import { Keyboard, Pressable, StyleSheet, Text, View } from "react-native";

function formatAddressSummary(address) {
  if (!address) {
    return "";
  }

  const parts = [address.line1, address.line3, address.line4, address.eircode]
    .filter(Boolean)
    .map((part) => String(part).trim())
    .filter(Boolean);

  return parts.join(", ");
}

export default function AddressBookDropdown({
  label = "New Delivery Address",
  hint = "Choose from your saved addresses or enter a new one",
  addresses = [],
  selectedAddressId,
  customAddress,
  onSelectSavedAddress,
  onSelectOther,
  placeholder = "Select from saved addresses or enter custom",
}) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedAddress = useMemo(
    () => addresses.find((address) => address.id === selectedAddressId) || null,
    [addresses, selectedAddressId],
  );

  const selectedText =
    selectedAddress?.title ||
    (customAddress ? formatAddressSummary(customAddress) : "") ||
    placeholder;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      {!!hint && <Text style={styles.hint}>{hint}</Text>}

      <Pressable
        style={styles.trigger}
        onPress={() => {
          Keyboard.dismiss();
          setIsOpen((prev) => !prev);
        }}
      >
        <Text
          style={[
            styles.triggerText,
            !selectedAddress && !customAddress && styles.placeholder,
          ]}
          numberOfLines={1}
        >
          {selectedText}
        </Text>
        <Ionicons
          name={isOpen ? "chevron-up" : "chevron-down"}
          size={20}
          color={Colors.greyText}
        />
      </Pressable>

      {isOpen && (
        <View style={styles.optionsWrap}>
          {addresses.map((address) => (
            <AddressDropdownOption
              key={address.id}
              address={address}
              isSelected={address.id === selectedAddressId}
              onPress={() => {
                setIsOpen(false);
                onSelectSavedAddress?.(address);
              }}
            />
          ))}

          <AddressDropdownOption
            isOther
            isSelected={!selectedAddressId && !!customAddress}
            onPress={() => {
              setIsOpen(false);
              onSelectOther?.();
            }}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  label: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.darkText,
    marginBottom: 4,
  },
  hint: {
    fontSize: 12,
    color: Colors.greyText,
    marginBottom: 8,
  },
  trigger: {
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  triggerText: {
    flex: 1,
    fontSize: 16,
    color: Colors.darkText,
  },
  placeholder: {
    color: "#8B8B8B",
  },
  optionsWrap: {
    marginTop: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    overflow: "hidden",
    backgroundColor: Colors.background,
  },
});
