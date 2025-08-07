import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView, Image, FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { ImageSourcePropType } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AllTab = () => {

  const [dailyactiveTab, setdailyActiveTab] = useState<CategoryType>("vegetables");
  const navigation = useNavigation();

  type CategoryType = typeof category[number];
  const category = [
    "vegetables",
    "fruits",
    "groceries",
    "beverages",
    "dairy_fresh",
  ] as const;

  const categoryImages = {
    vegetables: require('../../../../../assets/images/veggie.png'),
    fruits: require('../../../../../assets/images/fruite.jpg'),
    groceries: require('../../../../../assets/images/groceries.png'),
    beverages: require('../../../../../assets/images/beverages.png'),
    dairy_fresh: require('../../../../../assets/images/daily_fresh.png'),
  };


  const productsMap: Record<CategoryType, {
    name: string;
    price: number;
    oldPrice: number;
    tag: string;
    rating: string;
    image: ImageSourcePropType;
  }[]> = {
    vegetables: [
      {
        name: "Tomato Local",
        price: 26,
        oldPrice: 29,
        tag: "Fresh & Ripened",
        rating: "4.3 (199.3k)",
        image: require('../../../../../assets/images/tomato.png'),
      },
      {
        name: "Sweet Corn",
        price: 15,
        oldPrice: 32,
        tag: "Big Kernels",
        rating: "4.3 (16.4k)",
        image: require('../../../../../assets/images/sweetcorn.png'),
      },
      {
        name: "Cabbage",
        price: 18,
        oldPrice: 37,
        tag: "Big Kernels",
        rating: "4.1 (119.4k)",
        image: require('../../../../../assets/images/Cabbage.png'),
      },
      {
        name: "Ridge Gourd",
        price: 15,
        oldPrice: 32,
        tag: "Big Kernels",
        rating: "4.3 (16.4k)",
        image: require('../../../../../assets/images/RidgeGourd.png'),
      },
      {
        name: "Brown bringle (long)",
        price: 15,
        oldPrice: 32,
        tag: "Big Kernels",
        rating: "4.3 (16.4k)",
        image: require('../../../../../assets/images/bringle_long.png'),
      },
    ],
    fruits: [
      {
        name: "Apple",
        price: 26,
        oldPrice: 29,
        tag: "Fresh & Ripened",
        rating: "4.3 (199.3k)",
        image: require('../../../../../assets/images/apple.png'),
      },
      {
        name: "ghrapes",
        price: 15,
        oldPrice: 32,
        tag: "Big Kernels",
        rating: "4.3 (16.4k)",
        image: require('../../../../../assets/images/ghrapes.png'),
      },
      {
        name: "strawberry",
        price: 18,
        oldPrice: 37,
        tag: "Big Kernels",
        rating: "4.1 (119.4k)",
        image: require('../../../../../assets/images/strawberry.png'),
      },
      {
        name: "orange",
        price: 15,
        oldPrice: 32,
        tag: "Big Kernels",
        rating: "4.3 (16.4k)",
        image: require('../../../../../assets/images/orange.png'),
      },
      {
        name: "anjeer",
        price: 15,
        oldPrice: 32,
        tag: "Big Kernels",
        rating: "4.3 (16.4k)",
        image: require('../../../../../assets/images/anjeer.png'),
      },
      {
        name: "banana",
        price: 15,
        oldPrice: 32,
        tag: "Big Kernels",
        rating: "4.3 (16.4k)",
        image: require('../../../../../assets/images/banana.png'),
      },
      {
        name: "mango",
        price: 15,
        oldPrice: 32,
        tag: "Big Kernels",
        rating: "4.3 (16.4k)",
        image: require('../../../../../assets/images/mango.png'),
      },
    ],
    groceries: [
      {
        name: "atta",
        price: 26,
        oldPrice: 29,
        tag: "Fresh & Ripened",
        rating: "4.3 (199.3k)",
        image: require('../../../../../assets/images/atta1.png'),
      },
      {
        name: "Toor dal",
        price: 15,
        oldPrice: 32,
        tag: "Big Kernels",
        rating: "4.3 (16.4k)",
        image: require('../../../../../assets/images/dal.png'),
      },
      {
        name: "bread",
        price: 18,
        oldPrice: 37,
        tag: "Big Kernels",
        rating: "4.1 (119.4k)",
        image: require('../../../../../assets/images/bread.png'),
      },
      {
        name: "Freedom sunflower oil",
        price: 15,
        oldPrice: 32,
        tag: "Big Kernels",
        rating: "4.3 (16.4k)",
        image: require('../../../../../assets/images/oil.png'),
      },
      {
        name: "Indiagate Basumati Rice No1",
        price: 15,
        oldPrice: 32,
        tag: "Big Kernels",
        rating: "4.3 (16.4k)",
        image: require('../../../../../assets/images/rice.png'),
      },
      {
        name: "Surf-excel easy wash",
        price: 15,
        oldPrice: 32,
        tag: "Big Kernels",
        rating: "4.3 (16.4k)",
        image: require('../../../../../assets/images/surf.png'),
      },
      {
        name: "Chole channa",
        price: 15,
        oldPrice: 32,
        tag: "Big Kernels",
        rating: "4.3 (16.4k)",
        image: require('../../../../../assets/images/channa.png'),
      },
    ],
    beverages: [
      {
        name: "sprite",
        price: 26,
        oldPrice: 29,
        tag: "Fresh & Ripened",
        rating: "4.3 (199.3k)",
        image: require('../../../../../assets/images/sprite.png'),
      },
      {
        name: "coke",
        price: 15,
        oldPrice: 32,
        tag: "Big Kernels",
        rating: "4.3 (16.4k)",
        image: require('../../../../../assets/images/coke.png'),
      },
      {
        name: "slice",
        price: 18,
        oldPrice: 37,
        tag: "Big Kernels",
        rating: "4.1 (119.4k)",
        image: require('../../../../../assets/images/slice.png'),
      },
      {
        name: "Mountain Dew",
        price: 15,
        oldPrice: 32,
        tag: "Big Kernels",
        rating: "4.3 (16.4k)",
        image: require('../../../../../assets/images/dew.png'),
      },
      {
        name: "fanta",
        price: 15,
        oldPrice: 32,
        tag: "Big Kernels",
        rating: "4.3 (16.4k)",
        image: require('../../../../../assets/images/fanta.png'),
      },
      {
        name: "nimbu_pani",
        price: 15,
        oldPrice: 32,
        tag: "Big Kernels",
        rating: "4.3 (16.4k)",
        image: require('../../../../../assets/images/nimbu_pani.png'),
      },
    ],
    dairy_fresh: [
      {
        name: "amul_slice",
        price: 26,
        oldPrice: 29,
        tag: "Fresh & Ripened",
        rating: "4.3 (199.3k)",
        image: require('../../../../../assets/images/amul_slice.png'),
      },
      {
        name: "curd",
        price: 15,
        oldPrice: 32,
        tag: "Big Kernels",
        rating: "4.3 (16.4k)",
        image: require('../../../../../assets/images/curd.png'),
      },
      {
        name: "ghee",
        price: 18,
        oldPrice: 37,
        tag: "Big Kernels",
        rating: "4.1 (119.4k)",
        image: require('../../../../../assets/images/ghee.png'),
      },
      {
        name: "milk",
        price: 15,
        oldPrice: 32,
        tag: "Big Kernels",
        rating: "4.3 (16.4k)",
        image: require('../../../../../assets/images/milk_pkt.png'),
      },
      {
        name: "paneer",
        price: 15,
        oldPrice: 32,
        tag: "Big Kernels",
        rating: "4.3 (16.4k)",
        image: require('../../../../../assets/images/paneer.png'),
      },
    ],
  };



  const products = [
    { id: '1', name: 'Freedom Refined Sunflower Oil', price: '₹154', buynowoldPrice: '₹173', size: '1 L', image: require('../../../../../assets/images/oil.png') },
    { id: '2', name: 'Heritage Special Long Life Toned Milk', price: '₹32', buynowoldPrice: '₹34', size: '475 ml', image: require('../../../../../assets/images/milk.png') },
    { id: '3', name: 'Freshen White Eggs', price: '₹46', buynowoldPrice: '₹72', size: '1 pack (6 pcs)', image: require('../../../../../assets/images/egg.png') },
    { id: '4', name: 'Thums Up Soft Drink', price: '₹45', buynowoldPrice: '', size: '750 ml', image: require('../../../../../assets/images/coke.png') },
    { id: '5', name: 'Heritage Total Curd Tub', price: '₹96', buynowoldPrice: '₹110', size: '1 kg', image: require('../../../../../assets/images/curd.png') },
    { id: '6', name: 'Kwality Wall’s Cornetto', price: '₹40', buynowoldPrice: '', size: '80 ml', image: require('../../../../../assets/images/cornetto.png') },
    { id: '7', name: 'Banana Robusta', price: '₹26', buynowoldPrice: '₹35', size: '3 Pc (300-450 gm)', image: require('../../../../../assets/images/banana.png') },
    { id: '8', name: 'Bingo! Original Style Chilli', price: '₹20', buynowoldPrice: '', size: '43 g', image: require('../../../../../assets/images/bingo.png') },
    { id: '9', name: 'See All', seeMore: true }
  ];


  const sections = [
    {
      title: 'Grocery & Kitchen',
      grid: [3, 4],
      items: [
        { label: 'Fruits & Vegetables', icon: require('../../../../../assets/images/fallback.jpg'), ribbon: 'Offer Available', span: 2 },
        { label: 'Dairy, Bread & Eggs', icon: require('../../../../../assets/images/fallback.jpg') },
        { label: 'Atta, Rice, Oil & Dals', icon: require('../../../../../assets/images/fallback.jpg') },
        { label: 'Meat, Fish & Eggs', icon: require('../../../../../assets/images/fallback.jpg'), ribbon: 'Trending' },
        { label: 'Masala & Dry Fruits', icon: require('../../../../../assets/images/fallback.jpg') },
        { label: 'Breakfast & Sauces', icon: require('../../../../../assets/images/fallback.jpg'), ribbon: 'Offer Available' },
        { label: 'Packaged Food', icon: require('../../../../../assets/images/fallback.jpg') },
      ],
    },
    {
      title: 'Snacks & Drinks',
      grid: [3, 4],
      items: [
        { label: 'Tea, Coffee & More', icon: require('../../../../../assets/images/fallback.jpg'), ribbon: 'Trending' },
        { label: 'Ice Creams & More', icon: require('../../../../../assets/images/fallback.jpg'), span: 2 },
        { label: 'Frozen Food', icon: require('../../../../../assets/images/fallback.jpg') },
        { label: 'Sweet', icon: require('../../../../../assets/images/fallback.jpg'), ribbon: 'Offer Available' },
        { label: 'Cold Drinks', icon: require('../../../../../assets/images/fallback.jpg') },
        { label: 'Munchies', icon: require('../../../../../assets/images/fallback.jpg'), ribbon: 'Trending' },
        { label: 'Biscuits', icon: require('../../../../../assets/images/fallback.jpg') },
      ],
    },
    {
      title: 'Beauty & Personal Care',
      grid: [4, 3, 4],
      items: [
        { label: 'Makeup & Beauty', icon: require('../../../../../assets/images/fallback.jpg'), ribbon: 'Trending' },
        { label: 'Skincare', icon: require('../../../../../assets/images/fallback.jpg') },
        { label: 'Protein & Nutrition', icon: require('../../../../../assets/images/fallback.jpg') },
        { label: 'Baby Care', icon: require('../../../../../assets/images/fallback.jpg'), ribbon: 'Offer Available' },
        { label: 'Bath & Body', icon: require('../../../../../assets/images/fallback.jpg') },
        { label: 'Hair Care', icon: require('../../../../../assets/images/fallback.jpg'), span: 2 },
        { label: 'Jewellery & Accessories', icon: require('../../../../../assets/images/fallback.jpg') },
        { label: 'Apparel & Lifestyle', icon: require('../../../../../assets/images/fallback.jpg'), ribbon: 'Trending' },
        { label: 'Fragrances & Grooming', icon: require('../../../../../assets/images/fallback.jpg') },
        { label: 'Pharmacy & Wellness', icon: require('../../../../../assets/images/fallback.jpg') },
        { label: 'Feminine Hygiene', icon: require('../../../../../assets/images/fallback.jpg') },
        { label: 'Sexual Wellness', icon: require('../../../../../assets/images/fallback.jpg'), ribbon: 'Offer Available' },
      ],
    },
    {
      title: 'Household Essentials',
      grid: [4, 2, 3],
      items: new Array(12).fill(null).map((_, index) => ({
        label: `Item ${index + 1}`,
        icon: require('../../../../../assets/images/fallback.jpg'),
        ribbon: index % 3 === 0 ? 'Offer Available' : index % 4 === 0 ? 'Trending' : undefined,
        span: index === 7 ? 2 : undefined,
      })),
    },
  ];

  return (
    <View>
      {/* Daily section */}
      <LinearGradient colors={['#eeeecfff', '#ffffff']} style={styles.dailycontainer}>
        <View style={styles.centerItems}>
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>Daily</Text>
          </View>
          <Text style={styles.subheading}>
            Free delivery, lowest prices & more <FontAwesome name="chevron-right" size={10} color="#ec4899" />
          </Text>
          <View style={styles.hrContainer}>
            <View style={styles.diamond} />
          </View>
        </View>

        {/* Scroll Tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabScroll}>
          {category.map((cat) => (
            <TouchableOpacity
              key={cat}
              onPress={() => setdailyActiveTab(cat)}
              style={styles.tabButton}
            >
              <Image source={categoryImages[cat]} style={styles.tabImage} />
              <Text
                style={[
                  styles.tabText,
                  dailyactiveTab === cat ? styles.tabTextActive : styles.tabTextInactive,
                ]}
              >
                {cat}
              </Text>
              {dailyactiveTab === cat && <View style={styles.tabUnderline} />}
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Products */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.productScroll}>
          {productsMap[dailyactiveTab]?.map((item, index) => (
            <View key={index} style={styles.productCard}>
              <TouchableOpacity style={styles.productImageWrapper} onPress={() => navigation.navigate('ProductPage' as never)}>
                <Image source={item.image} style={styles.productImage} />
              </TouchableOpacity>

              <View style={styles.productInfo}>
                {/* Price */}
                <Text style={styles.priceText}>
                  ₹{item.price} <Text style={styles.oldPrice}>₹{item.oldPrice}</Text>
                </Text>

                {/* Product Details */}
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productTag}>{item.tag}</Text>
                <Text style={styles.productRating}>★ {item.rating}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
        <TouchableOpacity style={styles.seeMoreButton}>
          <Text style={styles.seeMoreText}>See More</Text>
          <View style={styles.seeMoreIconCircle}>
            <Text style={styles.seeMoreIcon}>➤</Text>
          </View>
        </TouchableOpacity>
      </LinearGradient>

      {/* Buy Again section */}
      <LinearGradient colors={["#facc15", "#ec4899"]} style={styles.buynowcontainer}>
        <View style={{ alignItems: 'center', marginBottom: 16 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
            Buy
            <Text style={{ color: '#7e22ce' }}> Again</Text>
          </Text>
          <View style={{ width: 60, height: 4, backgroundColor: '#7e22ce', borderRadius: 2, marginTop: 4 }} />
        </View>
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item, index }) => (
            item.seeMore ? (
              <TouchableOpacity style={styles.seeMoreCard}>
                <Text style={styles.buynowseeMoreText}>See All</Text>
                <Text style={styles.seeMoreArrow}>➤</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.card}>
                <View style={styles.imageWrapper}>
                  <Image source={item.image} style={styles.image} />
                </View>
                <Text style={styles.price}>
                  {item.price}{' '}
                  <Text style={styles.buynowoldPrice}>{item.buynowoldPrice}</Text>
                </Text>
                <Text style={styles.size}>{item.size}</Text>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.time}>⚡ 7 mins</Text>
              </View>
            )
          )}
        />
      </LinearGradient>

      {/* grid products */}
      <LinearGradient colors={['#ffffff', '#eeeecf']} style={styles.gridcontainer}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {sections.map((section, idx) => {
            let itemIndex = 0;
            return (
              <View key={idx}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>{section.title}</Text>
                  <View style={styles.sectionUnderline} />
                </View>
                {section.grid.map((rowCount, rowIdx) => {
                  const rowItems = section.items.slice(itemIndex, itemIndex + rowCount);
                  itemIndex += rowCount;
                  return (
                    <View key={rowIdx} style={styles.gridRow}>
                      {rowItems.map((item, index) => (
                        <TouchableOpacity
                          key={index}
                          style={[styles.itemBox, item.span === 2 && styles.itemBoxSpan2]}
                          onPress={() => console.log(`Pressed ${item.label}`)}
                        >
                          {item.ribbon && (
                            <View
                              style={[styles.ribbonFull, item.ribbon === 'Trending' ? styles.ribbonTrending : styles.ribbonOffer]}
                            >
                              <Text style={styles.gridribbonText}>{item.ribbon}</Text>
                            </View>
                          )}
                          <Image source={item.icon} style={styles.icon} />
                          <View style={styles.labelContainer}>
                            <Text style={styles.label}>{item.label}</Text>
                          </View>
                        </TouchableOpacity>
                      ))}
                    </View>
                  );
                })}
              </View>
            );
          })}
        </ScrollView>
      </LinearGradient>

    </View>
  )
}

