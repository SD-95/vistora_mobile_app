import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Image, TextInput
} from 'react-native';
import { Ionicons, Feather, Entypo, AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const CartPage = () => {
  const [modalVisible, setModalVisible] = useState(true);
  const [collapse, setCollapse] = useState(false);
  const navigation = useNavigation();

  const [usePoints, setUsePoints] = useState(false);
  const toggleUsePoints = () => setUsePoints(!usePoints);

  const [showGSTModal, setShowGSTModal] = useState(false);    //## GST modal state
  const [showTipModal, setShowTipModal] = useState(false);    //## Delivery Tip modal State
  const [showInstructionsModal, setShowInstructionsModal] = useState(false);  //## Delivery instructions modal state
  const [showBillModal, setShowBillModal] = useState(false);  //## Bill summery modal state
  const [showDeliverySafetyModal, setShowDeliverySafetyModal] = useState(false);  //## Safety modal state


  const deliveryOptions = [
    {
      title: 'Leave with security guard',
      subtitle: 'The order will be left with security guard',
      icon: 'shield',
    },
    {
      title: 'Leave at door',
      subtitle: 'The order will be left at your doorstep',
      icon: 'log-out',
    },
    {
      title: 'Beware of Pets',
      subtitle: 'Delivery partner will be informed about the presence of pet(s)',
      icon: 'alert-triangle',
    },
    {
      title: 'Return the bag',
      subtitle: 'Help us reuse old bags by returning them to the delivery partner',
      icon: 'shopping-bag',
    },
  ] as const;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>

      {/* Modal */}

      <Modal transparent visible={modalVisible} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.newModalContainer}>
            {/* Address Row with Close */}

            <View style={styles.addressHeader}>
              <View style={styles.addressTextContainer}>
                <TouchableOpacity style={styles.addressTextRow} onPress={() => navigation.navigate('LocationScreen' as never)}>
                  <Text style={styles.deliveryTitle}>Delivering to Work</Text>
                  <AntDesign name="downcircleo" size={18} color="black" style={styles.dropdownIcon} />
                </TouchableOpacity>
                <Text style={styles.deliveryAddress}>
                  spruko technologies, H.no 1-8-67, LIG 213, AP...
                </Text>
              </View>

              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            {/* Paper Bag Option */}
            <TouchableOpacity style={styles.paperBagRow}>
              <Ionicons name="checkbox" size={18} color="green" />
              <Text style={styles.paperBagText}>I don’t need a paper bag 🌿</Text>
              <Ionicons name="chevron-forward" size={16} color="#333" style={{ marginLeft: 'auto' }} />
            </TouchableOpacity>

            {/* Free Cash Option */}
            <View style={styles.cashRow}>
              <Ionicons name="square-outline" size={20} color="#333" />
              <Text style={styles.cashText}>Apply <Text style={{ fontWeight: 'bold' }}>₹50</Text> Free Cash</Text>
            </View>

            {/* Pay Button */}
            <TouchableOpacity style={styles.newPayButton} onPress={() => navigation.navigate('PaymentGateway' as never)}>
              <Text style={styles.newPayButtonText}>Click to Pay ₹114.17</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Cart Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your Cart</Text>
        <View style={styles.savedBadge}>
          <Text style={styles.savedBadgeText}>SAVED ₹211</Text>
        </View>
      </View>

      {/* Save more with Vistora daily */}
      <View style={styles.saveMoreWrapper}>
        <TouchableOpacity
          style={styles.collapseCard}
          onPress={() => setCollapse(!collapse)}
        >

          <View style={styles.collapseLeft}>
            <Text style={styles.collapseText}>
              Save more with <Text style={styles.brand}>Vistora</Text>
            </Text>
            <View style={styles.dailyTagContainer}>
              <Text style={styles.dailyTag}>daily</Text>
            </View>
          </View>
          <Ionicons
            name={collapse ? 'chevron-up' : 'chevron-down'}
            size={20}
            color="#fff"
          />
        </TouchableOpacity>

        {collapse && (
          <View style={styles.collapseBody}>
            <View style={styles.collapseItem}>
              <Text style={styles.collapseIcon}>%</Text>
              <View>
                <Text style={styles.collapseItemTitle}>Lowest prices on Fruits & Veggies</Text>
                <Text style={styles.collapseItemSubtitle}>Freshness guaranteed</Text>
              </View>
            </View>
            <View style={styles.collapseItem}>
              <Text style={styles.collapseIcon}>Z</Text>
              <Text style={styles.collapseItemTitle}>Free delivery above ₹99</Text>
            </View>
          </View>
        )}
      </View>

      {/* Unlock Offers Section */}
      <View style={styles.unlockSection}>
        <View style={styles.unlockHeader}>
          <Text style={styles.unlockTitle}>Unlock new offers</Text>
          <Text style={styles.unlockCounter}>0/4</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[1, 2, 3, 4].map((_, i) => (
            <View key={i} style={styles.offerCard}>
              <View style={styles.offerTopRow}>
                <View style={styles.offerImage} />
                <View style={styles.offerImage} />
                <View style={styles.priceBadge}>
                  <Text style={styles.priceBadgeText}>₹1</Text>
                </View>
                <Text style={styles.offerMainText}>Grab a top deal</Text>
                <TouchableOpacity style={styles.unlockButton}>
                  <Feather name="lock" size={14} color="#e91e63" />
                  <Text style={styles.unlockButtonText}>Unlock</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.dottedLine} />
              <Text style={styles.unlockNote}>
                Shop for <Text style={{ fontWeight: 'bold' }}>₹713 more</Text> to unlock special price
              </Text>
              <View style={styles.progressContainer}>
                <View style={styles.progressBar} />
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Cart session */}
      <View style={styles.cartcontainer}>
        {/* Delivery Time */}
        <View style={styles.deliveryRow}>
          <Entypo name="clock" size={24} color="#36C07F" />
          <Text style={styles.deliveryText}>Delivery in 6 mins</Text>
        </View>

        {/* Daily Offer Box */}
        <View style={styles.dailyBox}>
          <View>
            <Text style={styles.dailyHeading}>Daily added for 15 days</Text>
            <Text style={styles.dailySubText}>
              <Text style={{ fontWeight: 'bold' }}>Members save ₹200</Text> per month with Daily
            </Text>
          </View>
          <TouchableOpacity style={styles.removeButton}>
            <Text style={styles.removeText}>Remove</Text>
          </TouchableOpacity>
          <Text style={styles.dailyPrice}>₹1 <Text style={styles.dailyStrikethrough}>₹199</Text></Text>
        </View>

        {/* Cart Items */}
        <View style={styles.cartItem}>
          <Image source={require('../../assets/images/fallback.jpg')} style={styles.itemImage} />
          <View style={{ flex: 1 }}>
            <Text style={styles.itemTitle}>Tomato Local</Text>
            <Text style={styles.itemSubText}>500 g</Text>
          </View>
          <View style={styles.quantityBox}>
            <AntDesign name="minus" size={16} color="#D12D2D" />
            <Text style={styles.qty}>1</Text>
            <AntDesign name="plus" size={16} color="#D12D2D" />
          </View>
          <Text style={styles.itemPrice}>₹35 <Text style={styles.dailyStrikethrough}>₹39</Text></Text>
        </View>

        <View style={styles.cartItem}>
          <Image source={require('../../assets/images/fallback.jpg')} style={styles.itemImage} />
          <View style={{ flex: 1 }}>
            <Text style={styles.itemTitle}>Slam Book</Text>
            <Text style={styles.itemSubText}>Friendship Day Special</Text>
          </View>
          <TouchableOpacity style={styles.removeSmall}>
            <Text style={styles.removeSmallText}>Remove</Text>
          </TouchableOpacity>
          <Text style={styles.itemPrice}>₹0 <Text style={styles.dailyStrikethrough}>₹1</Text></Text>
        </View>

        {/* Add More Items */}
        <View style={styles.addMoreRow}>
          <Text style={styles.cartMissingText}>Your Cart is missing something...??</Text>
          <TouchableOpacity style={styles.addMoreButton}>
            <Text style={styles.addMoreText}>+ Add More Items</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Payment info session */}
      <View style={{ gap: 14, marginHorizontal: 16, marginTop: 20, marginBottom: 20 }}>

        {/* Vistora Points */}
        <View style={styles.vistoraCard}>
          <Text style={styles.sectionTitle}>Vistora Point</Text>
          <View style={styles.vistoraRow}>
            <Text style={styles.vistoraPoints}>1200 pts</Text>
            <Text style={styles.vistoraValue}>₹120.00</Text>
          </View>

          <View style={styles.vistoraCheckboxRow}>
            <TouchableOpacity onPress={toggleUsePoints}>
              <MaterialIcons
                name={usePoints ? 'check-box' : 'check-box-outline-blank'}
                size={22}
                color="#e91e63"
              />
            </TouchableOpacity>
            <Text style={styles.vistoraUseText}>
              Use Points <Text style={styles.vistoraValue}>₹120.00</Text>
            </Text>
          </View>
        </View>

        {/* View Coupons Card */}
        <View style={styles.card}>
          <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('CouponScreen' as never)}>
            <Text style={styles.rowTextBold}>🎟️ View Coupons & Offers</Text>
            <View style={styles.circleIcon}>
              <Feather name="chevron-right" size={20} color="#000" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Ordering for someone else Card */}
        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.orderingText}>Ordering for someone else?</Text>
            <TouchableOpacity style={styles.addDetailsButton}>
              <Text style={styles.addDetailsText}>+ Add Details</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* GST Invoice Card */}
        <View style={styles.card}>
          <TouchableOpacity style={styles.invoiceRow} onPress={() => setShowGSTModal(true)}>
            <Image
              source={require('../../assets/images/fallback.jpg')}
              style={styles.invoiceIcon}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.rowTextBold}>Get GST Invoice</Text>
              <Text style={styles.subText}>
                Claim upto <Text style={{ fontWeight: 'bold' }}>28%</Text> with the GST Invoice
              </Text>
            </View>
            <View style={styles.circleIcon}>
              <Feather name="chevron-right" size={20} color="#000" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Grouped Info Section */}
        <View style={styles.card}>
          <TouchableOpacity style={styles.row} onPress={() => setShowTipModal(true)}>
            <View>
              <Text style={styles.rowTextBold}>🚚 Delivery Partner Tip</Text>
              <Text style={styles.subText}>This amount goes to your delivery partner</Text>
            </View>
            <View style={styles.circleIcon}>
              <Feather name="chevron-right" size={20} color="#000" />
            </View>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.row} onPress={() => setShowInstructionsModal(true)}>
            <View>
              <Text style={styles.rowTextBold}>💬 Delivery Instructions</Text>
              <Text style={styles.subText}>Delivery partner will be notified</Text>
            </View>
            <View style={styles.circleIcon}>
              <Feather name="chevron-right" size={20} color="#000" />
            </View>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.row} onPress={() => setShowBillModal(true)}>
            <View>
              <Text style={styles.rowTextBold}>💰 To Pay</Text>
              <Text style={styles.subText}>Incl. all taxes and charges</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.strike}>₹325.17</Text>
              <Text style={styles.price}>₹114.17</Text>
              <Text style={styles.saving}>SAVING ₹211</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.row} onPress={() => setShowDeliverySafetyModal(true)}>
            <View>
              <Text style={styles.rowTextBold}>🛵 Delivery Partner's Safety</Text>
              <Text style={styles.subText}>Learn more about how we ensure their safety</Text>
            </View>
            <View style={styles.circleIcon}>
              <Feather name="chevron-right" size={20} color="#000" />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*/}

      {/* GST Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showGSTModal}
        onRequestClose={() => setShowGSTModal(false)}
      >
        <View style={styles.gstModalOverlay}>
          <View style={styles.gstModalContainer}>
            <View style={styles.gstModalHeader}>
              <Text style={styles.gstModalTitle}>Add GST Details</Text>
              <TouchableOpacity onPress={() => setShowGSTModal(false)} style={styles.gstCloseIcon}>
                <Feather name="x" size={18} color="#000" />
              </TouchableOpacity>
            </View>

            <Text style={styles.gstModalDescription}>
              If you are a business owner, add your GST details and get GST invoice on your orders
            </Text>

            <TextInput
              placeholder="GST Number"
              style={styles.gstInputGST}
              placeholderTextColor="#888"
            />
            <TextInput
              placeholder="Business Name"
              style={styles.gstInput}
              placeholderTextColor="#888"
            />

            <TouchableOpacity style={styles.gstConfirmButton}>
              <Text style={styles.gstConfirmButtonText}>Add GSTIN and Confirm</Text>
              <Feather name="chevron-right" size={18} color="#fff" />
            </TouchableOpacity>

            <Text style={styles.gstTermsText}>
              By continuing, you agree to our <Text style={styles.gstLink}>Terms and Conditions</Text>
            </Text>
          </View>
        </View>
      </Modal>

      {/* DeliveryTip Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showTipModal}
        onRequestClose={() => setShowTipModal(false)}
      >
        <View style={styles.tipModalOverlay}>
          <View style={styles.tipModalContainer}>
            <View style={styles.tipModalHeader}>
              <Text style={styles.tipModalTitle}>Delivery Tip</Text>
              <TouchableOpacity onPress={() => setShowTipModal(false)} style={styles.tipCloseIcon}>
                <Feather name="x" size={18} color="#000" />
              </TouchableOpacity>
            </View>

            <Text style={styles.tipModalSubText}>
              The entire amount goes to your delivery partner
            </Text>

            <View style={styles.tipOptionsContainer}>
              <TouchableOpacity style={styles.tipAmountBox}>
                <Text>💰 ₹10</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.tipAmountBox}>
                <Text>💰 ₹20</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.tipAmountBox}>
                <Text>💰 ₹35</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.customTipButton}>
              <Text style={styles.customTipText}>Add a Custom Tip</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Delivery Instructions */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={showInstructionsModal}
        onRequestClose={() => setShowInstructionsModal(false)}
      >
        <View style={styles.instructionsModalOverlay}>
          <View style={styles.instructionsModalContainer}>
            {/* Header */}
            <View style={styles.instructionsModalHeader}>
              <Text style={styles.instructionsModalTitle}>Delivery Instructions</Text>
              <TouchableOpacity
                onPress={() => setShowInstructionsModal(false)}
                style={styles.instructionsCloseIcon}
              >
                <Feather name="x" size={18} color="#000" />
              </TouchableOpacity>
            </View>
            <Text style={styles.instructionsModalSubText}>
              Your delivery partner will be notified of this
            </Text>

            {/* Option List */}
            {deliveryOptions.map((item, index) => (
              <TouchableOpacity key={index} style={styles.instructionsOptionBox}>
                <Feather name={item.icon} size={20} color="#000" style={{ marginRight: 12 }} />
                <View>
                  <Text style={styles.instructionsOptionTitle}>{item.title}</Text>
                  <Text style={styles.instructionsOptionSubtitle}>{item.subtitle}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      {/* Bill summery */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={showBillModal}
        onRequestClose={() => setShowBillModal(false)}
      >
        <View style={styles.billModalOverlay}>
          <View style={styles.billModalContainer}>
            <View style={styles.billModalHeader}>
              <Text style={styles.billModalTitle}>Bill Summary</Text>
              <TouchableOpacity
                onPress={() => setShowBillModal(false)}
                style={styles.billCloseIcon}
              >
                <Feather name="x" size={18} color="#000" />
              </TouchableOpacity>
            </View>

            <View style={styles.billRowLine}>
              <Text style={styles.billRowLeft}>Item Total & GST</Text>
              <Text style={styles.billRowStrike}>₹40.26</Text>
              <Text style={styles.billRowRight}>₹24.26</Text>
            </View>
            <View style={styles.billRowLine}>
              <Text style={styles.billRowLeft}>Small Cart Fee</Text>
              <Text style={styles.billRowRight}>₹35</Text>
            </View>
            <Text style={styles.billNote}>₹0 Small Cart Fee on orders above ₹99</Text>

            <View style={styles.billRowLine}>
              <Text style={styles.billRowLeft}>Handling Charge</Text>
              <Text style={styles.billRowStrike}>₹20.99</Text>
              <Text style={styles.billRowRight}>₹12.99</Text>
            </View>

            <View style={styles.billRowLine}>
              <Text style={styles.billRowLeft}>Delivery Fee</Text>
              <Text style={styles.billRowRight}>₹30</Text>
            </View>
            <Text style={styles.billNoteGreen}>Add products worth ₹75 to get free delivery</Text>

            <View style={styles.billRowLine}>
              <Text style={styles.billRowLeft}>Vistora Membership</Text>
              <Text style={styles.billRowStrike}>₹199</Text>
              <Text style={styles.billRowRight}>₹1</Text>
            </View>

            <View style={styles.billDivider} />

            <View style={styles.billRowLine}>
              <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <Text style={styles.billTotal}>To Pay</Text>
                <View style={styles.savingBadge}>
                  <Text style={styles.savingBadgeText}>SAVING ₹222</Text>
                </View>
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.billRowStrike}>₹325.25</Text>
                <Text style={styles.billTotalAmount}>₹103.25</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.payButton} onPress={() => {
              setShowBillModal(false);
              setModalVisible(true); // <-- adjust this depending on your use case
            }}>
              <Text style={styles.payButtonText}>Pay ₹103.25</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Safety */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showDeliverySafetyModal}
        onRequestClose={() => setShowDeliverySafetyModal(false)}
      >
        <View style={styles.deliverySafetyModalOverlay}>
          <View style={styles.deliverySafetyModalContainer}>
            {/* Header */}
            <View style={styles.deliverySafetyHeader}>
              <Text style={styles.deliverySafetyTitle}>Here's How We Do It</Text>
              <TouchableOpacity
                onPress={() => setShowDeliverySafetyModal(false)}
                style={styles.deliverySafetyCloseIcon}
              >
                <Feather name="x" size={20} color="#000" />
              </TouchableOpacity>
            </View>

            {/* Image */}
            <Image
              source={require('../../assets/images/scooter.png')} // replace with your image path
              style={styles.deliverySafetyImage}
              resizeMode="contain"
            />

            {/* Rows */}
            <View style={styles.deliverySafetyRow}>
              <Feather name="activity" size={18} color="#4CAF50" style={styles.deliverySafetyIcon} />
              <Text style={styles.deliverySafetyText}>
                Delivery partners ride safely at an average speed of 15kmph per delivery
              </Text>
            </View>

            <View style={styles.deliverySafetyRow}>
              <Feather name="git-commit" size={18} color="#9C27B0" style={styles.deliverySafetyIcon} />
              <Text style={styles.deliverySafetyText}>
                No penalties for late deliveries & no incentives for on-time deliveries
              </Text>
            </View>

            <View style={styles.deliverySafetyRow}>
              <Feather name="volume-2" size={18} color="#673AB7" style={styles.deliverySafetyIcon} />
              <Text style={styles.deliverySafetyText}>
                Delivery partners are not informed about promised delivery time
              </Text>
            </View>
          </View>
        </View>
      </Modal>

    </ScrollView>
  );
};

