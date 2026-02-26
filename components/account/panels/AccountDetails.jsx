import { StyleSheet, Text, View } from "react-native";
import { Colors } from "@/constants/colors";
import IconButton from "@/components/ui/IconButton";

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
        <View style={styles.changeButton}>
          <IconButton
            icon="location-outline"
            size={18}
            color={Colors.dpdRed}
            label="Change Address"
            textStyle={styles.buttonText}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Password</Text>
          <Text style={styles.value}>........</Text>
        </View>
        <View style={styles.changeButton}>
          <IconButton
            icon="lock-closed-outline"
            size={18}
            color={Colors.dpdRed}
            label="Change Password"
            textStyle={styles.buttonText}
          />
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
    marginBottom: 4,
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
    borderRadius: 8,
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
  changeButton: {
    marginVertical: 16,
    paddingVertical: 8,
    borderRadius: 8,

    backgroundColor: "#e2e1e1",
  },
  buttonText: {
    color: Colors.darkText,
    fontSize: 14,
    fontWeight: "600",
  },
});
