import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView, Image, Modal, TextInput
} from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

type SectionItem = {
    icon: keyof typeof Feather.glyphMap;
    label: string;
    key: string;
    badgeValue?: string | number;
    hideChevron?: boolean;
};

type SectionProps = {
    title: string;
    items: SectionItem[];
    onItemPress: (key: string) => void;
};
const Section: React.FC<SectionProps> = ({ title, items, onItemPress }) => (
    <View style={styles.section}>
        <Text style={styles.sectionHeader}>{title}</Text>
        {items.map((item) => (
            <TouchableOpacity key={item.key} style={styles.sectionItem} onPress={() => onItemPress(item.key)}>
                <Feather name={item.icon} size={20} color="#555" />
                <Text style={styles.itemLabel}>{item.label}</Text>
                {item.badgeValue ? (
                    <View style={styles.badgeBox}>
                        <Text style={styles.badgeText}>{item.badgeValue}</Text>
                    </View>
                ) : !item.hideChevron && (
                    <View style={styles.rightIconBox}>
                        <Feather name="chevron-right" size={16} color="#888" />
                    </View>
                )}
            </TouchableOpacity>
        ))}
    </View>
);

const TopAction: React.FC<{ icon: keyof typeof Feather.glyphMap; label: string }> = ({ icon, label }) => (
    <TouchableOpacity style={styles.topAction}>
        <Feather name={icon} size={20} color="#333" />
        <Text style={styles.topLabel}>{label}</Text>
    </TouchableOpacity>
);

