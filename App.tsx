import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {Image, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {persistor, store} from "./src/redux/store.ts";
import MainTabNavigator from "./src/navigation/MainTabNavigator";
import NewJokeScreen from "./src/screens/NewJokeScreen.tsx";
import ArtInfoScreen from "./src/screens/ArtInfoScreen.tsx";
import QuizScreen from "./src/screens/QuizScreen.tsx";
// import BackgroundMusic from "./src/component/BackgroundMusic";

const Stack = createStackNavigator();

const backBtn = () => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={() => {navigation.goBack()}} style={{marginLeft: 16}}>
           <Image source={require('./src/assets/img/Component20.png')} />
        </TouchableOpacity>
        )
    }

export default function App() {

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <NavigationContainer>
                    <Stack.Navigator screenOptions={{
                        headerStyle: { backgroundColor: '#000000', height: 180 },
                        headerLeft: backBtn,
                        headerShadowVisible: false,
                    }}>
                        <Stack.Screen name="MainTab" component={MainTabNavigator} options={{ headerShown: false }} />
                        <Stack.Screen name="NewJokeScreen" component={NewJokeScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="ArtInfoScreen" component={ArtInfoScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="QuizScreen" component={QuizScreen} options={{ headerShown: false }} />
                    </Stack.Navigator>
                </NavigationContainer>
          </PersistGate>
         </Provider>
    );
}
