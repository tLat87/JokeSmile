import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Local Imports
import { persistor, store } from './src/redux/store';
import OnboardingScreen from './src/screens/OnboardingScreen';
import MainTabNavigator from './src/navigation/MainTabNavigator';
import NewJokeScreen from './src/screens/NewJokeScreen';
import ArtInfoScreen from './src/screens/ArtInfoScreen';
import QuizScreen from './src/screens/QuizScreen';

// Create a stack navigator instance
const Stack = createStackNavigator();

const App = () => {
    const [hasSeenOnboarding, setHasSeenOnboarding] = useState<boolean | null>(null);

    useEffect(() => {
        checkOnboardingStatus();
    }, []);

    const checkOnboardingStatus = async () => {
        try {
            const onboardingComplete = await AsyncStorage.getItem('onboardingComplete');
            setHasSeenOnboarding(onboardingComplete === 'true');
        } catch (error) {
            console.error('Error checking onboarding status:', error);
            setHasSeenOnboarding(false);
        }
    };

    const handleOnboardingComplete = async () => {
        try {
            await AsyncStorage.setItem('onboardingComplete', 'true');
            setHasSeenOnboarding(true);
        } catch (error) {
            console.error('Error saving onboarding status:', error);
        }
    };

    if (hasSeenOnboarding === null) {
        // Show loading while checking status
        return null;
    }

    return (
        // Redux Provider to make the store available to all components
        <Provider store={store}>
            {/* PersistGate delays rendering until the persisted data has been rehydrated */}
            <PersistGate loading={null} persistor={persistor}>
                {/* NavigationContainer manages the navigation tree */}
                <NavigationContainer>
                    {/* Stack Navigator for screen transitions */}
                    <Stack.Navigator>
                        {!hasSeenOnboarding ? (
                            // Show onboarding if user hasn't seen it yet
                            <Stack.Screen
                                name="Onboarding"
                                options={{ headerShown: false }}
                            >
                                {() => <OnboardingScreen onComplete={handleOnboardingComplete} />}
                            </Stack.Screen>
                        ) : (
                            // Main app navigation
                            <>
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
                            </>
                        )}
                    </Stack.Navigator>
                </NavigationContainer>
            </PersistGate>
        </Provider>
    );
};

export default App;
