import { FlatList, Image, Linking, ScrollView, Share, Text, TouchableOpacity, View } from 'react-native';

export default function ActionButton({ business }) {
    const actionButtonMenu = [
        {
            id: 1,
            name: 'Call',
            icon: require('./../../assets/images/call.png'),
            url: 'tel:' + business?.contact
        },
        {
            id: 2,
            name: 'Location',
            icon: require('./../../assets/images/pin.png'),
            url: 'https://www.google.com/maps/search/?api=1&query=' + business?.address
        },
        {
            id: 3,
            name: 'Web',
            icon: require('./../../assets/images/web.png'),
            url: business?.website
        },
        {
            id: 4,
            name: 'Share',
            icon: require('./../../assets/images/share.png'),
            url: 'tel:' + business?.contact
        }
    ]

    const OnPressHandle = (item) => {
        if (item.name=='Share')
        {
            Share.share({
                message:business?.name+"\n Adress:"+business.address+"\n Find more details on Business Directory App by Mykyta!"
            })
            return ;
        }
        Linking.openURL(item.url);
    }

    return (
        <ScrollView contentContainerStyle={{ justifyContent: 'center' }}>
            <View style={{
                backgroundColor: '#fff',
                padding: 20,
                flex: 1,
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <FlatList
                    data={actionButtonMenu}
                    numColums={4}
                    horizontal={true}
                    keyExtractor={item => item.id}
                    // style={{ justifyContent: 'space-between' }}
                    // contentContainerStyle={{ justifyContent: 'space-between' }}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity key={index} style={{
                            marginLeft: 20,
                            marginRight: 20
                        }}
                            onPress={() => OnPressHandle(item)}
                        >
                            <Image source={item?.icon} style={{
                                width: 40,
                                height: 40,
                                marginLeft: 8,
                            }} />
                            <Text style={{
                                fontFamily: 'poppins-medium',
                                textAlign: 'center',
                                marginTop: 3
                            }}>{item?.name}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>

        </ScrollView>
    )
}