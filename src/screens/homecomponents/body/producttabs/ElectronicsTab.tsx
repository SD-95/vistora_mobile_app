import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, FlatList, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const spotlightProducts = [
  { title: 'Acer', price: 'Just ₹46,990*', image: require('../../../../../assets/images/fallback.jpg') },
  { title: 'Acer Aspire 3', price: 'From ₹22,900*', image: require('../../../../../assets/images/fallback.jpg') },
  { title: 'Acer Gaming', price: 'From ₹49,990*', image: require('../../../../../assets/images/fallback.jpg') },
  { title: 'Moto Book 60', price: 'From ₹46,990*', image: require('../../../../../assets/images/fallback.jpg') },
  { title: 'Moto Core 5', price: 'From ₹46,990*', image: require('../../../../../assets/images/fallback.jpg') },
  { title: 'Moto Core 7', price: 'From ₹54,990*', image: require('../../../../../assets/images/fallback.jpg') },
];

const intelPowered = [
  { title: 'Dell Core Ultra 5', price: 'From ₹64,990*', image: require('../../../../../assets/images/fallback.jpg'), ribbon: 'Trending' },
  { title: 'Acer Swift', price: 'From ₹46,990*', image: require('../../../../../assets/images/fallback.jpg'), ribbon: 'Best Seller' },
  { title: 'Moto Book 60', price: 'From ₹46,990*', image: require('../../../../../assets/images/fallback.jpg') },
  { title: 'Lenovo Yoga', price: 'From ₹55,990*', image: require('../../../../../assets/images/fallback.jpg'), ribbon: 'Trending' },
  { title: 'HP Pavilion', price: 'From ₹53,990*', image: require('../../../../../assets/images/fallback.jpg') },
];

const categories = [
  { name: 'Wearables', image: require('../../../../../assets/images/fallback.jpg') },
  { name: 'Grooming', image: require('../../../../../assets/images/fallback.jpg') },
  { name: 'MobileCover', image: require('../../../../../assets/images/fallback.jpg') },
  { name: 'Chargers', image: require('../../../../../assets/images/fallback.jpg') },
  { name: 'Powerbank', image: require('../../../../../assets/images/fallback.jpg') },
  { name: 'Tablet', image: require('../../../../../assets/images/fallback.jpg') },
  { name: '2 Wheelers', image: require('../../../../../assets/images/fallback.jpg') },
  { name: 'ITPeripherals', image: require('../../../../../assets/images/fallback.jpg') },
  { name: 'Accessories', image: require('../../../../../assets/images/fallback.jpg') },
  { name: 'Cameras', image: require('../../../../../assets/images/fallback.jpg') },
];

const newLaunches = [
  {
    brand: 'SAMSUNG',
    name: 'Samsung Snapdragon',
    price: '54,990',
    image: require('../../../../../assets/images/fallback.jpg'),
  },
  {
    brand: 'FIRE-BOLTT',
    name: 'Fire-Legend Smartwatch',
    price: '2,499',
    image: require('../../../../../assets/images/fallback.jpg'),
  },
  {
    brand: 'BOAT',
    name: 'boAt Nirvana 751ANC',
    price: '3,299',
    image: require('../../../../../assets/images/fallback.jpg'),
  },
];

