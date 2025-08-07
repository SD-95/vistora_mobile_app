import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

const badgeCarouselData = [
  { title: "Get", subtitle: "daily" },
  { title: "Fresh", subtitle: "Deals" },
  { title: "Buy", subtitle: "again" },
];

const Addressbar: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const deliveryOpacity = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;
const navigation = useNavigation();
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
        }),
      ]).start(() => {
        setCurrentIndex((prev) => (prev + 1) % badgeCarouselData.length);
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: deliveryOpacity }]}>
      <View style={styles.row}>
        {/* Left Section */}
        <View style={styles.leftColumn}>
          <View style={styles.lineOne}>
            <Feather name="zap" size={30} color="#b4b91dff" style={{ marginRight: 4 }} />
            <Text style={styles.deliveryTime}>11 mins</Text>
            <View style={styles.deliveryBadge}>
              <Text style={styles.deliveryBadgeText}>On Time Delivery</Text>
            </View>
          </View>

          <View style={styles.lineTwo}>
            <TouchableOpacity
              style={styles.addressWrapper}
              onPress={() => navigation.navigate('LocationScreen' as never)}
            >
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.addressText}
              >
                Work - APIIC Colony, North Kamalapuri, Hyderabad
              </Text>
              <Feather name="chevron-down" size={18} color="#888" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Right Section */}
        <View style={styles.rightColumn}>
          <Animated.View style={[styles.badgeCard, { opacity: fadeAnim }]}>
            <Text style={styles.badgeTitle}>
              {badgeCarouselData[currentIndex].title}
            </Text>
            <View style={styles.badgeSubtitleBox}>
              <Text style={styles.badgeSubtitle}>
                {badgeCarouselData[currentIndex].subtitle}
              </Text>
            </View>
          </Animated.View>

          <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Settings' as never)}>
            <View style={styles.profileIcon}>
              <Feather name="user" size={22} color="#fff" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 0,
    paddingBottom: 6,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  leftColumn: {
    flex: 1,
    marginRight: 10,
  },
  lineOne: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  deliveryTime: {
    fontWeight: "600",
    fontSize: 30,
    color: "#1E1E1E",
  },
  deliveryBadge: {
    backgroundColor: "#1DB954",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 8,
  },
  deliveryBadgeText: {
    fontSize: 15,
    color: "#fff",
    fontWeight: "600",
  },
  lineTwo: {
    flexDirection: "row",
    alignItems: "center",
  },
  addressWrapper: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  addressText: {
    fontSize: 15,
    color: "#444",
    flexShrink: 1,
    marginRight: 6,
    textDecorationLine: "underline",
    fontWeight: "500",
  },
  rightColumn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  badgeCard: {
    backgroundColor: "#fff",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1DB954",
    marginBottom: 2,
  },
  badgeSubtitleBox: {
    backgroundColor: "#1DB954",
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  badgeSubtitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#fff",
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#1DB954",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#fff",
  },
});

export default Addressbar;
