import React, { useRef } from "react";
import { View, Text, FlatList, Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

const banners = [
  {
    id: "1",
    backgroundColor: "#e48487ff",
    icon: "🎉",
    iconBg: "#c66266ff",
    title: "Use code",
    code: "SAVE10",
    description: "at checkout",
    badge: "Limited Time Offer",
    textColor: "#000",
  },
  {
    id: "2",
    backgroundColor: "#cec268ff",
    icon: "🚚",
    iconBg: "#c0b03bff",
    title: "Free delivery on",
    highlight: "fruits & veggies",
    description: "today!",
    badge: "Only for New User",
    textColor: "#000",
  },
  {
    id: "3",
    custom: true,
  },
];

const FooterOfferBanner: React.FC = () => {
  const flatListRef = useRef<FlatList>(null);

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.slideWrapper}>
      {item.custom ? (
        <View style={styles.structuredBanner}>
          <View style={[styles.iconContainer, { backgroundColor: "#fde68a" }]}>
            <Text style={styles.bannerIcon}>🔒</Text>
          </View>
          <View style={styles.bannerTextWrapper}>
            <Text style={styles.bannerText}>
              Shop for <Text style={styles.highlight}>₹99</Text> to unlock FREE delivery
            </Text>
          </View>
          <View style={[styles.badge, styles.badgeRight]}>
            <Text style={styles.badgeText}>Daily</Text>
          </View>
        </View>
      ) : (
        <View
          style={[
            styles.structuredBanner,
            { backgroundColor: item.backgroundColor },
          ]}
        >
          <View style={[styles.iconContainer, { backgroundColor: item.iconBg }]}>
            <Text style={styles.bannerIcon}>{item.icon}</Text>
          </View>
          <View style={styles.bannerTextWrapper}>
            {item.code ? (
              <Text style={[styles.bannerText, { color: item.textColor }]}>
                {item.title}{" "}
                <Text style={styles.highlight}>{item.code}</Text> {item.description}
              </Text>
            ) : (
              <Text style={[styles.bannerText, { color: item.textColor }]}>
                {item.title}{" "}
                <Text style={styles.highlight}>{item.highlight}</Text> {item.description}
              </Text>
            )}
          </View>
          {item.badge && (
            <View style={[styles.badge, styles.badgeRight]}>
              <Text style={styles.badgeText}>{item.badge}</Text>
            </View>
          )}
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.carouselContainer}>
      <FlatList
        ref={flatListRef}
        data={banners}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        snapToInterval={width}
        decelerationRate="fast"
        bounces={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    marginBottom: 0,
  },
  slideWrapper: {
    width,
    paddingHorizontal: 12,
  },
  structuredBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fef3c7",
    borderRadius: 8,
    padding: 5,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#fde68a",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  bannerIcon: {
    fontSize: 18,
  },
  bannerTextWrapper: {
    flex: 1,
  },
  bannerText: {
    fontSize: 15,
    fontWeight: "500",
  },
  highlight: {
    color: "#de1e6aff",
    fontWeight: "bold",
  },
  badge: {
    backgroundColor: "#16a34a",
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
  },
  badgeRight: {
    marginLeft: 8,
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default FooterOfferBanner;
