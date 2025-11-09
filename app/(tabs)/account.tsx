import { useState } from 'react';
import { Alert, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAccountData } from '@/src/hooks/useAccountData';


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
    const [newPhone, setNewPhone] = useState('');

    // Handler for when the user presses "Change Address"
    const onChangeAddress = async () => {
      if (!profile) return;
    
      //Switches between demo addresses
      const demoAddress =
      profile.address.line1 === '123 Grafton Street'
        ? {
            line1: '45 Connell Street',
            city: 'Dublin 1',
            county: 'Dublin',
            eircode: 'D01 ABC1',
          }
        : {
            line1: '123 Grafton Street',
            city: 'Dublin 2',
            county: 'Dublin',
            eircode: 'D02 XY45',
          };

      await updateAddress(demoAddress);
      //Confirmation popup
      Alert.alert('Address Updated', 'This is a demo update using the service mock');
  };


   // Handle adding the typed phone number
  const handleAddPhone = async () => {
    if (!newPhone.trim()) {
      Alert.alert('Missing number', 'Please enter a valid phone number.');
      return;
    }

    await addPhone({ label: 'Other', phoneNumber: newPhone });
    setShowPhoneModal(false); // close modal
    setNewPhone(''); // clear input
    Alert.alert('Phone Added', `Added ${newPhone}`);
  };

  // Loading Screen
  if (loading || !profile){
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Ionicons name="time-outline" size={28} />
        <Text style={{ marginTop: 8 }}>Loading…</Text>
      </View>
    );
  }

// Once profile is loaded, render the real screen content
  return (
    <ScrollView style ={styles.container}> {/*Enables vertical scrolling if content overflows */}
     <View style={styles.header}>
        <Ionicons name="person-circle-outline" size={64} color="#ff0000ff" />
        <Text style={styles.title}>Account Settings</Text>
        <Text style={styles.subtitle}>Manage your Parcel Wizard details</Text>
     </View>

     {/* ======== Account Details ==========*/}
     <TouchableOpacity
        style={styles.sectionHeader}
        onPress={() => setExpandedAccount (!expandedAccount)} //Toggle expanded state on press
        activeOpacity={0.8}
      >
        <Text style={styles.sectionTitle}>Account Details</Text>
        <Ionicons
          name={expandedAccount ? 'chevron-up' : 'chevron-down'}  //Icon changes based on expanded state
          size={20}
          color="#666"
        />
      </TouchableOpacity>

        
        {expandedAccount && ( //AJ : Only renders when expanded is true
        <View style={styles.sectionContent}>

          <Text style={styles.label}>ParcelWizardID</Text>
          <Text style={styles.value}>{profile.pwid}</Text>

          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>{profile.name}</Text>

          <Text style={styles.label}>Address</Text>
          <Text style={styles.value}>
            {profile.address.line1}, {profile.address.city}, {profile.address.county}, {profile.address.eircode}
          </Text>

            {/*Change address button */}
          <TouchableOpacity style={styles.button} onPress={(onChangeAddress)}> 
            <Text style={styles.buttonText}>
              <Ionicons name="map-outline" size={16} color="white" /> Change Address (demo)
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* ============ Phone Numbers Section ==============*/}
      <TouchableOpacity
        style={styles.sectionHeader}
        onPress={() => setExpandedPhone(!expandedPhone)}
        activeOpacity={0.8}
      >
        <Text style={styles.sectionTitle}>Phone Numbers</Text>
        <Ionicons
              name={expandedPhone ? 'chevron-up' : 'chevron-down'}  //Icon changes based on expanded state
              size={20}
              color="#666"
            />
      </TouchableOpacity>

      {expandedPhone && (
        <View style={styles.sectionContent}>
          {/* List all phone numbers */}
          {profile.phones.map((p) => (
            <View key={p.id}>
              <Text style={styles.label}>{p.label}</Text>
              <Text style={styles.value}>{p.phoneNumber}</Text>
            </View>
          ))}
          {/* Add new phone button */}
          <TouchableOpacity style={styles.button} onPress={() => setShowPhoneModal(true)}>
            <Text style={styles.buttonText}>
             <Ionicons name="add-circle-outline" size={16} color="white" />Add Phone Number
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
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Phone Number</Text>

            <TextInput
              style={styles.input}
              placeholder="+353 87 123 4567"
              keyboardType="phone-pad"
              value={newPhone}
              onChangeText={setNewPhone}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity style={[styles.modalButton, { backgroundColor: '#888' }]} onPress={() => setShowPhoneModal(false)}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.modalButton, { backgroundColor: '#ff0000ff' }]} onPress={handleAddPhone}>
                <Text style={styles.modalButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>



      {/*Email Section */}
      <TouchableOpacity
        style={styles.sectionHeader}
        onPress={() => setExpandedEmail(!expandedEmail)}
        activeOpacity={0.8}
      >
        <Text style={styles.sectionTitle}>Email Addresses</Text>
        <Ionicons
              name={expandedEmail ? 'chevron-up' : 'chevron-down'}  //Icon changes based on expanded state
              size={20}
              color="#666"
            />
      </TouchableOpacity>

      {expandedEmail && (
        <View style={styles.sectionContent}>
          <Text style={styles.label}>Primary</Text>
          <Text style={styles.value}>johnsonanto2000@gmail.com</Text>

          <Text style={styles.label}>Secondary</Text>
          <Text style={styles.value}>g00385306@atu.ie</Text>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>
             <Ionicons name="add-circle-outline" size={16} color="white" />Add Email Address
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}


// --- Styling --- 
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
    gap: 8,
  },
  label: {
    fontSize: 12,
    color: '#888',
  },
  value: {
    fontSize: 16,
    color: '#000',
  },
  button: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#a5a5a5ff',
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: '600',
  },

  // modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    width: '80%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: { fontSize: 18, fontWeight: '600', marginBottom: 12 },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtons: { flexDirection: 'row', gap: 10 },
  modalButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalButtonText: { color: '#fff', fontWeight: '600' },
});