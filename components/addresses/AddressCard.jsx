import { View, Text, StyleSheet } from "react-native";
import { Colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";

export default function AddressCard() {
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
        <Text style={styles.editButton}>EDIT</Text>
        <Text style={styles.deleteButton}>DELETE</Text>
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
    maxHeight: "45%",
    padding: 4,
    borderRadius: 6,
    backgroundColor: "#db8585ff",
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
    justifyContent: "space-between"
  },
  editButton: {
    marginVertical: 4,
    padding: 6,
    borderRadius: 4,
    borderColor: "grey", 
    borderWidth: 1,
    backgroundColor: "white",
    width: "70%",
    textAlign: "center",
    
  },
  deleteButton: {
    marginVertical: 4,
    padding: 6,
    borderRadius: 4,
    borderColor: "grey",
    borderWidth: 1,
    backgroundColor: "white",
    width: "25%",
    textAlign: "center",
  },
});
