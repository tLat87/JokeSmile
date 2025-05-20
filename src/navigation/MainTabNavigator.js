import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import HomeScreen from '../screens/HomeScreen';

import {useNavigation} from '@react-navigation/native';
import SettingsScreen from '../screens/SettingsScreen';
import MyCollectionScreen from '../screens/MyCollectionScreen';
import ArticlesScreen from '../screens/ArticlesScreen';
import QuizScreen from '../screens/QuizScreen';
import StartScreen from '../screens/StartScreen';

const Tab = createBottomTabNavigator();

const getTabIcon = (routeName) => {
    switch (routeName) {
        case 'Home':
            return require('../assets/img/Component21.png');
        case 'SettingsScreen':
            return require('../assets/img/Component25.png');
        case 'MyCollectionScreen':
            return require('../assets/img/Component322.png');
        case 'StartScreen':
            return require('../assets/img/Component2323.png');

        case 'ArticlesScreen':
            return require('../assets/img/Component24.png');

        default:
            return require('../assets/img/Component21.png');
    }
};

const MainTabNavigator = () => {
    const navigation = useNavigation();
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                headerTitleStyle: {
                    color: 'white',
                    fontFamily:'Quantico-BoldItalic',
                    fontSize: 40,
                },
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
                    shadowColor: '#000',
                    shadowOffset: {
                        width: 0,
                        height: 10,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.5,
                    paddingBottom: 10,
                },
                tabBarIcon: () => (
                    <Image
                        source={getTabIcon(route.name)}
                        style={{ }}
                    />
                ),
            })}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarLabel: '',
                    headerTitle: 'Home',
                }}
            />

            {/*<Tab.Screen*/}
            {/*    name="QuizScreen"*/}
            {/*    component={QuizScreen}*/}
            {/*    options={{*/}
            {/*        tabBarLabel: '',*/}
            {/*        headerTitle: 'Home',*/}
            {/*    }}*/}
            {/*/>*/}

            <Tab.Screen
                name="StartScreen"
                component={StartScreen}
                options={{
                    tabBarLabel: '',
                    headerTitle: 'Home',
                }}
            />

            <Tab.Screen
                name="MyCollectionScreen"
                component={MyCollectionScreen}
                options={{
                    tabBarLabel: '',
                    headerTitle: 'Settings',
                }}
            />
            <Tab.Screen
                name="ArticlesScreen"
                component={ArticlesScreen}
                options={{
                    tabBarLabel: '',
                    headerTitle: 'Settings',
                }}
            />
            <Tab.Screen
                name="SettingsScreen"
                component={SettingsScreen}
                options={{
                    tabBarLabel: '',
                    headerTitle: 'Settings',
                }}
            />
        </Tab.Navigator>
    );
};

export default MainTabNavigator;
