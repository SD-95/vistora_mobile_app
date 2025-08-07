import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Image,
    FlatList,
    Dimensions,
    StyleSheet, SafeAreaView, Platform, StatusBar
} from 'react-native';
import Modal from 'react-native-modal';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { Video, ResizeMode } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import { RootStackParamList } from '../components/AppContent';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

const SCREEN_WIDTH = Dimensions.get('window').width;

const categories = [
    { label: 'Tubs', icon: require('../../assets/images/fallback.jpg') },
    { label: 'Sticks', icon: require('../../assets/images/fallback.jpg') },
    { label: 'Cones', icon: require('../../assets/images/fallback.jpg') },
    { label: 'Gourmet', icon: require('../../assets/images/fallback.jpg') },
    { label: 'Cups', icon: require('../../assets/images/fallback.jpg') },
    { label: 'Guilt Free', icon: require('../../assets/images/fallback.jpg') },
    { label: 'Cakes', icon: require('../../assets/images/fallback.jpg') },
];

const offerMedia = [
    { type: 'image', source: require('../../assets/images/offer1.jpg') },
    { type: 'video', source: require('../../assets/images/video1.mp4') },
    { type: 'image', source: require('../../assets/images/offer2.jpg') },
    { type: 'video', source: require('../../assets/images/video2.mp4') },
];

const products = [
    {
        name: 'Amul Ice Lounge Butter Pecan Ice Cream',
        price: '₹400',
        volume: '500 ml',
        rating: '4.3 (177)',
        image: require('../../assets/images/fallback.jpg'),
    },
    {
        name: 'Amul Gold King Alphonso Ice Cream',
        price: '₹248',
        volume: '1 L',
        rating: '4.2 (6.5k)',
        image: require('../../assets/images/fallback.jpg'),
    },
    {
        name: 'Amul Chocolate Fantasy',
        price: '₹320',
        volume: '750 ml',
        rating: '4.5 (1.2k)',
        image: require('../../assets/images/fallback.jpg'),
    },
    {
        name: 'Amul Kulfi Royal',
        price: '₹280',
        volume: '700 ml',
        rating: '4.4 (980)',
        image: require('../../assets/images/fallback.jpg'),
    },
];

type Props = NativeStackScreenProps<RootStackParamList, 'CategoryProductPage'>;

