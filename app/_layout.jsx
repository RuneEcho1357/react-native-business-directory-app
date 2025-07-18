import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
// import { tokenCache } from '@clerk/clerk-expo/token-cache';
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SecureStore from "expo-secure-store";
import LoginScreen from './../components/LoginScreen';

const tokenCache = {
  async getToken(key) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      console.error("Error saving token:", err);
      return ;
    }
  }
};
export default function RootLayout() {
  useFonts({
    'poppins': require('./../assets/fonts/Poppins-Regular.ttf'),
    'poppins-bold': require('./../assets/fonts/Poppins-Bold.ttf'),
    'poppins-medium': require('./../assets/fonts/Poppins-Medium.ttf'),
  })
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <SignedIn>
        <Stack screenOptions={{
          headerShown: false,
        }}>
          <Stack.Screen name="(tabs)" />
        </Stack>
      </SignedIn>
      <SignedOut>
        <LoginScreen />
      </SignedOut>

    </ClerkProvider>
  );
}
