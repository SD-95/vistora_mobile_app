import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppContent from './src/components/AppContent';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NativeBaseProvider } from 'native-base';

export default function App() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NativeBaseProvider>
        <AppContent />
        </NativeBaseProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