export default function ElectronicsTab() {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const fadeAnim = useState(new Animated.Value(1))[0];

  const carouselImages = [
    require('../../../../../assets/images/fallback.jpg'),
    require('../../../../../assets/images/fallback.jpg'),
    require('../../../../../assets/images/fallback.jpg'),
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        })
      ]).start();

      setCarouselIndex((prev) => (prev + 1) % carouselImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <LinearGradient colors={['#f9f9f9ff', '#e6ffe8', '#ffe8d3']} style={styles.container}>
      <ScrollView>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
          {categories.map((cat, idx) => (
            <View key={idx} style={styles.categoryItem}>
              <View style={styles.categorySurface}>
                <Image source={cat.image} style={styles.categoryImage} />
              </View>
              <Text style={styles.categoryLabel}>{cat.name}</Text>
            </View>
          ))}
        </ScrollView>


        <View style={styles.sectionTitleWrapper}>
          <Text style={styles.sectionTitle}>Brand in Spotlight</Text>
          <View style={styles.sectionTitleDecoration}>
            <View style={styles.line} />
            <View style={styles.decorationCenter}>
              <View style={styles.circle} />
              <View style={styles.diamond} />
              <View style={styles.circle} />
            </View>
            <View style={styles.line} />
          </View>
        </View>
        <FlatList
          data={spotlightProducts}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.horizontalList}
          renderItem={({ item }) => (
            <View style={styles.spotlightWrapper}>
              <LinearGradient colors={['#eaffea', '#d4f7d4']} style={styles.spotlightItem}>
                <Image source={item.image} style={styles.spotlightImage} />
                <Text style={styles.spotlightTitle}>{item.title}</Text>
              </LinearGradient>
              <View style={styles.priceTag}>
                <Text style={styles.priceText}>{item.price}</Text>
              </View>
            </View>
          )}
        />


        <View style={styles.sectionTitleWrapper}>
          <Text style={styles.sectionTitle}>Powered by Intel</Text>
          <View style={styles.sectionTitleDecoration}>
            <View style={styles.line} />
            <View style={styles.decorationCenter}>
              <View style={styles.circle} />
              <View style={styles.diamond} />
              <View style={styles.circle} />
            </View>
            <View style={styles.line} />
          </View>
        </View>
        <View style={styles.intelContainer}>
          {intelPowered.map((item, idx) => (
            <View key={idx} style={styles.intelCard}>
              {item.ribbon && <View style={styles.ribbon}><Text style={styles.ribbonText}>{item.ribbon}</Text></View>}
              <Image source={item.image} style={styles.intelImage} />
              <View style={styles.intelPriceTag}><Text style={styles.priceText}>{item.price}</Text></View>
              <Text style={styles.intelTitle}>{item.title}</Text>
            </View>
          ))}

          <View style={[styles.intelCard, styles.carouselCard]}>
            <Animated.Image
              source={carouselImages[carouselIndex]}
              style={[styles.carouselImage, { opacity: fadeAnim }]}
            />
          </View>
        </View>

        <View style={styles.sectionTitleWrapper}>
          <Text style={styles.sectionTitle}>New Launches</Text>
          <View style={styles.sectionTitleDecoration}>
            <View style={styles.line} />
            <View style={styles.decorationCenter}>
              <View style={styles.circle} />
              <View style={styles.diamond} />
              <View style={styles.circle} />
            </View>
            <View style={styles.line} />
          </View>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.newLaunchesScroll}
        >
          {newLaunches.map((item, idx) => (
            <View key={idx} style={styles.launchCard}>
              <Text style={styles.launchBrand}>{item.brand}</Text>
              <View style={styles.launchImageContainer}>
                <Image source={item.image} style={styles.launchImage} />
              </View>
              <View>
                <Text style={styles.launchName}>{item.name}</Text>
                <Text style={styles.launchPrice}>Just ₹{item.price}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  sectionTitleWrapper: {
    alignItems: 'center',
    marginVertical: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },

  sectionTitleDecoration: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },

  line: {
    height: 2,
    backgroundColor: '#d4af37', // golden color
    width: 40, // instead of flex: 1 to reduce length
  },

  decorationCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
  },

  diamond: {
    width: 10,
    height: 10,
    backgroundColor: '#aaa',
    transform: [{ rotate: '45deg' }],
  },

  circle: {
    width: 4,
    height: 4,
    backgroundColor: '#aaa',
    borderRadius: 2,
    marginHorizontal: 4,
  },
  horizontalList: {
    paddingVertical: 5,
  },
  spotlightWrapper: {
    marginRight: 10,
    alignItems: 'center',
  },
  spotlightItem: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    alignItems: 'center',
    width: 120,
    height: 130,
    justifyContent: 'flex-start',
    backgroundColor: '#d4f7d4',
    paddingHorizontal: 5,
    paddingTop: 10,
    paddingBottom: 0,
  },
  spotlightImage: {
    width: 100,
    height: 90,
    resizeMode: 'contain',
  },
  spotlightTitle: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 4,
  },
  priceTag: {
    backgroundColor: '#04b700',
    paddingVertical: 6,
    paddingHorizontal: 10,
    width: 120,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  priceText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  intelContainer: {
    // backgroundColor: 'white',
    borderRadius: 12,
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  intelCard: {
    width: '30%',
    // backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 20,
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  ribbon: {
    position: 'absolute',
    top: 0,
    backgroundColor: '#ff6600',
    width: '100%',
    alignItems: 'center',
    paddingVertical: 2,
    zIndex: 1,
  },
  ribbonText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  intelImage: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
  },
  intelPriceTag: {
    backgroundColor: '#ff6600',
    paddingVertical: 6,
    paddingHorizontal: 10,
    width: '100%',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  intelTitle: {
    marginTop: 4,
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  carouselCard: {
    width: '30%',
    height: 130,
    backgroundColor: '#fff',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  carouselImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  categoryScroll: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 15,
  },

  categorySurface: {
    width: 70,
    height: 70,
    backgroundColor: '#fff',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 0.5,
    borderColor: '#ddd',
  },

  categoryImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },

  categoryLabel: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },

  newLaunchesContainer: {
    paddingVertical: 20,
  },

  newLaunchesScroll: {
    paddingHorizontal: 10,
  },

  launchCard: {
    width: 180,
    height: 260,
    backgroundColor: '#fdbf6b',
    borderRadius: 20,
    marginRight: 15,
    padding: 10,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    overflow: 'hidden',
  },

  launchBrand: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#111',
  },

  launchImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  launchImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    marginVertical: 10,
  },

  launchName: {
    fontSize: 13,
    color: '#111',
  },

  launchPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 4,
  },
});
