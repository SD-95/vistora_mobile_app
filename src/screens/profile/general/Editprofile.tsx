import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
    Platform,
    StatusBar,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Profile = () => {
    const navigation = useNavigation();
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [name, setName] = useState('Somes Dash');
    const [mobile, setMobile] = useState('8895319373');
    const [email, setEmail] = useState('somes.dash1995@gmail.com');

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setProfileImage(result.assets[0].uri);
        }
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Edit Profile</Text>
                {/* Spacer */}
                <View style={{ width: 24 }} />
            </View>

            {/* Profile Image Section */}
            <View style={styles.profileSection}>
                <View style={styles.profileImageContainer}>
                    <Image
                        source={
                            profileImage
                                ? { uri: profileImage }
                                : require('../../../../assets/images/user.jpg')
                        }
                        style={styles.profileImage}
                    />
                </View>
                <TouchableOpacity style={styles.cameraIconWrapper} onPress={pickImage}>
                    <Ionicons name="camera" size={20} color="#000" />
                </TouchableOpacity>
            </View>

            {/* Form Fields */}
            <View style={styles.formContainer}>
                <Text style={styles.inputLabel}>Name *</Text>
                <TextInput
                    style={styles.inputField}
                    value={name}
                    onChangeText={setName}
                />

                <Text style={styles.inputLabel}>Mobile Number *</Text>
                <TextInput
                    style={styles.inputField}
                    value={mobile}
                    onChangeText={setMobile}
                    keyboardType="phone-pad"
                    maxLength={10}
                />

                <Text style={styles.inputLabel}>Email Address *</Text>
                <TextInput
                    style={styles.inputField}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
                <Text style={styles.helperText}>We promise not to spam you</Text>
            </View>

            {/* Submit Button */}
            <TouchableOpacity style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>

            {/* Delete Account Section */}
            <View style={styles.deleteContainer}>
                <Text style={styles.deleteTitle}>Delete Account</Text>
                <Text style={styles.deleteDesc}>
                    Deleting your account will remove all your orders, wallet amount and any active referral
                </Text>
            </View>
        </View>
    );
};

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        paddingHorizontal: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 16,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#000',
    },
    profileSection: {
        alignSelf: 'center',
        position: 'relative',
        width: 100,
        height: 100,
        marginBottom: 24,
    },
    profileImageContainer: {
        width: '100%',
        height: '100%',
        borderRadius: 50,
        overflow: 'hidden',
        backgroundColor: '#eee',
    },
    profileImage: {
        width: '100%',
        height: '100%',
        borderRadius: 50,
    },
    cameraIconWrapper: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#F4E7FF',
        borderRadius: 16,
        padding: 6,
        borderWidth: 1,
        borderColor: '#ddd',
        zIndex: 10,
    },
    formContainer: {
        marginBottom: 24,
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#400E66',
        marginBottom: 8,
    },
    inputField: {
        backgroundColor: '#F4E7FF',
        borderRadius: 12,
        padding: 14,
        fontSize: 14,
        color: '#000',
        marginBottom: 16,
    },
    helperText: {
        fontSize: 12,
        color: '#B2A2C5',
        marginBottom: 20,
    },
    submitButton: {
        backgroundColor: '#400E66',
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: 'center',
        marginBottom: 30,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    deleteContainer: {
        borderTopWidth: 1,
        borderTopColor: '#E5E5E5',
        paddingTop: 20,
    },
    deleteTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#E30613',
        marginBottom: 8,
    },
    deleteDesc: {
        fontSize: 14,
        color: '#000',
    },
});
