import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    Switch,
    TouchableOpacity,
    StyleSheet,
    ImageBackground,
    Alert
} from 'react-native';
import { useDispatch } from 'react-redux';
import { deleteAll } from '../redux/slices/jokeSlice';

export default function SettingsScreen() {
    const [remindersEnabled, setRemindersEnabled] = useState(true);
    const dispatch = useDispatch();

    const toggleSwitch = () => setRemindersEnabled(prev => !prev);

    const handleClearHistory = () => {
        dispatch(deleteAll());
        Alert.alert("Success", "You have deleted the entire history.");
    };

    return (
        <ImageBackground
            source={require('../assets/img/0e2dac62064077cb5876e816dbde3e6de782b7dc.png')}
            style={styles.background}
            resizeMode="cover"
        >
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>SETTINGS</Text>

                <TouchableOpacity style={styles.optionButton} onPress={handleClearHistory}>
                    <Text style={styles.optionText}>Clearing history</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.optionButton}>
                    <Text style={styles.optionText}>Privacy Policy and Terms of Use</Text>
                </TouchableOpacity>

                {/*<TouchableOpacity style={styles.optionButton}>*/}
                {/*    <Text style={styles.optionText}>The "About the Developer" section</Text>*/}
                {/*</TouchableOpacity>*/}
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    container: {
        flex: 1,
        marginHorizontal: 20,
        padding: 24,
    },
    title: {
        fontSize: 32,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 40,
    },
    optionButton: {
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 24,
        padding: 16,
        marginBottom: 16,
    },
    optionText: {
        color: '#fff',
        fontSize: 16,
    },
});
