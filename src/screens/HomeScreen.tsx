import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    ImageBackground,
    Alert,
    Animated, // Added for animations
    Easing,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// NOTE: You'll need to install AsyncStorage
// Run: `npm install @react-native-async-storage/async-storage` or `yarn add @react-native-async-storage/async-storage`

type Joke = {
    id: string; // Added a unique ID for each joke
    text: string;
    category: string;
};

// Added unique IDs to each joke for reliable storage
const jokesData: Joke[] = [
    { id: '1', text: "Life is like a photograph. To get a good picture, sometimes you need to show negativity.", category: 'Life' },
    { id: '2', text: "What happens if you cross a vampire and a snowman? Frostbite and blood loss at the same time!", category: 'Short Puns' },
    { id: '3', text: "Love is when you let someone see all your files and they don't put viruses on you.", category: 'Relationships' },
    { id: '4', text: "I'm not lazy at work, I'm just in energy-saving mode.", category: 'Work' },
    { id: '5', text: "Age is just a number. But the big number already hints that it's time to sit down more often.", category: 'Life' },
    { id: '6', text: "Why do programmers always wear glasses? Because C#.", category: 'Short Puns' },
    { id: '7', text: "Relationships are like Wi-Fi: when there is a connection, you want to be silent and enjoy. When you're not, you're looking for a place to connect.", category: 'Relationships' },
    { id: '8', text: "Why does history have so many mistakes? Because it's constantly being rewritten.", category: 'Short Puns' },
    { id: '9', text: "Life is like riding a bike. To keep your balance, you need to constantly move forward... or at least stick to the steering wheel.", category: 'Life' },
    { id: '10', text: "My job is like coffee. I put up with her every morning.", category: 'Work' },
    { id: '11', text: "An ideal relationship is when you can laugh at memes together until morning.", category: 'Relationships' },
    { id: '12', text: "Why do scuba divers always dive backwards? So that you don't see the approaching shark with your face!", category: 'Short Puns' },
];

const categories: string[] = ['Life', 'Work', 'Relationships', 'Short Puns'];
const userTagCategories: string[] = ['Funny', 'Relatable', 'Saved']; // New, user-addable tags

