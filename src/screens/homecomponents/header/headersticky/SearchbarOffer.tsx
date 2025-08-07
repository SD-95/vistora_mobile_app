import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Animated,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get("window");
const BANNER_WIDTH = 170; // Adjust as needed
const BANNER_HEIGHT = 56;
const BANNER_SPACING = 10;

const bannerData = [
  {
    type: "seasonal",
    title: "Rakhi",
    subtitle: "Season",
    image: require("../../../../../assets/images/rakhi.jpg"),
    gradient: ["#FFA17F", "#00223E"],
  },
  {
    type: "badge",
    text: "20% OFF on Groceries",
    backgroundColor: "#FF3B30",
  },
  {
    type: "badge",
    text: "50% OFF for New Users",
    backgroundColor: "#007AFF",
  },
  {
    type: "badge",
    text: "Offer Ending Soon",
    backgroundColor: "#FF9500",
  },
];

const SearchbarOffer: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const translateX = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % bannerData.length;

      Animated.timing(translateX, {
        toValue: -nextIndex * (BANNER_WIDTH + BANNER_SPACING),
        duration: 400,
        useNativeDriver: true,
      }).start();

      setCurrentIndex(nextIndex);
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <View style={styles.searchBannerRow}>
      {/* Search Bar */}
      <TouchableOpacity
        style={styles.searchBar}
        activeOpacity={0.9}
        onPress={() => navigation.navigate('SearchScreen' as never)}
      >
        <Feather name="search" size={16} color="#888" />
        <Text style={styles.placeholderText}>Search for "milk"</Text>
      </TouchableOpacity>

      {/* Banner */}
      <View style={styles.bannerBox}>
        <Animated.View
          style={{
            flexDirection: "row",
            transform: [{ translateX }],
          }}
        >
          {bannerData.map((banner, index) => (
            <View
              key={index}
              style={[
                styles.bannerSlide,
                { marginRight: index === bannerData.length - 1 ? 0 : BANNER_SPACING },
              ]}
            >
              {banner.type === "seasonal" ? (
                <LinearGradient
                  colors={banner.gradient as [string, string]}
                  style={styles.bannerGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <View style={styles.bannerContent}>
                    <View style={styles.bannerTextContainer}>
                      <Text style={styles.bannerTitle}>{banner.title}</Text>
                      <Text style={styles.bannerSubtitle}>
                        {banner.subtitle}
                      </Text>
                    </View>
                    <Image
                      source={banner.image}
                      style={styles.bannerImage}
                      resizeMode="cover"
                    />
                  </View>
                </LinearGradient>
              ) : (
                <View
                  style={[
                    styles.offerBadgeContainer,
                    { backgroundColor: banner.backgroundColor },
                  ]}
                >
                  <Text style={styles.offerBadgeText}>{banner.text}</Text>
                </View>
              )}
            </View>
          ))}
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchBannerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  searchBar: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 44,
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#eee",
  },
  placeholderText: {
    fontSize: 15,
    color: "#888",
    marginLeft: 6,
  },
  bannerBox: {
    width: BANNER_WIDTH,
    height: BANNER_HEIGHT,
    overflow: "hidden",
  },
  bannerSlide: {
    width: BANNER_WIDTH,
    height: BANNER_HEIGHT,
    justifyContent: "center",
  },
  bannerGradient: {
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
    height: BANNER_HEIGHT,
    justifyContent: "center",
  },
  bannerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  bannerTextContainer: {
    flex: 1,
    paddingRight: 6,
  },
  bannerTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },
  bannerSubtitle: {
    fontSize: 12,
    color: "#fff",
  },
  bannerImage: {
    width: 36,
    height: 36,
    marginLeft: 6,
    borderRadius: 6,
  },
  offerBadgeContainer: {
    borderRadius: 12,
    height: BANNER_HEIGHT,
    paddingHorizontal: 12,
    paddingVertical: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  offerBadgeText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "700",
    textAlign: "center",
  },
});

export default SearchbarOffer;
