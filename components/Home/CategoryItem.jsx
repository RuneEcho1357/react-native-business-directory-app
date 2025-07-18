import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from './../../constants/Colors';

export default function CategoryItem({ category, onCategoryPress }) {
    return (
        <TouchableOpacity onPress={() => onCategoryPress(category)}>
            <View style={{ marginRight: 20}}>
                <View style={{
                    padding: 10,
                    backgroundColor: Colors.ICON_BG,
                    borderRadius: 99,
                    margin: 10,
                }}>
                    <Image source={{ uri: category.icon }}
                        style={{
                            width: 40,
                            height: 40,
                            color: Colors.PRIMARY,
                        }}
                    />
                </View>
                <Text style={{ fontSize: 10, fontFamily: 'poppins-medium', textAlign: 'center', marginTop: 5, }}> {category.name} </Text>
            </View>
        </TouchableOpacity >
    )
}