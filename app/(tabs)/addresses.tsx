import { useState } from 'react';
import {
  Alert,  // native alert popups
  Modal,  // for displaying modal dialogs, they are pop-up windows that take focus away from the main app window 
  ScrollView, // scrollable container 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View,  
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Mock database of addresses
const MOCK_ADDRESSES = [
  {
    id: '1',
    label: 'Home',
    line1: '123 Grafton Street',
    city: 'Dublin 2',
    county: 'Dublin',
    eircode: 'D02 XY45',
  },
  {
    id: '2',
    label: 'Office',
    line1: '45 Patrick Street',
    city: 'Cork',
    county: 'Cork',
    eircode: 'T12 R6C0',
  },
];

export default function AddressesScreen() {
  const [expanded, setExpanded] = useState(false);
  const [addresses, setAddresses] = useState(MOCK_ADDRESSES);
  const [showModal, setShowModal] = useState(false);

  // Form fields
  const [label, setLabel] = useState('');
  const [line1, setLine1] = useState('');
  const [city, setCity] = useState('');
  const [county, setCounty] = useState('');
  const [eircode, setEircode] = useState('');

  const handleAddAddress = () => {
    // Validation that requires a label , line1 and eircode 
    if (!label.trim() || !line1.trim() || !eircode.trim()) {
      Alert.alert('Missing fields', 'Please fill in label, address, and eircode.');
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
    setLabel('');
    setLine1('');
    setCity('');
    setCounty('');
    setEircode('');
    //Give feedback that addresses were added
    Alert.alert('Address Added', `${label} added successfully.`);
  };

  return (

    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="map-outline" size={64} color="#ff0000ff" />
        <Text style={styles.title}>Address Book</Text>
        <Text style={styles.subtitle}>Manage your delivery addresses</Text>
      </View>

      {/* Row that toggles the addresses section*/}
      <TouchableOpacity
        style={styles.sectionHeader}
        onPress={() => setExpanded(!expanded)}
        activeOpacity={0.8}
      >
        <Text style={styles.sectionTitle}>My Addresses</Text>
        <Ionicons
          name={expanded ? 'chevron-up' : 'chevron-down'}
          size={20}
          color="#666"
        />
      </TouchableOpacity>

      {/* Expanded list */}
      {expanded && (
        <View style={styles.sectionContent}>
          {/* Render each saved address as a simple card */}
          {addresses.map((a) => (
            <View key={a.id} style={styles.addressCard}>
              <Text style={styles.label}>{a.label}</Text>
              <Text style={styles.value}>
                {a.line1}, {a.city}, {a.county}, {a.eircode}
              </Text>
            </View>
          ))}

          {/* Button to open the "Add New Address" modal */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => setShowModal(true)}
          >
            <Ionicons name="add-circle-outline" size={16} color="white" />
            <Text style={styles.buttonText}>Add New Address</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Modal to add address */}
      <Modal
        visible={showModal}  //Controls modal visibility
        transparent           //Transparent background
        animationType="slide"
        onRequestClose={() => setShowModal(false)} // android back button handler
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Address</Text>

            <TextInput
              style={styles.input}
              placeholder="Label (e.g. Home, Work)"
              value={label}
              onChangeText={setLabel}
            />
            <TextInput
              style={styles.input}
              placeholder="Address Line 1"
              value={line1}
              onChangeText={setLine1}
            />
            <TextInput
              style={styles.input}
              placeholder="Town / City"
              value={city}
              onChangeText={setCity}
            />
            <TextInput
              style={styles.input}
              placeholder="County"
              value={county}
              onChangeText={setCounty}
            />
            <TextInput
              style={styles.input}
              placeholder="Eircode"
              autoCapitalize="characters" // Keeps eircode characters upper case
              value={eircode}
              onChangeText={setEircode}
            />

            <View style={styles.modalButtons}>
              {/* Close the modal without saving */}
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: '#888' }]}
                onPress={() => setShowModal(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              {/* Validate + add the new address to state */}
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: '#ff0000ff' }]}
                onPress={handleAddAddress}
              >
                <Text style={styles.modalButtonText}>Save</Text>
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
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFF',
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginTop: 8,
    color: '#ff0000ff',
  },
  subtitle: {
    color: '#555',
    fontSize: 14,
    marginTop: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#CCC',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '500',
  },
  sectionContent: {
    paddingVertical: 12,
    gap: 12,
  },
  addressCard: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#f9f9f9',
  },
  label: {
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  value: {
    fontSize: 14,
    color: '#333',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#a5a5a5ff',
    paddingVertical: 10,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    width: '85%',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#96959565',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 8,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
