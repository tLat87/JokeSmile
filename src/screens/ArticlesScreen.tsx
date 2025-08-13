import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    ImageBackground,
    Image,
    ImageSourcePropType,
    Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

type Joke = {
    text: string;
    full: string;
    img: ImageSourcePropType;
    locked: boolean;
    price?: number; // цена открытия
};

type ArticlesScreenProps = {
    navigation: NativeStackNavigationProp<any>;
    route: RouteProp<any, any>;
};

const initialJokesData: Joke[] = [
    {
        text: "Why are we laughing? The Science of Humor.",
        full: 'An article that explains the scientific foundations of humor...',
        img: require('../assets/img/cb984b7d29e6cc101c50fefd38a3713cbfec60a0.jpg'),
        locked: false
    },
    {
        text: "Types of humor: from puns to black humor.",
        full: 'An overview of different styles and types of humor...',
        img: require('../assets/img/e2356db41b177d9460c9d5f4247eaaba98beeebb.jpg'),
        locked: true,
        price: 5
    },
    {
        text: "Humor in different cultures: what is funny in one country may be offensive in another.",
        full: 'An exploration of how humor varies across cultures...',
        img: require('../assets/img/037c1e28cea38eca15fdc1f6819ecc9970d5f7c1.jpg'),
        locked: true,
        price: 7
    },
    {
        text: "How to develop a sense of humor: practical tips and exercises.",
        full: 'An article with tips on how to improve your sense of humor...',
        img: require('../assets/img/728886c08bc74051d0409e0136c558d9be63ea1d.jpg'),
        locked: true,
        price: 10
    },
    {
        text: "The history of humor: from antiquity to the present day.",
        full: 'An overview of the evolution of humor throughout history...',
        img: require('../assets/img/0fedf3d1861624aa4f32eaa6fdaff1dd1cd0b7e5.jpg'),
        locked: true,
        price: 8
    }
];

const ArticlesScreen: React.FC<ArticlesScreenProps> = ({ navigation }) => {
    const [jokesData, setJokesData] = useState<Joke[]>(initialJokesData);
    const [userScore, setUserScore] = useState<number>(0);

    useEffect(() => {
        const loadScore = async () => {
            const storedScore = await AsyncStorage.getItem('userScore');
            if (storedScore) setUserScore(parseInt(storedScore, 10));
        };
        loadScore();
    }, []);

    const handlePress = (joke: Joke, index: number) => {
        if (!joke.locked) {
            navigation.navigate('ArtInfoScreen', { joke });
            return;
        }

        // Если статья закрыта — предлагаем купить
        if (joke.price !== undefined) {
            Alert.alert(
                "Article Locked",
                `Unlock for ${joke.price} points. You have ${userScore} points.`,
                [
                    { text: "Cancel", style: "cancel" },
                    {
                        text: "Buy",
                        onPress: async () => {
                            if (userScore >= (joke.price || 0)) {
                                const newScore = userScore - (joke.price || 0);
                                setUserScore(newScore);
                                await AsyncStorage.setItem('userScore', newScore.toString());

                                const updatedData = [...jokesData];
                                updatedData[index] = { ...joke, locked: false };
                                setJokesData(updatedData);

                                Alert.alert("Success", "Article unlocked!");
                            } else {
                                Alert.alert("Not enough points", "Take the quiz to earn more!");
                            }
                        }
                    }
                ]
            );
        }

    };

    return (
        <ImageBackground
            source={require('../assets/img/0e2dac62064077cb5876e816dbde3e6de782b7dc.png')}
            resizeMode="cover"
            style={styles.background}
        >
            <View style={styles.overlay}>
                <Text style={styles.header}>Collection of articles</Text>
                <Text style={styles.score}>Points: {userScore}</Text>

                <ScrollView contentContainerStyle={styles.jokesContainer}>
                    {jokesData.map((joke, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.jokeCard}
                            onPress={() => handlePress(joke, index)}
                        >
                            <Text style={styles.jokeText}>
                                {joke.locked ? `${joke.text} 🔒` : joke.text}
                            </Text>
                            <Image source={require('../assets/img/Component22.png')} />
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: { flex: 1 },
    overlay: {
        flex: 1,
        paddingTop: 60,
        paddingHorizontal: 16,
    },
    header: {
        fontSize: 48,
        color: '#fff',
        fontWeight: 'bold',
        fontFamily: 'AmaticSC-Bold',
        alignSelf: 'center',
        marginBottom: 8,
        textAlign: 'center',
    },
    score: {
        fontSize: 20,
        color: '#E6B34A',
        textAlign: 'center',
        marginBottom: 16
    },
    jokesContainer: {
        paddingBottom: 80,
    },
    jokeCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 16,
        padding: 14,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },
    jokeText: {
        color: '#fff',
        width: '85%',
        fontSize: 16,
    },
});

export default ArticlesScreen;
