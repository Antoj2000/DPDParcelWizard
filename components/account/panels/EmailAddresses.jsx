import { StyleSheet, View } from "react-native";
import ContactCard from "../ContactCard";
import IconButton from "@/components/ui/IconButton";
import { Colors } from "@/constants/colors";
export default function EmailAddresses() {
  return (
    <View>
      <ContactCard
        value="johnsonanto2000@gmail.com"
        isPrimary={true}
        onEdit={() => {}}
        onDelete={() => {}}
      />
      <View style={styles.addButton}>
        <IconButton
          icon="add"
          size={24}
          color="white"
          onPress={() => {}}
          label="Add New Address"
          textStyle={styles.addButtonText}
        />
      </View>
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
