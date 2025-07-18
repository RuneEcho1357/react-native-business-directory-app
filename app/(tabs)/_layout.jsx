import { Tabs } from 'expo-router';
import { Colors } from './../../constants/Colors';

import HomeIcon from './../../assets/images/home.svg';
import LocationIcon from './../../assets/images/location.svg';
import ProfileIcon from './../../assets/images/profile.svg';


export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: Colors.PRIMARY }}>
      {/* <Tabs.Screen name='home' options={{ tabBarLabel: 'Home', tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={Colors.PRIMARY} /> }} />
      <Tabs.Screen name='explore' options={{ tabBarLabel: 'Explore', tabBarIcon: ({ color }) => <Ionicons name="search" size={24} color={Colors.PRIMARY} /> }} /> */}
      {/* <Tabs.Screen name='profile' options={{ tabBarLabel: 'Profile', tabBarIcon: ({color}) => <Ionicons name="people-circle" size={24} color={Colors.PRIMARY} /> }}/> */}

      <Tabs.Screen
        name='home'
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size, focused }) => <HomeIcon width={size} height={size} fill={focused ? '#7F57F1' : color}/>,
        }}
      />
      <Tabs.Screen
        name='explore'
        options={{
          tabBarLabel: 'Explore',
          tabBarIcon: ({ color, size, focused }) => <LocationIcon width={size} height={size} fill={focused ? '#7F57F1' : color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size, focused }) => <ProfileIcon width={size} height={size} fill={focused ? '#7F57F1' : color} />,
        }}
      />
    </Tabs>
  )
}