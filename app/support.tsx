import { View, Text, StyleSheet } from "react-native";
import { Colors } from '@/constants/colors'

export default function Support() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Support Page</Text>
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Contact Us</Text>
        <Text style={styles.link}>support@parcelwizard.ie</Text>
        <Text style={styles.link}>0877766382</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Office Hours</Text>
        <Text style={styles.text}>Monday – Friday</Text>
        <Text style={styles.text}>8:00 AM – 6:00 PM</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Common Questions</Text>
        <Text style={styles.text}>• How do I track a parcel?</Text>
        <Text style={styles.text}>• How do I change delivery date?</Text>
        <Text style={styles.text}>• How do I update my address?</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
    color: Colors.darkText,
  },

  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },

  text: {
    fontSize: 14,
    marginBottom: 4,
  },

  link: {
    fontSize: 14,
    color: "blue",
    marginBottom: 6,
  },
});
