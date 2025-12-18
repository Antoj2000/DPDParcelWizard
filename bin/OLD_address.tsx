import { useState } from "react";
import {
  Alert, // native alert popups
  Modal, // for displaying modal dialogs, they are pop-up windows that take focus away from the main app window
  ScrollView, // scrollable container
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  Colors as c,
  GlobalStyles as g,
  ButtonStyles as b,
  ModalStyles as m,
} from "@/src/styles";

// Mock database of addresses
const MOCK_ADDRESSES = [
  {
    id: "1",
    label: "Home",
    line1: "123 Grafton Street",
    city: "Dublin 2",
    county: "Dublin",
    eircode: "D02 XY45",
  },
  {
    id: "2",
    label: "Office",
    line1: "45 Patrick Street",
    city: "Cork",
    county: "Cork",
    eircode: "T12 R6C0",
  },
];

export default function AddressesScreen() {
  const [expanded, setExpanded] = useState(false);
  const [addresses, setAddresses] = useState(MOCK_ADDRESSES);
  const [showModal, setShowModal] = useState(false);

  // Form fields
  const [label, setLabel] = useState("");
  const [line1, setLine1] = useState("");
  const [city, setCity] = useState("");
  const [county, setCounty] = useState("");
  const [eircode, setEircode] = useState("");

  const handleAddAddress = () => {
    // Validation that requires a label , line1 and eircode
    if (!label.trim() || !line1.trim() || !eircode.trim()) {
      Alert.alert(
        "Missing fields",
        "Please fill in label, address, and eircode."
      );
      return;
    }
    // Builds a new address object with a unique id
    const newAddress = {
      id: Date.now().toString(),
      label,
      line1,
      city,
      county,
      eircode,
    };

    //Append the list and close the modal
    setAddresses([...addresses, newAddress]);
    setShowModal(false);
    //Reset form values for next time
    setLabel("");
    setLine1("");
    setCity("");
    setCounty("");
    setEircode("");
    //Give feedback that addresses were added
    Alert.alert("Address Added", `${label} added successfully.`);
  };

  return (
    <ScrollView style={g.container}>
      <View style={g.header}>
        <Ionicons name="map-outline" size={64} color={c.dpdRed} />
        <Text style={g.title}>Address Book</Text>
        <Text style={g.subtitle}>Manage your delivery addresses</Text>
      </View>

      {/* Row that toggles the addresses section*/}
      <TouchableOpacity
        style={g.sectionHeader}
        onPress={() => setExpanded(!expanded)}
        activeOpacity={0.8}
      >
        <Text style={g.sectionTitle}>My Addresses</Text>
        <Ionicons
          name={expanded ? "chevron-up" : "chevron-down"}
          size={20}
          color="#666"
        />
      </TouchableOpacity>

      {/* Expanded list */}
      {expanded && (
        <View style={g.sectionContent}>
          {/* Render each saved address as a simple card */}
          {addresses.map((a) => (
            <View key={a.id} style={styles.addressCard}>
              <Text style={g.label}>{a.label}</Text>
              <Text style={g.value}>
                {a.line1}, {a.city}, {a.county}, {a.eircode}
              </Text>
            </View>
          ))}

          {/* Button to open the "Add New Address" modal */}
          <TouchableOpacity
            style={[b.base, b.primary]}
            onPress={() => setShowModal(true)}
          >
            <Ionicons name="add-circle-outline" size={16} color="white" />
            <Text style={b.text}>Add New Address</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Modal to add address */}
      <Modal
        visible={showModal} //Controls modal visibility
        transparent //Transparent background
        animationType="slide"
        onRequestClose={() => setShowModal(false)} // android back button handler
      >
        <View style={m.overlay}>
          <View style={m.content}>
            <Text style={m.title}>Add New Address</Text>

            <TextInput
              style={m.input}
              placeholder="Label (e.g. Home, Work)"
              value={label}
              onChangeText={setLabel}
            />
            <TextInput
              style={m.input}
              placeholder="Address Line 1"
              value={line1}
              onChangeText={setLine1}
            />
            <TextInput
              style={m.input}
              placeholder="Town / City"
              value={city}
              onChangeText={setCity}
            />
            <TextInput
              style={m.input}
              placeholder="County"
              value={county}
              onChangeText={setCounty}
            />
            <TextInput
              style={m.input}
              placeholder="Eircode"
              autoCapitalize="characters" // Keeps eircode characters upper case
              value={eircode}
              onChangeText={setEircode}
            />

            <View style={m.buttons}>
              {/* Close the modal without saving */}
              <TouchableOpacity
                style={[m.button, { backgroundColor: "#888" }]}
                onPress={() => setShowModal(false)}
              >
                <Text style={m.buttonText}>Cancel</Text>
              </TouchableOpacity>

              {/* Validate + add the new address to state */}
              <TouchableOpacity
                style={[m.button, { backgroundColor: "#ff0000ff" }]}
                onPress={handleAddAddress}
              >
                <Text style={m.buttonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  addressCard: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#f9f9f9",
  },
});
