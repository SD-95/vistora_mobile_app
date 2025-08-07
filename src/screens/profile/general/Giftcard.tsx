import React from 'react';
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    StyleSheet,
    Platform,
    StatusBar,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const GiftCard = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Feather name="arrow-left" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Gift Card</Text>
                <View style={{ width: 24 }} /> 
            </View>

            {/* Image Background with Message */}
            <ImageBackground
                source={require('../../../../assets/images/giftcard.jpg')}
                style={styles.imageContainer}
                imageStyle={styles.imageBackground}
            >
                <View style={styles.overlay}>
                    <Text style={styles.emptyText}>Currently No Gift Card available for you !!</Text>
                </View>
            </ImageBackground>

            {/* Browse Button */}
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Browse Gift Cards</Text>
            </TouchableOpacity>
        </View>
    );
};

export default GiftCard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    imageContainer: {
        height: 600,
        margin: 20,
        borderRadius: 12,
        overflow: 'hidden',
        justifyContent: 'flex-end',
        backgroundColor: '#f0f0f0',
    },
    imageBackground: {
        resizeMode: 'cover',
        opacity: 0.3,
    },
    overlay: {
        backgroundColor: 'transparent',
        padding: 16,
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#555',
    },
    button: {
        backgroundColor: '#E30613',
        marginHorizontal: 40,
        marginTop: 30,
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        elevation: 2,
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
});
