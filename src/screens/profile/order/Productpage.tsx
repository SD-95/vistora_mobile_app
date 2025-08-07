import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    FlatList,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width: screenWidth } = Dimensions.get('window');

type SimilarItem = {
    id: string;
    title: string;
    price: string;
    mrp: string;
    img: any;
};

const ProductPage = () => {
    const navigation = useNavigation();
    const [quantity, setQuantity] = useState(1);
    const [highlightsOpen, setHighlightsOpen] = useState(false);
    const [highlightsExpanded, setHighlightsExpanded] = useState(false);
    const [infoOpen, setInfoOpen] = useState(false);
    const [infoExpanded, setInfoExpanded] = useState(false);

    const incrementQty = () => setQuantity((prev) => prev + 1);
    const decrementQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
    const handleAddToCart = () => console.log(`Added ${quantity} item(s) to cart`);

    const similarItems: SimilarItem[] = [
        {
            id: '1',
            title: 'Coriander/Kothimeera',
            price: '₹7',
            mrp: '₹22',
            img: require('../../../../assets/images/fallback.jpg'),
        },
        {
            id: '2',
            title: 'Onion',
            price: '₹29',
            mrp: '₹45',
            img: require('../../../../assets/images/fallback.jpg'),
        },
        {
            id: '3',
            title: 'Potato',
            price: '₹34',
            mrp: '₹45',
            img: require('../../../../assets/images/fallback.jpg'),
        },
    ];

    const renderSimilarItem = ({ item }: { item: SimilarItem }) => (
        <View style={styles.similarCard}>
            <View style={styles.similarImageWrapper}>
                <Image source={item.img} style={styles.similarImage} />
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>Sourced at 5 AM</Text>
                </View>
            </View>
            <Text style={styles.similarTitle}>{item.title}</Text>
            <View style={styles.similarPriceRow}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.similarPrice}>{item.price}</Text>
                    <Text style={styles.similarMrp}>{item.mrp}</Text>
                </View>
                <Text style={styles.similarWeight}>500 g</Text>
            </View>
            <View style={styles.similarRatingRow}>
                <Text style={styles.similarRating}>★ 4.3</Text>
                <Text style={styles.similarRatingCount}>(199.3k)</Text>
                <Text style={styles.similarTime}>24 mins</Text>
            </View>
            <TouchableOpacity style={styles.similarAddBtn}>
                <Text style={styles.similarAddText}>ADD</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* HEADER + CAROUSEL */}
            <View style={styles.imageContainer}>
                <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} style={styles.carousel}>
                    {[1, 2, 3].map((item, index) => (
                        <Image key={index} source={require('../../../../assets/images/tomato.png')} style={styles.productImage} />
                    ))}
                </ScrollView>
                <TouchableOpacity style={styles.leftIconWrapper} onPress={() => navigation.goBack()}>
                    <View style={styles.iconCircle}><Ionicons name="chevron-back" size={20} color="#000" /></View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.rightIconWrapper}>
                    <View style={styles.iconCircle}><Feather name="share-2" size={18} color="#000" /></View>
                </TouchableOpacity>
            </View>

            {/* PRODUCT INFO */}
            <View style={styles.infoContainer}>
                <Text style={styles.title}>Tomato Local</Text>
                <View style={styles.row}>
                    <Text style={styles.netQty}>Net Qty: 500 g</Text>
                    <View style={styles.ratingContainer}>
                        <Text style={styles.rating}>★ 4.3</Text>
                        <Text style={styles.ratingCount}>(199.3k)</Text>
                    </View>
                </View>
                {/* PRICE + QTY */}
                <View style={styles.priceQtyContainer}>
                    <View style={styles.priceSection}>
                        <View style={styles.priceRow}>
                            <Text style={styles.price}>₹34</Text>
                            <Text style={styles.mrpStrike}>₹39</Text>
                            <Text style={styles.discount}>12% Off</Text>
                        </View>
                        <Text style={styles.mrp}>MRP (incl. of all taxes)</Text>
                    </View>
                    <View style={styles.qtyContainer}>
                        <Text style={styles.qtyLabel}>Qty:</Text>
                        <View style={styles.qtyControls}>
                            <TouchableOpacity style={styles.qtyBtn} onPress={decrementQty}><Text style={styles.qtyBtnText}>–</Text></TouchableOpacity>
                            <Text style={styles.qtyNumber}>{quantity}</Text>
                            <TouchableOpacity style={styles.qtyBtn} onPress={incrementQty}><Text style={styles.qtyBtnText}>+</Text></TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* DELIVERY */}
                <View style={styles.deliveryContainer}>
                    <Text style={styles.deliveryText}>⚡ Estimated Delivery Time: <Text style={{ fontWeight: 'bold' }}>24 mins</Text></Text>
                </View>

                {/* POLICIES */}
                <View style={styles.policyRow}>
                    <View style={styles.policyBox}><Text style={styles.policyIcon}>🚫</Text><Text style={styles.policyText}>No Return Or Exchange</Text></View>
                    <View style={styles.policyBox}><Text style={styles.policyIcon}>⚡</Text><Text style={styles.policyText}>Fast Delivery</Text></View>
                </View>

                {/* HIGHLIGHTS */}
                <View style={styles.cardBox}>
                    <TouchableOpacity
                        onPress={() => {
                            setHighlightsOpen(!highlightsOpen);
                            if (!highlightsOpen) setHighlightsExpanded(false);
                        }}
                        style={styles.dropdownContainer}
                    >
                        <Text style={styles.dropdownTitle}>Highlights</Text>
                        <Ionicons name={highlightsOpen ? 'chevron-up' : 'chevron-down'} size={20} />
                    </TouchableOpacity>
                    {highlightsOpen && (
                        <View style={styles.dropdownContent}>
                            <Text style={styles.rowItem}><Text style={styles.label}>Brand </Text><Text style={styles.value}>Unbranded</Text></Text>
                            <Text style={styles.rowItem}><Text style={styles.label}>Product Type </Text><Text style={styles.value}>Tomato</Text></Text>
                            {!highlightsExpanded && (
                                <TouchableOpacity onPress={() => setHighlightsExpanded(true)} style={styles.viewToggle}>
                                    <Text style={styles.viewMoreText}>View more </Text>
                                    <Ionicons name="chevron-down" size={16} />
                                </TouchableOpacity>
                            )}
                            {highlightsExpanded && (
                                <>
                                    <Text style={styles.rowItem}><Text style={styles.label}>Imported </Text><Text style={styles.value}>No</Text></Text>
                                    <Text style={styles.rowItem}><Text style={styles.label}>Dietary Preference </Text><Text style={styles.value}>Veg</Text></Text>
                                    <Text style={styles.rowItem}><Text style={styles.label}>Good For </Text><Text style={styles.value}>Immunity</Text></Text>
                                    <Text style={styles.rowItem}><Text style={styles.label}>Weight </Text><Text style={styles.value}>500 g</Text></Text>
                                    <TouchableOpacity onPress={() => setHighlightsExpanded(false)} style={styles.viewToggle}>
                                        <Text style={styles.viewMoreText}>View less </Text>
                                        <Ionicons name="chevron-up" size={16} />
                                    </TouchableOpacity>
                                </>
                            )}
                        </View>
                    )}
                </View>

                {/* INFORMATION */}
                <View style={styles.cardBox}>
                    <TouchableOpacity
                        onPress={() => {
                            setInfoOpen(!infoOpen);
                            if (!infoOpen) setInfoExpanded(false);
                        }}
                        style={styles.dropdownContainer}
                    >
                        <Text style={styles.dropdownTitle}>Information</Text>
                        <Ionicons name={infoOpen ? 'chevron-up' : 'chevron-down'} size={20} />
                    </TouchableOpacity>
                    {infoOpen && (
                        <View style={styles.dropdownContent}>
                            <Text style={styles.rowItem}><Text style={styles.label}>Disclaimer </Text><Text style={styles.value}>All images are for representational purposes...</Text></Text>
                            {infoExpanded && (
                                <>
                                    <Text style={styles.rowItem}><Text style={styles.label}>Customer Care Details </Text><Text style={styles.value}>support@Vistoranow.com</Text></Text>
                                    <Text style={styles.rowItem}><Text style={styles.label}>Refund Policy </Text><Text style={styles.value}>Refund/Replacement within 24 hours</Text></Text>
                                    <Text style={styles.rowItem}><Text style={styles.label}>Seller Name </Text><Text style={styles.value}>Geddit Convenience Private Limited</Text></Text>
                                    <Text style={styles.rowItem}><Text style={styles.label}>Seller Address </Text><Text style={styles.value}>Geddit Convenience Private Limited, Unit 803, Lodha Supremus, ...</Text></Text>
                                    <Text style={styles.rowItem}><Text style={styles.label}>Seller License No. </Text><Text style={styles.value}>11521998000248</Text></Text>
                                    <Text style={styles.rowItem}><Text style={styles.label}>Country of Origin </Text><Text style={styles.value}>India</Text></Text>
                                    <Text style={styles.rowItem}><Text style={styles.label}>Shelf Life </Text><Text style={styles.value}>4 days</Text></Text>
                                </>
                            )}
                            <TouchableOpacity onPress={() => setInfoExpanded(!infoExpanded)} style={styles.viewToggle}>
                                <Text style={styles.viewMoreText}>{infoExpanded ? 'View less ' : 'View more '}</Text>
                                <Ionicons name={infoExpanded ? 'chevron-up' : 'chevron-down'} size={16} />
                            </TouchableOpacity>
                        </View>
                    )}
                </View>

                {/* SIMILAR ITEMS */}
                <Text style={styles.similarHeading}>You might also like</Text>
                <FlatList
                    data={similarItems}
                    renderItem={renderSimilarItem}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{ marginVertical: 12 }}
                />
            </View>

            {/* ADD TO CART BUTTON */}
            <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
                <Text style={styles.cartText}>Add to cart</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        flex: 1,
    },
    imageContainer: {
        position: 'relative',
        height: 260,
    },
    carousel: {
        width: screenWidth,
        height: 260,
    },
    productImage: {
        width: screenWidth,
        height: 260,
        resizeMode: 'cover',
    },
    leftIconWrapper: {
        position: 'absolute',
        top: 30,
        left: 16,
    },
    rightIconWrapper: {
        position: 'absolute',
        top: 30,
        right: 16,
    },
    iconCircle: {
        backgroundColor: '#ffffffcc',
        padding: 10,
        borderRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
    },
    infoContainer: {
        paddingHorizontal: 20,
        paddingTop: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#111',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 6,
    },
    netQty: {
        fontSize: 14,
        color: '#666',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rating: {
        fontSize: 14,
        color: '#2e7d32',
        fontWeight: 'bold',
        marginRight: 4,
    },
    ratingCount: {
        fontSize: 13,
        color: '#aaa',
    },
    priceQtyContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginTop: 16,
    },
    priceSection: {
        flex: 1,
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    price: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000',
    },
    mrpStrike: {
        textDecorationLine: 'line-through',
        color: '#bbb',
        fontSize: 16,
    },
    discount: {
        fontSize: 14,
        color: '#e53935',
        fontWeight: '600',
    },
    mrp: {
        fontSize: 13,
        color: '#999',
        marginTop: 4,
    },
    qtyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    qtyLabel: {
        fontSize: 16,
        fontWeight: '600',
        marginRight: 8,
    },
    qtyControls: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    qtyBtn: {
        paddingHorizontal: 10,
    },
    qtyBtnText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#444',
    },
    qtyNumber: {
        fontSize: 16,
        fontWeight: '600',
        marginHorizontal: 8,
        minWidth: 20,
        textAlign: 'center',
    },
    deliveryContainer: {
        marginTop: 16,
        padding: 12,
        backgroundColor: '#f1fdf6',
        borderRadius: 8,
    },
    deliveryText: {
        color: '#1b5e20',
        fontSize: 14,
    },
    policyRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 18,
    },
    policyBox: {
        alignItems: 'center',
        width: '45%',
        paddingVertical: 12,
        backgroundColor: '#fafafa',
        borderRadius: 12,
        borderColor: '#eee',
        borderWidth: 1,
    },
    policyIcon: {
        fontSize: 20,
        marginBottom: 6,
    },
    policyText: {
        fontSize: 12,
        color: '#444',
        textAlign: 'center',
    },
    addToCartButton: {
        backgroundColor: '#111827',
        padding: 18,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20,
        borderRadius: 12,
        elevation: 3,
    },
    cartText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    dropdownContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 14,
    },
    dropdownTitle: {
        fontWeight: '700',
        fontSize: 16,
        color: '#333',
    },
    dropdownContent: {
        paddingHorizontal: 16,
        paddingBottom: 12,
    },
    similarHeading: {
        fontSize: 18,
        fontWeight: '700',
        marginTop: 20,
        marginBottom: 8,
        color: '#222',
    },
    similarCard: {
        width: 150,
        marginRight: 12,
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 12,
        padding: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 1,
    },
    similarImage: {
        width: '100%',
        height: 90,
        resizeMode: 'contain',
        borderRadius: 6,
    },
    similarImageWrapper: {
        position: 'relative',
    },
    badge: {
        position: 'absolute',
        bottom: 6,
        left: 6,
        backgroundColor: '#ff9800',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    badgeText: {
        fontSize: 10,
        color: '#fff',
        fontWeight: '600',
    },
    similarTitle: {
        fontSize: 14,
        fontWeight: '600',
        marginTop: 8,
        color: '#222',
    },
    similarPriceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 6,
    },
    similarPrice: {
        fontSize: 14,
        color: '#2e7d32',
        fontWeight: '600',
    },
    similarMrp: {
        textDecorationLine: 'line-through',
        color: '#aaa',
        fontSize: 12,
        marginLeft: 6,
    },
    similarWeight: {
        fontSize: 12,
        color: '#666',
    },
    similarRatingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 4,
    },
    similarRating: {
        fontSize: 12,
        color: '#2e7d32',
        fontWeight: '600',
    },
    similarRatingCount: {
        fontSize: 12,
        color: '#888',
    },
    similarTime: {
        fontSize: 12,
        color: '#555',
    },
    similarAddBtn: {
        marginTop: 8,
        borderWidth: 1,
        borderColor: '#111827',
        borderRadius: 6,
        paddingVertical: 6,
        alignItems: 'center',
    },
    similarAddText: {
        color: '#111827',
        fontWeight: '600',
    },
    cardBox: {
        backgroundColor: '#fff',
        borderRadius: 10,
        marginVertical: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 3,
    },
    rowItem: {
        marginVertical: 6,
        fontSize: 14,
        lineHeight: 20,
    },
    label: {
        color: '#888',
        fontWeight: '500',
    },
    value: {
        color: '#222',
        fontWeight: '400',
    },
    viewToggle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        backgroundColor: '#f4f4f4',
        paddingVertical: 6,
        borderRadius: 10,
    },
    viewMoreText: {
        color: '#e91e63',
        fontWeight: '600',
        marginRight: 4,
    },
});

export default ProductPage;
