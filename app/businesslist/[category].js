import { useLocalSearchParams, useNavigation } from 'expo-router';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { Colors } from '../../constants/Colors';
import BusinessListCard from './../../components/BusinessList/BusinessListCard';
import { db } from './../../configs/FirebaseConfig';

export default function BusinessListByCategory() {

  const navigation = useNavigation();
  const { category } = useLocalSearchParams(); // Corrected spelling from 'cateogry' to 'category'
  const [ loading, setLoading ] = useState(false);
  const [businessList, setBusinessList] = useState([]);
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: category,
    });
    GetBusinessList();
  }, []);

  const GetBusinessList = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, 'BusinessList'), where('category', '==', category));
      const querySnapshot = await getDocs(q);
      const businessArray = [];
      querySnapshot.forEach((doc) => {
        businessArray.push({ id: doc.id, ...doc.data() });
        // setBusinessList(prev => [...prev, doc.data()]);
      });
      setBusinessList(businessArray);
      // console.log('Business List:', businessArray);
    } catch (error) {
      console.error("Error fetching business list: ", error);
    }
    setLoading(false);
  }

  return (
    <View>

      { businessList?.length>0 && loading==false ? 
      <FlatList
        data={businessList}
        onRefresh={GetBusinessList}
        refreshing={loading}
        renderItem={({ item, index }) => (
          <BusinessListCard business={item} key={index} />
        )}
      /> :
      loading? <ActivityIndicator 
      style={{
        marginTop: '60%'
      }}
        size={'large'}
        color={Colors.PRIMARY}
      /> :
        <Text style={{ fontFamily: 'poppins-bold', textAlign: 'center', marginTop: '50%', fontSize: 20, color: Colors.GRAY }}>
          No Business Found
        </Text>
      }
    </View>
  )
}