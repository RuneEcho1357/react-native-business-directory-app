import { Text, View } from 'react-native'

export default function About({business}) {
  return (
    <View style={{
      padding: 20,
      backgroundColor: '#fff'
    }}>
        <Text style={{
          fontFamily: 'poppins-bold',
          fontSize: 20
        }}> About </Text>

        <Text style={{
          fontFamily: 'poppins',
          lineHeight: 25,
        }} >
          {business?.about}
        </Text>
    </View>
  )
}