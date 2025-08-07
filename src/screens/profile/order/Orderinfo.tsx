import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const OrderInfo = () => {
    const navigation = useNavigation();

    const products = [
        {
            id: 'p1',
            title: 'Freedom Refined Sunflower Oil',
            details: '1 pack (1 L) • 1 unit',
            price: '₹112',
            strikePrice: '₹144',
            image: require('../../../../assets/images/fallback.jpg'),
        },
        {
            id: 'p2',
            title: 'Aashirvaad Whole Wheat Atta',
            details: '1 pack (5 kg) • 1 unit',
            price: '₹210',
            strikePrice: '₹245',
            image: require('../../../../assets/images/fallback.jpg'),
        },
        {
            id: 'p3',
            title: 'Tata Salt Iodized',
            details: '1 pack (1 kg) • 2 units',
            price: '₹38',
            strikePrice: '₹48',
            image: require('../../../../assets/images/fallback.jpg'),
        },
    ];
    return (
        <ScrollView style={styles.container}>

            {/* === SECTION 1: Header Card === */}
            <View style={styles.card}>
                <View style={styles.header}>
                    <Feather name="arrow-left" size={24} onPress={() => navigation.goBack()} />
                    <View style={styles.headerText}>
                        <Text style={styles.orderId}>Order #95COAHSNM87149</Text>
                        <Text style={styles.itemCount}>1 item</Text>
                    </View>
                    <TouchableOpacity style={styles.helpButton} onPress={() => navigation.navigate('SupportScreen' as never)}>
                        <Feather name="message-square" size={16} color="#E30613" />
                        <Text style={styles.helpText}>Get Help</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* === SECTION 2: Status, Product, Bill, Invoice === */}
            <View style={styles.card}>
                {/* Status */}
                <View style={styles.statusRow}>
                    <View style={styles.statusLeft}>
                        <Feather name="check-circle" size={24} color="#00C566" />
                        <Text style={styles.statusText}>Delivered</Text>
                    </View>

                    <TouchableOpacity style={styles.trackButton} onPress={() => navigation.navigate('TrackingScreen' as never)}>
                        <Text style={styles.trackButtonText}>Track Order</Text>
                    </TouchableOpacity>
                </View>

                {/* Product */}
                {products.map((product) => (
                    <View key={product.id} style={styles.productCard}>
                        <Image source={product.image} style={styles.productImage} />
                        <View style={styles.productInfo}>
                            <Text style={styles.productTitle}>{product.title}</Text>
                            <Text style={styles.productDetails}>{product.details}</Text>
                        </View>
                        <View style={styles.priceBox}>
                            <Text style={styles.price}>{product.price}</Text>
                            <Text style={styles.strikePrice}>{product.strikePrice}</Text>
                        </View>
                    </View>
                ))}

                {/* Bill Summary */}
                <Text style={styles.sectionTitle}>Bill Summary</Text>
                <View style={styles.billRow}>
                    <Text style={styles.label}>Item Total & GST</Text>
                    <View style={styles.priceGroup}>
                        <Text style={styles.strikePrice}>₹394.27</Text>
                        <Text style={styles.price}>₹360.27</Text>
                    </View>
                </View>
                <View style={styles.billRow}>
                    <Text style={styles.label}>Handling Charge</Text>
                    <View style={styles.priceGroup}>
                        <Text style={styles.strikePrice}>₹15</Text>
                        <Text style={styles.price}>₹5.49</Text>
                    </View>
                </View>
                <View style={styles.billRow}>
                    <Text style={styles.label}>Delivery Fee</Text>
                    <View style={styles.priceGroup}>
                        <Text style={styles.strikePrice}>₹25</Text>
                        <Text style={styles.price}>₹0</Text>
                    </View>
                </View>

                {/* Total */}
                <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>Total Bill</Text>
                    <View style={styles.priceGroup}>
                        <Text style={styles.strikePrice}>₹384.27</Text>
                        <Text style={styles.totalPrice}>₹360.76</Text>
                    </View>
                </View>
                <Text style={styles.taxText}>Incl. all taxes and charges</Text>
                <Text style={styles.savedText}>SAVED ₹66.51</Text>

                {/* Vistora Cash */}
                <Text style={styles.cashApplied}>Vistora Cash Applied ₹40</Text>

                {/* Invoice */}
                <TouchableOpacity style={styles.invoiceBtn}>
                    <Text style={styles.invoiceText}>Download Invoice</Text>
                </TouchableOpacity>
            </View>

            {/* === SECTION 3: Order Details Card === */}
            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Order Details</Text>
                <View style={styles.detailBlock}>
                    <Text style={styles.detailLabel}>Order ID</Text>
                    <Text style={styles.detailValue}>#95COAHSNM87149</Text>
                </View>
                <View style={styles.detailBlock}>
                    <Text style={styles.detailLabel}>Delivery Address</Text>
                    <Text style={styles.detailValue}>
                        spruko technologies , H.no 1-8-67, LIG 213
                    </Text>
                </View>
                <View style={styles.detailBlock}>
                    <Text style={styles.detailLabel}>Order Placed</Text>
                    <Text style={styles.detailValue}>9 Aug 2024, 06:10PM</Text>
                </View>
                <View style={styles.detailBlock}>
                    <Text style={styles.detailLabel}>Order Arrived at</Text>
                    <Text style={styles.detailValue}>9 Aug 2024, 06:46PM</Text>
                </View>
            </View>

            {/* === SECTION 4: Help CTA Card === */}
            <View style={styles.card}>
                <TouchableOpacity style={styles.helpRow} onPress={() => navigation.navigate('SupportScreen' as never)}>
                    <View style={styles.helpIconCircle}>
                        <AntDesign name="customerservice" size={18} color="#fff" />
                    </View>
                    <Text style={styles.helpRowText}>Need help with this order?</Text>
                    <Feather name="chevron-right" size={18} color="#000" />
                </TouchableOpacity>
            </View>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { backgroundColor: '#F9FAFC', padding: 12 },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
    },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    headerText: { flex: 1, marginLeft: 12 },
    orderId: { fontWeight: '600', fontSize: 16 },
    itemCount: { fontSize: 13, color: '#555' },
    helpButton: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#fdd',
        backgroundColor: '#fff0f3',
        padding: 6,
        borderRadius: 10,
        alignItems: 'center',
    },
    helpText: { color: '#E30613', marginLeft: 4, fontWeight: '600', fontSize: 13 },
    statusRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, marginBottom: 5 },
    statusLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statusIcon: {
        width: 32,
        height: 32,
        backgroundColor: '#DFF5E4',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    statusText: { marginLeft: 8, fontWeight: '700', color: '#333', fontSize: 20 },
    productCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        backgroundColor: '#fafafa',
        borderRadius: 10,
        marginTop: 12,
    },
    productImage: { width: 48, height: 48, marginRight: 10 },
    productInfo: { flex: 1 },
    productTitle: { fontSize: 15, fontWeight: '600' },
    productDetails: { fontSize: 13, color: '#666', marginTop: 4 },
    priceBox: { alignItems: 'flex-end' },
    price: { fontSize: 15, fontWeight: '600' },
    strikePrice: { textDecorationLine: 'line-through', fontSize: 12, color: '#888' },
    sectionTitle: { fontSize: 20, fontWeight: '600', marginTop: 5, marginBottom: 10 },
    billRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    label: { color: '#444', fontSize: 14 },
    priceGroup: { alignItems: 'flex-end' },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
        marginBottom: 4,
    },
    totalLabel: { fontWeight: '700', fontSize: 16 },
    totalPrice: { fontWeight: '700', fontSize: 16 },
    taxText: { fontSize: 13, color: '#888' },
    savedText: {
        fontSize: 15,
        color: '#00C566',
        fontWeight: '600',
        marginTop: 4,
    },
    cashApplied: {
        color: '#00C566',
        fontSize: 18,
        fontWeight: '500',
        marginTop: 16,
    },
    invoiceBtn: {
        backgroundColor: '#F3E8FF',
        padding: 12,
        borderRadius: 10,
        marginTop: 16,
        alignItems: 'center',
    },
    invoiceText: {
        color: '#8D38E0',
        fontWeight: '600',
        fontSize: 14,
    },
    detailBlock: { marginTop: 12 },
    detailLabel: { color: '#555', fontSize: 13 },
    detailValue: { color: '#111', fontSize: 14, fontWeight: '500', marginTop: 2 },
    helpIconCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#E30613',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    helpRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
    },

    helpRowText: {
        flex: 1,
        fontSize: 15,
        fontWeight: '500',
    },

    // Track

    trackButton: {
        backgroundColor: '#e91e63',
        paddingVertical: 6,
        paddingHorizontal: 14,
        borderRadius: 20,
    },
    trackButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default OrderInfo;
