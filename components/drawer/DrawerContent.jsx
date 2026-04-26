import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import MenuRow from "@/components/drawer/MenuRow";

export default function DrawerContent() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <MenuRow label="Profile" icon="person-outline" onPress={() => {}} />
        <MenuRow
          label="Address Book"
          icon="book-outline"
          onPress={() => router.push("/addresses")}
        />
        <MenuRow label="Settings" icon="settings-outline" onPress={() => {}} />
        <MenuRow
          label="Notifications"
          icon="notifications-outline"
          onPress={() => router.push("/notifications")}
        />
        <MenuRow
          label="Help & Support"
          icon="help-circle-outline"
          onPress={() => router.push("/support")}
        />

        <View style={styles.divider} />

        <MenuRow
          label="Logout"
          icon="log-out-outline"
          danger
          showChevron={false}
          onPress={() => {}}
        />
      </View>

      <View style={styles.footer}>
        <Text style={styles.version}>DPD Ireland v1.0.0</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ECECEC",
  },
  body: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  divider: {
    height: 1,
    backgroundColor: "#D7D7D7",
    marginHorizontal: 8,
    marginVertical: 10,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: "#D7D7D7",
    paddingVertical: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ECECEC",
  },
  version: {
    color: "#6B7280",
    fontSize: 14,
    fontWeight: "500",
  },
});
