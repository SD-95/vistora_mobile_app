import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import LoginScreen from './LoginScreen';

const { width } = Dimensions.get('window');

const SplashScreens = ({ onFinish }: { onFinish: () => void }) => {
  const slideAnim = useRef(new Animated.Value(0)).current;
  const loginSlide = useRef(new Animated.Value(width)).current;

  useEffect(() => {
    const timeout = setTimeout(() => {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -width,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(loginSlide, {
          toValue: 0,
          duration: 700,
          useNativeDriver: true,
        }),
      ]).start(() => {
        onFinish();
      });
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          {
            transform: [{ translateX: slideAnim }],
            zIndex: 10,
          },
        ]}
      >
        <LinearGradient colors={['#F9476C', '#FF6C5F']} style={styles.container}>
          <Image
            source={require('../../assets/images/circle_logo.png')}
            style={styles.logo}
          />
          <Text style={styles.title}>Vistora</Text>
          <Text style={styles.subtitle}>Shop Smart, Shop Vistora</Text>
        </LinearGradient>
      </Animated.View>
    </>
  );
};

export default SplashScreens;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 44,
    color: '#fff',
    fontFamily: 'Urbanist-Bold',
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    marginTop: 8,
    fontFamily: 'Urbanist-Medium',
  },
});
