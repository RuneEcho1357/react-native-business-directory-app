import { Image } from 'expo-image';
import { collection, getDocs, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { db } from './../../configs/FirebaseConfig';

export default function Slider() {

    const [sliderList, setSliderList] = useState([]);

    const GetSliderList = async () => {
        try {
            setSliderList([])
            const q = query(collection(db, 'Slider'));
            const querySnapshot = await getDocs(q);

            const data = [];
            querySnapshot.forEach((doc) => {
                data.push(doc.data());
                setSliderList(prev => [...prev, doc.data()]);
            });
            // console.log('Slider data:', data);
        } catch (error) {
            console.log('Error fetching slider data:', error);
        }
    };

    useEffect(() => {
        GetSliderList();
    }, []);

    return (
        <View>
            <Text style={{
                fontFamily: 'poppins-bold',
                fontSize: 18,
                paddingLeft: 20,
                paddingTop: 20,
                marginBottom: 5
            }}>#Special for you
            </Text>

            <FlatList
                data={sliderList}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={{ paddingLeft: 10 }}
                renderItem={({ item }) => (
                    <View style={{ marginRight: 5 }}>
                        <Image
                            source={{ uri: item.imageUrl }}
                            style={{
                                width: 300,
                                height: 200,
                                borderRadius: 15,
                                marginRight: 15
                            }}
                        />
                    </View>
                )}
            />
        </View>
    );
}