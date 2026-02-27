import { StyleSheet, View } from "react-native";
import ContactCard from "../ContactCard";
import IconButton from "@/components/ui/IconButton";
import { Colors } from "@/constants/colors";
export default function MobileNumbers() {
  return (
    <View>
      <ContactCard
        value="+353 87 7766 382"
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
          label="Add New Mobile Number"
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