const styles = StyleSheet.create({
  dailycontainer: { backgroundColor: '#ebebc8ff', borderRadius: 30 },
  centerItems: {
    alignItems: "center",
  },
  badgeContainer: {
    backgroundColor: "#065f46",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
    marginTop: 10
  },
  badgeText: {
    color: "#facc15",
    fontSize: 18,
    fontWeight: "bold",
  },
  subheading: {
    fontSize: 12,
    marginTop: 4,
    textAlign: "center",
  },
  arrowIcon: {
    color: "#ec4899",
  },
  hrContainer: {
    width: "55%",
    height: 1,
    backgroundColor: "#d1d5db",
    marginVertical: 8,
    position: "relative",
    alignSelf: "center",
  },
  diamond: {
    position: "absolute",
    top: -4,
    left: "50%",
    marginLeft: -4,
    width: 8,
    height: 8,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#d1d5db",
    transform: [{ rotate: "45deg" }],
    zIndex: 10,
  },
  tabScroll: {
    paddingHorizontal: 12,
  },
  tabButton: {
    marginHorizontal: 8,
    paddingBottom: 4,
  },
  tabImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginBottom: 4,
    backgroundColor: "#f3f4f6",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
  },
  tabTextActive: {
    color: "#000",
  },
  tabTextInactive: {
    color: "#9ca3af",
  },
  tabUnderline: {
    height: 4,
    backgroundColor: "black",
    borderRadius: 999,
    marginTop: 4,
  },
  hrDivider: {
    width: "100%",
    height: 1,
    backgroundColor: "#e5e7eb",
    marginVertical: 8,
  },
  productScroll: {
    paddingHorizontal: 12,
  },
  productCard: {
    width: 128,
    marginRight: 16,
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    overflow: "hidden",
  },


  productImageWrapper: {
    position: 'relative',
    borderRadius: 12,
    overflow: 'hidden',
  },

  productImage: {
    width: 140,
    height: 140,
    borderRadius: 12,
  },

  addOverlay: {
    position: 'absolute',
    bottom: 6,
    right: 6,
    backgroundColor: '#10b981',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },

  addText: {
    fontWeight: '600',
    fontSize: 12,
  },

  counterOverlay: {
    position: 'absolute',
    bottom: 6,
    right: 6,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 20,
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },

  counterButton: {
    paddingHorizontal: 6,
  },

  counterText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
  },

  counterValue: {
    fontSize: 14,
    fontWeight: '600',
    marginHorizontal: 4,
  },
  productInfo: {
    padding: 8,
  },
  priceText: {
    fontSize: 20,
    fontWeight: "600",
    color: '#ec4899'
  },
  oldPrice: {
    textDecorationLine: "line-through",
    color: "#9ca3af",
    fontSize: 15,
  },
  productName: {
    fontSize: 15,
    color: "#374151",
    marginTop: 4,
  },
  productTag: {
    fontSize: 12,
    backgroundColor: "#dbeafe",
    color: "#1e40af",
    paddingHorizontal: 4,
    borderRadius: 4,
    marginTop: 4,
    alignSelf: "flex-start",
  },
  productRating: {
    fontSize: 14,
    color: "#047857",
    marginTop: 4,
  },
  horizontalActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
    gap: 8,
  },

  iconButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#2AA7A2',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
  },

  iconText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  seeMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 20,
    marginHorizontal: 12,
    elevation: 4, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    alignSelf: 'center',
    marginRight: 20,
    marginBottom: 10,
    marginTop: 10,
  },

  seeMoreText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#444',
    marginRight: 8,
  },

  seeMoreIconCircle: {
    backgroundColor: '#ec4899', // tailwind sky-400
    borderRadius: 12,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  seeMoreIcon: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 1,
  },

  // buy Again
  imageWrapper: {
    position: 'relative',
    width: '100%',
    height: 80,
    marginBottom: 8,
  },
  buynowcontainer: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginTop: 12,
  },
  header: {
    fontSize: 18,
    marginBottom: 10,
  },
  listContainer: {
    paddingHorizontal: 4,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    marginRight: 12,
    width: 120,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    borderRadius: 8,
  },
  cartBar: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 6,
    zIndex: 100, // ensure it’s above all content
  },

  cartLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  cartIconCircle: {
    backgroundColor: '#f43f5e',
    padding: 8,
    borderRadius: 20,
    marginRight: 12,
  },

  cartText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },

  cartSubText: {
    fontSize: 12,
    color: '#6b7280',
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#fff',
    borderRadius: 6,
    paddingHorizontal: 8,
    elevation: 2,
    minWidth: 80,
  },

  addButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#fff',
    borderColor: '#ec4899',
    borderWidth: 1.5,
    borderRadius: 6,
    paddingVertical: 2,
    paddingHorizontal: 10,
    zIndex: 1,
  },

  price: {
    marginTop: 4,
    fontWeight: 'bold',
    fontSize: 14,
  },
  buynowoldPrice: {
    textDecorationLine: 'line-through',
    color: '#888',
    fontSize: 12,
  },
  size: {
    fontSize: 12,
    color: '#555',
  },
  name: {
    fontSize: 12,
    color: '#111',
  },
  time: {
    fontSize: 11,
    color: '#555',
  },
  seeMoreCard: {
    backgroundColor: '#f472b6',
    borderRadius: 12,
    padding: 10,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buynowseeMoreText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  seeMoreArrow: {
    fontSize: 20,
    color: '#fff',
  },

  // grid product

  gridcontainer: {
    flex: 1,
  },
  scrollContainer: {
    padding: 16,
  },
  sectionHeader: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  sectionUnderline: {
    marginTop: 6,
    height: 2,
    width: 40,
    backgroundColor: '#FF6F61',
    borderRadius: 1,
  },
  gridRow: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  itemBox: {
    width: '23%',
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
    alignItems: 'center',
  },
  itemBoxSpan2: {
    width: '48%',
  },
  ribbonFull: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    paddingVertical: 4,
    alignItems: 'center',
    zIndex: 10,
  },
  ribbonOffer: {
    backgroundColor: 'red',
  },
  ribbonTrending: {
    backgroundColor: '#007bff',
  },
  gridribbonText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  icon: {
    width: '100%',
    height: 80,
    resizeMode: 'cover',
  },
  labelContainer: {
    backgroundColor: '#fff',
    paddingVertical: 6,
    width: '100%',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },

})

export default AllTab
