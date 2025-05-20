import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    Switch,
    TouchableOpacity,
    StyleSheet,
    ImageBackground
} from 'react-native';

export default function SettingsScreen() {
    const [remindersEnabled, setRemindersEnabled] = useState(true);

    const toggleSwitch = () => setRemindersEnabled(previous => !previous);

    return (
        <ImageBackground
            source={require('../assets/img/0e2dac62064077cb5876e816dbde3e6de782b7dc.png')}
            style={styles.background}
            resizeMode="cover"
        >
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>SETTINGS</Text>


                <TouchableOpacity style={styles.optionButton}>
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
    optionRow: {
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 24,
        padding: 16,
        marginBottom: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    switchLabel: {
        color: '#0f0',
        marginLeft: 8,
        fontWeight: 'bold',
    },
});