export default CartPage;

const styles = StyleSheet.create({

  // modal 

  modalOverlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.3)' },
  newModalContainer: { backgroundColor: '#fff', borderTopLeftRadius: 16, borderTopRightRadius: 16, padding: 16, },
  addressHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  addressTextWithIcon: { flexDirection: 'row', alignItems: 'center', flex: 1, marginRight: 10, },

  addressTextContainer: { flex: 1, marginRight: 10, },
  deliveryTitle: { fontWeight: '600', fontSize: 15, },
  deliveryAddress: { fontSize: 12, color: '#666', marginTop: 2, },
  addressTextRow: { flexDirection: 'row', alignItems: 'center', },
  dropdownIcon: { marginLeft: 6, marginTop: 2, },
  paperBagRow: { backgroundColor: '#e8fbe4', borderRadius: 10, padding: 12, flexDirection: 'row', alignItems: 'center', marginBottom: 10, },
  paperBagText: { marginLeft: 8, fontSize: 14, color: '#333', },
  cashRow: { backgroundColor: '#f2f2f6', borderRadius: 10, padding: 12, flexDirection: 'row', alignItems: 'center', marginBottom: 20, },
  cashText: { marginLeft: 8, fontSize: 14, color: '#333', },
  newPayButton: { backgroundColor: '#ff2d55', paddingVertical: 14, borderRadius: 10, alignItems: 'center', },
  newPayButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16, },

  // cart header 

  header: { flexDirection: 'row', alignItems: 'center', padding: 16, },
  headerTitle: { fontSize: 18, fontWeight: '600', marginLeft: 10, },
  savedBadge: { backgroundColor: '#d4f7d4', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 14, marginLeft: 'auto', },
  savedBadgeText: { color: 'green', fontWeight: '600', },
  saveMoreWrapper: { marginHorizontal: 14, borderRadius: 16, overflow: 'hidden', marginBottom: 10, },

  // collapsed card 

  collapseCard: { backgroundColor: '#045315', padding: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', },
  collapseLeft: { flexDirection: 'row', alignItems: 'center', },
  collapseText: { color: '#fff', fontWeight: '600', fontSize: 15, marginRight: 6, },
  brand: { color: 'yellow', fontWeight: 'bold', },
  dailyTagContainer: { backgroundColor: '#FFEB3B', borderRadius: 6, paddingHorizontal: 6, paddingVertical: 2, },
  dailyTag: { color: '#000', fontSize: 12, fontWeight: 'bold', },
  collapseBody: { backgroundColor: '#056e20', padding: 16, },
  collapseItem: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12, },
  collapseIcon: {
    fontSize: 18,
    color: 'yellow',
    marginRight: 10,
    fontWeight: 'bold',
  },
  collapseItemTitle: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  collapseItemSubtitle: {
    color: '#ccc',
    fontSize: 12,
  },
  // offer unlock section

  unlockSection: {
    padding: 16,
  },
  unlockHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  unlockTitle: {
    fontWeight: '600',
    fontSize: 16,
  },
  unlockCounter: {
    fontSize: 14,
    color: '#999',
  },
  offerCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    width: 320,
    marginRight: 10,
    borderColor: '#eee',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  offerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  offerImage: {
    width: 32,
    height: 32,
    backgroundColor: '#ddd',
    borderRadius: 4,
    marginRight: 5,
  },
  priceBadge: {
    backgroundColor: 'yellow',
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 2,
    marginRight: 6,
  },
  priceBadgeText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 12,
  },
  offerMainText: {
    fontSize: 13,
    flex: 1,
    fontWeight: '500',
  },
  unlockButton: {
    borderWidth: 1,
    borderColor: '#e91e63',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  unlockButtonText: {
    color: '#e91e63',
    fontSize: 12,
    marginLeft: 4,
    fontWeight: '600',
  },
  dottedLine: {
    borderStyle: 'dotted',
    borderTopWidth: 1,
    borderColor: '#aaa',
    marginVertical: 8,
  },
  unlockNote: {
    fontSize: 12,
    color: '#555',
  },
  progressContainer: {
    height: 6,
    backgroundColor: '#eee',
    borderRadius: 4,
    marginTop: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    width: '10%',
    backgroundColor: '#ff2d55',
  },

  // Cart Section
  cartcontainer: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    margin: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
  },

  deliveryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  deliveryText: {
    marginLeft: 8,
    fontWeight: 'bold',
    fontSize: 26,
  },
  dailyBox: {
    backgroundColor: '#F7FFF7',
    borderColor: '#E0F2E9',
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    gap: 8,
  },
  dailyHeading: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 2,
  },
  dailySubText: {
    fontSize: 12,
    color: '#555',
  },
  removeButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#36C07F',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  removeText: {
    color: '#36C07F',
    fontWeight: 'bold',
  },
  dailyPrice: {
    fontWeight: 'bold',
    marginLeft: 'auto',
  },
  dailyStrikethrough: {
    textDecorationLine: 'line-through',
    color: '#888',
    fontSize: 12,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemImage: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginRight: 10,
  },
  itemTitle: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  itemSubText: {
    fontSize: 12,
    color: '#777',
  },
  quantityBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 6,
    borderColor: '#f5c2c2',
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginHorizontal: 8,
    gap: 6,
  },
  qty: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  itemPrice: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  removeSmall: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#ffe5e5',
    borderRadius: 6,
    marginRight: 10,
  },
  removeSmallText: {
    color: '#D12D2D',
    fontWeight: 'bold',
  },
  addMoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    flexWrap: 'nowrap',
  },

  cartMissingText: {
    flexShrink: 1,
    flexGrow: 1,
    fontSize: 14,
    color: '#444',
    fontWeight: '500',
    marginRight: 10,
  },

  addMoreButton: {
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },

  addMoreText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },


  // Vistora Card

  sectionTitle: { fontSize: 18, fontWeight: '700', marginVertical: 8 },

  vistoraCard: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    borderWidth: 0.5,
    borderColor: '#ddd',
  },
  vistoraRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  vistoraPoints: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  vistoraValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e91e63',
  },
  vistoraCheckboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  vistoraUseText: {
    fontSize: 14,
    color: '#e91e63',
    marginLeft: 10,
  },

  // payment section

  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  rowTextBold: {
    fontSize: 14,
    fontWeight: '600',
  },
  subText: {
    color: '#777',
    fontSize: 12,
    marginTop: 2,
  },
  orderingText: {
    fontSize: 14,
    fontWeight: '500',
  },
  addDetailsButton: {
    borderColor: '#D12D8E',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  addDetailsText: {
    color: '#D12D8E',
    fontWeight: '600',
    fontSize: 13,
  },
  invoiceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  invoiceIcon: {
    width: 48,
    height: 48,
    borderRadius: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 4,
  },
  strike: {
    textDecorationLine: 'line-through',
    color: '#888',
    fontSize: 12,
  },
  price: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  saving: {
    color: '#36C07F',
    fontWeight: '600',
    fontSize: 12,
  },

  // GST Modal

  circleIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  GSTinvoiceIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },

  gstModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },

  gstModalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },

  gstModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  gstModalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  gstCloseIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },

  gstModalDescription: {
    fontSize: 14,
    color: '#666',
    marginVertical: 12,
  },

  gstInputGST: {
    borderWidth: 1,
    borderColor: '#e04484',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    marginBottom: 10,
  },

  gstInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    marginBottom: 20,
  },

  gstConfirmButton: {
    flexDirection: 'row',
    backgroundColor: '#ccc',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    marginBottom: 20,
    gap: 8,
  },

  gstConfirmButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },

  gstTermsText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#777',
  },

  gstLink: {
    textDecorationLine: 'underline',
    color: '#555',
  },

  //Delivery tip modal

  tipModalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },

  tipModalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
    paddingBottom: 30,
  },

  tipModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  tipModalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  tipCloseIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
  },

  tipModalSubText: {
    marginTop: 6,
    color: '#666',
    fontSize: 13,
    marginBottom: 20,
  },

  tipOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  tipAmountBox: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 24,
    backgroundColor: '#fafafa',
  },

  customTipButton: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 24,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  customTipText: {
    fontWeight: '500',
    color: '#333',
  },

  // Delivery instruction modal

  instructionsModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
  },
  instructionsModalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
  },
  instructionsModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  instructionsModalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  instructionsModalSubText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  instructionsCloseIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  instructionsOptionBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#fafafa',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  instructionsOptionTitle: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 2,
  },
  instructionsOptionSubtitle: {
    fontSize: 13,
    color: '#888',
  },

  // Bill summery

  billModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'flex-end',
  },

  billModalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '90%',
  },

  billModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  billModalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },

  billCloseIcon: {
    padding: 4,
  },

  billRowLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 6,
  },

  billRowLeft: {
    flex: 1,
    fontSize: 15,
    color: '#000',
  },

  billRowRight: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
  },

  billRowStrike: {
    fontSize: 14,
    color: '#999',
    textDecorationLine: 'line-through',
    marginHorizontal: 6,
  },

  billNote: {
    fontSize: 13,
    color: '#666',
    marginBottom: 6,
    marginLeft: 2,
  },

  billNoteGreen: {
    fontSize: 13,
    color: '#1ca854',
    marginBottom: 6,
    marginLeft: 2,
  },

  billNoteGreenBold: {
    fontSize: 13,
    color: '#1ca854',
    fontWeight: 'bold',
    marginTop: 4,
    marginLeft: 2,
  },

  billDivider: {
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    marginVertical: 12,
  },

  billTotal: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    flex: 1,
  },

  billTotalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },

  savingBadge: {
    backgroundColor: '#e0f7e9',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignSelf: 'center',
    flexShrink: 0, // don't let it shrink!
  },

  savingBadgeText: {
    color: '#0f9d58',
    fontSize: 12,
    fontWeight: '600',
  },

  payButton: {
    backgroundColor: '#ff2b7b',
    paddingVertical: 14,
    marginHorizontal: 16,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },

  payButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  // Safety

  deliverySafetyModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },

  deliverySafetyModalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
    paddingBottom: 30,
  },

  deliverySafetyHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    position: 'relative',
  },

  deliverySafetyTitle: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    color: '#000',
  },

  deliverySafetyCloseIcon: {
    position: 'absolute',
    right: 0,
    top: 0,
    padding: 4,
  },

  deliverySafetyImage: {
    width: '100%',
    height: 100,
    marginBottom: 20,
    alignSelf: 'center',
  },

  deliverySafetyRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#f7f0fb',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },

  deliverySafetyIcon: {
    marginRight: 10,
    marginTop: 3,
  },

  deliverySafetyText: {
    flex: 1,
    fontSize: 14,
    color: '#222',
    lineHeight: 20,
  },

});
