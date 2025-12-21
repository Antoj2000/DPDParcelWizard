import { View, Text, StyleSheet } from "react-native";
import { Colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import IconButton from "@/components/ui/IconButton";

export default function AddressCard() {
  function editAddressHandler() {
    console.log("Edit button pressed");
  }
  function deleteAddressHandler() {
    console.log("Delete button pressed");
  }
  return (
    <View style={styles.card}>
      <View style={styles.topContainerRow}>
        <View style={styles.colIcon}>
          <Ionicons name="home-outline" size={24} color={Colors.dpdRed} />
        </View>
        <View style={styles.colAddress}>
          <Text style={styles.title}>Address Title</Text>
          <Text style={styles.subtitle}>Address Line 1</Text>
          <Text style={styles.subtitle}>Address Line 3</Text>
          <Text style={styles.eircode}>Eircode</Text>
        </View>
      </View>
      <View style={styles.bottomContainerRow}>
        <View style={styles.editButton}>
          <IconButton
            icon="create-outline"
            color={Colors.dpdRed}
            size={20}
            onPress={editAddressHandler}
            label="Edit"
          />
        </View>
        <View style={styles.deleteButton}>
          <IconButton
            icon="trash-outline"
            color={Colors.dpdRed}
            size={20}
            onPress={deleteAddressHandler}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    padding: 12,
    borderRadius: 12,
    backgroundColor: Colors.bg500,
    borderWidth: 1,
    borderColor: Colors.dpdRed,
  },
  topContainerRow: {
    flexDirection: "row",
    marginBottom: 8,
    padding: 8,
    borderBottomColor: Colors.mutedText,
    borderBottomWidth: 2,
  },
  colIcon: {
    flexDirection: "column",
    height: "45%",
    padding: 4,
    borderRadius: 6,
    backgroundColor: Colors.bgIcon,
  },
  colAddress: {
    paddingHorizontal: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    paddingBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "400",
  },
  eircode: {
    fontSize: 14,
    color: Colors.dpdRed,
  },
  bottomContainerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  editButton: {
    marginVertical: 4,
    paddingVertical: 4,
    borderRadius: 4,
    borderColor: "grey",
    borderWidth: 1,
    backgroundColor: "white",
    width: "70%",
    alignItems: "center",
    justifyContent: "center",
  },
  deleteButton: {
    marginVertical: 4,
    padding: 4,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    borderColor: "grey",
    borderWidth: 1,
    backgroundColor: "white",
    width: "25%",
  },
});