const SettingsScreen: React.FC = () => {
    const navigation = useNavigation();
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleItemPress = (key: string) => {
        switch (key) {
            case 'orders':
                navigation.navigate('OrderPage' as never);
                break;
            case 'giftCards':
                navigation.navigate('GiftCard' as never);
                break;
            case 'support':
                navigation.navigate('SupportScreen' as never);
                break;
            case 'refunds':
                navigation.navigate('Refund' as never);
                break;
            case 'addresses':
                navigation.navigate('Address' as never);
                break;
            case 'profile':
                navigation.navigate('Profile' as never);
                break;
            case 'rewards':
                navigation.navigate('RewardsScreen' as never);
                break;
            case 'payment':
                navigation.navigate('PaymentManagement' as never);
                break;
            case 'suggest':
                setIsModalVisible(true);
                break;
            case 'notifications':
                navigation.navigate('NotificationScreen' as never);
                break;
            case 'general':
                navigation.navigate('GeneralInfoScreen' as never);
                break;
            default:
                console.warn('No navigation setup for key:', key);
        }
    };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerIconContainer}>
                    <Ionicons name="chevron-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Settings</Text>
            </View>

            {/* Profile Card */}
            <View style={styles.profileCard}>
                <View style={styles.avatarContainer}>
                    <Image
                        source={require('../../assets/images/user.jpg')}
                        style={styles.avatarImage}
                    />
                    <View style={styles.premiumBadge}>
                        <View style={styles.vCircle}>
                            <Text style={styles.vText}>V</Text>
                        </View>
                        <Text style={styles.premiumText}>Premium</Text>
                    </View>
                </View>

                <View style={styles.userInfo}>
                    <Text style={styles.name}>Somes Dash</Text>
                    <Text style={styles.phone}>+91 8895 319373</Text>
                    <Text style={styles.email}>somesdash@example.com</Text>
                    <Text style={styles.address}>56, Green Avenue, Bangalore, India</Text>
                </View>
            </View>

            {/* Quick button session */}
            <View style={styles.quickActions}>
                <TouchableOpacity
                    style={styles.quickCard}
                    onPress={() => navigation.navigate('OrderPage' as never)}
                >
                    <TopAction icon="briefcase" label="Your Orders" />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.quickCard}
                    onPress={() => navigation.navigate('SupportScreen' as never)}
                >
                    <TopAction icon="message-square" label="Help & Support" />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.quickCard}
                    onPress={() => navigation.navigate('VistoraCash' as never)}
                >
                    <TopAction icon="credit-card" label="Vistora Cash" />
                </TouchableOpacity>
            </View>

            {/* Vistora Daily Promo */}
            <View style={styles.promoCard}>
                <TouchableOpacity style={styles.promoButton}>
                    <Text style={styles.promoButtonText}>Renew daily</Text>
                </TouchableOpacity>

                <Text style={styles.promoText}>
                    You would potentially save <Text style={styles.bold}>₹500</Text> per month with Vistora Daily
                </Text>
            </View>

            {/* Vistora Cash Section */}
            <View style={styles.sectionCard}>
                <View style={styles.rowBetween}>
                    <Text style={styles.sectionTitle}>Vistora Cash & Gift Card</Text>
                    <Text style={styles.newLabel}>NEW</Text>
                </View>
                <View style={styles.balanceRow}>
                    <Text style={styles.balanceText}>Available Balance</Text>
                    <Text style={styles.balanceAmount}>₹0</Text>
                    <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('VistoraCash' as never)}>
                        <Text style={styles.addButtonText}>+ Add Balance</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Free Cash */}
            <View style={styles.freeCash}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.freeCashLabel}>🎁 Free Cash</Text>
                    <View style={styles.welcomeBadge}>
                        <Text style={styles.welcomeBadgeText}>Welcome Gift</Text>
                    </View>
                </View>
                <Text style={styles.freeCashAmount}>₹150</Text>
            </View>

            {/* Update Notice */}
            <View style={styles.updateCard}>
                <View style={styles.rowBetween}>
                    <View>
                        <Text style={styles.updateTitle}>Update Available</Text>
                        <Text style={styles.updateDesc}>Enjoy a more seamless shopping experience</Text>
                    </View>
                    <Text style={styles.updateNew}>New</Text>
                </View>
            </View>

            {/* Settings Sections */}
            <View style={styles.settingCard}>
                <Section
                    title="Your Information"
                    onItemPress={handleItemPress}
                    items={[
                        { icon: 'briefcase', label: 'Your Orders', key: 'orders' },
                        { icon: 'gift', label: 'E-Gift Cards', key: 'giftCards', badgeValue: 'NEW' },
                        { icon: 'message-square', label: 'Help & Support', key: 'support' },
                        { icon: 'dollar-sign', label: 'Refunds', key: 'refunds' },
                        { icon: 'map-pin', label: 'Saved Addresses', key: 'addresses', badgeValue: '01' },
                        { icon: 'user', label: 'Profile', key: 'profile' },
                        { icon: 'gift', label: 'Rewards', key: 'rewards' },
                        { icon: 'credit-card', label: 'Payment Management', key: 'payment' },
                    ]}
                />
            </View>
            <View style={styles.settingCard}>
                <Section
                    title="Other Information"
                    onItemPress={handleItemPress}
                    items={[
                        { icon: 'star', label: 'Suggest Products', key: 'suggest' },
                        { icon: 'bell', label: 'Notifications', key: 'notifications' },
                        { icon: 'info', label: 'General Info', key: 'general' },
                    ]}
                />
            </View>
            {/* Logout */}
            <TouchableOpacity style={styles.logout}>
                <Text style={styles.logoutText}>Log Out</Text>
            </TouchableOpacity>

            {/* Version */}
            <Text style={styles.version}>App version 1.0.0{'\n'}v1.0-0</Text>


            {/* Suggested product modal */}

            <Modal visible={isModalVisible} transparent animationType="slide">
                <View style={styles.overlay}>
                    <View style={styles.modalContainer}>
                        <TouchableOpacity style={styles.closeButton} onPress={() => setIsModalVisible(false)}>
                            <Ionicons name="close" size={22} color="#444" />
                        </TouchableOpacity>

                        <Text style={styles.title}>Suggest Products</Text>
                        <Text style={styles.subtitle}>
                            Didn’t find what you are looking for? Please suggest the products
                        </Text>

                        <TextInput
                            style={styles.inputBox}
                            placeholder="Enter the name of the products you would like to see on Zepto."
                            placeholderTextColor="#999"
                            multiline
                        />

                        <TouchableOpacity style={styles.sendButton} >
                            <Text style={styles.sendButtonText}>Send</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
};

