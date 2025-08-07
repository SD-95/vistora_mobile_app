import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Platform,
    StatusBar,
} from 'react-native';
import { Feather, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';

type AddressItem = {
    id: string;
    label: string;
    isSelected: boolean;
    address: string;
};

const AddressPage = () => {
    const navigation = useNavigation();
    const [isModalVisible, setModalVisible] = useState(false);

    const addressData: AddressItem[] = [
        {
            id: '1',
            label: 'Work',
            isSelected: true,
            address:
                'Spruko Technologies, H.no 1-8-67, LIG 213, APIIC Colony, North Kamala Naga...',
        },
    ];

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const renderAddressItem = ({ item }: { item: AddressItem }) => (
        <View style={styles.addressCard}>
            <View style={styles.addressHeader}>
                <View style={styles.addressLabelRow}>
                    <Entypo name="briefcase" size={20} color="#000" style={{ marginRight: 8 }} />
                    <Text style={styles.addressLabel}>{item.label}</Text>
                    {item.isSelected && (
                        <View style={styles.selectedBadge}>
                            <Text style={styles.selectedText}>Selected</Text>
                        </View>
                    )}
                </View>
                <TouchableOpacity onPress={toggleModal} style={styles.iconButton}>
                    <Entypo name="dots-three-vertical" size={16} color="#555" />
                </TouchableOpacity>
            </View>
            <Text style={styles.addressDetails}>{item.address}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Feather name="arrow-left" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Addresses</Text>
                <View style={{ width: 24 }} />
            </View>

            {/* Add New Address Button */}
            <TouchableOpacity style={styles.addAddressButton} onPress={() => navigation.navigate('AddNewAddress' as never)}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={[styles.addAddressText, { fontSize: 20 }]}>+</Text>
                    <Text style={styles.addAddressText}> Add New Address</Text>
                </View>
            </TouchableOpacity>

            {/* Saved Addresses Title */}
            <Text style={styles.sectionTitle}>Saved Addresses</Text>

            {/* Address List */}
            <FlatList
                data={addressData}
                renderItem={renderAddressItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
            />

            {/* Bottom Modal */}
            <Modal
                isVisible={isModalVisible}
                onBackdropPress={toggleModal}
                style={styles.modalContainer}
            >
                <View style={styles.modalContent}>
                    <View style={styles.modalDragHandle} />
                    <Text style={styles.modalTitle}>Work</Text>
                    <Text style={styles.modalSubtitle}>
                        Spruko Technologies, H.no 1-8-67, LIG 213, APIIC Colony, North Kamala Naga...
                    </Text>

                    <TouchableOpacity style={styles.modalButton} onPress={() => navigation.navigate('AddNewAddress' as never)}>
                        <Feather name="edit-2" size={18} color="#000" style={{ marginRight: 10 }} />
                        <Text style={styles.modalButtonText}>Edit</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.modalButton}>
                        <Feather name="trash-2" size={18} color="#E30613" style={{ marginRight: 10 }} />
                        <Text style={[styles.modalButtonText, { color: '#E30613' }]}>Delete</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
};

export default AddressPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    addAddressButton: {
        backgroundColor: '#fff',
        marginHorizontal: 16,
        marginTop: 16,
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#eee',
        alignItems: 'center',
    },
    addAddressText: {
        color: '#E30613',
        fontWeight: '600',
        fontSize: 16,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#000',
        marginTop: 24,
        marginHorizontal: 16,
        marginBottom: 12,
    },
    addressCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
    },
    addressHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    addressLabelRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    addressLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000',
    },
    selectedBadge: {
        backgroundColor: '#DFF5E7',
        borderRadius: 6,
        paddingHorizontal: 8,
        paddingVertical: 2,
        marginLeft: 8,
    },
    selectedText: {
        fontSize: 12,
        color: '#2F9E44',
        fontWeight: '600',
    },
    iconButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    addressDetails: {
        fontSize: 14,
        color: '#555',
    },
    modalContainer: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalContent: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
    },
    modalDragHandle: {
        width: 40,
        height: 4,
        backgroundColor: '#ccc',
        borderRadius: 2,
        alignSelf: 'center',
        marginBottom: 12,
    },
    modalTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#000',
        marginBottom: 4,
    },
    modalSubtitle: {
        fontSize: 14,
        color: '#555',
        marginBottom: 20,
    },
    modalButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    modalButtonText: {
        fontSize: 16,
        color: '#000',
    },
});
