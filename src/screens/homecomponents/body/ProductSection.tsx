import React from "react";
import { View, StyleSheet } from "react-native";
import AllTab from "./producttabs/AllTab";
import FashionTab from "./producttabs/FashionTab";
import ElectronicsTab from "./producttabs/ElectronicsTab";
import HomeTab from "./producttabs/HomeTab";
import GroceryTab from "./producttabs/GroceryTab";
import PharmacyTab from "./producttabs/PharmacyTab";
import FreshTab from "./producttabs/FreshTab";
import DealZoneTab from "./producttabs/DealZoneTab";
import BeautyTab from "./producttabs/BeautyTab";
import NewTab from "./producttabs/NewTab";

// Import tab components


type Props = {
  selectedCategory: string;
};

const ProductSection: React.FC<Props> = ({ selectedCategory }) => {
  const renderCategoryComponent = () => {
    switch (selectedCategory) {
      case "All":
        return <AllTab />;
      case "Fashion":
        return <FashionTab />;
      case "Electronics":
        return <ElectronicsTab />;
      case "Home":
        return <HomeTab />;
      case "Grocery":
        return <GroceryTab />;
      case "Pharmacy":
        return <PharmacyTab />;
      case "Fresh":
        return <FreshTab />;
      case "Deal Zone":
        return <DealZoneTab />;
      case "Beauty":
        return <BeautyTab />;
      case "New":
        return <NewTab />;
      default:
        return null;
    }
  };

  return <View style={styles.container}>{renderCategoryComponent()}</View>;
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    paddingTop:10
  },
});

export default ProductSection;
