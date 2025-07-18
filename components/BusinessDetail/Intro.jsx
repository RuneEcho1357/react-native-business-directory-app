import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Image, Text, TouchableOpacity, View } from 'react-native';

export default function Intro({ business }) {

    const router = useRouter();
    return (
        <View>
            <View style={{
                position: 'absolute',
                zIndex: 10,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                padding: 20,
            }}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back-circle" size={40} color="white" />
                </TouchableOpacity>

                <Ionicons name="heart-outline" size={40} color="white" />
            </View>
            <Image
                source={{ uri: business?.imageUrl }}
                style={{
                    width: '100%',
                    height: 350
                }}
            />

            <View style={{ padding: 20, marginTop: -20, backgroundColor: '#fff', borderTopLeftRadius: 25, borderTopRightRadius: 25 }}>
                <Text style={{ fontSize: 20, fontFamily: 'poppins-bold'}}>{business.name}</Text>
                <Text style={{ fontFamily: 'poppins', fontSize: 18 }}>{business.address}</Text>
            </View>
        </View>
    )
}