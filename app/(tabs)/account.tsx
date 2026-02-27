import { ScrollView, StyleSheet } from "react-native";
import { useState } from "react";
import AccountDropdown from "@/components/account/AccountDropdown";
import AccountDetails from "@/components/account/panels/AccountDetails";
import MobileNumbers from "@/components/account/panels/MobileNumbers";
import EmailAddresses from "@/components/account/panels/EmailAddresses";

export default function Account() {
  const [isOpenAccount, setIsOpenAccount] = useState(true);
  const [isOpenMobile, setIsOpenMobile] = useState(false);
  const [isOpenEmail, setIsOpenEmail] = useState(false);

  function handleToggleAccount() {
    setIsOpenAccount((prev) => !prev);
  }

  function handleToggleMobile() {
    setIsOpenMobile((prev) => !prev);
  }
  function handleToggleEmail() {
    setIsOpenEmail((prev) => !prev);
  }
  return (
    <ScrollView style={styles.container}>
      <AccountDropdown
        icon="person-outline"
        title="Account Details"
        subtitle="Manage your Parcel Wizard details"
        onToggle={handleToggleAccount}
        isOpen={isOpenAccount}
      >
        <AccountDetails />
      </AccountDropdown>
      <AccountDropdown
        icon="call-outline"
        title="Mobile Numbers"
        subtitle="Manage your default phone numbers "
        onToggle={handleToggleMobile}
        isOpen={isOpenMobile}
      >
        <MobileNumbers />
      </AccountDropdown>
      <AccountDropdown
        icon="mail-outline"
        title="Email Addresses"
        subtitle="Manage your default email addresses "
        onToggle={handleToggleEmail}
        isOpen={isOpenEmail}
      >
        <EmailAddresses />
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
