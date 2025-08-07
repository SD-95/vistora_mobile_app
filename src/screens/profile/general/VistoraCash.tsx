import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Feather, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const transactions = [
    { id: 1, title: 'Free Cash Expired', date: '7 Jan 2025, 04:51AM', amount: '₹25', type: 'expired' },
    { id: 2, title: 'Free Cash Expired', date: '7 Jan 2025, 04:21AM', amount: '₹25', type: 'expired' },
    { id: 3, title: 'Free Cash Expired', date: '7 Jan 2025, 03:13AM', amount: '₹100', type: 'expired' },
    { id: 4, title: 'Free Cash - Valid for next order only', date: '11 Dec 2024, 02:03PM', amount: '+₹25', type: 'valid', expires: 'Expires: 6 Jan 2025' },
];

const VistoraCash = () => {
    const navigation = useNavigation();

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Feather name="arrow-left" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Vistora Cash</Text>
                <View style={{ width: 24 }} />
            </View>

            {/* Balance Card */}
            <View style={styles.balanceCard}>
                <View style={styles.balanceRow}>
                    <View>
                        <Text style={styles.balanceLabel}>Available Balance</Text>
                        <Text style={styles.balanceValue}>₹0</Text>
                    </View>
                    <Image source={require('../../../../assets/images/coin.png')} style={styles.coinImage} />
                </View>
            </View>

            {/* Features Row */}
            <View style={styles.featuresRow}>
                <View style={styles.featureItem}>
                    <Feather name="zap" size={24} color="#8000FF" />
                    <Text style={styles.featureText}>Easy & Fast</Text>
                </View>
                <View style={styles.featureItem}>
                    <MaterialIcons name="currency-rupee" size={24} color="#8000FF" />
                    <Text style={styles.featureText}>Instant Refunds</Text>
                </View>
                <View style={styles.featureItem}>
                    <Feather name="tag" size={24} color="#8000FF" />
                    <Text style={styles.featureText}>Exclusive Offers</Text>
                </View>
            </View>

            {/* Gift Card Section */}
            <View style={styles.card}>
                <View style={styles.rowBetween}>
                    <View style={styles.rowCenter}>
                        <Feather name="gift" size={24} color="#c30d00" />
                        <Text style={styles.cardTitle}>Have a Gift Card?</Text>
                    </View>
                    <TouchableOpacity style={styles.addCardButton}>
                        <Text style={styles.addCardText}>Add Card</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Vistora Cash Section */}
            <View style={styles.card}>
                <View style={styles.rowBetween}>
                    <View style={styles.rowCenter}>
                        <FontAwesome5 name="wallet" size={22} color="#c30d00" />
                        <Text style={styles.cardTitle}>Vistora Cash</Text>
                        <Text style={styles.unavailableTag}>UNAVAILABLE</Text>
                    </View>
                    <Text style={styles.amountText}>₹0</Text>
                </View>
                <Text style={styles.subText}>Vistora wallet is unavailable at the moment.</Text>
                <View style={styles.actionRow}>
                    <TouchableOpacity style={styles.secondaryButton}>
                        <Text style={styles.secondaryButtonText}>Contact Support</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.primaryButton}>
                        <Text style={styles.primaryButtonText}>Know more</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Recent Transactions */}
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
            <View style={styles.card}>
                {transactions.map((item) => (
                    <View key={item.id} style={styles.transactionRow}>
                        <View>
                            <Text style={styles.transactionTitle}>{item.title}</Text>
                            <Text style={styles.transactionDate}>{item.date}</Text>
                            {item.expires && <Text style={styles.transactionExpires}>{item.expires}</Text>}
                        </View>
                        <Text style={[styles.amountText, item.type === 'valid' && { color: '#0A7B45' }]}>
                            {item.amount}
                        </Text>
                    </View>
                ))}
                <TouchableOpacity style={styles.seeAllRow} onPress={() => navigation.navigate('Alltransaction' as never)}>
                    <Text style={styles.seeAllText}>See All</Text>
                    <Feather name="chevron-right" size={18} color="#8000FF" />
                </TouchableOpacity>
            </View>

            {/* Links */}
            <View style={styles.card}>
                <TouchableOpacity style={styles.linkRow}>
                    <Feather name="book-open" size={20} color="#000" />
                    <Text style={styles.linkText}>How it works?</Text>
                    <Feather name="chevron-right" size={18} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.linkRow}>
                    <Feather name="help-circle" size={20} color="#000" />
                    <Text style={styles.linkText}>FAQs</Text>
                    <Feather name="chevron-right" size={18} color="#000" />
                </TouchableOpacity>
            </View>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', padding: 16 },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
    headerTitle: { fontSize: 18, fontWeight: 'bold' },
    balanceCard: { backgroundColor: '#8000FF', borderRadius: 16, padding: 16, marginBottom: 16 },
    balanceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    balanceLabel: { color: '#fff', fontSize: 14 },
    balanceValue: { color: '#fff', fontSize: 28, fontWeight: 'bold' },
    coinImage: { width: 50, height: 50, resizeMode: 'contain' },
    featuresRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
    featureItem: { alignItems: 'center', width: 90 },
    featureText: { color: '#000', fontSize: 12, textAlign: 'center', marginTop: 6 },
    card: { backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 16, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
    rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    rowCenter: { flexDirection: 'row', alignItems: 'center' },
    cardTitle: { fontSize: 16, fontWeight: '600', marginLeft: 8 },
    unavailableTag: { backgroundColor: '#FFE5E5', color: '#c30d00', fontSize: 10, fontWeight: 'bold', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, marginLeft: 8 },
    subText: { color: '#666', fontSize: 12, marginTop: 6 },
    actionRow: { flexDirection: 'row', marginTop: 12 },
    secondaryButton: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8, backgroundColor: '#f5f5f5', marginRight: 8 },
    secondaryButtonText: { fontSize: 12, color: '#000' },
    primaryButton: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8, backgroundColor: '#f0e6ff' },
    primaryButtonText: { fontSize: 12, color: '#8000FF' },
    addCardButton: { paddingVertical: 6, paddingHorizontal: 14, borderRadius: 8, backgroundColor: '#f0e6ff' },
    addCardText: { fontSize: 12, color: '#8000FF', fontWeight: '600' },
    sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 10 },
    transactionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderColor: '#eee' },
    transactionTitle: { fontSize: 14, fontWeight: '600' },
    transactionDate: { fontSize: 12, color: '#888' },
    transactionExpires: { fontSize: 10, color: '#666' },
    amountText: { fontSize: 14, fontWeight: '600' },
    seeAllRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10 },
    seeAllText: { color: '#8000FF', fontWeight: '600' },
    linkRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderColor: '#f0f0f0' },
    linkText: { flex: 1, fontSize: 14, marginLeft: 12 },
});

export default VistoraCash;
