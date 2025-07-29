import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    ImageBackground,
    Image
} from 'react-native';

// Define the type for a single joke item
type Joke = {
    text: string;
    category: string;
};

// Static list of jokes with categories
const jokesData: Joke[] = [
    { text: "Life is like a photograph. To get a good picture, sometimes you need to show negativity.", category: 'Life' },
    { text: "What happens if you cross a vampire and a snowman? Frostbite and blood loss at the same time!", category: 'Short Puns' },
    { text: "Love is when you let someone see all your files and they don't put viruses on you.", category: 'Relationships' },
    { text: "I'm not lazy at work, I'm just in energy-saving mode.", category: 'Work' },
    { text: "Age is just a number. But the big number already hints that it's time to sit down more often.", category: 'Life' },
    { text: "Why do programmers always wear glasses? Because C#.", category: 'Short Puns' },
    { text: "Relationships are like Wi-Fi: when there is a connection, you want to be silent and enjoy. When you're not, you're looking for a place to connect.", category: 'Relationships' },
    { text: "Why does history have so many mistakes? Because it's constantly being rewritten.", category: 'Short Puns' },
    { text: "Life is like riding a bike. To keep your balance, you need to constantly move forward... or at least stick to the steering wheel.", category: 'Life' },
    { text: "My job is like coffee. I put up with her every morning.", category: 'Work' },
    { text: "An ideal relationship is when you can laugh at memes together until morning.", category: 'Relationships' },
    { text: "Why do scuba divers always dive backwards? So that you don't see the approaching shark with your face!", category: 'Short Puns' },
];

// List of categories used for filtering
const categories: string[] = ['Life', 'Work', 'Relationships', 'Short Puns'];

const HomeScreen: React.FC = () => {
    // Local state to store selected category
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    // Filter jokes based on the selected category
    const filteredJokes = selectedCategory
        ? jokesData.filter(joke => joke.category === selectedCategory)
        : jokesData;

    return (
        <ImageBackground
            source={require('../assets/img/0e2dac62064077cb5876e816dbde3e6de782b7dc.png')} // Background image
            resizeMode="cover"
            style={styles.background}
        >
            {/* Overlay with content */}
            <View style={styles.overlay}>
                <Text style={styles.header}>JOKE FEED</Text>

                {/* Category filter buttons */}
                <View style={styles.filterContainer}>
                    {categories.map((category) => (
                        <TouchableOpacity
                            key={category}
                            style={[
                                styles.filterButton,
                                selectedCategory === category && styles.activeFilter
                            ]}
                            onPress={() =>
                                setSelectedCategory(category === selectedCategory ? null : category)
                            }
                        >
                            <Text style={styles.filterText}>{category}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Jokes list */}
                <ScrollView contentContainerStyle={styles.jokesContainer}>
                    {filteredJokes.map((joke, index) => (
                        <View key={index} style={styles.jokeCard}>
                            <Text style={styles.jokeText}>{joke.text}</Text>
                            <Image source={require('../assets/img/Component8.png')} />
                        </View>
                    ))}
                </ScrollView>
            </View>
        </ImageBackground>
    );
};

// Styles for the HomeScreen layout
const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    overlay: {
        flex: 1,
        // backgroundColor: 'rgba(0, 0, 0, 1)', // Full black overlay
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
    filterContainer: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    filterButton: {
        backgroundColor: '#700000',
        paddingVertical: 6,
        paddingHorizontal: 14,
        borderRadius: 20,
        height: 30,
        marginRight: 10,
    },
    activeFilter: {
        backgroundColor: '#ff5500',
    },
    filterText: {
        color: '#fff',
        fontSize: 14,
    },
    jokesContainer: {
        paddingBottom: 80,
    },
    jokeCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)', // Light transparent card
        padding: 16,
        flexDirection: 'row',
        borderRadius: 12,
        marginBottom: 12,
        alignItems: 'center',
    },
    jokeText: {
        color: '#fff',
        width: '85%',
        fontSize: 16,
    },
});

export default HomeScreen;