const HomeScreen: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [jokeTags, setJokeTags] = useState<{ [key: string]: string[] }>({});
    const [taggingJokeId, setTaggingJokeId] = useState<string | null>(null);

    // Animated values for animations
    const jokesListOpacity = useRef(new Animated.Value(0)).current;
    const jokeScaleAnim = useRef(new Animated.Value(1)).current;
    const tagMenuAnim = useRef(new Animated.Value(0)).current;

    // --- AsyncStorage Logic ---
    useEffect(() => {
        const loadTags = async () => {
            try {
                const storedTags = await AsyncStorage.getItem('userJokeTags');
                if (storedTags) {
                    setJokeTags(JSON.parse(storedTags));
                }
            } catch (e) {
                console.error('Failed to load joke tags:', e);
            }
        };
        loadTags();
    }, []);

    useEffect(() => {
        const saveTags = async () => {
            try {
                await AsyncStorage.setItem('userJokeTags', JSON.stringify(jokeTags));
            } catch (e) {
                console.error('Failed to save joke tags:', e);
            }
        };
        saveTags();
    }, [jokeTags]);

    // Animate jokes list on mount or filter change
    useEffect(() => {
        Animated.timing(jokesListOpacity, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
        }).start();
    }, [selectedCategory]);

    // Animate tag menu visibility
    useEffect(() => {
        Animated.timing(tagMenuAnim, {
            toValue: taggingJokeId ? 1 : 0,
            duration: 300,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
        }).start();
    }, [taggingJokeId]);


    // --- Functionality to manage tags ---
    const addTagToJoke = (jokeId: string, tag: string) => {
        setJokeTags(prevTags => {
            const currentTags = prevTags[jokeId] || [];
            if (!currentTags.includes(tag)) {
                return {
                    ...prevTags,
                    [jokeId]: [...currentTags, tag],
                };
            }
            return prevTags;
        });
        setTaggingJokeId(null);
    };

    const removeTagFromJoke = (jokeId: string, tag: string) => {
        Alert.alert(
            'Remove Tag',
            `Are you sure you want to remove the tag "${tag}"?`,
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Remove',
                    onPress: () => {
                        setJokeTags(prevTags => {
                            const currentTags = prevTags[jokeId] || [];
                            const updatedTags = currentTags.filter(t => t !== tag);
                            return {
                                ...prevTags,
                                [jokeId]: updatedTags,
                            };
                        });
                    },
                    style: 'destructive',
                },
            ]
        );
    };

    const filteredJokes: Joke[] = selectedCategory
        ? jokesData.filter(joke => joke.category === selectedCategory)
        : jokesData;

    // Animation functions for filter buttons
    const handlePressIn = () => {
        Animated.spring(jokeScaleAnim, {
            toValue: 0.95,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(jokeScaleAnim, {
            toValue: 1,
            friction: 3,
            tension: 40,
            useNativeDriver: true,
        }).start();
    };

    const handleCategoryPress = (category: string) => {
        setSelectedCategory(category === selectedCategory ? null : category);
        // Reset animation state for jokes list
        jokesListOpacity.setValue(0);
    };

    return (
        <ImageBackground
            source={require('../assets/img/0e2dac62064077cb5876e816dbde3e6de782b7dc.png')}
            resizeMode="cover"
            style={styles.background}
        >
            <View style={styles.darkOverlay} />

            <View style={styles.container}>
                <Text style={styles.header}>JOKE FEED</Text>

                <View style={styles.filterContainer}>
                    {categories.map((category: string) => (
                        <Animated.View
                            key={category}
                            style={{ transform: [{ scale: selectedCategory === category ? 1.05 : 1 }] }}
                        >
                            <TouchableOpacity
                                style={[
                                    styles.filterButton,
                                    selectedCategory === category && styles.activeFilterButton
                                ]}
                                onPress={() => handleCategoryPress(category)}
                            >
                                <Text style={styles.filterText}>{category}</Text>
                            </TouchableOpacity>
                        </Animated.View>
                    ))}
                </View>

                <ScrollView contentContainerStyle={styles.jokesList}>
                    {filteredJokes.map((joke: Joke, index) => (
                        <Animated.View
                            key={joke.id}
                            style={[
                                styles.jokeCard,
                                {
                                    opacity: jokesListOpacity,
                                    transform: [
                                        { translateY: jokesListOpacity.interpolate({
                                                inputRange: [0, 1],
                                                outputRange: [50, 0], // Starts 50px below and moves up
                                            })},
                                        { scale: joke.id === taggingJokeId ? jokeScaleAnim : 1 }
                                    ]
                                }
                            ]}
                        >
                            <Text style={styles.jokeText}>{joke.text}</Text>
                            <View style={styles.jokeCardActions}>
                                <View style={styles.tagDisplayContainer}>
                                    {(jokeTags[joke.id] || []).map(tag => (
                                        <TouchableOpacity key={tag} style={styles.tag} onPress={() => removeTagFromJoke(joke.id, tag)}>
                                            <Text style={styles.tagText}>{tag}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>

                                <TouchableOpacity
                                    style={styles.addTagButton}
                                    onPressIn={handlePressIn}
                                    onPressOut={handlePressOut}
                                    onPress={() => setTaggingJokeId(joke.id)}
                                >
                                    <Text style={styles.addTagText}>+</Text>
                                </TouchableOpacity>

                                {taggingJokeId === joke.id && (
                                    <Animated.View
                                        style={[
                                            styles.tagPickerMenu,
                                            {
                                                opacity: tagMenuAnim,
                                                transform: [{ scale: tagMenuAnim.interpolate({
                                                        inputRange: [0, 1],
                                                        outputRange: [0.8, 1],
                                                    })}]
                                            }
                                        ]}
                                    >
                                        {userTagCategories.map(tag => (
                                            <TouchableOpacity
                                                key={tag}
                                                style={styles.tagPickerItem}
                                                onPress={() => addTagToJoke(joke.id, tag)}
                                            >
                                                <Text style={styles.tagPickerText}>{tag}</Text>
                                            </TouchableOpacity>
                                        ))}
                                    </Animated.View>
                                )}
                            </View>
                        </Animated.View>
                    ))}
                </ScrollView>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    darkOverlay: {
        ...StyleSheet.absoluteFillObject,
        // backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    container: {
        flex: 1,
        paddingTop: 60,
        paddingHorizontal: 20,
    },
    header: {
        fontSize: 48,
        color: '#fff',
        fontWeight: 'bold',
        fontFamily: 'AmaticSC-Bold',
        alignSelf: 'center',
        marginBottom: 24,
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 5,
    },
    filterContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 20,
    },
    filterButton: {
        backgroundColor: '#6A0505',
        paddingVertical: 8,
        paddingHorizontal: 18,
        borderRadius: 25,
        margin: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
    },
    activeFilterButton: {
        backgroundColor: '#9A1717',
        borderColor: '#E6B34A',
        borderWidth: 2,
    },
    filterText: {
        color: '#E0E0E0',
        fontSize: 14,
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    jokesList: {
        paddingBottom: 100,
    },
    jokeCard: {
        backgroundColor: '#4A0404',
        padding: 20,
        borderRadius: 15,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
        elevation: 12,
    },
    jokeText: {
        color: '#E0E0E0',
        fontSize: 18,
        lineHeight: 26,
        marginBottom: 10,
    },
    jokeCardActions: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        justifyContent: 'space-between',
    },
    tagDisplayContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        flexShrink: 1,
        marginRight: 10,
    },
    tag: {
        backgroundColor: '#7A0909',
        borderRadius: 12,
        paddingHorizontal: 10,
        paddingVertical: 4,
        marginRight: 6,
        marginBottom: 6,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 4,
    },
    tagText: {
        color: '#E6B34A',
        fontSize: 12,
        fontWeight: 'bold',
    },
    addTagButton: {
        backgroundColor: '#E6B34A',
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 'auto',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 6,
    },
    addTagText: {
        color: '#4A0404',
        fontSize: 20,
        lineHeight: 20,
    },
    tagPickerMenu: {
        position: 'absolute',
        right: 0,
        bottom: 40, // Position menu above the button
        backgroundColor: '#6A0505',
        borderRadius: 10,
        padding: 8,
        zIndex: 99,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
    },
    tagPickerItem: {
        paddingVertical: 8,
        paddingHorizontal: 12,
    },
    tagPickerText: {
        color: '#E6B34A',
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default HomeScreen;
