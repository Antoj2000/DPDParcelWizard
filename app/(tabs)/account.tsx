import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

// AJ : Main screen component 
export default function AccountScreen() {
    // AJ: Uses the useState hook to create a piece of state called expanded, starts as false, setExpanded is used to toggle 
    const [expandedAccount, setExpandedAccount] = useState(false);
    const [expandedPhone, setExpandedPhone] = useState(false);
    const [expandedEmail, setExpandedEmail] = useState(false);

  return (
    <ScrollView style ={styles.container}> {/*Enables vertical scrolling if content overflows */}
     <View style={styles.header}>
        <Ionicons name="person-circle-outline" size={64} color="#ff0000ff" />
        <Text style={styles.title}>Account Settings</Text>
        <Text style={styles.subtitle}>Manage your Parcel Wizard details</Text>
     </View>

     {/* Account Details*/}
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
          <Text style={styles.value}>PW130628</Text>

          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>John Murphy</Text>

          <Text style={styles.label}>Address</Text>
          <Text style={styles.value}>123 Grafton Street, Dublin 2, D02 XY45</Text>

            {/*Change address button */}
          <TouchableOpacity style={styles.button}> 
            <Text style={styles.buttonText}>
            <Ionicons name="map-outline" size={16} color="white" /> Change Address
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/*Phone Numbers Section */}
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
          <Text style={styles.label}>Primary</Text>
          <Text style={styles.value}>+353 87 776 6382</Text>

          <Text style={styles.label}>Secondary</Text>
          <Text style={styles.value}>+353 87 900 9088</Text>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>
            <Ionicons name="add-circle-outline" size={16} color="white" />Add Phone Number
            </Text>
          </TouchableOpacity>
        </View>
      )}

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
});