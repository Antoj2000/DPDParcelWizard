import { StyleSheet, Text, View } from "react-native";
import { Colors } from "@/constants/colors";
import IconButton from "@/components/ui/IconButton";
import useAccount from "@/src/hooks/useAccount";

export default function AccountDetails() {
  const { account } = useAccount();

  const defaultAddress = account.addresses?.find((addr) => addr.isDefault);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Parcel Wizard ID</Text>
        <Text style={styles.value}>{account.id || "N/A"}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>
          {account.firstName || account.lastName || "N/A"}
        </Text>
      </View>

      {defaultAddress && (
        <View style={styles.row}>
          <Text style={styles.label}>Default Delivery Address</Text>

          <View style={styles.addressCard}>
            <Text style={styles.addressText}>{defaultAddress.line1}</Text>
            {defaultAddress.line2 && (
              <Text style={styles.addressText}>{defaultAddress.line2}</Text>
            )}
            <Text style={styles.addressText}>{defaultAddress.line3}</Text>
            <Text style={styles.addressText}>{defaultAddress.line4}</Text>
            <Text style={styles.addressEircode}>{defaultAddress.eircode}</Text>
          </View>
        </View>
      )}

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
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },

  row: {
    gap: 2,
    marginBottom: 2,
  },

  label: {
    fontSize: 12,
    color: Colors.mutedText,
    fontWeight: "600",
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
    marginVertical: 4,
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
