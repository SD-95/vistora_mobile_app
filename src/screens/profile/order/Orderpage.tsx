import React, { ReactElement } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    ImageSourcePropType,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, Feather, FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';

type OrderStatusType = 'delivered' | 'cancelled' | 'pending' | 'confirmed' | 'returned';

type OrderType = {
    id: string;
    status: string;
    date: string;
    amount: string;
    statusType: OrderStatusType;
    refundStatus?: string;
    paymentStatus?: string;
    pic1: ImageSourcePropType;
    pic2: ImageSourcePropType;
    pic3?: ImageSourcePropType;
    pic4?: ImageSourcePropType;
    pic5?: ImageSourcePropType;
};

const orders: OrderType[] = [
    {
        id: '1',
        status: 'Order delivered',
        date: '13th Jun 2024, 05:49 pm',
        amount: '₹137.84',
        statusType: 'delivered',
        pic1: require('../../../../assets/images/fallback.jpg'),
        pic2: require('../../../../assets/images/fallback.jpg')
    },
    {
        id: '2',
        status: 'Order Cancelled',
        date: '11th Jun 2024, 06:39 pm',
        amount: '₹138.84',
        statusType: 'cancelled',
        refundStatus: 'Refund Completed',
        pic1: require('../../../../assets/images/fallback.jpg'),
        pic2: require('../../../../assets/images/fallback.jpg')
    },
    {
        id: '3',
        status: 'Order Pending',
        date: '9th Jun 2024, 04:22 pm',
        amount: '₹129.50',
        statusType: 'pending',
        paymentStatus: 'Payment Failed',
        pic1: require('../../../../assets/images/fallback.jpg'),
        pic2: require('../../../../assets/images/fallback.jpg')
    },
    {
        id: '4',
        status: 'Order Confirmed',
        date: '7th Jun 2024, 10:15 am',
        amount: '₹212.00',
        statusType: 'confirmed',
        paymentStatus: 'Payment Success',
        pic1: require('../../../../assets/images/fallback.jpg'),
        pic2: require('../../../../assets/images/fallback.jpg'),
        pic3: require('../../../../assets/images/fallback.jpg'),
        pic4: require('../../../../assets/images/fallback.jpg'),
        pic5: require('../../../../assets/images/fallback.jpg'),
    },
    {
        id: '5',
        status: 'Order Returned',
        date: '5th Jun 2024, 02:37 pm',
        amount: '₹185.30',
        statusType: 'returned',
        refundStatus: 'Refund Processing',
        pic1: require('../../../../assets/images/fallback.jpg'),
        pic2: require('../../../../assets/images/fallback.jpg')
    },
];

const getStatusIcon = (type: OrderStatusType): ReactElement | null => {
    switch (type) {
        case 'delivered':
            return <AntDesign name="checkcircle" size={20} color="#00C566" />;
        case 'cancelled':
            return <MaterialIcons name="cancel" size={20} color="#dd1313ff" />;
        case 'pending':
            return <MaterialIcons name="pending-actions" size={20} color="#FFA500" />;
        case 'confirmed':
            return <FontAwesome name="check-circle" size={20} color="#4CAF50" />;
        case 'returned':
            return <Ionicons name="arrow-undo-circle" size={20} color="#007D8A" />;
        default:
            return null;
    }
};

const OrderPage = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Feather name="chevron-left" size={20} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Orders</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {orders.map((order) => (
                    <TouchableOpacity key={order.id} style={styles.orderCard}
                        onPress={() => navigation.navigate('OrderInfo' as never)}
                    >

                        <View style={styles.topRow}>
                            <View style={styles.imagesRow}>
                                {(() => {
                                    const images = [
                                        order.pic1,
                                        order.pic2,
                                        order.pic3,
                                        order.pic4,
                                        order.pic5
                                    ].filter(Boolean); // Filters out undefined images

                                    return (
                                        <>
                                            {images.slice(0, 2).map((img, index) => (
                                                <Image key={index} source={img} style={styles.image} />
                                            ))}

                                            {images.length > 2 && (
                                                <View style={styles.moreImageContainer}>
                                                    <Text style={styles.moreImageText}>+{images.length - 2}</Text>
                                                </View>
                                            )}
                                        </>
                                    );
                                })()}
                            </View>

                            <View style={styles.rightAmountRow}>
                                <Text style={styles.amount}>{order.amount}</Text>
                            </View>
                        </View>


                        <View style={styles.orderDetails}>
                            <View style={styles.statusRow}>

                                {/* Left: Status and icon */}
                                <View style={styles.statusLeft}>
                                    <Text style={styles.statusText}>{order.status}</Text>
                                    {getStatusIcon(order.statusType)}
                                </View>

                                {/* Middle: Badges */}
                                <View style={styles.statusMiddle}>
                                    {order.refundStatus && (
                                        <View style={styles.badge}>
                                            <Text style={styles.badgeText}>{order.refundStatus}</Text>
                                        </View>
                                    )}
                                    {order.paymentStatus && (
                                        <View
                                            style={[
                                                styles.badge,
                                                {
                                                    backgroundColor:
                                                        order.statusType === 'pending' ? '#fedfdcff' : '#D7F5DD',
                                                },
                                            ]}
                                        >
                                            <Text
                                                style={[
                                                    styles.badgeText,
                                                    {
                                                        color:
                                                            order.statusType === 'pending' ? '#c30d00ff' : '#0A7B45',
                                                    },
                                                ]}
                                            >
                                                {order.paymentStatus}
                                            </Text>
                                        </View>
                                    )}
                                </View>

                                {/* Right: Chevron icon in circle */}
                                <View style={styles.chevronContainer}>
                                    <Feather name="chevron-right" size={16} color="#333" />
                                </View>
                            </View>

                            {/* Optional: Move date elsewhere or inline below */}
                            <View style={styles.dateRow}>
                                <Text style={styles.orderDate}>Placed at {order.date}</Text>
                            </View>
                        </View>

                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

export default OrderPage;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F9FAFC' },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
        elevation: 3,
    },
    backButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#eee',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    headerTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#333',
    },
    scrollContent: {
        padding: 12,
    },
    orderCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOpacity: 0.04,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    imagesRow: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: 8,
    },
    image: {
        width: 46,
        height: 46,
        borderRadius: 6,
        marginRight: 6,
    },
    moreImageContainer: {
        width: 46,
        height: 46,
        borderRadius: 6,
        backgroundColor: '#E0E0E0',
        alignItems: 'center',
        justifyContent: 'center',
    },

    moreImageText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
    orderDetails: {
        marginBottom: 8,
    },
    statusRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 8,
    },
    statusLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        flexShrink: 1,
    },
    statusMiddle: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        flexShrink: 1,
    },
    statusRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    statusText: {
        fontWeight: 'bold',
        color: '#2C2C54',
        fontSize: 20,
        marginRight: 6,
    },
    chevronContainer: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#F0F0F0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    dateRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 2,
    },
    orderDate: {
        color: '#666',
        fontSize: 15,
        marginTop: 2,
    },
    rightAmountRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    amount: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#111',
    },
    badge: {
        marginTop: 10,
        backgroundColor: '#D7F5DD',
        alignSelf: 'flex-start',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 20,
    },
    badgeText: {
        fontSize: 12,
        color: '#0A7B45',
        fontWeight: 'bold',
    },
});
