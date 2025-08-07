import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, Modal, TextInput, FlatList, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const UPI_APPS = [
    { label: 'GPay', image: require('../../assets/images/gpay.png') },
    { label: 'PhonePe', image: require('../../assets/images/phonepay.png') },
    { label: 'Paytm', image: require('../../assets/images/Paytm.png') },
    { label: 'Amazon Pay', image: require('../../assets/images/amazonpay.png') },
];

const BANKS = [
    { label: 'HDFC Bank', image: require('../../assets/images/HDFCBank.png') },
    { label: 'ICICI Bank', image: require('../../assets/images/ICICIBank.png') },
    { label: 'SBI', image: require('../../assets/images/SBI.png') },
    { label: 'Axis Bank', image: require('../../assets/images/axis.png') },
];

const PAY_LATER = [
    { label: 'Simpl', eligible: false },
    { label: 'LazyPay', eligible: false },
    { label: 'Amazon Pay Later', eligible: true },
];

const WALLETS = [
    { label: 'PhonePe Wallet', eligible: false },
    { label: 'Amazon Pay Balance', eligible: true },
];

const bankList = [
    {
        id: 'kotak',
        name: 'Kotak Mahindra Bank',
        logo: require('../../assets/images/fallback.jpg'),
    },
    {
        id: 'airtel',
        name: 'Airtel Payments Bank',
        logo: require('../../assets/images/fallback.jpg'),
    },
    {
        id: 'canara',
        name: 'Canara Bank',
        logo: require('../../assets/images/fallback.jpg'),
    },
    {
        id: 'idfc',
        name: 'IDFC FIRST Bank',
        logo: require('../../assets/images/fallback.jpg'),
    },
    {
        id: 'bob',
        name: 'Bank of Baroda',
        logo: require('../../assets/images/fallback.jpg'),
    },
    {
        id: 'scb',
        name: 'Standard Chartered Bank',
        logo: require('../../assets/images/fallback.jpg'),
    },
];


