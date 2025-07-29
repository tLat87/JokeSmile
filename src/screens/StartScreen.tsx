import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image, SafeAreaView, ImageBackground} from 'react-native';

export default function StartScreen({ navigation }) {
    return (
        <ImageBackground
            source={require('../assets/img/0e2dac62064077cb5876e816dbde3e6de782b7dc.png')}
            resizeMode="cover"
            style={{ flex: 1,}}
        >
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>QUIZ</Text>
            <Text style={styles.subtitle}>What kind of humorist are you?</Text>

             <Image source={require('../assets/img/Frame78.png')} style={styles.image} />

            <TouchableOpacity style={styles.startButton} onPress={()=>{navigation.navigate('QuizScreen')}}>
                <Text style={styles.startText}>START</Text>
            </TouchableOpacity>
        </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        marginTop: 100,
    },
    title: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 18,
        color: '#fff',
        marginBottom: 40,
        textAlign: 'center',
    },
    startButton: {
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 30,
        paddingVertical: 12,
        paddingHorizontal: 40,
    },
    startText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
});
