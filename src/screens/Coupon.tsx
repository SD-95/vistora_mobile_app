import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CouponScreen = () => {
    const navigation = useNavigation();
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const toggleExpand = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: 40 }}>
                    <Ionicons name="chevron-back" size={24} color="#333" />
                </TouchableOpacity>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={styles.title}>Apply Coupon</Text>
                </View>
                <View style={{ width: 40 }} />
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Enter Coupon Code"
                    style={styles.input}
                    placeholderTextColor="#999"
                />
                <TouchableOpacity>
                    <Text style={styles.applyText}>APPLY</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.availableCoupons}>Available Coupons</Text>

            <ScrollView style={{ flex: 1 }}>
                {couponList.map((coupon, index) => (
                    <View key={index} style={styles.card}>
                        <View style={styles.cardLeftBar} />
                        <View style={styles.cardContent}>
                            <View style={styles.couponRow}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                                    <View style={styles.imageContainer}>
                                        <Image source={coupon.image} style={styles.bankLogo} />
                                    </View>
                                    <View style={styles.couponCodeContainer}>
                                        <Text style={styles.couponCode}>{coupon.code}</Text>
                                    </View>
                                </View>
                                <TouchableOpacity style={styles.applyBtnContainer}>
                                    <Text style={styles.applyBtn}>APPLY</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.titleRow}>
                                <Text style={styles.cardTitle}>{coupon.title}</Text>
                                {expandedIndex === index && (
                                    <TouchableOpacity onPress={() => toggleExpand(index)}>
                                        <Ionicons name="close" size={16} color="#ff2b7b" />
                                    </TouchableOpacity>
                                )}
                            </View>

                            <Text style={styles.cardHighlight}>{coupon.highlight}</Text>

                            {expandedIndex === index ? (
                                <>
                                    {coupon.details.map((item, i) => (
                                        <Text key={i} style={styles.cardSub}>
                                            {i + 1}. {item}
                                        </Text>
                                    ))}
                                </>
                            ) : (
                                <>
                                    <Text style={styles.cardSub}>{coupon.description}</Text>
                                    <TouchableOpacity onPress={() => toggleExpand(index)}>
                                        <Text style={styles.moreText}>+ MORE</Text>
                                    </TouchableOpacity>
                                </>
                            )}
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const couponList = [
    {
        image: require('../../assets/images/HDFC.png'),
        code: 'HDFC100',
        title: 'Flat ₹100 Off with HDFC Banks Card',
        highlight: 'Offer applicable on total payable amount above ₹999.\n(exclusive of any Vistora cash applied)',
        description: 'Get Flat ₹100 off on transactions above ₹999 with HDFC Banks Card',
        details: [
            'Offer valid on credit and debit cards.',
            'Minimum transaction amount: ₹999.',
            'Cannot be clubbed with other bank offers.',
            'Applicable on select categories only.',
            'No code required at checkout.',
            'Instant discount will reflect on payment screen.',
            'Limited to one use per user.',
            'Offer valid till 31st August.',
            'Issued by HDFC Bank in collaboration with Vistora.'
        ]
    },
    {
        image: require('../../assets/images/RBL.png'),
        code: 'ZSSRBLCC',
        title: 'Get flat 10% discount with RBL Bank Credit cards',
        highlight: 'Offer applicable on total payable amount above ₹2499.\n(exclusive of any Vistora cash applied)',
        description: 'Get 10% instant discount up to ₹1000 on orders above ₹2499.',
        details: [
            'Offer valid on credit cards only.',
            'Minimum transaction value is ₹2499.',
            'Maximum discount capped at ₹1000.',
            'Not valid on EMI transactions.',
            'Offer valid once per user during the campaign.',
            'Discount automatically applied during checkout.',
            'Cannot be combined with coupon codes.',
            'Valid only on Vistora platform.',
            'Ends on 25th August.'
        ]
    },
    {
        image: require('../../assets/images/ICICI.png'),
        code: 'ICICI50',
        title: '₹50 off on order above ₹499',
        highlight: 'Add products worth ₹499 to qualify for this deal.',
        description: '₹50 off on non-discounted products above ₹499.',
        details: [
            'No card required for redemption.',
            'Valid on all prepaid orders.',
            'Minimum cart value should be ₹499.',
            'One-time use per customer.',
            'Can be used with Vistora Cash.',
            'Cannot be combined with bank offers.',
            'Applicable on groceries only.',
            'Offer expires in 7 days.',
            'Refunds will be processed as per standard policy.'
        ]
    }
];

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fdf4f9',
        paddingTop: 20
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
    },
    inputContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginHorizontal: 16,
        borderRadius: 10,
        paddingHorizontal: 12,
        alignItems: 'center',
        paddingVertical: 10
    },
    input: {
        flex: 1,
        fontSize: 14,
        color: '#000'
    },
    applyText: {
        color: '#ff2b7b',
        fontWeight: '600',
        fontSize: 14,
        marginLeft: 10
    },
    availableCoupons: {
        fontSize: 16,
        fontWeight: '600',
        marginHorizontal: 16,
        marginTop: 20,
        marginBottom: 10
    },
    card: {
        backgroundColor: '#fff',
        marginHorizontal: 16,
        marginBottom: 16,
        borderRadius: 12,
        overflow: 'hidden',
        flexDirection: 'row'
    },
    cardLeftBar: {
        width: 10,
        backgroundColor: '#f44a4a',
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12,
        borderRightWidth: 1,
        borderColor: '#eee'
    },
    cardContent: {
        flex: 1,
        padding: 14
    },
    couponRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8
    },
    imageContainer: {
        width: 50,
        height: 50,
        padding: 6,
        backgroundColor: '#f3f3f3',
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bankLogo: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    couponCodeContainer: {
        backgroundColor: '#f6f0f7',
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: '#ccc',
        paddingHorizontal: 10,
        paddingVertical: 2,
        marginLeft: 8,
        marginRight: 8,
        borderRadius: 4
    },
    couponCode: {
        fontSize: 12,
        fontWeight: '600',
        color: '#333'
    },
    applyBtn: {
        color: '#ff2b7b',
        fontWeight: '600',
        fontSize: 13
    },
    applyBtnContainer: {
        borderColor: '#ff2b7b',
        borderWidth: 1,
        paddingVertical: 6,
        paddingHorizontal: 14,
        borderRadius: 6,
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4
    },
    cardTitle: {
        fontSize: 14,
        fontWeight: '600',
        flex: 1,
        marginRight: 8
    },
    cardHighlight: {
        fontSize: 12,
        color: '#e91e63',
        marginBottom: 2
    },
    cardSub: {
        fontSize: 12,
        color: '#444',
        marginBottom: 2
    },
    moreText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#ff2b7b',
        marginTop: 6
    }
});

export default CouponScreen;
