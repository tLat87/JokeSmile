import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet,
    Dimensions,
    ImageBackground,
    TouchableOpacity,
    Alert,
    Modal
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type ArtInfoScreenProps = {
    navigation: NativeStackNavigationProp<any>;
};

// Simulated points system
let userPoints = 0;

const ArtInfoScreen: React.FC<ArtInfoScreenProps> = ({ navigation }) => {
    const [quizVisible, setQuizVisible] = useState(false);

    const checkAnswer = (isCorrect: boolean) => {
        if (isCorrect) {
            userPoints += 10;
            Alert.alert("✅ Correct!", "You earned +10 points!\nTotal points: " + userPoints);
        } else {
            Alert.alert("❌ Wrong", "Try reading the text more carefully.");
        }
        setQuizVisible(false);
    };

    return (
        <ImageBackground
            source={require('../assets/img/0e2dac62064077cb5876e816dbde3e6de782b7dc.png')}
            resizeMode="cover"
            style={{ flex: 1 }}
        >
            <SafeAreaView style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollContent}>

                    {/* Top bar */}
                    <View style={styles.headerRow}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Image source={require('../assets/img/Component20.png')} />
                        </TouchableOpacity>
                    </View>

                    {/* Title */}
                    <Text style={styles.quote}>
                        "HUMOR IN DIFFERENT CULTURES: WHAT IS FUNNY IN ONE COUNTRY MAY BE OFFENSIVE IN ANOTHER."
                    </Text>

                    {/* Image */}
                    <View style={styles.imageGrid}>
                        <Image
                            source={require('../assets/img/e2356db41b177d9460c9d5f4247eaaba98beeebb.jpg')}
                            style={styles.image}
                        />
                    </View>

                    {/* Article text */}
                    <Text style={styles.text}>
                        An exploration of how humor varies across cultures. What topics are taboo in different
                        countries? How do history and traditions influence what is considered funny? Examples of
                        cross-cultural errors in humor.{"\n\n"}
                        Humor is a reflection of culture. A joke that causes laughter in one country may be
                        incomprehensible or even offensive in another. For example, in some cultures it is
                        customary to ridicule politicians, while in others it is considered unacceptable. Sarcasm
                        is appreciated in some countries, while bluntness is appreciated in others. Ignorance of
                        cultural peculiarities can lead to misunderstandings and conflicts. Find out how humor
                        varies in different parts of the world, and avoid awkward situations!
                    </Text>

                    {/* Quiz button */}
                    <TouchableOpacity
                        style={styles.quizButton}
                        onPress={() => setQuizVisible(true)}
                    >
                        <Text style={styles.quizButtonText}>Check Yourself</Text>
                    </TouchableOpacity>
                </ScrollView>

                {/* Quiz Modal */}
                <Modal
                    visible={quizVisible}
                    transparent={true}
                    animationType="fade"
                    onRequestClose={() => setQuizVisible(false)}
                >
                    <View style={styles.modalBackground}>
                        <View style={styles.modalContainer}>
                            <Text style={styles.quizTitle}>Let’s see how well you read!</Text>
                            <Text style={styles.quizQuestion}>
                                ❓ In some countries, mocking politicians is considered...
                            </Text>

                            <TouchableOpacity
                                style={[styles.answerButton, styles.answerCorrect]}
                                activeOpacity={0.8}
                                onPress={() => checkAnswer(true)}
                            >
                                <Text style={styles.answerText}>Unacceptable</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.answerButton, styles.answerWrong]}
                                activeOpacity={0.8}
                                onPress={() => checkAnswer(false)}
                            >
                                <Text style={styles.answerText}>Mandatory</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.closeButton}
                                activeOpacity={0.7}
                                onPress={() => setQuizVisible(false)}
                            >
                                <Text style={styles.closeText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

            </SafeAreaView>
        </ImageBackground>
    );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: { flex: 1 },
    scrollContent: { padding: 16, alignItems: 'center' },
    headerRow: { flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center' },
    quote: { color: 'white', fontSize: 40, fontFamily: 'AmaticSC-Bold', textAlign: 'center', marginBottom: 16 },
    imageGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 8, marginBottom: 16 },
    image: { width: '100%', height: 250, borderRadius: 8 },
    text: { color: 'white', textAlign: 'center', fontFamily: 'AmaticSC-Bold', fontSize: 30 },
    quizButton: {
        backgroundColor: '#E6B34A',
        padding: 12,
        borderRadius: 10,
        marginTop: 20
    },
    quizButtonText: { color: '#4A0404', fontWeight: 'bold', fontSize: 18 },

    // Modal
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalContainer: {
        backgroundColor: '#FFF8E7',
        borderRadius: 20,
        padding: 25,
        width: '100%',
        maxWidth: 350,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 10,
        elevation: 10,
    },
    quizTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4A0404',
        marginBottom: 10,
        textAlign: 'center',
    },
    quizQuestion: {
        color: '#4A0404',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 20,
        lineHeight: 26,
    },
    answerButton: {
        paddingVertical: 12,
        borderRadius: 12,
        marginVertical: 6,
        width: '100%',
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 5,
        elevation: 3,
    },
    answerCorrect: {
        backgroundColor: '#E6B34A',
    },
    answerWrong: {
        backgroundColor: '#FF7F50',
    },
    answerText: {
        color: '#4A0404',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    closeButton: {
        marginTop: 15,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#ccc',
        borderRadius: 10,
    },
    closeText: {
        color: '#333',
        fontSize: 16,
        fontWeight: '600',
    }
});

export default ArtInfoScreen;
