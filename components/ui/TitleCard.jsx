import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";

export default function TitleCard({ icon, text, subText }) {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.row}>
        <View style={styles.content}>
          <Text style={styles.title}>{text}</Text>
        </View>
        <Ionicons name={icon} size={24} color={Colors.dpdRed} />
      </View>
      <Text style={styles.subtitle}>{subText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    padding: 16,
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: "#f7b2b29c",
    borderWidth: 1,
    borderColor: Colors.dpdRed,
  },

  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    // textAlign: "left",
  },
  content: {
    flex: 1,
    paddingRight: 12,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.mutedText,
  },
});
