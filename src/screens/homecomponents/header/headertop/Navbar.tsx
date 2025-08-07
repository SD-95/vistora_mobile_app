import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const Navbar: React.FC = () => {
  const [isToggleOn, setIsToggleOn] = useState(false);

  const handleToggle = () => {
    setIsToggleOn((prev) => !prev);
  };

  return (
    <View style={styles.navbar}>
      {/* Left: Logo + Brand */}
      <View style={styles.logoSection}>
        <Image
          source={require("../../../../../assets/images/circle_logo.png")}
          style={styles.avatar}
        />
        <Text style={styles.brandName}>Vistora</Text>
      </View>

      {/* Right: Toggle + WhatsApp */}
      <View style={styles.rightSection}>
        <TouchableOpacity onPress={handleToggle} activeOpacity={0.8}>
          <View style={[styles.toggleWrapper, { opacity: isToggleOn ? 1 : 0.5 }]}>
            {/* Switch-like visual bar */}
            <View
              style={[
                styles.switchTrack,
                { backgroundColor: isToggleOn ? "#00C853" : "#ccc" },
              ]}
            >
              <Animated.View
                style={[
                  styles.switchKnob,
                  {
                    transform: [
                      { translateX: isToggleOn ? 28 : 2 },
                    ],
                  },
                ]}
              />
            </View>

            {/* Vistora + Badge below */}
            <View style={styles.toggleBox}>
              <Text style={styles.toggleVistora}>Vistora</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>super saver</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.whatsappButton}>
          <FontAwesome name="whatsapp" size={22} color="#25D366" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  logoSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: "#ccc",
  },
  brandName: {
    fontSize: 30,
    color: "#1E1E1E",
    fontFamily: "PlaywriteAustraliaNSW-Regular",
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  toggleWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F1F1",
    borderRadius: 14,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  switchTrack: {
    width: 50,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    marginRight: 8,
    padding: 2,
  },
  switchKnob: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    elevation: 3,
  },
  toggleBox: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  toggleVistora: {
    fontSize: 18,
    fontFamily: "WinkyRough-Light",
    color: "#222",
  },
  badge: {
    backgroundColor: "#007E4F",
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginTop: 2,
  },
  badgeText: {
    fontSize: 10,
    color: "#fff",
    fontWeight: "600",
    textTransform: "uppercase",
  },
  whatsappButton: {
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});

export default Navbar;
