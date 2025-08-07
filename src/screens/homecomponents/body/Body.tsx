// body.tsx
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import OfferBanner from "./OfferBanner";
import ProductSection from "./ProductSection";

type Props = {
  selectedCategory: string;
};

const Body: React.FC<Props> = ({ selectedCategory }) => {
  return (
    <View style={styles.container}>
      <OfferBanner />
      <ProductSection selectedCategory={selectedCategory} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 0,
    paddingTop: 2,
    backgroundColor: "#f9f9f9",
  },
});

export default Body;
