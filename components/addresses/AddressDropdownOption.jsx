import { Colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

function buildAddressSubtitle(address) {
  if (!address) {
    return "";
  }

  const parts = [address.line1, address.line3, address.line4, address.eircode]
    .filter(Boolean)
    .map((part) => String(part).trim())
    .filter(Boolean);

  return parts.join(", ");
}

export default function AddressDropdownOption({
  address,
  isSelected,
  isOther = false,
  onPress,
}) {
  const iconName = isOther
    ? "add"
    : address?.type === "work"
      ? "briefcase-outline"
      : address?.type === "other"
        ? "location-outline"
        : "home-outline";

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.option,
        isSelected && styles.optionSelected,
        pressed && styles.pressed,
      ]}
    >
      <Ionicons
        name={iconName}
        size={20}
        color={isOther || isSelected ? Colors.dpdRed : Colors.greyText}
      />

      <View style={styles.textWrap}>
        <Text style={[styles.title, isSelected && styles.titleSelected]}>
          {isOther ? "Other..." : address?.title || "Address"}
        </Text>

        {!isOther ? (
          <Text style={styles.subtitle}>{buildAddressSubtitle(address)}</Text>
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  option: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#EDEDED",
    backgroundColor: Colors.background,
  },
  optionSelected: {
    backgroundColor: Colors.softPink,
  },
  textWrap: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
    color: Colors.darkText,
  },
  titleSelected: {
    color: Colors.dpdRed,
  },
  subtitle: {
    marginTop: 2,
    fontSize: 13,
    color: Colors.greyText,
  },
  pressed: {
    opacity: 0.9,
  },
});
