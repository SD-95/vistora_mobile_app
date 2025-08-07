import React from 'react';
import {
  View,
  Text,
  SectionList,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Platform, StatusBar
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../components/AppContent';
import { Feather } from '@expo/vector-icons';
const DATA = [
  {
    title: 'Grocery & Kitchen',
    data: [
      { title: 'Fruits & Vegetables', image: require('../../assets/images/fallback.jpg') },
      { title: 'Dairy, Bread & Eggs', image: require('../../assets/images/fallback.jpg') },
      { title: 'Atta, Rice, Oil & Dals', image: require('../../assets/images/fallback.jpg') },
      { title: 'Meat, Fish & Eggs', image: require('../../assets/images/fallback.jpg') },
      { title: 'Masala & Dry Fruits', image: require('../../assets/images/fallback.jpg') },
      { title: 'Breakfast & Sauces', image: require('../../assets/images/fallback.jpg') },
      { title: 'Packaged Food', image: require('../../assets/images/fallback.jpg') },
    ],
  },
  {
    title: 'Snacks & Drinks',
    data: [
      { title: 'Tea, Coffee & More', image: require('../../assets/images/fallback.jpg') },
      { title: 'Ice Creams & More', image: require('../../assets/images/fallback.jpg') },
      { title: 'Frozen Food', image: require('../../assets/images/fallback.jpg') },
      { title: 'Sweet Cravings', image: require('../../assets/images/fallback.jpg') },
      { title: 'Cold Drinks & Juices', image: require('../../assets/images/fallback.jpg') },
      { title: 'Munchies', image: require('../../assets/images/fallback.jpg') },
      { title: 'Biscuits & Cookies', image: require('../../assets/images/fallback.jpg') },
    ],
  },
  // ... more sections
];

export default function CategoriesScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <SafeAreaView style={styles.container}>
      {/* FIXED HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
          <Feather name="arrow-left" size={20} color="#000" />
        </TouchableOpacity>

        <Text style={styles.title}>All Categories</Text>

        <TouchableOpacity onPress={() => navigation.navigate('SearchScreen'  as never)} style={styles.iconButton}>
          <Feather name="search" size={20} color="#666" />
        </TouchableOpacity>
      </View>
      {/* SECTION LIST BELOW */}
      <SectionList
        sections={DATA}
        keyExtractor={(item, index) => item.title + index}
        stickySectionHeadersEnabled={true}
        contentContainerStyle={styles.listContent}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.sectionHeaderContainer}>
            <Text style={styles.sectionHeader}>{title}</Text>
          </View>
        )}
        renderItem={({ section, item, index }) => {
          if (index % 3 !== 0) return null;
          const items = section.data.slice(index, index + 3);

          return (
            <View style={styles.row}>
              {items.map((item, i) => (
                <TouchableOpacity
                  key={item.title + i}
                  style={styles.item}
                  onPress={() =>
                    navigation.navigate('CategoryProductPage')
                  }
                >
                  <Image source={item.image} style={styles.image} />
                  <Text style={styles.itemText}>{item.title}</Text>
                </TouchableOpacity>
              ))}
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 24 : 44, // Dynamic top spacing
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  iconButton: {
    padding: 6,
  },
  iconText: {
    fontSize: 20,
    color: '#000',
  },
  sectionHeaderContainer: {
    backgroundColor: '#fff', // Ensures it doesn't become transparent
    paddingTop: 10,
    paddingBottom: 4,
    paddingLeft: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '700',
  },
  listContent: {
    paddingHorizontal: 10,
    paddingBottom: 80,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  item: {
    width: '30%',
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    resizeMode: 'contain',
    marginBottom: 5,
  },
  itemText: {
    fontSize: 13,
    textAlign: 'center',
  },
});
