import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

const { height } = Dimensions.get('window');

interface Props {
  onClose: () => void;
}

const QuickSignInSheet: React.FC<Props> = ({ onClose }) => {
  const translateY = useRef(new Animated.Value(height)).current;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(true);
      Animated.timing(translateY, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start();
    }, 2500);

    return () => clearTimeout(timeout);
  }, []);

  const handleClose = () => {
    Animated.timing(translateY, {
      toValue: height,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setVisible(false);
      onClose();
    });
  };

  if (!visible) return null;

  return (
    <View style={StyleSheet.absoluteFill}>
      <TouchableWithoutFeedback onPress={handleClose}>
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>

      <Animated.View
        style={[
          styles.sheet,
          {
            transform: [{ translateY }],
          },
        ]}
      >
        <View style={styles.headerRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>V</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.loginTitle}>Login to Vistora</Text>
            <Text style={styles.username}>Somes Dash</Text>
            <Text style={styles.phone}>+91 9876543210</Text>
          </View>
          <Pressable style={styles.langSelector}>
            <Feather name="globe" size={14} color="#000" />
            <Text style={styles.langText}>EN</Text>
          </Pressable>
        </View>

        <Pressable style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Continue with this number</Text>
        </Pressable>

        <Text style={styles.altLoginText}>Use another method</Text>

        <View style={styles.divider} />

        <Text style={styles.disclaimer}>
          By continuing you accept to share your Truecaller{' '}
          <Text style={styles.link}>profile information</Text> with{' '}
          <Text style={styles.bold}>Vistora</Text> and agree to the{' '}
          <Text style={styles.link}>privacy policy</Text>{' '}
          <Text>&</Text>{' '}
          <Text style={styles.link}>terms of service</Text>{' '}
          <Text>of</Text>{' '}
          <Text style={styles.bold}>Vistora</Text>
        </Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
sheet: {
  position: 'absolute',
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: '#fff',
  borderTopLeftRadius: 28,
  borderTopRightRadius: 28,
  padding: 20,
  // REMOVE fixed height and use:
  maxHeight: height * 0.5,  // 50% of screen max
},
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    backgroundColor: '#FFD93D',
    width: 50,
    height: 50,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 35,
  },
  userInfo: {
    flex: 1,
    marginLeft: 12,
  },
  loginTitle: {
    fontSize: 22,
    fontWeight: '600',
  },
  username: {
    fontSize: 16,
    color: '#555',
  },
  phone: {
    fontSize: 15,
    color: '#888',
  },
  langSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
  },
  langText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#000',
  },
  primaryButton: {
    marginTop: 12,
    backgroundColor: '#FF6C5F',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 20,
  },
  altLoginText: {
    marginTop: 14,
    fontSize: 16,
    color: '#007AFF',
    textAlign: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 16,
  },
  disclaimer: {
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
   link: {
    color: '#007AFF',
    textDecorationLine:'underline'
  }, 
  bold: {
    fontWeight: '600',
    color: '#000',
  },
});

export default QuickSignInSheet;
