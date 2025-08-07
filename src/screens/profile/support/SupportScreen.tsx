import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { Feather, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
}

const orders = [
  {
    id: '1',
    status: 'Order delivered',
    date: 'Placed at 9th Aug 2024, 06:10 pm',
    amount: '₹117.76',
    images: [require('../../../../assets/images/fallback.jpg')],
  },
  {
    id: '2',
    status: 'Order delivered',
    date: 'Placed at 13th Jun 2024, 05:49 pm',
    amount: '₹137.84',
    images: [
      require('../../../../assets/images/fallback.jpg'),
      require('../../../../assets/images/fallback.jpg'),
    ],
  },
  // 8 more dummy orders for example
  ...Array.from({ length: 8 }, (_, i) => ({
    id: `${i + 3}`,
    status: 'Order delivered',
    date: `Placed at 1${i}th May 2024, 04:00 pm`,
    amount: `₹10${i}.00`,
    images: [require('../../../../assets/images/fallback.jpg')],
  })),
];

const faqs = [
  'Coupons & Offers',
  'General Inquiry',
  'Payment Related',
  'Feedback & Suggestions',
  'Order / Products Related',
  'Gift Card',
  'No-Cost EMI',
  'Wallet Related',
  'Vistora Super Saver',
  'Vistora Daily',
];

const SupportScreen = () => {
  const navigation = useNavigation();
  const [showAllOrders, setShowAllOrders] = useState(false);

  const handleToggleOrders = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShowAllOrders(prev => !prev);
  };

  const visibleOrders = showAllOrders ? orders : orders.slice(0, 2);

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help Support & FAQs</Text>
      </View>

      {/* Need Help Row */}
      <TouchableOpacity style={styles.helpRow}>
        <View style={styles.iconContainer}>
          <AntDesign name="customerservice" size={18} color="#fff" />
        </View>
        <Text style={styles.helpRowText}>Need help with this order?</Text>
        <Feather name="chevron-right" size={18} color="#000" />
      </TouchableOpacity>

      {/* Orders Section Title */}
      <View style={styles.ordersHeaderRow}>
        <Text style={styles.sectionTitle}>Get Help on Orders</Text>
        <TouchableOpacity onPress={handleToggleOrders}>
          <Text style={styles.toggleButton}>{showAllOrders ? 'Minimize' : 'See all orders'}</Text>
        </TouchableOpacity>
      </View>

      {/* Orders List */}
      {visibleOrders.map(order => (
        <TouchableOpacity key={order.id} style={styles.orderCard}>
          <View style={styles.orderImages}>
            {order.images.map((img, index) => (
              <Image key={index} source={img} style={styles.orderImage} />
            ))}
          </View>
          <View style={styles.orderDetails}>
            <Text style={styles.orderStatus}>
              {order.status} <Feather name="check-circle" size={14} color="green" />
            </Text>
            <Text style={styles.orderDate}>{order.date}</Text>
          </View>
          <View style={styles.orderRight}>
            <Text style={styles.orderAmount}>{order.amount}</Text>
            <Feather name="chevron-right" size={18} color="#000" />
          </View>
        </TouchableOpacity>
      ))}

      {/* FAQs Section Card */}
      {!showAllOrders && (
        <View style={styles.faqCard}>
          <Text style={styles.faqTitle}>FAQs</Text>
          {faqs.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.faqRow, index === faqs.length - 1 && { borderBottomWidth: 0 }]}
            >
              <Text style={styles.faqText}>{item}</Text>
              <Feather name="chevron-right" size={18} color="#c30d00" />
            </TouchableOpacity>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

export default SupportScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 0.5,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginLeft: 16,
    color: '#222',
  },
  helpRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 16,
    borderRadius: 12,
    marginVertical: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
  },
  iconContainer: {
    backgroundColor: '#e53935',
    borderRadius: 50,
    padding: 10,
    marginRight: 12,
  },
  helpRowText: {
    flex: 1,
    fontSize: 17,
    fontWeight: '500',
    color: '#222',
  },
  ordersHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2e0837',
  },
  toggleButton: {
    fontSize: 14,
    color: '#c30d00',
    fontWeight: '500',
  },
  orderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 14,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
  },
  orderImages: {
    flexDirection: 'row',
    marginRight: 12,
  },
  orderImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 6,
  },
  orderDetails: {
    flex: 1,
  },
  orderStatus: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  orderDate: {
    fontSize: 13,
    color: '#777',
    marginTop: 2,
  },
  orderRight: {
    alignItems: 'flex-end',
  },
  orderAmount: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#222',
  },
  faqCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
  },
  faqTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2e0837',
    padding: 16,
  },
  faqRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: '#e0e0e0',
  },
  faqText: {
    fontSize: 16,
    color: '#222',
  },
});
