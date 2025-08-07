import React, { useEffect, useRef } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Image,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const categories = [
  { label: "All", icon: "grid" },
  { label: "Fashion", icon: "shopping-bag" },
  { label: "Electronics", icon: "cpu" },
  { label: "Furniture", icon: "home" },
  { label: "Grocery", icon: "shopping-cart" },
  { label: "Pharmacy", icon: "activity" },
  { label: "Fresh", icon: "droplet" },
  { label: "Deal Zone", icon: "star" },
  { label: "Beauty", icon: "smile" },
  { label: "New", icon: "plus-circle" },
];

const theme = {
  primary: "#1DB954",
  categoryIcon: ["#1DB954", "#16A34A"],
};

type Props = {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
};

const CategoryTab: React.FC<Props> = ({ selectedCategory, onCategoryChange }) => {
  const animatedValues = useRef(
    categories.map(() => new Animated.Value(0))
  ).current;

  useEffect(() => {
    animatedValues.forEach((anim, index) => {
      Animated.timing(anim, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      }).start(() => {
        Animated.timing(anim, {
          toValue: 100,
          duration: 500 + index * 100,
          useNativeDriver: true,
        }).start();
      });
    });
  }, []);

  return (
    <View style={{ paddingHorizontal: 12, paddingBottom: 6 }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollTabs}
      >
        {categories.map((item, index) => {
          const isActive = selectedCategory === item.label;

          return (
            <Animated.View
              key={index}
              style={{
                transform: [
                  {
                    translateX: animatedValues[index].interpolate({
                      inputRange: [0, 100],
                      outputRange: [30, 0],
                    }),
                  },
                ],
                opacity: animatedValues[index].interpolate({
                  inputRange: [0, 100],
                  outputRange: [0, 1],
                }),
              }}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => onCategoryChange(item.label)}
              >
                <View
                  style={[
                    styles.scrollTabItem,
                    isActive && {
                      backgroundColor: theme.primary,
                      transform: [{ scale: 1.05 }],
                      borderBottomWidth: 4,
                      borderBottomColor: "#fff",
                    },
                  ]}
                >
                  <LinearGradient
                    colors={
                      isActive
                        ? (theme.categoryIcon as [string, string])
                        : (["#ddd", "#ccc"] as [string, string])
                    }
                    style={styles.scrollTabIconBox}
                  >
                    <Feather
                      name={item.icon as any}
                      size={18}
                      color="#fff"
                    />
                  </LinearGradient>
                  <Text
                    style={[
                      styles.scrollTabText,
                      isActive && {
                        color: "#fff",
                        fontWeight: "700",
                      },
                    ]}
                  >
                    {item.label}
                  </Text>
                </View>
              </TouchableOpacity>
            </Animated.View>
          );
        })}
        
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollTabs: {
    marginTop: 10,
    flexDirection: "row",
    paddingRight: 12,
  },
  scrollTabItem: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    paddingHorizontal: 8,
    paddingVertical: 6,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    minWidth: 64,
  },
  scrollTabIconBox: {
    padding: 4,
    borderRadius: 50,
    marginBottom: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollTabText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
});

export default CategoryTab;
