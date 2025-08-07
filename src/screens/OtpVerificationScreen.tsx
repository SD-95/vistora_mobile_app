import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const OtpVerificationScreen = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputs = useRef<Array<TextInput | null>>([]);
  const [timer, setTimer] = useState(30);
  const [expired, setExpired] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(countdown);
    } else {
      setExpired(true);
    }
  }, [timer]);

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    if (text && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (index: number) => {
    if (otp[index] === '' && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <LinearGradient colors={['#FFDEE9', '#B5FFFC']} style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.innerContainer}>
          {/* Back Arrow */}
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={28} color="#000" />
          </TouchableOpacity>

          {/* Centered Card */}
          <View style={styles.card}>
            {/* Title and Subheading Inside Card */}
            <Text style={styles.heading}>Verify with OTP</Text>
            <Text style={styles.subheading}>
              We have sent you an OTP to your mobile number registered with us{' '}
              <Text style={styles.phone}>+91-8895319373</Text>
            </Text>

            {/* OTP Input */}
            <View style={styles.otpInputContainer}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => {
                    inputs.current[index] = ref;
                  }}
                  value={digit}
                  onChangeText={(text) => handleChange(text, index)}
                  onKeyPress={({ nativeEvent }) => {
                    if (nativeEvent.key === 'Backspace') handleBackspace(index);
                  }}
                  maxLength={1}
                  keyboardType="number-pad"
                  style={[
                    styles.otpInput,
                    expired
                      ? styles.otpExpired
                      : digit
                        ? styles.otpActive
                        : undefined,
                  ]}
                />
              ))}
            </View>

            {/* Timer */}
            <Text style={styles.timerText}>00 : {timer < 10 ? `0${timer}` : timer}</Text>

            {/* Resend Prompt */}
            <Text style={[styles.resendText, !expired && styles.disabledResend]}>
              Didn’t get the code?
            </Text>

            {/* Reset Link */}
            <TouchableOpacity>
              <Text style={styles.resetText}>Resend via Email</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default OtpVerificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 48,
    left: 24,
    zIndex: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 4,
    elevation: 4,
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 6,
    alignItems: 'center',
  },
  heading: {
    fontSize: 35,
    fontFamily: 'Urbanist-Bold',
    color: '#000',
    marginBottom: 10,
    textAlign: 'center',
  },
  subheading: {
    fontSize: 18,
    fontFamily: 'Urbanist-Regular',
    color: '#333',
    marginBottom: 24,
    textAlign: 'center',
  },
  phone: {
    textDecorationLine: 'underline',
    color: '#FF0066',
    fontFamily: 'Urbanist-SemiBold',
  },
  otpInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginBottom: 20,
  },
  otpInput: {
    width: 40,
    height: 50,
    backgroundColor: '#F3F4F6',
    borderRadius: 25,
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'Urbanist-Bold',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  otpActive: {
    borderColor: '#4ADE80',
  },
  otpExpired: {
    borderColor: '#EF4444',
  },
  timerText: {
    fontSize: 20,
    fontFamily: 'Urbanist-SemiBold',
    color: '#111827',
    marginTop: 4,
  },
  resendText: {
    fontSize: 18,
    fontFamily: 'Urbanist-Medium',
    color: '#FF0066',
    marginTop: 16,
  },
  disabledResend: {
    color: '#AAA',
  },
  resetText: {
    fontSize: 18,
    color: '#1F2937',
    textDecorationLine: 'underline',
    fontFamily: 'Urbanist-Medium',
    marginTop: 8,
  },
});
