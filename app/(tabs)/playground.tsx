import { ScrollView, StyleSheet } from "react-native";
import { useState } from "react";
import AccountDropdown from "@/components/account/AccountDropdown";
import AccountDetails from "@/components/account/panels/AccountDetails";

export default function Playground() {
  const [isOpen, setIsOpen] = useState(false);

  function handleToggle() {
    setIsOpen((prev) => !prev);
  }
  return (
    <ScrollView style={styles.container}>
      <AccountDropdown
        icon="person-outline"
        title="Account Details"
        subtitle="Parcel Wizard ID: PW109736"
        onToggle={handleToggle}
        isOpen={isOpen}
      >
        <AccountDetails />
      </AccountDropdown>
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
