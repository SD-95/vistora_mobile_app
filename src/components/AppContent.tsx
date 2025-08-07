import React, { useEffect, useState } from 'react';
import {
  View,
  Platform,
  BackHandler,
  StatusBar,
  ToastAndroid,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as NavigationBar from 'expo-navigation-bar';
import { NavigationContainer, DefaultTheme, useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import SplashScreens from '../screens/SplashScreen';
import OtpVerificationScreen from '../screens/OtpVerificationScreen';

import { LocationScreen } from '../screens/LocationScreen';
import CategoryProductPage from '../screens/CategoryPage';
import CategoriesScreen from '../screens/CategoriesScreen';
import SearchScreen from '../screens/Searchscreen';
import Home from '../screens/Home';
import CartPage from '../screens/CartPage';
import CouponScreen from '../screens/Coupon';
import PaymentGatewayPage from '../screens/PaymentGatewayPage';
import SettingsScreen from '../screens/Setting';
import OrderPage from '../screens/profile/order/Orderpage';
import OrderInfo from '../screens/profile/order/Orderinfo';
import SupportScreen from '../screens/profile/support/SupportScreen';
import VistoraCash from '../screens/profile/general/VistoraCash';
import Alltransaction from '../screens/profile/general/Alltransaction';
import TrackingScreen from '../screens/profile/order/Tracking';
import GiftCard from '../screens/profile/general/Giftcard';
import Refund from '../screens/profile/order/Refund';
import Address from '../screens/profile/general/Address';
import AddNewAddress from '../screens/profile/general/AddNewAddress';
import Profile from '../screens/profile/general/Editprofile';
import PaymentManagement from '../screens/profile/general/PaymentManagement';
import NotificationScreen from '../screens/profile/general/Notification';
import GeneralInfoScreen from '../screens/profile/general/Generalinfo';
import ProductPage from '../screens/profile/order/Productpage';

// Define types for navigation
export type RootStackParamList = {
  Login: { animated: boolean } | undefined;
  OtpVerification: undefined;
  Home: undefined;
  LocationScreen: undefined;
  CategoryProductPage: undefined;
  CategoriesScreen: undefined;
  SearchScreen: undefined;
  CartPage: undefined;
  CouponScreen: undefined;
  PaymentGateway: undefined;
  Settings: undefined;
  OrderPage: undefined;
  OrderInfo: undefined;
  Refund: undefined;
  SupportScreen: undefined;
  VistoraCash: undefined;
  Alltransaction: undefined;
  TrackingScreen: undefined;
  GiftCard: undefined;
  Address: undefined;
  AddNewAddress: undefined;
  Profile: undefined;
  PaymentManagement: undefined;
  NotificationScreen: undefined;
  GeneralInfoScreen: undefined;
  ProductPage: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppContent() {
  const [fontsLoaded] = useFonts({
    'Urbanist-Bold': require('../../assets/fonts/Urbanist-Bold.ttf'),
    'Urbanist-Medium': require('../../assets/fonts/Urbanist-Medium.ttf'),
    "PlaywriteAustraliaNSW-Regular": require('../../assets/fonts/PlaywriteAUNSW-Regular.ttf'),
    "WinkyRough-Light": require('../../assets/fonts/WinkyRough-Light.ttf')
  });

  const [showSplash, setShowSplash] = useState(true);
  const insets = useSafeAreaInsets();
  const navigationRef = useNavigationContainerRef();

  useEffect(() => {
    const configureNavigationBar = async () => {
      if (Platform.OS === 'android') {
        try {
          await NavigationBar.setVisibilityAsync('visible');
          await NavigationBar.setButtonStyleAsync('dark');
        } catch (e) {
          console.warn('NavigationBar error:', e);
        }
      }
    };

    const backAction = () => {
      if (navigationRef.isReady() && navigationRef.canGoBack()) {
        navigationRef.goBack();
        return true;
      } else {
        ToastAndroid.show('Press back again to exit', ToastAndroid.SHORT);
        return false;
      }
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    if (fontsLoaded) {
      SplashScreen.hideAsync();
      configureNavigationBar();
    }

    return () => backHandler.remove();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <View
      style={{
        flex: 1,
        paddingBottom: Platform.OS === 'android' ? insets.bottom : 0,
        backgroundColor: '#000',
      }}
    >
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      <NavigationContainer
        ref={navigationRef}
        theme={{
          ...DefaultTheme,
          colors: {
            ...DefaultTheme.colors,
            background: '#000',
          },
        }}
      >
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animation: Platform.OS === 'android' ? 'fade_from_bottom' : 'slide_from_right',
            gestureEnabled: true,
            contentStyle: { backgroundColor: '#000' },
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} initialParams={{ animated: true }} />
          <Stack.Screen name="OtpVerification" component={OtpVerificationScreen} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="LocationScreen" component={LocationScreen} options={{ headerShown: false }} />
          <Stack.Screen name="CategoriesScreen" component={CategoriesScreen} />
          <Stack.Screen name="CategoryProductPage" component={CategoryProductPage} />
          <Stack.Screen name="SearchScreen" component={SearchScreen} />
          <Stack.Screen name="CartPage" component={CartPage} />
          <Stack.Screen name="CouponScreen" component={CouponScreen} />
          <Stack.Screen name="PaymentGateway" component={PaymentGatewayPage} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="OrderPage" component={OrderPage} />
          <Stack.Screen name="OrderInfo" component={OrderInfo} />
          <Stack.Screen name="Refund" component={Refund} />
          <Stack.Screen name="SupportScreen" component={SupportScreen} />
          <Stack.Screen name="VistoraCash" component={VistoraCash} />
          <Stack.Screen name="Alltransaction" component={Alltransaction} />
          <Stack.Screen name="TrackingScreen" component={TrackingScreen} />
          <Stack.Screen name="GiftCard" component={GiftCard} />
          <Stack.Screen name="Address" component={Address} />
          <Stack.Screen name="AddNewAddress" component={AddNewAddress} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="PaymentManagement" component={PaymentManagement} />
          <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
          <Stack.Screen name="GeneralInfoScreen" component={GeneralInfoScreen} />
          <Stack.Screen name="ProductPage" component={ProductPage} />
        </Stack.Navigator>
      </NavigationContainer>

      {showSplash && <SplashScreens onFinish={() => setShowSplash(false)} />}
    </View>
  );
}
