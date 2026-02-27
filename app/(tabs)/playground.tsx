import { ScrollView, StyleSheet } from "react-native";
import { useState } from "react";
import ActionButtonsRow from "../../components/ui/ActionButtonsRow";


export default function Playground() {
  
  return (
    <ScrollView style={styles.container}>
      <ActionButtonsRow />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
});
