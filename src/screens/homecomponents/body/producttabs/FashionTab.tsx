import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;
const horizontalPadding = 10;
const bannerMargin = 12;
const bannerWidth = screenWidth - 2 * bannerMargin;

const data = [
  {
    id: 'section1',
    title: 'Trending Now',
    items: [
      { id: '1', label: 'New Arrival', image: require('../../../../../assets/images/fallback.jpg') },
      { id: '2', label: 'Flash Sale', image: require('../../../../../assets/images/fallback.jpg') },
      { id: '3', label: 'Top Picks', image: require('../../../../../assets/images/fallback.jpg') },
      { id: '4', label: 'Best Rated', image: require('../../../../../assets/images/fallback.jpg') },
      { id: '5', label: 'Exclusive', image: require('../../../../../assets/images/fallback.jpg') },
    ],
  },
  {
    id: 'section2',
    title: 'Top Categories',
    items: [
      { id: '6', label: 'Tops', image: require('../../../../../assets/images/fallback.jpg') },
      { id: '7', label: 'Dresses', image: require('../../../../../assets/images/fallback.jpg') },
      { id: '8', label: 'Shirts', image: require('../../../../../assets/images/fallback.jpg') },
      { id: '9', label: 'Jeans', image: require('../../../../../assets/images/fallback.jpg') },
    ],
  },
  {
    id: 'section3',
    title: 'Shop By Type',
    items: [
      { id: '10', label: 'Men', image: require('../../../../../assets/images/fallback.jpg') },
      { id: '11', label: 'Women', image: require('../../../../../assets/images/fallback.jpg') },
      { id: '12', label: 'Kids', image: require('../../../../../assets/images/fallback.jpg') },
      { id: '13', label: 'Shoes', image: require('../../../../../assets/images/fallback.jpg') },
      { id: '14', label: 'Accessories', image: require('../../../../../assets/images/fallback.jpg') },
    ],
  },
];


const FashionTab = () => {
  return (
    <LinearGradient colors={['#ffffff', '#f8f8e6']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Section 1 */}
        <View style={styles.section}>
          <View style={styles.header}>
            <Text style={styles.title}>{data[0].title}</Text>
            <TouchableOpacity style={styles.badge}>
              <Text style={styles.badgeText}>See more</Text>
              <Ionicons name="chevron-forward-circle" size={18} color="#d00" />
            </TouchableOpacity>
          </View>

          <View style={styles.section1Grid}>
            <View style={styles.leftFour}>
              {data[0].items.slice(0, 4).map((item) => (
                <TouchableOpacity key={item.id} style={styles.premiumBox}>
                  <Image source={item.image} style={styles.fullImage} />
                  <View style={styles.labelOverlay}>
                    <Text style={styles.labelLarge}>{item.label}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity style={styles.tallBox}>
              <Image source={data[0].items[4].image} style={styles.fullImage} />
              <View style={styles.labelOverlay}>
                <Text style={styles.labelLarge}>{data[0].items[4].label}</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Banner Carousel */}
          <ScrollView
            horizontal
            pagingEnabled
            snapToInterval={bannerWidth + 12}
            decelerationRate="fast"
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.bannerScrollContainer}
          >
            {[1, 2, 3].map((i) => (
              <TouchableOpacity key={i} style={styles.bannerCard}>
                <Image
                  source={require('../../../../../assets/images/fallback.jpg')}
                  style={styles.bannerImage}
                />
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.6)']}
                  style={styles.bannerGradient}
                />
                <View style={styles.bannerContent}>
                  <Text style={styles.bannerHeading}>Exclusive Drop {i}</Text>
                  <Text style={styles.bannerSub}>Explore the latest fashion trends</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Section 2 */}
        <View style={styles.section}>
          <View style={styles.header}>
            <Text style={styles.title}>{data[1].title}</Text>
            <TouchableOpacity style={styles.badge}>
              <Text style={styles.badgeText}>See more</Text>
              <Ionicons name="chevron-forward-circle" size={18} color="#d00" />
            </TouchableOpacity>
          </View>

          <View style={styles.section2Row}>
            {data[1].items.slice(0, 2).map((item) => (
              <TouchableOpacity key={item.id} style={styles.section2WideBox}>
                <Image source={item.image} style={styles.fullImage} />
                <View style={styles.labelOverlay}>
                  <Text style={styles.labelLarge}>{item.label}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.section2Row}>
            {data[1].items.map((item) => (
              <TouchableOpacity key={item.id} style={styles.section2SmallBox}>
                <Image source={item.image} style={styles.fullImage} />
                <View style={styles.labelOverlay}>
                  <Text style={styles.labelLarge}>{item.label}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Section 3 */}
        <View style={styles.section}>
          <View style={styles.header}>
            <Text style={styles.title}>{data[2].title}</Text>
          </View>
          <View style={styles.section3Grid}>
            {data[2].items.map((item) => (
              <TouchableOpacity key={item.id} style={styles.circleImageWrapper}>
                <Image source={item.image} style={styles.circleImage} />
                <Text style={styles.labelLarge}>{item.label}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.circleImageWrapper}>
              <View style={styles.seeMoreCircle}>
                <Ionicons name="chevron-forward" size={28} color="#fff" />
              </View>
              <Text style={styles.labelLarge}>See more</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default FashionTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: horizontalPadding,
  },
  section: {
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
    alignItems: 'center',
  },
  title: {
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffe5e5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 12,
    color: '#d00',
    marginRight: 4,
  },
  section1Grid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftFour: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: screenWidth * 0.5, // adjusted to fit 4 items
  },
  premiumBox: {
    width: (screenWidth * 0.5) / 2 - 6,
    height: 100,
    borderRadius: 10,
    margin: 3,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 4,
  },
  tallBox: {
    width: screenWidth * 0.35, // adjusted to avoid overflow
    height: 208,
    borderRadius: 10,
    backgroundColor: '#fff',
    overflow: 'hidden',
    elevation: 4,
  },
  fullImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  labelOverlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingVertical: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    alignItems: 'center',
  },
  labelLarge: {
    fontSize: 12,
    fontWeight: '600',
    color: '#222',
  },
  bannerScrollContainer: {
    paddingHorizontal: 12,
    marginTop: 18,
    paddingBottom: 10,
  },

  bannerCard: {
    width: bannerWidth,
    height: 150,
    borderRadius: 14,
    marginRight: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    position: 'relative',
  },

  bannerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
  },

  bannerGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
  },

  bannerContent: {
    position: 'absolute',
    bottom: 12,
    left: 14,
    right: 14,
  },

  bannerHeading: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  bannerSub: {
    color: '#eee',
    fontSize: 12,
    marginTop: 2,
  },
  section2Row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  section2WideBox: {
    width: (screenWidth / 2) - 40,
    height: 90,
    borderRadius: 10,
    backgroundColor: '#fff',
    overflow: 'hidden',
    elevation: 3,
    margin: 4,
  },
  section2SmallBox: {
    width: (screenWidth / 4) - 20,
    height: 80,
    borderRadius: 10,
    backgroundColor: '#fff',
    overflow: 'hidden',
    elevation: 2,
  },
  section3Grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  circleImageWrapper: {
    alignItems: 'center',
    margin: 8,
  },
  circleImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  seeMoreCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#d00',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
