import { useState } from "react";
import {
  Alert,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAccountData } from "@/src/hooks/useAccountData";
import {
  Colors as c,
  GlobalStyles as g,
  ButtonStyles as b,
  ModalStyles as m,
} from "@/src/styles";
import { clearLoggedIn } from "@/src/auth/auth";
import { router } from "expo-router";

// AJ : Main screen component
export default function AccountScreen() {
  // AJ: Uses the useState hook to create a piece of state called expanded, starts as false, setExpanded is used to toggle
  const [expandedAccount, setExpandedAccount] = useState(false);
  const [expandedPhone, setExpandedPhone] = useState(false);
  const [expandedEmail, setExpandedEmail] = useState(false);

  // Pull in account data and the updateAddress function from our custom hook
  const { loading, profile, updateAddress, addPhone } = useAccountData();

  // Modal state for adding a new phone number
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [newPhone, setNewPhone] = useState("");

  // Handler for when the user presses "Change Address"
  const onChangeAddress = async () => {
    if (!profile) return;

    //Switches between demo addresses
    const demoAddress =
      profile.address.line1 === "123 Grafton Street"
        ? {
            line1: "45 Connell Street",
            city: "Dublin 1",
            county: "Dublin",
            eircode: "D01 ABC1",
          }
        : {
            line1: "123 Grafton Street",
            city: "Dublin 2",
            county: "Dublin",
            eircode: "D02 XY45",
          };

    await updateAddress(demoAddress);
    //Confirmation popup
    Alert.alert(
      "Address Updated",
      "This is a demo update using the service mock"
    );
  };

  // Handle adding the typed phone number
  const handleAddPhone = async () => {
    if (!newPhone.trim()) {
      Alert.alert("Missing number", "Please enter a valid phone number.");
      return;
    }

    await addPhone({ label: "Other", phoneNumber: newPhone });
    setShowPhoneModal(false); // close modal
    setNewPhone(""); // clear input
    Alert.alert("Phone Added", `Added ${newPhone}`);
  };

  // Loading Screen
  if (loading || !profile) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Ionicons name="time-outline" size={28} />
        <Text style={{ marginTop: 8 }}>Loading…</Text>
      </View>
    );
  }

  // Once profile is loaded, render the real screen content
  return (
    <ScrollView style={g.container}>
      {" "}
      {/*Enables vertical scrolling if content overflows */}
      <View style={g.header}>
        <Ionicons name="person-circle-outline" size={64} color={c.dpdRed} />
        <Text style={g.title}>Account Settings</Text>
        <Text style={g.subtitle}>Manage your Parcel Wizard details</Text>
      </View>
      {/* ======== Account Details ==========*/}
      <TouchableOpacity
        style={g.sectionHeader}
        onPress={() => setExpandedAccount(!expandedAccount)} //Toggle expanded state on press
        activeOpacity={0.8}
      >
        <Text style={g.sectionTitle}>Account Details</Text>
        <Ionicons
          name={expandedAccount ? "chevron-up" : "chevron-down"} //Icon changes based on expanded state
          size={20}
          color="#666"
        />
      </TouchableOpacity>
      {expandedAccount && ( //AJ : Only renders when expanded is true
        <View style={g.sectionContent}>
          <Text style={g.label}>ParcelWizardID</Text>
          <Text style={g.value}>{profile.pwid}</Text>

          <Text style={g.label}>Name</Text>
          <Text style={g.value}>{profile.name}</Text>

          <Text style={g.label}>Address</Text>
          <Text style={g.value}>
            {profile.address.line1}, {profile.address.city},{" "}
            {profile.address.county}, {profile.address.eircode}
          </Text>

          {/*Change address button */}
          <TouchableOpacity
            style={[b.base, b.primary, { marginTop: 8 }]}
            onPress={onChangeAddress}
          >
            <Text style={b.text}>
              <Ionicons name="map-outline" size={16} color="white" /> Change
              Address (demo)
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {/* ============ Phone Numbers Section ==============*/}
      <TouchableOpacity
        style={g.sectionHeader}
        onPress={() => setExpandedPhone(!expandedPhone)}
        activeOpacity={0.8}
      >
        <Text style={g.sectionTitle}>Phone Numbers</Text>
        <Ionicons
          name={expandedPhone ? "chevron-up" : "chevron-down"} //Icon changes based on expanded state
          size={20}
          color="#666"
        />
      </TouchableOpacity>
      {expandedPhone && (
        <View style={g.sectionContent}>
          {/* List all phone numbers */}
          {profile.phones.map((p) => (
            <View key={p.id}>
              <Text style={g.label}>{p.label}</Text>
              <Text style={g.value}>{p.phoneNumber}</Text>
            </View>
          ))}
          {/* Add new phone button */}
          <TouchableOpacity
            style={[b.base, b.primary]}
            onPress={() => setShowPhoneModal(true)}
          >
            <Text style={b.text}>
              <Ionicons name="add-circle-outline" size={16} color="white" />
              Add Phone Number
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {/* ============= MODAL FOR ENTERING PHONE NUMBER ============= */}
      <Modal
        visible={showPhoneModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowPhoneModal(false)}
      >
        {/* Dark background overlay */}
        <View style={m.overlay}>
          <View style={m.content}>
            <Text style={m.title}>Add Phone Number</Text>

            <TextInput
              style={m.input}
              placeholder="+353 87 123 4567"
              keyboardType="phone-pad"
              value={newPhone}
              onChangeText={setNewPhone}
            />

            <View style={m.buttons}>
              <TouchableOpacity
                style={[m.button, { backgroundColor: "#888" }]}
                onPress={() => setShowPhoneModal(false)}
              >
                <Text style={m.buttonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[m.button, { backgroundColor: "#ff0000ff" }]}
                onPress={handleAddPhone}
              >
                <Text style={m.buttonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {/*Email Section */}
      <TouchableOpacity
        style={g.sectionHeader}
        onPress={() => setExpandedEmail(!expandedEmail)}
        activeOpacity={0.8}
      >
        <Text style={g.sectionTitle}>Email Addresses</Text>
        <Ionicons
          name={expandedEmail ? "chevron-up" : "chevron-down"} //Icon changes based on expanded state
          size={20}
          color="#666"
        />
      </TouchableOpacity>
      {expandedEmail && (
        <View style={g.sectionContent}>
          <Text style={g.label}>Primary</Text>
          <Text style={g.value}>johnsonanto2000@gmail.com</Text>

          <Text style={g.label}>Secondary</Text>
          <Text style={g.value}>g00385306@atu.ie</Text>

          <TouchableOpacity style={[b.base, b.primary]}>
            <Text style={b.text}>
              <Ionicons name="add-circle-outline" size={16} color="white" />
              Add Email Address
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <TouchableOpacity
        style={[b.base, b.primary, { marginTop: 20 }]}
        onPress={async () => {
          await clearLoggedIn();
          router.replace("/loginscreen");
        }}
      >
        <Text style={b.text}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
