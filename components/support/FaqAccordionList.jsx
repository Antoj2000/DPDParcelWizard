import FaqAccordionItem from "@/components/support/FaqAccordionItem";
import { Colors } from "@/constants/colors";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function FaqAccordionList({ items, resetKey }) {
  const [openIds, setOpenIds] = useState([]);

  useEffect(() => {
    setOpenIds([]);
  }, [resetKey]);

  function toggleItem(id) {
    setOpenIds((prev) =>
      prev.includes(id)
        ? prev.filter((openId) => openId !== id)
        : [...prev, id],
    );
  }

  if (!items?.length) {
    return <Text style={styles.emptyState}>No questions available yet.</Text>;
  }

  return (
    <View>
      {items.map((item) => (
        <FaqAccordionItem
          key={item.id}
          item={item}
          isOpen={openIds.includes(item.id)}
          onToggle={() => toggleItem(item.id)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  emptyState: {
    fontSize: 14,
    color: Colors.mutedText,
    paddingVertical: 6,
  },
});
