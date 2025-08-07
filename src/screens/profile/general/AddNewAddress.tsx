import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  StatusBar,
} from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const AddNewAddress = () => {
  const navigation = useNavigation();

  const [isEditingLocation, setIsEditingLocation] = useState(false);
  const [locationTitle, setLocationTitle] = useState('APIIC Colony');
  const [locationAddress, setLocationAddress] = useState(
    'H.no 1-8-67, LIG 213, APIIC Colony, North Kamala Nagar, Kushaiguda, Hyderabad, Secunderabad, Telangana 500062, India'
  );

  const [houseNo, setHouseNo] = useState('spruko technologies');
  const [buildingBlock, setBuildingBlock] = useState('H.no 1-8-67, LIG 213');
  const [landmark, setLandmark] = useState('APIIC Colony, North Kamala Nagar');
  const [receiverName, setReceiverName] = useState('');
  const [receiverPhone, setReceiverPhone] = useState('');

  const toggleEditLocation = () => setIsEditingLocation(!isEditingLocation);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Address Details</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Location Details */}
        <View style={styles.locationCard}>
          <View style={{ flex: 1 }}>
            {isEditingLocation ? (
              <>
                <TextInput
                  style={styles.inputFieldSmall}
                  value={locationTitle}
                  onChangeText={setLocationTitle}
                  placeholder="Location Title"
                />
                <TextInput
                  style={[styles.inputFieldSmall, { marginTop: 8 }]}
                  value={locationAddress}
                  onChangeText={setLocationAddress}
                  placeholder="Location Address"
                  multiline
                />
              </>
            ) : (
              <>
                <Text style={styles.locationTitle}>{locationTitle}</Text>
                <Text style={styles.locationAddress}>{locationAddress}</Text>
              </>
            )}
          </View>
          <TouchableOpacity style={styles.changeButton} onPress={toggleEditLocation}>
            <Text style={styles.changeText}>{isEditingLocation ? 'Done' : 'Change'}</Text>
          </TouchableOpacity>
        </View>

        {/* Address Fields */}
        <Text style={styles.sectionTitle}>Add Address</Text>

        <Text style={styles.inputLabel}>House No. & Floor *</Text>
        <TextInput
          style={styles.inputField}
          placeholder="Enter House No. & Floor"
          value={houseNo}
          onChangeText={setHouseNo}
        />

        <Text style={styles.inputLabel}>Building & Block No. (Optional)</Text>
        <TextInput
          style={styles.inputField}
          placeholder="Enter Building & Block No."
          value={buildingBlock}
          onChangeText={setBuildingBlock}
        />

        <Text style={styles.inputLabel}>Landmark & Area Name (Optional)</Text>
        <TextInput
          style={styles.inputField}
          placeholder="Enter Landmark & Area"
          value={landmark}
          onChangeText={setLandmark}
        />

        {/* Address Label */}
        <Text style={styles.sectionTitle}>Add Address Label</Text>
        <View style={styles.labelContainer}>
          <TouchableOpacity style={styles.labelButtonSelected}>
            <Text style={styles.labelButtonTextSelected}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.labelButton}>
            <Text style={styles.labelButtonText}>Work</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.labelButton}>
            <Text style={styles.labelButtonText}>Other</Text>
          </TouchableOpacity>
        </View>

        {/* Receiver Details */}
        <Text style={styles.sectionTitle}>Receiver Details</Text>

        <Text style={styles.inputLabel}>Receiver's Name</Text>
        <View style={styles.inputWithIcon}>
          <TextInput
            style={styles.inputFieldIcon}
            placeholder="Enter Receiver's Name"
            value={receiverName}
            onChangeText={setReceiverName}
          />
          <MaterialIcons name="contacts" size={20} color="#999" style={styles.iconStyle} />
        </View>

        <Text style={styles.inputLabel}>Receiver's Phone Number</Text>
        <View style={styles.inputWithIcon}>
          <Text style={styles.phonePrefix}>+91</Text>
          <TextInput
            style={styles.inputFieldIcon}
            placeholder="Enter Phone Number"
            keyboardType="number-pad"
            maxLength={10}
            value={receiverPhone}
            onChangeText={setReceiverPhone}
          />
        </View>
      </ScrollView>

      {/* Save Address Button */}
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>SAVE ADDRESS</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddNewAddress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  contentContainer: {
    padding: 16,
  },
  locationCard: {
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  locationTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
    marginBottom: 4,
  },
  locationAddress: {
    fontSize: 13,
    color: '#555',
  },
  changeButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginLeft: 8,
  },
  changeText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#E30613',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
    marginBottom: 8,
  },
  inputField: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 14,
    fontSize: 14,
    color: '#000',
    marginBottom: 20,
  },
  inputFieldSmall: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 10,
    fontSize: 13,
    color: '#000',
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  labelButton: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 24,
    alignItems: 'center',
  },
  labelButtonSelected: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#E30613',
    backgroundColor: '#FCEBED',
    borderRadius: 24,
    alignItems: 'center',
  },
  labelButtonText: {
    color: '#555',
    fontWeight: '600',
  },
  labelButtonTextSelected: {
    color: '#E30613',
    fontWeight: '600',
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 14,
    marginBottom: 20,
  },
  inputFieldIcon: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 14,
    color: '#000',
  },
  iconStyle: {
    marginLeft: 8,
  },
  phonePrefix: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginRight: 8,
  },
  saveButton: {
    backgroundColor: '#E30613',
    paddingVertical: 16,
    marginHorizontal: 16,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
