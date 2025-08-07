import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome, Feather, Octicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const navItems = [
  // {
  //   label: "Home",
  //   icon: <FontAwesome name="home" size={24} color="#1f2937" />,
  //   path: "Home",
  // },
  {
    label: "Categories",
    icon: <Octicons name="apps" size={24} color="#1f2937" />,
    badge: { text: "New", backgroundColor: "#16a34a" },
    path: "CategoriesScreen",
  },
  {
    label: "Cart",
    icon: <Feather name="shopping-cart" size={24} color="#1f2937" />,
    badge: { text: "2", backgroundColor: "#dc2626" },
    path: "CartPage",
  },
  // {
  //   label: "Profile",
  //   icon: <FontAwesome name="user-circle" size={24} color="#1f2937" />,
  //   path: "",
  // },
];

const FooterNavigation: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.navbar}>
      {navItems.map((item, idx) => (
        <TouchableOpacity
          key={idx}
          style={styles.item}
          activeOpacity={item.path ? 0.7 : 1}
          onPress={() => {
            if (item.path) {
              navigation.navigate(item.path as never);
            }
          }}
        >
          <View style={styles.iconWrapper}>
            {item.icon}
            {item.badge && (
              <View
                style={[
                  styles.badge,
                  { backgroundColor: item.badge.backgroundColor },
                ]}
              >
                <Text style={styles.badgeText}>{item.badge.text}</Text>
              </View>
            )}
          </View>
          <Text style={styles.label}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#ffffff",
    borderTopColor: "#e5e7eb",
    paddingVertical: 10,
  },
  item: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  iconWrapper: {
    position: "relative",
  },
  label: {
    fontSize: 12,
    color: "#374151",
    fontWeight: "500",
    marginTop: 2,
  },
  badge: {
    position: "absolute",
    top: -6,
    right: -10,
    minWidth: 16,
    paddingHorizontal: 5,
    height: 16,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
});

export default FooterNavigation;
