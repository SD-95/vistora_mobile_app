import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Modal,
  Text,
  Pressable,
  Animated,
  Dimensions,
  Image,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Body from "./homecomponents/body/Body";
import Navbar from "./homecomponents/header/headertop/Navbar";
import Addressbar from "./homecomponents/header/headertop/Addressbar";
import SearchbarOffer from "./homecomponents/header/headersticky/SearchbarOffer";
import CategoryTab from "./homecomponents/header/headersticky/CategoryTabs";
import FooterOfferBanner from "./homecomponents/footer/FooterOfferBanner";
import FooterNavigation from "./homecomponents/footer/FooterNavigation";



const { height } = Dimensions.get("window");
const FOOTER_SCROLL_THRESHOLD = 55;

const Home: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef<ScrollView | null>(null);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const stickyTranslateY = scrollY.interpolate({
    inputRange: [0, 120],
    outputRange: [0, -120],
    extrapolate: "clamp",
  });

  const footerTranslateY = scrollY.interpolate({
    inputRange: [0, FOOTER_SCROLL_THRESHOLD],
    outputRange: [0, FOOTER_SCROLL_THRESHOLD],
    extrapolate: "clamp",
  });

  const footerNavOpacity = scrollY.interpolate({
    inputRange: [0, FOOTER_SCROLL_THRESHOLD],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });


  return (
    <View style={styles.container}>
      {/* Unified Header */}
      <Animated.View
        style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 10, transform: [{ translateY: stickyTranslateY }] }}>
        <LinearGradient colors={["#79c5e8ff", "#2AA7A2"]}>
          <Animated.View style={{ opacity: headerOpacity }}>
            <Navbar />
            <Addressbar />
          </Animated.View>
          <SearchbarOffer />
          <CategoryTab
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
        </LinearGradient>
      </Animated.View>

      {/* Scrollable content */}
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        contentContainerStyle={{
          paddingTop: 265,
          paddingBottom: 35,
          minHeight: Dimensions.get("window").height + 10, // ensure it fills screen
        }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
      >
        <Body selectedCategory={selectedCategory} />
      </Animated.ScrollView>

      {/* Footer Offer Banner */}
      <Animated.View
        style={[
          styles.bannerWrapper,
          { transform: [{ translateY: footerTranslateY }] },
        ]}
      >
      
     
    
        <FooterOfferBanner />
      </Animated.View>

      {/* Footer Navigation */}
      <Animated.View style={[styles.navWrapper, { opacity: footerNavOpacity }]}>
        <FooterNavigation />
      </Animated.View>



      {/* Welcome Modal */}
      <Modal transparent visible={modalVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <LinearGradient colors={["#FFFDE8", "#F5F9E7"]} style={styles.gradient}>
              <View style={styles.closeIconContainer}>
                <Pressable
                  style={styles.closeIcon}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={{ fontSize: 20 }}>✕</Text>
                </Pressable>
              </View>

              <Animated.ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.intro}>INTRODUCING</Text>
                <View style={styles.brandRow}>
                  <Text style={styles.brandName}>vistora</Text>
                  <View style={styles.dailyBadgeContainer}>
                    <Text style={styles.dailyBadge}>daily</Text>
                  </View>
                </View>
                <Text style={styles.savingNote}>
                  Members usually save at least ₹500 with Vistora Daily
                </Text>
                <Text style={styles.sectionTitle}>EXCLUSIVE BENEFITS</Text>

                <View style={styles.bulletItem}>
                  <Image source={require("../../assets/images/fallback.jpg")} style={styles.icon} />
                  <Text style={styles.bulletText}>
                    Lowest prices on <Text style={styles.bold}>fruits & veggies</Text>{"\n"}
                    Freshness Guaranteed
                  </Text>
                </View>

                <View style={styles.bulletItem}>
                  <Image source={require("../../assets/images/fallback.jpg")} style={styles.icon} />
                  <Text style={styles.bulletText}>
                    Free delivery above <Text style={styles.bold}>₹99</Text>{"\n"}
                    Never pay delivery fee again
                  </Text>
                </View>

                <Pressable style={styles.linkRow}>
                  <Text style={styles.link}>Know More ›</Text>
                </Pressable>

                <View style={styles.promoBanner}>
                  <Text style={styles.promoText}>
                    Get Daily at ₹1 <Text style={styles.strike}>₹199</Text>
                  </Text>
                  <Text style={styles.promoSubtext}>for 15 days</Text>
                </View>
              </Animated.ScrollView>
            </LinearGradient>
          </View>
        </View>
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  bannerWrapper: {
    position: "absolute",
    bottom: 60,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  navWrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 9,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    height: height * 0.6,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    overflow: "hidden",
    backgroundColor: "transparent",
  },
  gradient: {
    flex: 1,
    padding: 20,
  },
  closeIconContainer: {
    alignItems: "flex-end",
    paddingBottom: 0,
  },
  closeIcon: {
    padding: 8,
    backgroundColor: "#fff",
    borderRadius: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  scrollContent: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 40,
  },
  intro: {
    fontSize: 20,
    color: "#4C4C4C",
    marginBottom: 4,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginBottom: 4,
  },
  brandName: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#2A2A2A",
  },
  dailyBadgeContainer: {
    backgroundColor: "#007E4F",
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 2,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  dailyBadge: {
    color: "white",
    fontSize: 20,
    textTransform: "uppercase",
  },
  savingNote: {
    backgroundColor: "#FEFCD7",
    padding: 8,
    borderRadius: 8,
    fontSize: 18,
    color: "#2A2A2A",
    marginTop: 10,
    textAlign: "center",
  },
  sectionTitle: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 14,
    color: "#007E4F",
    fontWeight: "600",
  },
  bulletItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
    paddingHorizontal: 16,
  },
  icon: {
    width: 36,
    height: 36,
    marginRight: 12,
  },
  bulletText: {
    fontSize: 14,
    color: "#333",
  },
  bold: {
    fontWeight: "bold",
    color: "#1A7F42",
  },
  linkRow: {
    marginTop: 8,
  },
  link: {
    color: "#007E4F",
    fontWeight: "500",
    fontSize: 14,
  },
  promoBanner: {
    backgroundColor: "#FFE431",
    borderRadius: 8,
    marginTop: 16,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  promoText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#1A1A1A",
  },
  strike: {
    textDecorationLine: "line-through",
    fontSize: 14,
    color: "#555",
  },
  promoSubtext: {
    fontSize: 13,
    color: "#1A1A1A",
  },
});

export default Home;