import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    ImageBackground,
    Image,
    ImageSourcePropType
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

// Define the type for each joke/article item
type Joke = {
    text: string;
    full: string;
    img: ImageSourcePropType;
};

// Define the props for the ArticlesScreen component
type ArticlesScreenProps = {
    navigation: NativeStackNavigationProp<any>; // Replace `any` with your actual stack type if using typed navigation
    route: RouteProp<any, any>; // Optional if you're not using route params
};

// Data array of articles with short and full descriptions
const jokesData: Joke[] = [
    {
        text: "Why are we laughing? The Science of Humor.",
        full: 'An article that explains the scientific foundations of humor...',
        img: require('../assets/img/cb984b7d29e6cc101c50fefd38a3713cbfec60a0.jpg')
    },
    {
        text: "Types of humor: from puns to black humor.",
        full: 'An overview of different styles and types of humor...',
        img: require('../assets/img/e2356db41b177d9460c9d5f4247eaaba98beeebb.jpg')
    },
    {
        text: "Humor in different cultures: what is funny in one country may be offensive in another.",
        full: 'An exploration of how humor varies across cultures...',
        img: require('../assets/img/037c1e28cea38eca15fdc1f6819ecc9970d5f7c1.jpg')
    },
    {
        text: "How to develop a sense of humor: practical tips and exercises.",
        full: 'An article with tips on how to improve your sense of humor...',
        img: require('../assets/img/728886c08bc74051d0409e0136c558d9be63ea1d.jpg')
    },
    {
        text: "The history of humor: from antiquity to the present day.",
        full: 'An overview of the evolution of humor throughout history...',
        img: require('../assets/img/0fedf3d1861624aa4f32eaa6fdaff1dd1cd0b7e5.jpg')
    }
];

const ArticlesScreen: React.FC<ArticlesScreenProps> = ({ navigation }) => {
    // Local state for selected category (not currently used)
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    return (
        <ImageBackground
            source={require('../assets/img/0e2dac62064077cb5876e816dbde3e6de782b7dc.png')} // Background image
            resizeMode="cover"
            style={styles.background}
        >
            {/* Semi-transparent overlay to darken background */}
            <View style={styles.overlay}>
                <Text style={styles.header}>Collection of articles</Text>

                {/* Scrollable list of articles */}
                <ScrollView contentContainerStyle={styles.jokesContainer}>
                    {jokesData.map((joke, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.jokeCard}
                            onPress={() => navigation.navigate('ArtInfoScreen')} // Navigation to article info screen
                        >
                            <Text style={styles.jokeText}>{joke.text}</Text>
                            <Image source={require('../assets/img/Component22.png')} />
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        </ImageBackground>
    );
};

// StyleSheet for the component
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#450000',
        paddingTop: 60,
        flex: 1,
        paddingHorizontal: 16,
    },
    background: {
        flex: 1,
    },
    overlay: {
        flex: 1,
        // backgroundColor: 'rgba(0, 0, 0, 0.8)', // Dark overlay
        paddingTop: 60,
        paddingHorizontal: 16,
    },
    header: {
        fontSize: 78,
        color: '#fff',
        fontWeight: 'bold',
        fontFamily: 'AmaticSC-Bold',
        alignSelf: 'center',
        marginBottom: 16,
        textAlign: 'center',
    },
    jokesContainer: {
        paddingBottom: 80,
    },
    jokeCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)', // Transparent white
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
