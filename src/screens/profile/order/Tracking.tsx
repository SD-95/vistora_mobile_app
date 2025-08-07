import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    LayoutAnimation,
    UIManager,
    Platform,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const TrackingScreen = ({ navigation }: any) => {
    const [showHistory, setShowHistory] = useState(false);
    const [showCourierInfo, setShowCourierInfo] = useState(false);
    const [showTransitionInfo, setShowTransitionInfo] = useState(false);

    const toggleHistory = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setShowHistory(!showHistory);
    };

    const toggleCourierInfo = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setShowCourierInfo(!showCourierInfo);
    };

    const toggleTransitionInfo = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setShowTransitionInfo(!showTransitionInfo);
    };

    const trackingSteps = [
        { icon: 'shopping-bag', title: 'Order Placed', desc: 'We have received your order', active: true },
        { icon: 'check-circle', title: 'Order Confirmed', desc: 'Order has been confirmed', active: true },
        { icon: 'box', title: 'Order Processed', desc: 'We are preparing your order', active: true },
        {
            icon: 'truck',
            title: 'In-Transition',
            desc: 'Your consignment is on the way',
            active: true,
            expandable: true,
        },
        {
            icon: 'truck',
            title: 'Out for Delivery',
            desc: 'Your order is out for delivery',
            active: true,
            courierPartner: true,
        },
        { icon: 'check-circle', title: 'Order Delivered', desc: 'Your order has been delivered', active: false },
    ];

    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Feather name="arrow-left" size={24} onPress={() => navigation.goBack()} />
                <Text style={styles.headerTitle}>Track Order</Text>
                <TouchableOpacity style={styles.helpButton} onPress={() => navigation.navigate('SupportScreen')}>
                    <Feather name="message-square" size={16} color="#E30613" />
                    <Text style={styles.helpText}>Get Help</Text>
                </TouchableOpacity>
            </View>

            {/* Product Info */}
            <View style={styles.productCard}>
                <Image source={require('../../../../assets/images/fallback.jpg')} style={styles.productImage} />
                <View style={styles.productInfo}>
                    <Text style={styles.productTitle}>Kiwi Fruit</Text>
                    <Text style={styles.productDetails}>500g pack</Text>
                </View>
                <View style={styles.priceBox}>
                    <Text style={styles.price}>₹160</Text>
                    <Text style={styles.strikePrice}>₹200</Text>
                </View>
            </View>

            {/* Order Info */}
            <View style={styles.orderInfoCard}>
                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Order ID:</Text>
                    <Text style={styles.infoValue}>#95COAHSNM87149</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Delivered To:</Text>
                    <Text style={styles.infoValue}>John Doe, 123 Street, City</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Expected Delivery:</Text>
                    <Text style={styles.infoValue}>25-Dec-2019</Text>
                    <View style={styles.onTimeBadge}>
                        <Text style={styles.onTimeBadgeText}>On Time</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.historyToggle} onPress={toggleHistory}>
                    <Text style={styles.historyToggleText}>{showHistory ? 'Hide' : 'View'} Tracking History</Text>
                    <Feather name={showHistory ? 'chevron-up' : 'chevron-down'} size={20} color="#007bff" />
                </TouchableOpacity>
            </View>

            {/* Timeline */}
            {showHistory && (
                <View style={styles.timelineContainer}>
                    {/* Single vertical timeline line */}
                    <View style={styles.verticalTimeline} />

                    {trackingSteps.map((step, index) => (
                        <View key={index} style={styles.timelineStep}>
                            {/* Icon */}
                            <View style={styles.stepIconContainer}>
                                <View style={[styles.stepIconCircle, step.active && { borderColor: '#00C566' }]}>
                                    <Feather name={step.icon as any} size={16} color={step.active ? '#00C566' : '#ccc'} />
                                </View>
                            </View>

                            {/* Step Content */}
                            <View style={styles.stepDetails}>
                                <View style={styles.stepHeaderRow}>
                                    <Text style={[styles.stepTitle, { color: step.active ? '#000' : '#999' }]}>{step.title}</Text>

                                    {step.expandable && (
                                        <TouchableOpacity onPress={toggleTransitionInfo}>
                                            <Feather
                                                name={showTransitionInfo ? 'chevron-up' : 'chevron-down'}
                                                size={18}
                                                color="#007bff"
                                            />
                                        </TouchableOpacity>
                                    )}

                                    {step.courierPartner && (
                                        <TouchableOpacity onPress={toggleCourierInfo} style={styles.partnerButton}>
                                            <Text style={styles.partnerButtonText}>Your Courier Partner</Text>
                                        </TouchableOpacity>
                                    )}
                                </View>

                                <Text style={styles.stepDesc}>{step.desc}</Text>

                                {step.title === 'Out for Delivery' && (
                                    <Text style={styles.subDesc}>
                                        You have been assigned with a courier partner service
                                    </Text>
                                )}

                                {/* {step.expandable && showTransitionInfo && (
                  <View style={styles.expandableCard}>
                    {Array.from({ length: 3 }).map((_, i) => (
                      <Text key={i}>04:0{i} PM - Dispatched from Hub</Text>
                    ))}
                  </View>
                )} */}

                                {step.expandable && showTransitionInfo && (
                                    <View style={styles.expandableCard}>
                                        {[
                                            { status: 'Dispatched from Hub', time: '04:05 PM', date: 'Mon, Aug 5' },
                                            { status: 'Arrived at Sorting Center', time: '06:15 PM', date: 'Mon, Aug 5' },
                                            { status: 'Left from Warehouse', time: '09:30 PM', date: 'Sun, Aug 4' },
                                        ].map((entry, i) => (
                                            <View key={i} style={{ marginBottom: 12 }}>
                                                <Text style={{ fontSize: 14, fontWeight: '500' }}>{entry.status}</Text>
                                                <Text style={{ fontSize: 12, color: '#777' }}>{entry.time} • {entry.date}</Text>
                                            </View>
                                        ))}
                                    </View>
                                )}

                                {step.courierPartner && showCourierInfo && (
                                    <View style={styles.expandableCard}>
                                        <Text>Partner: BlueDart Logistics</Text>
                                        <Text>Tracking ID: BD123456789</Text>
                                        <Text>Delivery Agent: Rahul Sharma</Text>
                                        <Text>Contact: +91-9876543210</Text>
                                        <Text style={{ color: '#E30613', fontWeight: '600' }}>
                                            Delivery Instructions: Call before delivery
                                        </Text>
                                    </View>
                                )}
                            </View>
                        </View>
                    ))}
                </View>
            )}
        </ScrollView>
    );
};

