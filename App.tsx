import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

// Local Imports
import { persistor, store } from './src/redux/store';
import MainTabNavigator from './src/navigation/MainTabNavigator';
import NewJokeScreen from './src/screens/NewJokeScreen';
import ArtInfoScreen from './src/screens/ArtInfoScreen';
import QuizScreen from './src/screens/QuizScreen';

// Create a stack navigator instance
const Stack = createStackNavigator();

const App = () => {
    return (
        // Redux Provider to make the store available to all components
        <Provider store={store}>
            {/* PersistGate delays rendering until the persisted data has been rehydrated */}
            <PersistGate loading={null} persistor={persistor}>
                {/* NavigationContainer manages the navigation tree */}
                <NavigationContainer>
                    {/* Stack Navigator for screen transitions */}
                    <Stack.Navigator>
                        {/* Main tab navigation, typically at the base of the app */}
                        <Stack.Screen
                            name="MainTab"
                            component={MainTabNavigator}
                            options={{ headerShown: false }}
                        />
                        {/* Individual screens accessible from the stack */}
                        <Stack.Screen
                            name="NewJokeScreen"
                            component={NewJokeScreen}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="ArtInfoScreen"
                            component={ArtInfoScreen}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="QuizScreen"
                            component={QuizScreen}
                            options={{ headerShown: false }}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </PersistGate>
        </Provider>
    );
};

export default App;
