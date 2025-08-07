import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, Platform, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export const LocationScreen = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {/* Top Bar */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Feather name="arrow-left" size={20} color="#000" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Your Location</Text>
                </View>

                <View style={styles.searchContainer}>
                    <Feather name="search" size={20} color="#666" style={styles.searchIcon} />
                    <TextInput
                        placeholder="Search a new address"
                        style={styles.searchInput}
                    />
                </View>

                {/* Current Location Section */}
                <View style={styles.currentLocationSection}>
                    <MaterialCommunityIcons name="crosshairs-gps" size={20} color="#E91E63" style={{ marginRight: 12 }} />
                    <View style={{ flex: 1 }}>
                        <Text style={styles.currentLocationLabel}>Current location</Text>
                        <View style={styles.locationInfoRow}>
                            <Text style={styles.locationInfoText}>Enable your current location for better services</Text>
                            <TouchableOpacity style={styles.enableButton}>
                                <Text style={styles.enableButtonText}>Enable</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <Text style={styles.savedHeading}>Saved Location</Text>

                <View style={styles.savedLocationRow}>
                    <Ionicons name="location-sharp" size={22} color="#6A1B9A" style={{ marginRight: 10 }} />
                    <View style={{ flex: 1 }}>
                        <Text style={styles.userName}>Work</Text>
                        <Text style={styles.fullAddress}>
                            spruko technologies , H.no 1-8-67, LIG 213, APIIC Colony, North Kamal...
                        </Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    container: {
        flex: 1,
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    backButton: {
        backgroundColor: '#eee',
        borderRadius: 20,
        padding: 8,
        marginRight: 12,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8f2f7',
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginBottom: 24,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
    },
    currentLocationSection: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 30,
    },
    currentLocationLabel: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#E91E63',
        textTransform: 'capitalize',
    },
    locationInfoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 6,
    },
    locationInfoText: {
        flex: 1,
        fontSize: 13,
        color: '#666',
        marginRight: 8,
    },
    enableButton: {
        borderColor: '#E91E63',
        borderWidth: 1,
        paddingVertical: 4,
        paddingHorizontal: 12,
        borderRadius: 6,
    },
    enableButtonText: {
        color: '#E91E63',
        fontWeight: '600',
        fontSize: 13,
    },
    savedHeading: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 14,
    },
    savedLocationRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    userName: {
        fontSize: 15,
        fontWeight: '600',
        marginBottom: 4,
    },
    fullAddress: {
        fontSize: 13,
        color: '#666',
    },
});
