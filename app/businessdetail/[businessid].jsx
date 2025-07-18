// import { useLocalSearchParams } from 'expo-router';
// import { doc, getDoc } from 'firebase/firestore';
// import { useEffect, useState } from 'react';
// import { ActivityIndicator, Text, View } from 'react-native';
// import Intro from '../../components/BusinessDetail/Intro';
// import { db } from './../../configs/FirebaseConfig';
// import { Colors } from './../../constants/Colors';

// export default function BusinessDetail() {

//   const { businessid } = useLocalSearchParams();
//   const [business, setBusiness] = useState(null);
//   const [loading, setLoading] = useState(false);
//   useEffect(() => {
//     GetBusinessDetailById();
//   }, [])

//   const GetBusinessDetailById = async () => {
//     setLoading(true);
//     const docRef = doc(db, 'BusinessList', businessid);
//     const docSnap = await getDoc(docRef);
//     if (docSnap.exists()) {
//       setBusiness(docSnap.data());
//       // setBusinessdetail({ id: dataSnap.id, ...dataSnap.data() });
//       console.log("Here you have DocSnapData", docSnap.data())
//       setLoading(false);
//     } else {
//       console.log("No such document!");
//       setLoading(false);
//     }
//   }
//   return (
//     <View>
//       {loading ?
//         <ActivityIndicator size={'large'} color={Colors.PRIMARY} style={{
//           marginTop: '70%'
//         }} /> :
//         <View>
//           {/* Intro */}
//           <Intro business={business} />
//           {/* Action Buttons */}
//         </View>
//       }
//       <Text>{businessid}</Text>
//     </View>
//   )
// }

import { useLocalSearchParams } from 'expo-router';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import ActionButton from '../../components/BusinessDetail/ActionButton';
import Intro from '../../components/BusinessDetail/Intro';
import Reviews from '../../components/BusinessDetail/Reviews';
import { Colors } from '../../constants/Colors';
import About from './../../components/BusinessDetail/About';
import { db } from './../../configs/FirebaseConfig';

export default function BusinessDetailScreen() {
  const { businessid } = useLocalSearchParams(); // <-- FIXED
  const [businessdetail, setBusinessdetail] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchBusinessDetail = async () => {
      
      try {
        // setLoading(true);
        if (!businessid) return;
        const docRef = doc(db, 'BusinessList', businessid);
        const dataSnap = await getDoc(docRef);
        if (dataSnap.exists()) {
          setBusinessdetail({ id: dataSnap.id, ...dataSnap.data() });
          // setLoading(false);
        } else {
          setBusinessdetail(null);
          // setLoading(false);
        }
      } catch (error) {
        console.log('Error fetching business detail:', error);
        setBusinessdetail(null);
        // setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    fetchBusinessDetail();
  }, [businessid]);

  if (loading) {
    return <ActivityIndicator style={{ marginTop: '100%' }} size={'large'} color={Colors.PRIMARY} />;
  }
  if (!businessdetail) {
    // setLoading(false);
    // return <Text style={{ fontFamily: 'poppins-bold', textAlign: 'center', marginTop: '50%', fontSize: 20, color: Colors.GRAY }}>
    //   Error occured loading business details
    // </Text>;
    return ;
  }

  return (
    <ScrollView>
        <View>
          {/* Intro */}
          <Intro business={businessdetail} />

          {/* Action Button  */}
          <ActionButton business={businessdetail}/>

          {/* About  */}
          <About business={businessdetail}/>

          {/* Reviews */}
          <Reviews business={businessdetail} />
        </View>
    </ScrollView>
  );
}