export const PaymentGatewayScreen = () => {
    const [upiModalVisible, setUpiModalVisible] = useState(false);
    const [upiId, setUpiId] = useState('');
    const [saveUpi, setSaveUpi] = useState(true);

    const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);

    const [isBankModalOpen, setIsBankModalOpen] = useState(false);
    const navigation = useNavigation();

    const [expanded, setExpanded] = useState(false);
    const animatedHeight = useRef(new Animated.Value(0)).current;

    const toggleCard = () => {
        Animated.timing(animatedHeight, {
            toValue: expanded ? 0 : 1,
            duration: 300,
            useNativeDriver: false,
        }).start(() => {
            setExpanded(!expanded);
        });
    };

    const cardHeight = animatedHeight.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 230],
    });

    return (
        <ScrollView style={styles.paymentGatewayContainer}>
            {/* Header */}
            <View style={styles.headerCard}>
                <View style={styles.headerTopRow}>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <Ionicons name="chevron-back" size={24} color="#000" />
                    </TouchableOpacity>
                    <View style={styles.headerTitleWrapper}>
                        <Text style={styles.headerTitle}>Payment Options</Text>
                    </View>
                    <View style={styles.amountContainer}>
                        <Text style={styles.toPayLabel}>To Pay:</Text>
                        <Text style={styles.toPayAmount}>₹106.22</Text>
                    </View>
                </View>
                <View style={styles.addressRow}>
                    <Text style={styles.addressPrefix}>Delivering to</Text>
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>Work</Text>
                    </View>
                    <Text style={styles.addressText}>
                        - spruko technologies , H.no 1-8-67, kukatpally, hyderabad, telangana 500072
                    </Text>
                </View>
            </View>

            {/* UPI Section */}
            <Text style={styles.sectionTitle}>Pay by UPI</Text>
            <View style={styles.card}>
                <Text style={styles.subText}>Use any UPI app on the phone to pay</Text>
                <View style={styles.iconRow}>
                    {UPI_APPS.map((item, index) => (
                        <View key={index} style={styles.iconContainer}>
                            <Image source={item.image} style={styles.upiIcon} resizeMode="contain" />
                            <Text>{item.label}</Text>
                        </View>
                    ))}
                </View>
                <TouchableOpacity style={styles.addButton} onPress={() => setUpiModalVisible(true)}>
                    <Text style={styles.addText}>+ Add New UPI ID</Text>
                </TouchableOpacity>
            </View>

            {/* Netbanking Section */}
            <Text style={styles.sectionTitle}>Netbanking</Text>
            <View style={styles.card}>
                <View style={styles.iconRow}>
                    {BANKS.map((item, index) => (
                        <View key={index} style={styles.iconContainer}>
                            <Image source={item.image} style={styles.bankIcon} resizeMode="contain" />
                            <Text style={styles.bankLabel}>{item.label}</Text>
                        </View>
                    ))}
                </View>
                <Text style={styles.warning}>Facing payment failures for Axis Bank</Text>
                <TouchableOpacity onPress={() => setIsBankModalOpen(true)}>
                    <Text style={styles.viewMore}>View More Banks</Text>
                </TouchableOpacity>
            </View>

            {/* COD Section */}

            <Text style={styles.sectionTitle}>Cash on Delivery</Text>

            <View style={styles.cardContainer}>
                <View style={[styles.card]}>
                    <View style={styles.cardHeaderRow}>
                        <View style={styles.row}>
                            <Text style={styles.disabledText}>Pay by Cash / UPI on delivery</Text>
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>Available</Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={toggleCard}>
                            <AntDesign name={expanded ? 'up' : 'down'} size={18} color="#666" />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.subText}>
                        COD is available - <Text style={styles.codAmount}>₹106.22</Text>
                    </Text>
                </View>

                <Animated.View style={[styles.animatedCard, { height: cardHeight }]}>
                    {expanded && (
                        <View style={styles.expandedContent}>
                            <View style={styles.newCardHeader}>
                                <Text style={styles.codMode}>Mode of COD</Text>
                                <Text style={styles.codAmount}>Pay ₹106.22</Text>
                            </View>

                            <View style={styles.hr} />

                            <Text style={styles.confirmText}>
                                To confirm the order, enter your last four digits of mobile number
                            </Text>

                            <View style={styles.otpRow}>
                                <Text style={styles.mask}>******</Text>
                                <TextInput
                                    style={styles.input}
                                    keyboardType="numeric"
                                    maxLength={4}
                                    placeholder="1234"
                                />
                            </View>

                            <TouchableOpacity style={styles.confirmBtn}>
                                <Text style={styles.confirmBtnText}>Confirm Order</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </Animated.View>
            </View>

            {/* Pay Later */}
            <Text style={styles.sectionTitle}>Pay Later</Text>
            <View style={styles.card}>
                {PAY_LATER.map((item, index) => (
                    <View key={index} style={styles.payLaterRow}>
                        <Text style={item.eligible ? styles.enabledText : styles.disabledText}>{item.label}</Text>
                        <Text style={item.eligible ? styles.linkText : styles.ineligible}>
                            {item.eligible ? 'LINK' : 'Currently Ineligible'}
                        </Text>
                    </View>
                ))}
            </View>

            {/* Installments */}
            <Text style={styles.sectionTitle}>Pay in 3 installments</Text>
            <View style={[styles.card, styles.disabledCard]}>
                <Text style={styles.disabledText}>Simpl Pay In 3</Text>
                <Text style={styles.subText}>0% interest, ₹0 charges</Text>
                <Text style={styles.warning}>Facing payment failures for Simpl Pay In 3</Text>
            </View>

            {/* Wallets */}
            <Text style={styles.sectionTitle}>Wallets</Text>
            <View style={styles.card}>
                {WALLETS.map((item, index) => (
                    <View key={index} style={styles.payLaterRow}>
                        <Text style={item.eligible ? styles.enabledText : styles.disabledText}>{item.label}</Text>
                        <Text style={item.eligible ? styles.linkText : styles.warning}>
                            {item.eligible ? 'LINK' : 'Facing payment failures'}
                        </Text>
                    </View>
                ))}
                <TouchableOpacity onPress={() => setIsWalletModalOpen(true)}>
                    <Text style={styles.viewMore}>View More Wallets</Text>
                </TouchableOpacity>
            </View>

            {/* Pluxee */}
            <Text style={styles.sectionTitle}>Pluxee</Text>
            <TouchableOpacity style={styles.card}>
                <Text style={styles.addText}>+ Add Pluxee Card</Text>
            </TouchableOpacity>

            {/* Cards */}
            <Text style={styles.sectionTitle}>Credit & Debit Cards</Text>
            <TouchableOpacity style={[styles.card, { marginBottom: 40 }]}>
                <Text style={styles.addText}>+ Add New Card</Text>
            </TouchableOpacity>

            {/* UPI Modal */}
            <Modal animationType="slide" transparent={true} visible={upiModalVisible} onRequestClose={() => setUpiModalVisible(false)}>
                <View style={styles.upiModalBackdrop}>
                    <View style={styles.upiModalContainer}>
                        <View style={styles.upiModalHeader}>
                            <Text style={styles.upiModalTitle}>Add New UPI</Text>
                            <TouchableOpacity onPress={() => setUpiModalVisible(false)}>
                                <AntDesign name="close" size={22} color="#000" />
                            </TouchableOpacity>
                        </View>

                        <TextInput placeholder="UPI ID" value={upiId} onChangeText={setUpiId} placeholderTextColor="#aaa" style={styles.upiInput} />

                        <Text style={styles.upiHelperText}> A collect request will be sent to this UPI ID </Text>

                        {/* Custom Checkbox */}
                        <View style={styles.upiCheckboxRow}>
                            <TouchableOpacity
                                onPress={() => setSaveUpi(!saveUpi)}
                                style={{
                                    width: 22,
                                    height: 22,
                                    borderRadius: 4,
                                    borderWidth: 1.5,
                                    borderColor: '#ccc',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: saveUpi ? '#e91e63' : '#fff',
                                }}
                            >
                                {saveUpi && <AntDesign name="check" size={16} color="#fff" />}
                            </TouchableOpacity>

                            <Text style={styles.upiCheckboxText}> Securely save my UPI ID for future use in Vistora Apps </Text>
                        </View>

                        <TouchableOpacity style={styles.upiPayButton}>
                            <Text style={styles.upiPayButtonText}>Verify & Pay ₹113.99</Text>
                        </TouchableOpacity>

                        <View style={styles.upiPartnersRow}>
                            <Text style={styles.partnerText}>GPay</Text>
                            <Text style={styles.partnerText}>PhonePe</Text>
                            <Text style={styles.partnerText}>paytm</Text>
                            <Text style={styles.partnerText}>BHIM</Text>
                            <Text style={styles.partnerText}>& more</Text>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Bank Modal */}

            <Modal
                animationType="slide"
                transparent
                visible={isBankModalOpen}
                onRequestClose={() => setIsBankModalOpen(false)}
            >
                <View style={styles.overlay}>
                    <View style={styles.bankSelectModal}>
                        <View style={styles.header}>
                            <Text style={styles.headerText}>Select Bank</Text>
                            <TouchableOpacity onPress={() => setIsBankModalOpen(false)}>
                                <AntDesign name="close" size={22} color="gray" />
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.amountLabel}>
                            To Pay: <Text style={styles.amount}>₹113.99</Text>
                        </Text>

                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search for Bank"
                            placeholderTextColor="#999"
                        />

                        <FlatList
                            data={bankList}
                            keyExtractor={(item) => item.id}
                            contentContainerStyle={styles.bankList}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={styles.bankItem}>
                                    <View style={styles.bankLeft}>
                                        <Image source={item.logo} style={styles.bankLogo} resizeMode="contain" />
                                        <Text style={styles.bankName}>{item.name}</Text>
                                    </View>
                                    <Text style={styles.arrow}>›</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </View>
            </Modal>

            {/* Wallet Modal */}

            <Modal
                animationType="slide"
                transparent
                visible={isWalletModalOpen}
                onRequestClose={() => setIsWalletModalOpen(false)}
            >
                <View style={styles.walletOverlay}>
                    <View style={styles.walletModal}>
                        <View style={styles.walletModalHeader}>
                            <View>
                                <Text style={styles.walletModalTitle}>Select wallet payment</Text>
                                <Text style={styles.walletAmount}>To Pay: <Text style={styles.walletAmountValue}>₹113.99</Text></Text>
                            </View>
                            <TouchableOpacity onPress={() => setIsWalletModalOpen(false)}>
                                <AntDesign name="close" size={22} color="#333" />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity style={styles.walletItem}>
                            <Image source={require('../../assets/images/Mobikwik.png')} style={styles.walletIcon} />
                            <Text style={styles.walletName}>Mobikwik Wallet</Text>
                            <AntDesign name="right" size={18} color="#888" style={styles.walletArrow} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.walletItem}>
                            <Image source={require('../../assets/images/Airtel.jpg')} style={styles.walletIcon} />
                            <Text style={styles.walletName}>Airtel Payments Bank</Text>
                            <AntDesign name="right" size={18} color="#888" style={styles.walletArrow} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.walletItem}>
                            <Image source={require('../../assets/images/paypal.png')} style={styles.walletIcon} />
                            <Text style={styles.walletName}>Paypal Wallet</Text>
                            <AntDesign name="right" size={18} color="#888" style={styles.walletArrow} />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    paymentGatewayContainer: { flex: 1, padding: 16, backgroundColor: '#f8f9fb' },

    // Premium Header Styles
    headerCard: { backgroundColor: '#ffffff', borderRadius: 16, padding: 16, marginBottom: 16, elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 6, },
    headerTopRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', },
    backButton: { padding: 8, borderRadius: 50, backgroundColor: '#f2f2f2', marginRight: 10, },
    headerTitleWrapper: { flex: 1, marginLeft: 8, },
    headerTitle: { fontSize: 22, fontWeight: '700', color: '#000', },
    amountContainer: { alignItems: 'flex-end', },
    toPayLabel: { fontSize: 15, color: '#666', },
    toPayAmount: { fontSize: 25, fontWeight: '700', color: '#1ebd63', },
    addressRow: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', marginTop: 12, },
    addressPrefix: { fontSize: 14, color: '#444', },
    badge: { backgroundColor: '#ed2c59', borderRadius: 12, paddingHorizontal: 10, paddingVertical: 2, marginHorizontal: 6, },
    badgeText: { color: '#fff', fontWeight: '600', fontSize: 12, },
    addressText: { fontSize: 14, color: '#666', flexShrink: 1, flex: 1, },

    // Other UI Styles
    sectionTitle: { fontSize: 18, fontWeight: '700', marginVertical: 8 },
    card: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 16, elevation: 2 },
    disabledCard: { backgroundColor: '#f0f0f0' },
    cardContainer: { overflow: 'hidden', },
    animatedCard: { backgroundColor: '#fdfdfd', borderRadius: 12, overflow: 'hidden', },
    expandedContent: { padding: 16, backgroundColor: '#fff', borderRadius: 12, marginBottom: 16, elevation: 2 },
    cardHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', },
    row: { flexDirection: 'row', alignItems: 'center', gap: 8, },
    newCardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, },
    codMode: { fontSize: 14, fontWeight: '600', color: '#d01b60', },
    codAmount: { fontSize: 14, fontWeight: 'bold', color: '#0aaf55', },
    hr: { height: 1, backgroundColor: '#ccc', marginVertical: 10, },
    cardBody: { flex: 1, justifyContent: 'space-between', },
    confirmText: { fontSize: 13, color: '#333', marginBottom: 12, },
    otpRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16, },
    mask: { fontSize: 22, letterSpacing: 2, marginRight: 12, },
    input: { flex: 1, borderBottomWidth: 1, borderColor: '#999', fontSize: 18, paddingVertical: 4, textAlign: 'center', letterSpacing: 10, },
    confirmBtn: { backgroundColor: '#d01b60', paddingVertical: 10, borderRadius: 6, alignItems: 'center', },
    confirmBtnText: { color: 'white', fontWeight: '600', fontSize: 14, },
    disabledText: { color: '#888', fontWeight: '500' },
    disabledSubText: { color: '#bbb', fontSize: 12 },
    subText: { fontSize: 13, color: '#666', marginBottom: 8 },
    warning: { color: '#d35400', fontSize: 12, marginTop: 6 },
    viewMore: { color: '#c2185b', fontWeight: '600', marginTop: 10 },
    payLaterRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 6 },
    ineligible: { color: '#ccc' },
    linkText: { color: '#c2185b', fontWeight: '600' },
    addText: { color: '#c2185b', fontWeight: '700' },
    addButton: { marginTop: 10 },
    iconRow: { flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' },
    iconContainer: { alignItems: 'center', margin: 6 },
    upiIcon: { width: 40, height: 40, marginBottom: 4, borderRadius: 20, backgroundColor: '#eee' },
    bankIcon: { width: 40, height: 40, marginBottom: 4, borderRadius: 8, backgroundColor: '#eee' },
    bankLabel: { fontSize: 12, textAlign: 'center', maxWidth: 60 },
    enabledText: { color: '#000', fontWeight: '500' },

    // UPI Modal

    upiModalBackdrop: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'flex-end', },
    upiModalContainer: { backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, paddingBottom: 30, },
    upiModalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, },
    upiModalTitle: { fontSize: 18, fontWeight: '700', color: '#000', },
    upiInput: { borderWidth: 1.5, borderColor: '#e91e63', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 10, fontSize: 16, marginBottom: 10, color: '#000', },
    upiHelperText: { fontSize: 13, color: '#666', marginBottom: 12, },
    upiCheckboxRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, },
    upiCheckboxText: { fontSize: 14, color: '#333', marginLeft: 8, flex: 1, },
    upiPayButton: { backgroundColor: '#d8d8e2', borderRadius: 12, paddingVertical: 12, alignItems: 'center', marginBottom: 16, },
    upiPayButtonText: { fontSize: 16, fontWeight: '600', color: '#333', },
    upiPartnersRow: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginTop: 4, },
    partnerText: { fontSize: 12, color: '#666', },

    // Bank modal

    overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end', },
    bankSelectModal: { backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingHorizontal: 20, paddingTop: 16, paddingBottom: 30 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 10, borderBottomWidth: 0.6, borderColor: '#ccc', },
    headerText: { fontSize: 18, fontWeight: '600', },
    amountLabel: { marginTop: 6, fontSize: 14, color: '#666', },
    amount: { color: '#0aaf55', fontWeight: 'bold', },
    searchInput: { marginTop: 16, padding: 12, borderRadius: 8, backgroundColor: '#f1f1f1', fontSize: 14, color: '#333', },
    bankList: { marginTop: 16, paddingBottom: 20, },
    bankItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 0.5, borderColor: '#ddd', },
    bankLeft: { flexDirection: 'row', alignItems: 'center', },
    bankLogo: { width: 32, height: 32, borderRadius: 16, marginRight: 12, backgroundColor: '#eee', },
    bankLogoPlaceholder: { width: 32, height: 32, backgroundColor: '#ddd', borderRadius: 16, marginRight: 12, },
    bankName: { fontSize: 14, color: '#000', },
    arrow: { fontSize: 20, color: '#d01b60', },

    // Wallet modal

    walletOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    walletModal: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
    },
    walletModalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    walletModalTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
    },
    walletAmount: {
        fontSize: 13,
        marginTop: 2,
        color: '#666',
    },
    walletAmountValue: {
        color: '#0aaf55',
        fontWeight: 'bold',
    },
    walletItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 0.5,
        borderColor: '#eee',
    },
    walletIcon: {
        width: 32,
        height: 32,
        marginRight: 14,
        borderRadius: 6,
        resizeMode: 'contain',
    },
    walletName: {
        flex: 1,
        fontSize: 15,
        color: '#000',
    },
    walletArrow: {
        marginLeft: 6,
    },

});

export default PaymentGatewayScreen;
