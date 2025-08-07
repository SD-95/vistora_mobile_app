import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const wallets = [
    {
        id: 'amazon-balance',
        name: 'Amazon Pay Balance',
        icon: require('../../../../assets/images/amazonpay.png'),
        linkLabel: 'Link',
    },
    {
        id: 'amazon-later',
        name: 'Amazon Pay Later',
        icon: require('../../../../assets/images/amazonpay.png'),
        linkLabel: 'Link',
    }
];

const PaymentManagement: React.FC = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Manage Payments</Text>
            </View>

            {/* Wallets Section */}
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.sectionTitle}>Wallets</Text>
                <View style={styles.cardWrapper}>
                    {wallets.map((wallet) => (
                        <View key={wallet.id} style={styles.walletCard}>
                            <Image source={wallet.icon} style={styles.walletIcon} />
                            <Text style={styles.walletName}>{wallet.name}</Text>
                            <TouchableOpacity style={styles.linkButton}>
                                <Text style={styles.linkText}>{wallet.linkLabel}</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

export default PaymentManagement;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F5F9',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 50,
        paddingBottom: 15,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    backButton: {
        marginRight: 10,
        padding: 5,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    content: {
        padding: 16,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 12,
        color: '#333',
    },
    cardWrapper: {
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingVertical: 8,
        paddingHorizontal: 4,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 3,
    },
    walletCard: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    walletIcon: {
        width: 30,
        height: 30,
        marginRight: 12,
        resizeMode: 'contain',
    },
    walletName: {
        flex: 1,
        fontSize: 16,
        color: '#222',
    },
    linkButton: {
        paddingHorizontal: 10,
        paddingVertical: 4,
    },
    linkText: {
        color: '#FF4473',
        fontSize: 15,
        fontWeight: '500',
    },
});
