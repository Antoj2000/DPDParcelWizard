import { View, Text, StyleSheet, Pressable, TextInput } from "react-native";
import { Colors } from "@/constants/colors";
//import { SafeAreaView } from 'react-native-safe-area-context'

export default function DpdHeader({ title }) {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search tracking number..."
          placeholderTextColor="#999"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dpdRed, // DPD red
    paddingTop: 56, // status bar safe
    paddingHorizontal: 16,
    paddingBottom: 16,
    // borderBottomLeftRadius: 12,
    // borderBottomRightRadius: 24,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "600",
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingHorizontal: 12,
    height: 44,
  },

  searchIcon: {
    marginRight: 6,
  },

  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#333",
  },
});
