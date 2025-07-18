import { useUser } from '@clerk/clerk-expo';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { Image, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { Rating } from 'react-native-ratings';
import { Colors } from '../../constants/Colors';
import { db } from './../../configs/FirebaseConfig';


export default function Reviews({ business }) {
    const [rating, setRating] = useState(4);
    const [userInput, setUserInput] = useState();
    const { user } = useUser();

    const onSubmit = async () => {
        const docRef = doc(db, 'BusinessList', business?.id);
        await updateDoc(docRef, {
            reviews: arrayUnion({
                rating: rating,
                comment: userInput,
                userName: user?.fullName,
                userImage: user?.imageUrl,
                userEmail: user?.primaryEmailAddress?.emailAddress
            })
        })

        ToastAndroid.show('Comment Added Successfully!', ToastAndroid.BOTTOM)
    }
    return (
        <View style={{
            padding: 20,
            backgroundColor: '#fff'
        }}>
            <Text style={{
                fontFamily: 'poppins-bold',
                fontSize: 20
            }}> Reviews </Text>

            <View>
                <Rating
                    showRating={false}
                    imageSize={20}
                    onFinishRating={(rating) => setRating(rating)}
                    style={{ paddingVertical: 10 }}
                />
                <TextInput
                    placeholder="Write your comment"
                    numberOfLines={4}
                    multiline={true}
                    onChangeText={(value) => setUserInput(value)}
                    style={{
                        borderWidth: 1,
                        borderRadius: 10,
                        padding: 10,
                        borderColor: Colors.GRAY,
                        textAlignVertical: 'top',
                        minHeight: 100
                    }}
                />
                <TouchableOpacity
                    disabled={!userInput}
                    onPress={() => onSubmit()}
                    style={{
                        padding: 10,
                        backgroundColor: Colors.PRIMARY,
                        borderRadius: 6,
                        justifyContent: 'flex-end',
                        marginTop: 10
                    }}
                >
                    <Text style={{
                        fontFamily: 'poppins',
                        color: '#fff',
                        textAlign: 'center'
                    }}>Submit</Text>
                </TouchableOpacity>
            </View>

            {/* Display Previous Reviews  */}
            <View>
                {business?.reviews?.map((item, index) => (
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 10,
                        alignItems: 'center',
                        padding: 10,
                        borderWidth: 1,
                        borderColor: Colors.GRAY,
                        marginTop: 10,
                        borderRadius: 15
                    }}
                        key={index}
                    >
                        <Image source={{ uri: item.userImage }}
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: 99
                            }}
                        />
                        <View style={{
                            display: 'flex',
                            gap: 5
                        }}>
                            <Text style={{ fontFamily: 'poppins-medium' }}>{item.userName}</Text>
                            {/* <Rating 
                                imageSize={20}
                                ratingCount={item.rating}
                                style={{ alignItems: 'flex-end'}}
                            /> */}
                            <Rating
                                type="star"
                                startingValue={Number(item.rating) || 0}
                                imageSize={20}
                                readonly
                                ratingCount={5}
                                style={{ alignSelf: 'flex-start', marginVertical: 4 }}
                            />
                            <Text>{item.comment}</Text>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    )
}