import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LayeredBackground from '../components/LayeredBackground';
import QuickSignInSheet from './QuickSignInSheet';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FontAwesome5, Feather, MaterialIcons } from '@expo/vector-icons';
import { RootStackParamList } from '../components/AppContent';

const TABS = [
  {
    key: 'mobileLogin',
    label: 'Mobile',
    icon: <FontAwesome5 name="mobile-alt" size={20} color="#fff" />,
  },
  {
    key: 'login',
    label: 'Login',
    icon: <Feather name="log-in" size={20} color="#fff" />,
  },
  {
    key: 'signup',
    label: 'Signup',
    icon: <MaterialIcons name="person-add-alt-1" size={20} color="#fff" />,
  },
];

const LoginScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>(); // ✅ FIXED: moved here

  const [activeTab, setActiveTab] = useState('mobileLogin');

  const fullText = 'Your order\nwill get delivered\nin one day . . .';
  const [typedText, setTypedText] = useState('');

  useEffect(() => {
    let index = 0;
    let isDeleting = false;
    let timeout: ReturnType<typeof setTimeout>;

    const handleTyping = () => {
      if (!isDeleting) {
        setTypedText(fullText.slice(0, index));
        index++;
        if (index > fullText.length) {
          isDeleting = true;
          timeout = setTimeout(handleTyping, 1500);
          return;
        }
      } else {
        setTypedText(fullText.slice(0, index));
        index--;
        if (index < 0) {
          isDeleting = false;
          index = 0;
        }
      }

      timeout = setTimeout(handleTyping, isDeleting ? 20 : 50);
    };

    handleTyping();
    return () => clearTimeout(timeout);
  }, [activeTab]);

  const renderTab = (tab: (typeof TABS)[0]) => {
    const isActive = tab.key === activeTab;
    return (
      <TouchableOpacity
        key={tab.key}
        onPress={() => setActiveTab(tab.key)}
        style={[styles.tabItem, isActive && styles.tabItemActive]}
        activeOpacity={0.8}
      >
        <View style={isActive ? styles.tabContentActive : styles.tabContent}>
          {tab.icon}
          {isActive && <Text style={styles.tabLabel}>{tab.label}</Text>}
        </View>
      </TouchableOpacity>
    );
  };

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const renderContent = () => {
    if (activeTab === 'mobileLogin') {
      return (
        <View style={styles.mobileContentWrapper}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
            <Text style={styles.title}>Vistora</Text>
            <Text style={styles.trademark}>™</Text>
          </View>

          <Text style={styles.subheading}>{typedText}</Text>

          <View style={styles.mobileInputWrapper}>
            <View style={styles.inputContainerCentered}>
              <Text style={styles.prefix}>+91</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your mobile number"
                placeholderTextColor="rgba(0,0,0,0.4)"
                keyboardType="phone-pad"
              />
            </View>

            <TouchableOpacity style={styles.buttonCentered} onPress={() => navigation.navigate('Home')}>
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    const isLogin = activeTab === 'login';

    return (
      <View style={styles.authCentered}>
        <View>
          <Text style={styles.formTitle}>
            {isLogin ? 'Vistora is Welcoming You!!' : 'Create an account'}
          </Text>
          {!isLogin && (
            <Text style={styles.formSubtitle}>
              Exciting offers await. Sign up now!
            </Text>
          )}
        </View>

        {!isLogin && (
          <View style={styles.nameRow}>
            <TextInput
              style={[styles.inputField, { flex: 1, marginRight: 8 }]}
              placeholder="First Name"
              placeholderTextColor="#999"
            />
            <TextInput
              style={[styles.inputField, { flex: 1 }]}
              placeholder="Last Name"
              placeholderTextColor="#999"
            />
          </View>
        )}

        <TextInput
          style={styles.inputField}
          placeholder={isLogin ? 'Email / Mobile Number' : 'Email Address'}
          placeholderTextColor="#999"
          keyboardType="email-address"
        />

        {!isLogin && (
          <TextInput
            style={styles.inputField}
            placeholder="Mobile Number"
            placeholderTextColor="#999"
            keyboardType="phone-pad"
          />
        )}

        <View style={styles.passwordField}>
          <TextInput
            style={{
              flex: 1,
              fontSize: 16,
              color: '#000',
              fontFamily: 'Urbanist-Medium',
            }}
            placeholder="Password"
            placeholderTextColor="#999"
            secureTextEntry={!passwordVisible}
          />
          <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
            <Feather
              name={passwordVisible ? 'eye' : 'eye-off'}
              size={20}
              color="#999"
            />
          </TouchableOpacity>
        </View>

        {!isLogin && (
          <View style={styles.passwordField}>
            <TextInput
              style={{
                flex: 1,
                fontSize: 16,
                color: '#000',
                fontFamily: 'Urbanist-Medium',
              }}
              placeholder="Re-enter Password"
              placeholderTextColor="#999"
            />
          </View>
        )}

        {isLogin && (
          <View style={styles.checkboxRow}>
            <TouchableOpacity
              onPress={() => setRememberMe(!rememberMe)}
              style={[
                styles.checkbox,
                rememberMe && { backgroundColor: '#999' },
              ]}
            >
              {rememberMe && <Feather name="check" size={16} color="#fff" />}
            </TouchableOpacity>
            <Text style={styles.checkboxLabel}>Remember me</Text>

            <TouchableOpacity
              style={{ marginLeft: 'auto' }}
              onPress={() => navigation.navigate('OtpVerification')} // ✅ FIXED: working navigation
            >
              <Text style={styles.forgotText}>Trouble logging in?</Text>
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.buttonText}>{isLogin ? 'Login' : 'Signup'}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      <View style={{ flex: 1 }}>
        <LayeredBackground />

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <View style={{ flex: 1, paddingTop: insets.top + 32 }}>
            <View style={{ paddingHorizontal: 24, flex: 1 }}>
              <View style={styles.tabBar}>{TABS.map(renderTab)}</View>

              <ScrollView
                contentContainerStyle={{ paddingBottom: 24, flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
              >
                <View style={styles.content}>{renderContent()}</View>
              </ScrollView>

              <View style={{ marginTop: 10 }}>
                <View style={styles.divider} />
                <View style={styles.footer}>
                  <Text style={styles.footerTop}>By continuing, you agree to our</Text>
                  <Text style={styles.footerBottom}>
                    <Text style={styles.linkPink}>Terms of use</Text> &{' '}
                    <Text style={styles.linkPink}>Privacy policy</Text>
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>

      {activeTab === 'mobileLogin' && <QuickSignInSheet onClose={() => {}} />}
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#222',
    borderRadius: 50,
    padding: 6,
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabItemActive: {
    backgroundColor: '#333',
    borderRadius: 50,
  },
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  tabContentActive: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    gap: 8,
  },
  tabLabel: {
    color: '#fff',
    fontFamily: 'Urbanist-Medium',
    fontSize: 14,
  },
  content: {
    gap: 16,
    flexGrow: 1,
  },
  authCentered: {
    justifyContent: 'center',
    flexGrow: 1,
    gap: 16,
  },
  mobileContentWrapper: {
    flex: 1,
    gap: 16,
  },
  title: {
    fontSize: 48,
    fontFamily: 'Urbanist-Bold',
    color: '#FFD93D',
  },
  trademark: {
    fontSize: 30,
    color: '#FFD93D',
    marginTop: 6,
    marginLeft: 2,
  },
  subheading: {
    fontSize: 30,
    color: '#fff',
    fontFamily: 'Urbanist-Medium',
    lineHeight: 36,
    height: 108, // 3 lines * lineHeight 36
    overflow: 'hidden',
  },
  mobileInputWrapper: {
    marginTop: 12, // controls spacing from subheading
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 1,
  },
  inputContainer: {
    backgroundColor: '#fff',
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 56,
  },
  inputContainerCentered: {
    backgroundColor: '#fff',
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 56,
    alignSelf: 'center',
  },
  prefix: {
    color: '#000',
    fontSize: 16,
    marginRight: 8,
    fontFamily: 'Urbanist-Medium',
  },
  nameRow: {
    flexDirection: 'row',
    gap: 8,
  },
  passwordField: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    backgroundColor: 'transparent',
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#fff',
    fontFamily: 'Urbanist-Medium',
  },
  forgotText: {
    fontSize: 14,
    color: '#FFD93D',
    fontFamily: 'Urbanist-Bold',
    textDecorationLine: 'underline',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    fontFamily: 'Urbanist-Medium',
  },
  button: {
    backgroundColor: '#FF0066',
    paddingVertical: 16,
    borderRadius: 50,
    alignItems: 'center',
  },
  buttonCentered: {
    backgroundColor: '#FF0066',
    paddingVertical: 16,
    borderRadius: 50,
    alignItems: 'center',
    alignSelf: 'stretch', // makes it expand to available width
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Urbanist-Bold',
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 12,
  },
  footerTop: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'Urbanist-Medium',
  },
  footerBottom: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'Urbanist-Medium',
    textAlign: 'center',
  },
  linkPink: {
    color: '#FFD93D',
    textDecorationLine: 'underline',
    fontFamily: 'Urbanist-Bold',
  },
  divider: {
    height: 1,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  formTitle: {
    fontSize: 24,
    color: '#fff',
    fontFamily: 'Urbanist-Bold',
  },
  formSubtitle: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'Urbanist-Medium',
    lineHeight: 22,
  },
  inputField: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 52,
    fontSize: 16,
    color: '#000',
    fontFamily: 'Urbanist-Medium',
  },
});