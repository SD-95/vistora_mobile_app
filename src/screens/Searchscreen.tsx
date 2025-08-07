import React from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Image,
    Dimensions,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; 
const { width } = Dimensions.get('window');

const recentSearches = [
    'Face wash',
    'Hair oil',
    'Vitamin C serum',
    'Sunscreen',
    'Lip balm',
    'Moisturizer',
    'Aloe vera gel',
];

export default function SearchScreen() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            {/* Header with back button and search input */}
            <View style={styles.searchRow}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Feather name="arrow-left" size={20} color="#000" />
                </TouchableOpacity>
                <View style={styles.searchBarContainer}>
                    <TextInput
                        placeholder='Search for "face wash"'
                        placeholderTextColor="#888"
                        style={styles.searchInput}
                    />
                </View>
            </View>

            {/* Purple Rakhi Banner */}
            <View style={styles.bannerContainer}>
                <View style={styles.bannerTextContainer}>
                    <Text style={styles.bannerTitle}>Get ready for Rakhi</Text>
                    <View style={styles.subtitleRow}>
                        <Text style={styles.bannerSubtitle}>Rakhis, gifts and more</Text>
                        <TouchableOpacity style={styles.bannerButton}>
                            <Feather name="arrow-right" size={14} color="#632b73" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.rakhiImageContainer}>
                    <Image
                        source={require('../../assets/images/rakhi_offer.png')} 
                        style={styles.rakhiImage}
                    />
                </View>
            </View>

            {/* Brand Image (e.g., The Ordinary) */}
            <Image
                source={require('../../assets/images/fallback.jpg')} // Replace with your image
                style={styles.brandImage}
                resizeMode="contain"
            />

            {/* Recent Searches */}
            <Text style={styles.recentHeading}>Recent Searches</Text>
            <FlatList
                data={recentSearches}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.recentItem}>
                        <Feather name="clock" size={16} color="#888" />
                        <Text style={styles.recentText}>{item}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
    },
    searchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    backButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    searchBarContainer: {
        flex: 1,
        height: 40,
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
        paddingHorizontal: 12,
        justifyContent: 'center',
    },
    searchInput: {
        fontSize: 14,
        color: '#000',
    },
    bannerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#6a1b9a', // or a gradient if you want
        padding: 14,
        borderRadius: 12,
        marginHorizontal: 16,
        marginTop: 20,
    },

    bannerTextContainer: {
        flex: 1,
        paddingRight: 10,
    },

    bannerTitle: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },

    subtitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },

    bannerSubtitle: {
        color: '#f1e6ff',
        fontSize: 13,
        marginRight: 6,
    },
    bannerButton: {
        backgroundColor: '#fff',
        padding: 4,
        borderRadius: 12,
    },

    rakhiImageContainer: {
        width: 50,
        height: 50,
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: 'transparent',
    },
    rakhiImage: {
        width: 110,
        height: 110,
        resizeMode: 'contain',
    },
    brandImage: {
        width: width - 32,
        height: 100,
        marginBottom: 30,
    },
    recentHeading: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 10,
    },
    recentItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
    },
    recentText: {
        marginLeft: 10,
        fontSize: 14,
        color: '#333',
    },
});