export default SettingsScreen;
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#E0E0E0' },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    headerIconContainer: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#eee',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },

    profileCard: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 12,
        marginHorizontal: 15,
        padding: 15,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 3,
        alignItems: 'center',
        marginBottom: 10,
    },
    avatarContainer: {
        position: 'relative',
    },
    avatarImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#ccc',
    },
    premiumBadge: {
        position: 'absolute',
        bottom: -5,
        right: -10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#0A7B45',
        borderRadius: 12,
        paddingHorizontal: 6,
        paddingVertical: 2,
    },
    vCircle: {
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: '#FFD700',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 4,
    },
    vText: {
        fontWeight: 'bold',
        fontSize: 10,
        color: '#000',
    },
    premiumText: {
        color: '#FFD700',
        fontSize: 10,
        fontWeight: 'bold',
    },

    userInfo: {
        marginLeft: 55,
        flex: 1,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 2,
    },
    phone: {
        fontSize: 15,
        color: '#555',
        marginBottom: 2,
    },
    email: {
        fontSize: 15,
        color: '#777',
        marginBottom: 2,
    },
    address: {
        color: '#777',
        fontSize: 15,
        fontWeight: 'bold',
    },
    quickActions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    quickCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingVertical: 20,
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        marginHorizontal: 15,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 3,
    },
    topAction: { alignItems: 'center' },
    topLabel: { marginTop: 5, fontSize: 13 },

    promoCard: {
        marginHorizontal: 15,
        marginTop: 20, // Add top space to make room for overlapping button
        padding: 20,
        backgroundColor: '#124D2C',
        borderRadius: 16,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        elevation: 4,
        position: 'relative',
        overflow: 'visible', // Needed to show the button outside bounds
    },
    promoText: {
        color: '#fff',
        fontSize: 15,
        textAlign: 'center',
        marginTop: 15,
        lineHeight: 22,
    },
    bold: { fontWeight: 'bold' },
    promoButton: {
        position: 'absolute',
        top: -8,
        alignSelf: 'center',
        backgroundColor: '#FFD500',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 3,
    },
    promoButtonText: {
        fontWeight: 'bold',
        fontSize: 13,
        color: '#333',
    },

    sectionCard: {
        marginHorizontal: 15,
        backgroundColor: '#F5F0FE',
        borderRadius: 12,
        padding: 15,
        marginTop: 10,
    },
    settingCard: {
        marginHorizontal: 15,
        backgroundColor: '#F5F0FE',
        borderRadius: 12,
        padding: 8,
        marginTop: 10,
    },
    rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    sectionTitle: { fontSize: 20, fontWeight: '600' },
    newLabel: {
        backgroundColor: '#3C7',
        color: '#fff',
        fontSize: 13,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 5,
    },
    balanceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 12,
    },
    balanceText: { flex: 1, fontSize: 16, color: '#e91e63' },
    balanceAmount: { fontWeight: 'bold', fontSize: 18, marginRight: 10 },
    addButton: {
        borderWidth: 1,
        borderColor: '#aaa',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 6,
    },
    addButtonText: { fontSize: 13 },

    freeCash: {
        margin: 15,
        padding: 10,
        backgroundColor: '#F6E5FF',
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    freeCashLabel: { fontWeight: 'bold', fontSize: 18 },
    freeCashAmount: { fontWeight: 'bold', fontSize: 16, color: '#8000C0' },
    welcomeBadge: {
        marginLeft: 8,
        backgroundColor: '#FFD700',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 8,
    },
    welcomeBadgeText: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#000',
    },
    updateCard: {
        marginHorizontal: 15,
        marginVertical: 10,
        padding: 12,
        backgroundColor: '#F0F0F0',
        borderRadius: 12,
    },
    updateTitle: { fontWeight: 'bold', fontSize: 18 },
    updateDesc: { fontSize: 15, color: '#555' },
    updateNew: {
        backgroundColor: '#27C499',
        color: '#fff',
        fontSize: 13,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 5,
    },

    section: { paddingHorizontal: 15, marginTop: 10 },
    sectionHeader: { fontWeight: 'bold', fontSize: 22, marginBottom: 10 },
    sectionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomColor: '#f2eaeaff',
        borderBottomWidth: 1,
    },
    itemLabel: { marginLeft: 15, fontSize: 18 },
    badgeBox: {
        backgroundColor: '#e91e63',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 12,
        marginLeft: 'auto',
    },
    badgeText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    rightIconBox: {
        marginLeft: 'auto',
        backgroundColor: '#E0E0E0',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    logout: {
        margin: 20,
        padding: 12,
        backgroundColor: '#e91e63',
        borderRadius: 12,
        alignItems: 'center',
    },
    logoutText: { fontWeight: 'bold', fontSize: 15, color: '#E0E0E0' },

    version: {
        textAlign: 'center',
        fontSize: 13,
        color: '#aaa',
        marginBottom: 10,
    },

    // suggested product modal

    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'flex-end',
    },
    modalContainer: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        paddingBottom: 40,
    },
    closeButton: {
        alignSelf: 'flex-end',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 15,
        color: '#555',
        textAlign: 'center',
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    inputBox: {
        backgroundColor: '#FAF1F9',
        borderRadius: 12,
        padding: 15,
        fontSize: 15,
        minHeight: 100,
        textAlignVertical: 'top',
        color: '#333',
    },
    sendButton: {
        marginTop: 20,
        backgroundColor: '#e41c3dff',
        borderRadius: 12,
        paddingVertical: 15,
        alignItems: 'center',
    },
    sendButtonDisabled: {
        backgroundColor: '#f4cbd4',
    },
    sendButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    },
});
