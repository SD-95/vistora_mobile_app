import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, FlatList, TouchableOpacity } from 'react-native';


const notificationOptions = [
    {
        key: 'whatsapp',
        title: 'WhatsApp Messages',
        subtitle: 'Get updates from us on WhatsApp',
        defaultValue: true,
    },
    // You can add more options here later
];

const NotificationScreen = ({ navigation }: any) => {
    const [settings, setSettings] = useState(
        notificationOptions.reduce((acc, item) => {
            acc[item.key] = item.defaultValue;
            return acc;
        }, {} as Record<string, boolean>)
    );

    const toggleSwitch = (key: string) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const renderItem = ({ item }: { item: typeof notificationOptions[0] }) => (
        <View style={styles.optionContainer}>
            <View>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.subtitle}>{item.subtitle}</Text>
            </View>
            <Switch
                value={settings[item.key]}
                onValueChange={() => toggleSwitch(item.key)}
                trackColor={{ false: '#ccc', true: '#0f0' }}
                thumbColor={settings[item.key] ? '#fff' : '#fff'}
            />
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back-circle" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Notifications</Text>
                <View style={{ width: 24 }} />
            </View>
            <FlatList
                data={notificationOptions}
                renderItem={renderItem}
                keyExtractor={item => item.key}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    optionContainer: {
        backgroundColor: '#fff',
        paddingVertical: 18,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
});

export default NotificationScreen;