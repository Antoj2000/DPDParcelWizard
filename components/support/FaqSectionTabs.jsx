import { Colors } from "@/constants/colors";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function FaqSectionTabs({
  sections,
  selectedSection,
  onSelectSection,
}) {
  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {sections.map((section) => {
          const isSelected = section.id === selectedSection;

          return (
            <Pressable
              key={section.id}
              onPress={() => onSelectSection?.(section.id)}
              style={({ pressed }) => [
                styles.pill,
                isSelected ? styles.pillSelected : styles.pillIdle,
                pressed && styles.pressed,
              ]}
            >
              <Text
                style={[
                  styles.pillText,
                  isSelected ? styles.pillTextSelected : styles.pillTextIdle,
                ]}
              >
                {section.label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 14,
  },
  content: {
    gap: 10,
    paddingVertical: 2,
  },
  pill: {
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
  },
  pillSelected: {
    backgroundColor: Colors.dpdRed,
    borderColor: Colors.dpdRed,
  },
  pillIdle: {
    backgroundColor: Colors.background,
    borderColor: Colors.borderLight,
  },
  pillText: {
    fontSize: 12,
    fontWeight: "600",
  },
  pillTextSelected: {
    color: Colors.whiteText,
  },
  pillTextIdle: {
    color: Colors.darkText,
  },
  pressed: {
    opacity: 0.9,
  },
});
