import FaqAccordionList from "@/components/support/FaqAccordionList";
import FaqSectionTabs from "@/components/support/FaqSectionTabs";
import { Colors } from "@/constants/colors";
import { FAQ_SECTIONS, getFaqItemsBySection } from "@/data/faqData";
import { useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function Support() {
  const [selectedSection, setSelectedSection] = useState(FAQ_SECTIONS[0].id);

  const sectionItems = useMemo(
    () => getFaqItemsBySection(selectedSection),
    [selectedSection],
  );

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Contact Us</Text>
        <Text style={styles.link}>support@parcelwizard.ie</Text>
        <Text style={styles.link}>0877766382</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Office Hours</Text>
        <Text style={styles.text}>Monday - Friday</Text>
        <Text style={styles.text}>8:00 AM - 6:00 PM</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>

        <FaqSectionTabs
          sections={FAQ_SECTIONS}
          selectedSection={selectedSection}
          onSelectSection={setSelectedSection}
        />

        <FaqAccordionList items={sectionItems} resetKey={selectedSection} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    padding: 20,
    paddingBottom: 26,
    backgroundColor: Colors.lightGray,
  },

  card: {
    backgroundColor: Colors.background,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "600",
    marginBottom: 12,
    color: Colors.darkText,
  },

  text: {
    fontSize: 14,
    marginBottom: 4,
    color: Colors.darkText,
  },

  link: {
    fontSize: 14,
    color: Colors.dpdRed,
    marginBottom: 6,
  },
});
