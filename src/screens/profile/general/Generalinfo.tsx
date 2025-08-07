import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

type GeneralInfoOption = {
  key: string;
  title: string;
  icon: keyof typeof MaterialIcons.glyphMap;
};

const generalInfoOptions: GeneralInfoOption[] = [
  {
    key: 'terms',
    title: 'Terms & Conditions',
    icon: 'description',
  },
  {
    key: 'privacy',
    title: 'Privacy Policy',
    icon: 'lock-outline',
  },
  {
    key: 'licenses',
    title: 'Open Source Licenses',
    icon: 'code',
  },
];

const GeneralInfoScreen = ({ navigation }: any) => {
  const renderItem = ({ item }: { item: GeneralInfoOption }) => (
    <TouchableOpacity style={styles.optionContainer}>
      <View style={styles.iconTextRow}>
        <MaterialIcons name={item.icon} size={24} color="#4B0082" style={{ marginRight: 12 }} />
        <Text style={styles.title}>{item.title}</Text>
      </View>
      <MaterialIcons name="chevron-right" size={24} color="#4B0082" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="chevron-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Policies</Text>
        <View style={{ width: 24 }} />
      </View>
      <FlatList
        data={generalInfoOptions}
        renderItem={renderItem}
        keyExtractor={item => item.key}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  optionContainer: {
    backgroundColor: '#fff',
    paddingVertical: 18,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  iconTextRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4B0082',
  },
});

export default GeneralInfoScreen;