export default TrackingScreen;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F9F9F9', padding: 16 },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
    headerTitle: { fontSize: 20, fontWeight: 'bold', flex: 1, textAlign: 'center' },
    helpButton: { flexDirection: 'row', alignItems: 'center',borderWidth: 1, borderColor: '#fdd', backgroundColor: '#fff0f3',  padding: 6, borderRadius: 10, },
    helpText: { color: '#E30613', marginLeft: 4 },
    productCard: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 16, alignItems: 'center', elevation: 3 },
    productImage: { width: 70, height: 70, borderRadius: 10, marginRight: 12 },
    productInfo: { flex: 1 },
    productTitle: { fontSize: 16, fontWeight: '600' },
    productDetails: { fontSize: 14, color: '#666' },
    priceBox: { alignItems: 'flex-end' },
    price: { fontSize: 16, fontWeight: 'bold', color: '#000' },
    strikePrice: { fontSize: 12, color: '#999', textDecorationLine: 'line-through' },
    orderInfoCard: { backgroundColor: '#fff', borderRadius: 12, padding: 16, elevation: 3, marginBottom: 16 },
    infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
    infoLabel: { fontWeight: '600', width: 120 },
    infoValue: { flex: 1, color: '#333' },
    onTimeBadge: { backgroundColor: '#E0F5E9', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, marginLeft: 8 },
    onTimeBadgeText: { color: '#00C566', fontWeight: '600', fontSize: 12 },
    historyToggle: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginTop: 10 },
    historyToggleText: { color: '#007bff', marginRight: 6 },
    timelineContainer: { backgroundColor: '#fff', borderRadius: 12, padding: 16, elevation: 3, marginBottom: 20, position: 'relative' },
    verticalTimeline: {
        position: 'absolute',
        top: 18,      // aligns start with first circle center
        bottom: 58,   // aligns end with last circle center
        left: 29,     // aligns with circle centers
        borderLeftWidth: 2,
        borderColor: '#00C566',
        //   backgroundColor: '#00C566',
        borderStyle: 'dashed',
    },
    timelineStep: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 30 },
    stepIconContainer: { width: 30, alignItems: 'center', position: 'relative', zIndex: 2 },
    stepIconCircle: { width: 24, height: 24, borderRadius: 12, borderWidth: 2, justifyContent: 'center', alignItems: 'center', borderColor: '#ccc', backgroundColor: '#fff' },
    stepDetails: { flex: 1, paddingLeft: 12 },
    stepHeaderRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    stepTitle: { fontSize: 15, fontWeight: '600' },
    stepDesc: { fontSize: 13, color: '#666', marginTop: 2 },
    subDesc: { fontSize: 12, color: '#999', marginTop: 4 },
    partnerButton: { backgroundColor: '#E0F0FF', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
    partnerButtonText: { fontSize: 12, color: '#007bff' },
    expandableCard: { backgroundColor: '#F5F5F5', borderRadius: 10, padding: 12, marginTop: 10 },
});
