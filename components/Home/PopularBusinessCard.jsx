import { useRouter } from 'expo-router';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/Colors';

export default function PopularBusinessCard({ business }) {

    const router = useRouter();

    return (
        <TouchableOpacity 
        onPress={()=>router.push("/businessdetail/"+business?.id)}
        style={{
            marginLeft: 20,
            padding: 10,
            backgroundColor: '#fff',
            borderRadius: 15,
            alignContent: 'center',
            alignItems: 'center',
            marginBottom: 20,
        }}>
            <Image source={{ uri: business?.imageUrl }}
                style={{
                    width: 200,
                    height: 130,
                    borderRadius: 15,
                }}
            />
            <View style={{ marginTop: 7 }}>
                <Text style={{
                    fontFamily: 'poppins-bold',
                    fontSize: 16,
                    marginTop: 10,
                }}>{business.name}</Text>
                <Text style={{
                    fontFamily: 'poppins',
                    fontSize: 13,
                    marginTop: 10,
                    color: Colors.GRAY
                }}>{business.address}</Text>

                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 10,
                }}>
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
                    <Text style={{
                        fontFamily: 'poppins',
                        backgroundColor: Colors.PRIMARY,
                        color: '#fff',
                        padding: 3,
                        fontSize: 10,
                        borderRadius: 5
                    }}>{business.category}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}