// import { useRouter } from 'expo-router';
// import { collection, getDocs, query } from 'firebase/firestore';
// import { useEffect, useState } from 'react';
// import { FlatList, Text, View } from 'react-native';
// import { db } from './../../configs/FirebaseConfig';
// import { Colors } from './../../constants/Colors';
// import CategoryItem from './CategoryItem';

// export default function Category() {
//     const [categoryList, setCategoryList] = useState([]);
//     const router = useRouter();
//     useEffect(() => {
//         GetCategoryList();
//     }, []);
//     const GetCategoryList = async () => {
//         try {
//             const q = query(collection(db, 'Category'));
//             const querySnapshot = await getDocs(q);
//             // const data = [];
//             querySnapshot.forEach((doc) => {
//                 // data.push({ id: doc.id, ...doc.data() });
//                 setCategoryList(prev => [...prev, doc.data()]);
//             });
//             // setCategoryList(data);

//             console.log("Category List: ", data);
//         } catch (error) {
//             console.error("Error fetching business list: ", error);
//         }
//     };



//     return (
//         <View>
//             <View style={{
//                 padding: 15,
//                 display: 'flex',
//                 flexDirection: 'row',
//                 justifyContent: 'space-between',
//                 marginTop: 15,
//             }}>
//                 <Text style={{ fontFamily: 'poppins-bold', fontSize: 18 }}>
//                     Categories
//                 </Text>
//                 <Text style={{ fontFamily: 'poppins-regular', fontSize: 12, paddingTop: 8, paddingLeft: 20, color: Colors.PRIMARY }}> View All </Text>
//             </View>
//             <FlatList
//                 data={categoryList}
//                 horizontal={true}
//                 // showsHorizontalScrollIndicator={false}
//                 style={{
//                     marginLeft: 20,
//                 }}
//                 keyExtractor={item => item.id}
//                 renderItem={({ item, index }) => (
//                     <CategoryItem
//                         category={item}
//                         key={index}
//                         onCategoryPress={(category) => console.log(category)}
//                     />
//                 )}
//             />
//         </View>
//     );
// }

import { useRouter } from 'expo-router';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { db } from './../../configs/FirebaseConfig';
import { Colors } from './../../constants/Colors';
import CategoryItem from './CategoryItem';

export default function Category({ explore = false, onCategorySelect }) {
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryArray = [];
        const querySnapshot = await getDocs(collection(db, 'Category'));
        querySnapshot.forEach((doc) => {
          categoryArray.push({ id: doc.id, ...doc.data() });
        });
        setCategories(categoryArray);
      } catch (error) {
        console.log('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const onCategoryPressHandler = (item) => {
    if (!explore) {
      router.push('/businesslist/' + item.name);
    } else if (onCategorySelect) {
      onCategorySelect(item.name);
    }
  };

  return (
    <View>
      {!explore && (
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingTop: 15,
          }}
        >
          <Text style={{ fontFamily: 'poppins-bold', fontSize: 18, paddingLeft: 20, marginBottom: 5 }}>
            Categories
          </Text>
          <Text
            style={{
              fontFamily: 'poppins-regular',
              fontSize: 12,
              paddingLeft: 20,
              paddingRight: 10,
              paddingTop: 8,
              color: Colors.PRIMARY,
            }}
          >
            View All
          </Text>
        </View>
      )}
      <View>
        <FlatList
          data={categories}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          style={{ paddingLeft: 20 }}
          renderItem={({ item }) => (
            <CategoryItem
              category={item}
              onCategoryPress={() => onCategoryPressHandler(item)}
            />
          )}
        />
      </View>
    </View>
  );
}