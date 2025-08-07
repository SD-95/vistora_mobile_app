import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    Platform,
    StatusBar,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

type RefundItem = {
    id: string;
    dateTime: string;
    status: string;
    orderId: string;
    amount: string;
};

const Refund = () => {
    const navigation = useNavigation();

    const refundsData: RefundItem[] = [
        {
            id: '1',
            dateTime: '11/06/24 at 07:24pm',
            status: 'Completed',
            orderId: 'C617AHSNN27810',
            amount: '₹100',
        },
    ];

    const renderRefundItem = ({ item }: { item: RefundItem }) => (
        <View style={styles.card}>
            <View style={styles.rowBetween}>
                <Text style={styles.dateTime}>{item.dateTime}</Text>
                <View style={styles.statusBadge}>
                    <Text style={styles.statusText}>{item.status}</Text>
                </View>
            </View>
            <View style={styles.rowBetween}>
                <Text style={styles.orderInfo}>
                    Order ID. {item.orderId} {"\u2022"} {item.amount}
                </Text>
            </View>
            <TouchableOpacity style={styles.refundButton} onPress={() => navigation.navigate('OrderInfo' as never)}>
                <Text style={styles.refundButtonText}>View Refund Details</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Feather name="arrow-left" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Refunds</Text>
                {/* Placeholder for alignment */}
                <View style={{ width: 24 }} />
            </View>

            <Text style={styles.sectionTitle}>Completed</Text>

            <FlatList
                data={refundsData}
                renderItem={renderRefundItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
            />
        </View>
    );
};

export default Refund;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#000',
        marginTop: 20,
        marginBottom: 10,
        marginHorizontal: 16,
    },
    card: {
        backgroundColor: '#F9F5FB',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
    },
    rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    dateTime: {
        fontSize: 14,
        color: '#222',
    },
    statusBadge: {
        backgroundColor: '#DFF5E7',
        borderRadius: 6,
        paddingVertical: 2,
        paddingHorizontal: 8,
    },
    statusText: {
        fontSize: 12,
        color: '#2F9E44',
        fontWeight: '600',
    },
    orderInfo: {
        fontSize: 14,
        color: '#555',
    },
    refundButton: {
        marginTop: 10,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: '#800080',
        borderRadius: 6,
        alignSelf: 'flex-start',
    },
    refundButtonText: {
        color: '#800080',
        fontWeight: '600',
        fontSize: 14,
    },
});
