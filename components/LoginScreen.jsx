import { Colors } from '@/constants/Colors';
import { useSSO } from '@clerk/clerk-expo';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { useCallback } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useWarmUpBrowser } from './../hooks/useWarmUpBrowser';

WebBrowser.maybeCompleteAuthSession()

export default function LoginScreen() {
  useWarmUpBrowser();

  const { startSSOFlow } = useSSO()

  const onPress = useCallback(async () => {
    try {
      // Start the authentication process by calling `startSSOFlow()`
      const { createdSessionId, setActive, signIn, signUp } = await startSSOFlow({
        strategy: 'oauth_google',
        // For web, defaults to current path
        // For native, you must pass a scheme, like AuthSession.makeRedirectUri({ scheme, path })
        // For more info, see https://docs.expo.dev/versions/latest/sdk/auth-session/#authsessionmakeredirecturioptions
        redirectUrl: AuthSession.makeRedirectUri(),
      })

      // If sign in was successful, set the active session
      if (createdSessionId) {
        setActive({ session: createdSessionId })
      } else {
        // If there is no `createdSessionId`,
        // there are missing requirements, such as MFA
        // Use the `signIn` or `signUp` returned from `startSSOFlow`
        // to handle next steps
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }, [])

  return (
    <View>
      <View style={{
        display: 'flex',
        alignItems: 'center',
        marginTop: 100
      }}>
        <Image source={require('./../assets/images/login.png')}
          style={{ width: 220, height: 450, borderRadius: 20, borderWidth: 6, borderColor: '#000' }}
        />
      </View>

      <View style={styles.subContainer}>
        <Text style={{
          fontSize: 30,
          fontFamily: 'poppins-bold',
          textAlign: 'center',
        }}> Your Ultimate
          <Text style={{
            color: Colors.PRIMARY,
          }}> Community Business Directory
          </Text> App
        </Text>
        <Text style={{
          fontSize: 15,
          fontFamily: 'poppins',
          textAlign: 'center',
          marginVertical: 15,
          color: Colors.GRAY
        }}> Find your favourite business near your and post your own businessto your community</Text>
        <TouchableOpacity style={styles.btn} onPress={onPress}>
          <Text style={{
            textAlign: 'center',
            color: '#fff',
            fontFamily: 'poppins'
          }}> Let's Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  subContainer: {
    backgroundColor: '#fff',
    padding: 20,
    marginTop: -20,
  },
  btn: {
    backgroundColor: Colors.PRIMARY,
    padding: 16,
    borderRadius: 99,
    marginTop: 20,
  }
})