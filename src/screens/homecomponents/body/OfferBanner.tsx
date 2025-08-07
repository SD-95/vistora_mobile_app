import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

const OfferBanner: React.FC = () => {
  return (
    <View style={styles.cashBannerContainer}>
      {/* Ribbon */}
      <View style={styles.ribbonWrapper}>
        <LinearGradient
          colors={["#2e2e2e", "#000000"]}
          style={styles.ribbon}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={styles.ribbonText}>Valid only for new customer</Text>
        </LinearGradient>
      </View>

      {/* Main Text */}
      <Text style={styles.cashAmountText}>₹125 Free Cash</Text>
      <Text style={styles.cashSubText}>Just for you</Text>

      {/* Product Row */}
      <View style={styles.cashProductRow}>
        <Image
          source={require("../../../../assets/images/milk.png")}
          style={styles.cashProductImage}
          resizeMode="contain"
        />
        <Image
          source={require("../../../../assets/images/bread.png")}
          style={styles.cashProductImage}
          resizeMode="contain"
        />
        <Image
          source={require("../../../../assets/images/veggie.png")}
          style={styles.cashProductImage}
          resizeMode="contain"
        />
        <Image
          source={require("../../../../assets/images/atta.png")}
          style={styles.cashProductImage}
          resizeMode="contain"
        />
        <Image
          source={require("../../../../assets/images/freedom.png")}
          style={styles.cashProductImage}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cashBannerContainer: {
    backgroundColor: "#2AA7A2", // teal
    padding: 10,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    marginTop: 0,
    marginBottom: 16,
    alignItems: "center",
  },

  ribbonWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 10,
  },

  ribbon: {
    width: width * 0.9,
    paddingVertical: 8,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },

  ribbonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    letterSpacing: 0.3,
  },

  cashAmountText: {
    fontSize: 44,
    marginTop: 18,
    fontWeight: "bold",
    color: "#FFD93D",
    textAlign: "center",
  },

  cashSubText: {
    fontSize: 20,
    color: "#fff",
    marginTop: 1,
    marginBottom: 3,
  },

  cashProductRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginVertical: 6,
  },

  cashProductImage: {
    width: 50,
    height: 50,
    marginHorizontal: 4,
  },
});

export default OfferBanner;
