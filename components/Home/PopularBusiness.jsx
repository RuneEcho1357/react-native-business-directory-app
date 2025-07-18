import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { db } from './../../configs/FirebaseConfig';
import { Colors } from './../../constants/Colors';
import PopularBusinessCard from './PopularBusinessCard';

export default function PopularBusiness() {

  const [businessList, setBusinessList] = useState([]);
  const GetBusinessList = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'BusinessList'));
      const businessArray = [];
      querySnapshot.forEach((doc) => {
        businessArray.push({ id: doc.id, ...doc.data() });
        // setBusinessList(prev => [...prev, doc.data()]);
      });
      setBusinessList(businessArray);
    } catch (error) {
      console.error("Error fetching business list: ", error);
    }
  }

  useEffect(() => {
    GetBusinessList();
  }, []);

  return (
    <View>
      <View style={{
        paddingLeft: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
      }}>
        <Text style={{ 
          fontFamily: 'poppins-bold', 
          fontSize: 18 }}>
          Popular Business
        </Text>
        <Text style={{ 
          fontFamily: 'poppins-regular', 
          fontSize: 12, 
          paddingTop: 8, 
          paddingLeft: 20, 
          paddingRight: 10,
          color: Colors.PRIMARY }}> View All </Text>
      </View>
      <FlatList
        data={businessList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
          <PopularBusinessCard
            key={index}
            business={item} />
        )}
      />
    </View>
  )
}