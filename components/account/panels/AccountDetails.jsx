import { StyleSheet, Text, View } from "react-native";
import { Colors } from "@/constants/colors";

export default function AccountDetails() {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Parcel Wizard ID</Text>
        <Text style={styles.value}>PW109736</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>Anthony Johnson</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Delivery Address</Text>

        <View style={styles.addressCard}>
          <Text style={styles.addressText}>50 Valleycourt</Text>
          <Text style={styles.addressText}>Bonnavalley</Text>
          <Text style={styles.addressText}>Athlone</Text>
          <Text style={styles.addressText}>Co. Westmeath</Text>
          <Text style={styles.addressEircode}>N37 P1H2</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },

  row: {
    gap: 2,
    marginBottom: 6,
  },

  label: {
    fontSize: 12,
    color: Colors.mutedText,
    fontWeight: "500",
  },

  value: {
    fontSize: 14,
    color: Colors.darkText,
    fontWeight: "600",
  },
  addressCard: {
    backgroundColor: Colors.softPink, 
    borderRadius: 12,
    marginTop: 6,
    padding: 12,
    gap: 4,
  },

  addressText: {
    fontSize: 13,
    color: Colors.darkText,
    fontWeight: "400",
  },

  addressEircode: {
    marginTop: 4,
    fontSize: 15,
    color: Colors.dpdRed,
    fontWeight: "600",
  },
});
