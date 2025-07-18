import { useUser } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { Text, TextInput, View } from 'react-native'
import { Colors } from '../../constants/Colors'

export default function Header() {

  const { user } = useUser()
  return (
    <View style={{
      padding: 20,
      paddingTop: 40,
      backgroundColor: Colors.PRIMARY,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      
    }}>
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
      }}>
        <Image source={{ uri: user?.imageUrl }}
          style={{
            width: 45,
            height: 45,
            borderRadius: 99
          }} />
        <View>
          <Text style={{ fontFamily: 'poppins', color: '#fff' }}> Welcome,</Text>
          <Text style={{
            fontSize: 19,
            fontFamily: 'poppins-bold',
            color: '#fff',
          }}>{user?.fullName}</Text>
        </View>
      </View>
      {/* Search Bar  */}
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 99,
        marginVertical: 10,
        marginTop: 15
      }}>
        <Ionicons name="search" size={24} color={Colors.PRIMARY} />
        <TextInput placeholder='Search...' 
        style={{
          height: 30,
          fontFamily: 'poppins',
          color: Colors.GRAY,
          width: '100%',
          paddingVertical: 0,
          fontSize: 16
        }}
        />
      </View>
    </View>
  )
}