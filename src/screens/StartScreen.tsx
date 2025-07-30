import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    SafeAreaView,
    ImageBackground,
    ScrollView
} from 'react-native';

export default function StartScreen({ navigation }) {
    return (
        <ImageBackground
            source={require('../assets/img/0e2dac62064077cb5876e816dbde3e6de782b7dc.png')}
            resizeMode="cover"
            style={styles.background}
        >
            <SafeAreaView style={styles.safeArea}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <Text style={styles.title}>QUIZ</Text>
                    <Text style={styles.subtitle}>What kind of humorist are you?</Text>

                    <Image
                        source={require('../assets/img/Frame78.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />

                    <TouchableOpacity
                        style={styles.startButton}
                        onPress={() => navigation.navigate('QuizScreen')}
                    >
                        <Text style={styles.startText}>START</Text>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
            <View style={{marginBottom: 50}}/>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    safeArea: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 18,
        color: '#fff',
        marginBottom: 40,
        textAlign: 'center',
    },
    image: {
        width: '80%',
        height: 250,
        marginBottom: 40,
    },
    startButton: {
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 30,
        paddingVertical: 12,
        paddingHorizontal: 40,
        backgroundColor: 'rgba(255,255,255,0.1)',
    },
    startText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
});
