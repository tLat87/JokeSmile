import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import MyCollectionScreen from '../screens/MyCollectionScreen';
import ArticlesScreen from '../screens/ArticlesScreen';
import StartScreen from '../screens/StartScreen';

const Tab = createBottomTabNavigator();

const ICONS = {
    Home: require('../assets/img/Component21.png'),
    SettingsScreen: require('../assets/img/Component25.png'),
    MyCollectionScreen: require('../assets/img/Component322.png'),
    StartScreen: require('../assets/img/Component2323.png'),
    ArticlesScreen: require('../assets/img/Component24.png'),
};

const screenOptions = ({ route }) => ({
    headerShown: false,
    tabBarLabel: '',
    tabBarIcon: () => (
        <Image
            source={ICONS[route.name] || ICONS.Home}
            resizeMode="contain"
        />
    ),
    tabBarStyle: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        elevation: 5,
        backgroundColor: '#2C0000',
        borderRadius: 30,
        width: '90%',
        marginLeft: '5%',
        height: 70,
        paddingTop: 10,
        paddingBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
    },
    headerTitleStyle: {
        color: 'white',
        fontFamily: 'Quantico-BoldItalic',
        fontSize: 40,
    },
});

const MainTabNavigator = () => {
    return (
        <Tab.Navigator screenOptions={screenOptions}>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="StartScreen" component={StartScreen} />
            <Tab.Screen name="MyCollectionScreen" component={MyCollectionScreen} />
            <Tab.Screen name="ArticlesScreen" component={ArticlesScreen} />
            <Tab.Screen name="SettingsScreen" component={SettingsScreen} />
        </Tab.Navigator>
    );
};

export default MainTabNavigator;
