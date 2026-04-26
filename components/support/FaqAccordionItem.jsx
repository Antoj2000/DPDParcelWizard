import { Colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function FaqAccordionItem({ item, isOpen, onToggle }) {
  return (
    <View style={styles.item}>
      <Pressable
        onPress={onToggle}
        style={({ pressed }) => [styles.questionRow, pressed && styles.pressed]}
      >
        <Text style={styles.questionText}>{item.question}</Text>
        <Ionicons
          name={isOpen ? "chevron-up" : "chevron-down"}
          size={20}
          color={Colors.greyText}
        />
      </Pressable>

      {isOpen && (
        <View style={styles.answerWrap}>
          <Text style={styles.answerText}>{item.answer}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    borderRadius: 14,
    marginBottom: 12,
    overflow: "hidden",
  },
  questionRow: {
    minHeight: 58,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  questionText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
    color: Colors.darkText,
  },
  answerWrap: {
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#FAFAFA",
  },
  answerText: {
    fontSize: 15,
    lineHeight: 22,
    color: Colors.greyText,
  },
  pressed: {
    opacity: 0.88,
  },
});