export default function CategoryProductPage({ navigation }: Props) {
    const [selectedCategory, setSelectedCategory] = useState('Tubs');
    const scrollRef = useRef<ScrollView>(null);
    const [filterModalVisible, setFilterModalVisible] = useState(false);
    const [activeFilter, setActiveFilter] = useState('Type');

    const [productQuantities, setProductQuantities] = useState<{ [key: number]: number }>({});
    const totalQuantity = Object.values(productQuantities).reduce((sum, qty) => sum + qty, 0);

    const incrementQuantity = (index: number) => {
        setProductQuantities((prev) => ({
            ...prev,
            [index]: (prev[index] || 0) + 1,
        }));
    };

    const decrementQuantity = (index: number) => {
        setProductQuantities((prev) => {
            const current = prev[index] || 0;
            if (current <= 1) {
                const updated = { ...prev };
                delete updated[index];
                return updated;
            }
            return {
                ...prev,
                [index]: current - 1,
            };
        });
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Feather name="arrow-left" size={20} color="#1f2937" />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Ice Creams & More</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('SearchScreen' as never)} style={styles.backButton}>
                        <Feather name="search" size={20} color="#1f2937" />
                    </TouchableOpacity>


                </View>
            </SafeAreaView>

            <View style={styles.separator} />

            <View style={styles.mainContent}>
                <ScrollView style={styles.categoryList}>
                    {categories.map((cat) => {
                        const isActive = selectedCategory === cat.label;
                        return (
                            <TouchableOpacity key={cat.label} onPress={() => setSelectedCategory(cat.label)} style={styles.categoryItem}>
                                {isActive ? (
                                    <LinearGradient
                                        colors={['#ffffff', '#f1bcf3ff']}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}
                                        style={styles.categoryItemActive}
                                    >
                                        <View style={styles.activeBorder}></View>
                                        <Image source={cat.icon} style={styles.categoryIcon} />
                                        <Text style={[styles.categoryLabel, styles.categoryLabelActive]}>{cat.label}</Text>
                                    </LinearGradient>
                                ) : (
                                    <View style={styles.categoryItemInner}>
                                        <Image source={cat.icon} style={styles.categoryIcon} />
                                        <Text style={styles.categoryLabel}>{cat.label}</Text>
                                    </View>
                                )}
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>

                <View style={styles.rightPanel}>
                    {/* Filters */}
                    <View style={styles.filtersWrapper}>
                        {['filter', 'Price', 'Brand', 'Sort by'].map((label) => (
                            <TouchableOpacity
                                key={label}
                                style={styles.filterTag}
                                onPress={() => {
                                    if (label === 'filter') setFilterModalVisible(true);
                                }}
                            >
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text>{label}</Text>
                                    {label === 'filter' ? (
                                        <MaterialCommunityIcons name="tune-variant" size={14} color="#6b7280" style={{ marginLeft: 4 }} />
                                    ) : (
                                        <Feather name="filter" size={14} color="#6b7280" style={{ marginLeft: 4 }} />
                                    )}
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <View style={styles.separator} />

                    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 20 }}>
                        {/* Offer Media Banner Scroll */}
                        <ScrollView
                            horizontal
                            pagingEnabled
                            ref={scrollRef}
                            showsHorizontalScrollIndicator={false}
                            style={styles.offerContainer}
                            contentContainerStyle={{ paddingHorizontal: 10 }}
                        >
                            {offerMedia.map((item, index) => (
                                <View key={index} style={[styles.bannerSlide, { marginRight: index !== offerMedia.length - 1 ? 16 : 0 }]}>
                                    {item.type === 'image' ? (
                                        <Image source={item.source} style={styles.bannerImage} />
                                    ) : (
                                        <Video
                                            source={item.source}
                                            style={styles.bannerImage}
                                            resizeMode={ResizeMode.COVER}
                                            shouldPlay
                                            isLooping
                                            isMuted
                                        />
                                    )}
                                </View>
                            ))}
                        </ScrollView>

                        {/* Product Grid List */}
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 10 }}>
                            {products.map((item, index) => (
                                <View key={index} style={[styles.productCard, { width: '48%' }]}>
                                    <View style={styles.imageWrapper}>
                                        <Image source={item.image} style={styles.productImage} />
                                        {/* <TouchableOpacity style={styles.addButton}>
                                            <Text style={styles.addText}>ADD</Text>
                                        </TouchableOpacity> */}
                                        {productQuantities[index] ? (
                                            <View style={styles.counterContainer}>
                                                <TouchableOpacity style={styles.counterButton} onPress={() => decrementQuantity(index)}>
                                                    <Text style={styles.counterText}>-</Text>
                                                </TouchableOpacity>
                                                <Text style={styles.counterValue}>{productQuantities[index]}</Text>
                                                <TouchableOpacity style={styles.counterButton} onPress={() => incrementQuantity(index)}>
                                                    <Text style={styles.counterText}>+</Text>
                                                </TouchableOpacity>
                                            </View>
                                        ) : (
                                            <TouchableOpacity style={styles.addButton} onPress={() => incrementQuantity(index)}>
                                                <Text style={styles.addText}>ADD</Text>
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                    <Text style={styles.productName}>{item.name}</Text>
                                    <Text>{item.price} | {item.volume}</Text>
                                    <Text style={styles.rating}>{item.rating}</Text>
                                </View>
                            ))}
                        </View>
                    </ScrollView>
                </View>
            </View>

            {/* ✅ Bottom Sheet Modal with react-native-modal */}
            <Modal
                isVisible={filterModalVisible}
                onBackdropPress={() => setFilterModalVisible(false)}
                backdropOpacity={0.7}
                style={{ margin: 0, justifyContent: 'flex-end' }}
            >
                <View style={styles.filterModal}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Filter</Text>
                        <TouchableOpacity onPress={() => setFilterModalVisible(false)}>
                            <Feather name="x" size={24} color="#1f2937" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.filterContent}>
                        {/* Left Menu */}
                        <View style={styles.leftMenu}>
                            {['Type', 'Brand', 'Price'].map((item) => (
                                <TouchableOpacity
                                    key={item}
                                    style={[styles.leftItem, activeFilter === item && styles.activeLeftItem]}
                                    onPress={() => setActiveFilter(item)}
                                >
                                    <Text style={[styles.leftItemText, activeFilter === item && styles.activeLeftItemText]}>
                                        {item}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* Right Options */}
                        <View style={styles.rightOptions}>
                            {activeFilter === 'Type' && ['Adult Nutrition', 'Coffee Beans', 'Cold Coffee', 'Dust Tea'].map(item => (
                                <View key={item} style={styles.optionItem}>
                                    <Text style={styles.optionText}>{item}</Text>
                                    <View style={styles.circle} />
                                </View>
                            ))}
                        </View>
                    </View>

                    <View style={styles.footerButtons}>
                        <TouchableOpacity style={styles.clearButton}>
                            <Text style={{ color: 'red' }}>Clear All</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.showButton}>
                            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Show 496 products</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* cart view button */}

            {totalQuantity > 0 && (
                <TouchableOpacity
                    style={styles.cartBar}
                    onPress={() => navigation.navigate('CartPage' as never)}
                    activeOpacity={0.9}
                >
                    <View style={styles.cartLeft}>
                        <View style={styles.cartIconCircle}>
                            <Feather name="shopping-cart" size={16} color="#fff" />
                        </View>
                        <View>
                            <Text style={styles.cartText}>View Cart</Text>
                            <Text style={styles.cartSubText}>{totalQuantity} item{totalQuantity > 1 ? 's' : ''}</Text>
                        </View>
                    </View>
                    <Feather name="chevron-right" size={24} color="#000" />
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    safeArea: {
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
    },
    backButton: {
        backgroundColor: '#eee',
        padding: 8,
        borderRadius: 20,
    },
    headerText: {
        flex: 1,
        marginLeft: 12,
        fontSize: 18,
        fontWeight: '600',
    },
    separator: {
        height: 1,
        backgroundColor: '#e5e7eb',
        marginVertical: 10,
    },
    mainContent: {
        flexDirection: 'row',
        flex: 1,
    },
    categoryList: {
        width: SCREEN_WIDTH * 0.2,
        backgroundColor: '#f6f4ff',
    },
    categoryItem: {
        alignItems: 'center',
    },
    categoryItemInner: {
        alignItems: 'center',
        paddingVertical: 12,
    },
    categoryItemActive: {
        paddingVertical: 12,
        alignItems: 'center',
        marginHorizontal: 5,
        flexDirection: 'column',
        width: '100%',
        position: 'relative',
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12,
    },
    activeBorder: {
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        width: 4,
        backgroundColor: '#d151daff',
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
    },
    categoryIcon: {
        width: 30,
        height: 30,
        marginBottom: 4,
    },
    categoryLabel: {
        fontSize: 12,
        color: '#333',
    },
    categoryLabelActive: {
        fontWeight: 'bold',
        color: '#000',
    },
    rightPanel: {
        width: SCREEN_WIDTH * 0.8,
        padding: 10,
    },
    filtersWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        margin: 10
    },
    filterTag: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, borderWidth: 1, borderColor: '#e5e7eb' },
    filterText: { color: '#1f2937', fontSize: 14 },
    offerContainer: {
        overflow: 'hidden',
        marginBottom: 10,
        width: '100%',
    },
    bannerSlide: {
        width: SCREEN_WIDTH * 0.7,
    },
    bannerImage: {
        width: '100%',
        height: 190,
        borderRadius: 30,
    },
    productCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 12,
        elevation: 2,
        padding: 10,
    },
    productImage: {
        width: '100%',
        height: 150,
        borderRadius: 10,
    },
    imageWrapper: {
        position: 'relative',
    },

    counterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: 10,
        right: 10,
        backgroundColor: '#fff',
        borderRadius: 6,
        paddingHorizontal: 8,
        elevation: 2,
        minWidth: 80,
    },

    counterButton: {
        paddingHorizontal: 6,
        paddingVertical: 2,
    },

    counterText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#e11d48',
    },

    counterValue: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1f2937',
    },
    addButton: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        backgroundColor: '#fff',
        borderRadius: 6,
        paddingVertical: 4,
        paddingHorizontal: 8,
        elevation: 2, // optional shadow for better visibility
    },
    addText: {
        color: '#e11d48',
        fontWeight: 'bold',
    },

    cartBar: {
        position: 'absolute',
        bottom: 10,
        left: 10,
        right: 10,
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 14,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 6,
        zIndex: 100, // ensure it’s above all content
    },

    cartLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    cartIconCircle: {
        backgroundColor: '#f43f5e',
        padding: 8,
        borderRadius: 20,
        marginRight: 12,
    },

    cartText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#111827',
    },

    cartSubText: {
        fontSize: 12,
        color: '#6b7280',
    },
    productName: {
        fontWeight: 'bold',
        marginTop: 8,
    },
    rating: {
        color: '#10b981',
        fontSize: 12,
    },

    blurBackdrop: { flex: 1, justifyContent: 'flex-end' },
    filterModal: { backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingBottom: 20, paddingTop: 30, paddingHorizontal: 20 },
    closeButton: { position: 'absolute', top: 0, left: '50%', marginLeft: -20, backgroundColor: '#1f2937', borderRadius: 20, padding: 6, zIndex: 1 },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1f2937',
    },
    filterContent: { flexDirection: 'row', height: 300, marginTop: 20 },
    leftMenu: {
        width: 100,
        backgroundColor: '#f3f4f6',
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 10,
    },
    leftItem: { paddingVertical: 12, paddingHorizontal: 10 },
    leftItemText: { fontSize: 14, color: '#6b7280' },
    activeLeftItem: { backgroundColor: '#fff', borderLeftWidth: 3, borderLeftColor: '#ef4444' },
    activeLeftItemText: { color: '#111827', fontWeight: 'bold' },

    rightOptions: {
        flex: 1,
        backgroundColor: '#f9fafb',
        borderRadius: 10,
        paddingLeft: 15,
        paddingRight: 15,
        paddingVertical: 12,
        marginLeft: 10,

    },
    optionItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
    optionText: { fontSize: 14 },
    circle: { width: 18, height: 18, borderRadius: 9, borderWidth: 1, borderColor: '#d1d5db' },

    footerButtons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
    clearButton: { flex: 1, borderWidth: 1, borderColor: '#e5e7eb', padding: 12, borderRadius: 8, alignItems: 'center', marginRight: 10 },
    showButton: { flex: 1, backgroundColor: '#f43f5e', padding: 12, borderRadius: 8, alignItems: 'center' }
});