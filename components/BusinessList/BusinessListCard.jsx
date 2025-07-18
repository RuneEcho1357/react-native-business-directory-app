import { useRouter } from 'expo-router';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/Colors';

export default function BusinessListCard({ business }) {

    const router = useRouter();

    return (
        <TouchableOpacity style={{
            padding: 10,
            margin: 10,
            borderRadius: 15,
            backgroundColor: '#fff',
            shadowColor: '#000',
            display: 'flex',
            flexDirection: 'row',
            gap: 10,
            // alignItems: 'center'
        }}
        onPress={()=>router.push('/businessdetail/'+business.id)}
        >
            <Image source={{ uri: business.imageUrl }}
                style={{
                    width: 120,
                    height: 120,
                    borderRadius: 15,
                }}
            />
            <View style={{ 
                flex: 1,
                gap: 7
                }}>
                <Text style={{ fontFamily: 'poppins-bold', fontSize: 15 }}>{business.name}</Text>
                <Text style={{ fontFamily: 'poppins', color: Colors.GRAY, fontSize: 14 }}>{business.address}</Text>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 5
                }}>
                    <Image source={require('./../../assets/images/star.png')}
                        style={{
                            width: 15,
                            height: 15
                        }}
                    />
                    <Text style={{ fontFamily: 'poppins' }}>4.5</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}