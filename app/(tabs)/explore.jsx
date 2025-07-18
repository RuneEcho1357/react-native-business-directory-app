import { Ionicons } from '@expo/vector-icons'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { Text, TextInput, View } from 'react-native'
import { Colors } from '../../constants/Colors'
import Category from './../../components/Home/Category'
import { db } from './../../configs/FirebaseConfig'

export default function explore() {

  const GetBusinessByCategory = async (category) => {
      const q = query(collection(db, 'BusinessList', where('category', '==', category)));
      const snapShot = await getDocs(q);
      snapShot.forEach((doc) => {
        console.log(doc.data())
      })
  }
  return (
    <View style={{
      padding: 20
    }}>
      {/* Search Bar  */}
      <Text style={{
        fontFamily: 'poppins-bold',
        fontSize: 22
      }}>Explore More</Text>
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 99,
        marginVertical: 10,
        borderWidth: 1,
        marginTop: 15,
        borderColor: Colors.PRIMARY
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
      {/* Category */}

      <Category explore={true} onCategorySelect={(category) => GetBusinessByCategory(category)} />
      {/* Business List  */}
    </View>
  )
}

// import { Ionicons } from '@expo/vector-icons';
// import { useState } from 'react';
// import { FlatList, Text, TextInput, View } from 'react-native';
// import { Colors } from '../../constants/Colors';
// import Category from './../../components/Home/Category';

// export default function Explore() {
//   const [businesses, setBusinesses] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // This function fetches businesses by category from BusinessList
//   const GetBusinessByCategory = async (category) => {
//     setLoading(true);
//     try {
//       const q = query(
//         collection(db, 'BusinessList'),
//         where('category', '==', category)
//       );
//       const querySnapshot = await getDocs(q);
//       const businessArray = [];
//       querySnapshot.forEach((doc) => {
//         businessArray.push({ id: doc.id, ...doc.data() });
//       });
//       setBusinesses(businessArray);
//     } catch (error) {
//       console.log('Error fetching businesses by category:', error);
//       setBusinesses([]);
//     }
//     setLoading(false);
//   };

//   return (
//     <View style={{
//       padding: 20
//     }}>
//       {/* Search Bar  */}
//       <Text style={{
//         fontFamily: 'poppins-bold',
//         fontSize: 22
//       }}>Explore More</Text>
//       <View style={{
//         display: 'flex',
//         flexDirection: 'row',
//         alignItems: 'center',
//         gap: 10,
//         backgroundColor: '#fff',
//         padding: 10,
//         borderRadius: 99,
//         marginVertical: 10,
//         borderWidth: 1,
//         marginTop: 15,
//         borderColor: Colors.PRIMARY
//       }}>
//         <Ionicons name="search" size={24} color={Colors.PRIMARY} />
//         <TextInput placeholder='Search...'
//           style={{
//             height: 30,
//             fontFamily: 'poppins',
//             color: Colors.GRAY,
//             width: '100%',
//             paddingVertical: 0,
//             fontSize: 16
//           }}
//         />
//       </View>
//       <View style={{ flex: 1 }}>
//         <Category explore={true} onCategorySelect={GetBusinessByCategory} />
//         {loading ? (
//           <Text style={{ textAlign: 'center', marginTop: 20 }}>Loading...</Text>
//         ) : (
//           <FlatList
//             data={businesses}
//             keyExtractor={item => item.id}
//             renderItem={({ item }) => (
//               <View style={{ padding: 16, borderBottomWidth: 1, borderColor: '#eee' }}>
//                 <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
//                 <Text>{item.category}</Text>
//                 {/* Add more business info here */}
//               </View>
//             )}
//             ListEmptyComponent={
//               <Text style={{ textAlign: 'center', marginTop: 20 }}>
//                 {businesses.length === 0 ? 'No businesses found.' : ''}
//               </Text>
//             }
//           />
//         )}
//       </View>
//     </View>
//   );
// }