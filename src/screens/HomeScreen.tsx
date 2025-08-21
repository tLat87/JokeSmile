import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    ImageBackground,
    Alert,
    Animated,
    Easing,
    Modal,
    Dimensions,
    StatusBar,
    Share,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

type Joke = {
    id: string;
    text: string;
    category: string;
    likes: number;
    isLiked: boolean;
};

const jokesData: Joke[] = [
    { id: '1', text: "Life is like a photograph. To get a good picture, sometimes you need to show negativity.", category: 'Life', likes: 42, isLiked: false },
    { id: '2', text: "What happens if you cross a vampire and a snowman? Frostbite and blood loss at the same time!", category: 'Short Puns', likes: 38, isLiked: false },
    { id: '3', text: "Love is when you let someone see all your files and they don't put viruses on you.", category: 'Relationships', likes: 55, isLiked: false },
    { id: '4', text: "I'm not lazy at work, I'm just in energy-saving mode.", category: 'Work', likes: 67, isLiked: false },
    { id: '5', text: "Age is just a number. But the big number already hints that it's time to sit down more often.", category: 'Life', likes: 29, isLiked: false },
    { id: '6', text: "Why do programmers always wear glasses? Because C#.", category: 'Short Puns', likes: 73, isLiked: false },
    { id: '7', text: "Relationships are like Wi-Fi: when there is a connection, you want to be silent and enjoy. When you're not, you're looking for a place to connect.", category: 'Relationships', likes: 48, isLiked: false },
    { id: '8', text: "Why does history have so many mistakes? Because it's constantly being rewritten.", category: 'Short Puns', likes: 31, isLiked: false },
    { id: '9', text: "Life is like riding a bike. To keep your balance, you need to constantly move forward... or at least stick to the steering wheel.", category: 'Life', likes: 44, isLiked: false },
    { id: '10', text: "My job is like coffee. I put up with her every morning.", category: 'Work', likes: 52, isLiked: false },
    { id: '11', text: "An ideal relationship is when you can laugh at memes together until morning.", category: 'Relationships', likes: 61, isLiked: false },
    { id: '12', text: "Why do scuba divers always dive backwards? So that you don't see the approaching shark with your face!", category: 'Short Puns', likes: 39, isLiked: false },
];

const categories: string[] = ['All', 'Life', 'Work', 'Relationships', 'Short Puns'];
const userTagCategories: string[] = ['Funny', 'Relatable', 'Saved', 'Shareable'];

const HomeScreen: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [jokeTags, setJokeTags] = useState<{ [key: string]: string[] }>({});
    const [taggingJokeId, setTaggingJokeId] = useState<string | null>(null);
    const [score, setScore] = useState(0);
    const [quizQuestion, setQuizQuestion] = useState<{question: string, options: string[], answer: string} | null>(null);
    const [quizVisible, setQuizVisible] = useState(false);
    const [jokes, setJokes] = useState<Joke[]>(jokesData);
    const [showDailyChallenge, setShowDailyChallenge] = useState(true);

    const jokesListOpacity = useRef(new Animated.Value(0)).current;
    const jokeScaleAnim = useRef(new Animated.Value(1)).current;
    const tagMenuAnim = useRef(new Animated.Value(0)).current;
    const challengeAnim = useRef(new Animated.Value(0)).current;
    const headerAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const loadData = async () => {
            try {
                const storedTags = await AsyncStorage.getItem('userJokeTags');
                if (storedTags) setJokeTags(JSON.parse(storedTags));
                const storedScore = await AsyncStorage.getItem('userScore');
                if (storedScore) setScore(parseInt(storedScore, 10));
                const storedJokes = await AsyncStorage.getItem('userJokes');
                if (storedJokes) setJokes(JSON.parse(storedJokes));
            } catch (e) {
                console.error(e);
            }
        };
        loadData();
        
        // Appearance animation
        Animated.parallel([
            Animated.timing(headerAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(challengeAnim, {
                toValue: 1,
                duration: 800,
                delay: 300,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    useEffect(() => {
        AsyncStorage.setItem('userJokeTags', JSON.stringify(jokeTags));
    }, [jokeTags]);

    useEffect(() => {
        AsyncStorage.setItem('userScore', score.toString());
    }, [score]);

    useEffect(() => {
        AsyncStorage.setItem('userJokes', JSON.stringify(jokes));
    }, [jokes]);

    useEffect(() => {
        Animated.timing(jokesListOpacity, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
        }).start();
    }, [selectedCategory]);

    useEffect(() => {
        Animated.timing(tagMenuAnim, {
            toValue: taggingJokeId ? 1 : 0,
            duration: 300,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
        }).start();
    }, [taggingJokeId]);

    const addTagToJoke = (jokeId: string, tag: string) => {
        setJokeTags(prevTags => {
            const currentTags = prevTags[jokeId] || [];
            if (!currentTags.includes(tag)) {
                return { ...prevTags, [jokeId]: [...currentTags, tag] };
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
                { text: 'Cancel', style: 'cancel' },
                { text: 'Remove', onPress: () => {
                        setJokeTags(prevTags => {
                            const updatedTags = (prevTags[jokeId] || []).filter(t => t !== tag);
                            return { ...prevTags, [jokeId]: updatedTags };
                        });
                    }, style: 'destructive' }
            ]
        );
    };

    const toggleLike = (jokeId: string) => {
        setJokes(prevJokes => 
            prevJokes.map(joke => 
                joke.id === jokeId 
                    ? { ...joke, isLiked: !joke.isLiked, likes: joke.isLiked ? joke.likes - 1 : joke.likes + 1 }
                    : joke
            )
        );
    };

    const shareJoke = async (joke: Joke) => {
        try {
            await Share.share({
                message: `${joke.text}\n\nShared from JokeSmile app! 😄`,
                title: 'Check out this joke!',
            });
        } catch (error) {
            console.error('Error sharing joke:', error);
        }
    };

    const filteredJokes: Joke[] = selectedCategory === 'All' 
        ? jokes 
        : jokes.filter(joke => joke.category === selectedCategory);

    const handlePressIn = () => {
        Animated.spring(jokeScaleAnim, { toValue: 0.95, useNativeDriver: true }).start();
    };

    const handlePressOut = () => {
        Animated.spring(jokeScaleAnim, { toValue: 1, friction: 3, tension: 40, useNativeDriver: true }).start();
    };

    const handleCategoryPress = (category: string) => {
        setSelectedCategory(category);
        jokesListOpacity.setValue(0);
    };

    const generateQuiz = () => {
        const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
        const words = randomJoke.text.split(" ");
        if (words.length < 3) return;
        const missingWord = words[2];
        const question = randomJoke.text.replace(missingWord, "_____");
        const options = [missingWord, "banana", "coffee", "cat"].sort(() => Math.random() - 0.5);
        setQuizQuestion({ question, options, answer: missingWord });
        setQuizVisible(true);
    };

    const checkAnswer = (option: string) => {
        if (option === quizQuestion?.answer) {
            Alert.alert("Right!", "+10 points");
            setScore(prev => prev + 10);
        } else {
            Alert.alert("Wrong!", "Try tomorrow");
        }
        setQuizVisible(false);
    };

    const dismissChallenge = () => {
        Animated.timing(challengeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start(() => setShowDailyChallenge(false));
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#2C0000" />
            
            <Animated.View 
                style={[
                    styles.header,
                    {
                        opacity: headerAnim,
                        transform: [{ translateY: headerAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [-50, 0]
                        })}]
                    }
                ]}
            >
                <Text style={styles.headerTitle}>JOKE FEED</Text>
                <View style={styles.scoreContainer}>
                    <Text style={styles.scoreText}>🎯 {score}</Text>
                </View>
            </Animated.View>

            {showDailyChallenge && (
                <Animated.View 
                    style={[
                        styles.dailyChallenge,
                        {
                            opacity: challengeAnim,
                            transform: [{ scale: challengeAnim }]
                        }
                    ]}
                >
                    <View style={styles.challengeContent}>
                        <Text style={styles.challengeTitle}>🎲 Daily Challenge</Text>
                        <Text style={styles.challengeText}>Complete today's quiz and earn points!</Text>
                        <TouchableOpacity onPress={generateQuiz} style={styles.challengeButton}>
                            <Text style={styles.challengeButtonText}>Start Quiz</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={dismissChallenge} style={styles.dismissButton}>
                        <Text style={styles.dismissText}>✕</Text>
                    </TouchableOpacity>
                </Animated.View>
            )}

            <View style={styles.filterContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
                    {categories.map(category => (
                        <TouchableOpacity
                            key={category}
                            style={[
                                styles.filterButton,
                                selectedCategory === category && styles.activeFilterButton
                            ]}
                            onPress={() => handleCategoryPress(category)}
                        >
                            <Text style={[
                                styles.filterText,
                                selectedCategory === category && styles.activeFilterText
                            ]}>
                                {category}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <ScrollView 
                contentContainerStyle={styles.jokesList}
                showsVerticalScrollIndicator={false}
            >
                {filteredJokes.map((joke, index) => (
                    <Animated.View
                        key={joke.id}
                        style={[
                            styles.jokeCard,
                            {
                                opacity: jokesListOpacity,
                                transform: [
                                    { 
                                        translateY: jokesListOpacity.interpolate({ 
                                            inputRange: [0, 1], 
                                            outputRange: [50, 0] 
                                        }) 
                                    },
                                    { scale: joke.id === taggingJokeId ? jokeScaleAnim : 1 }
                                ]
                            }
                        ]}
                    >
                        <View style={styles.jokeHeader}>
                            <Text style={styles.jokeCategory}>{joke.category}</Text>
                            <View style={styles.jokeStats}>
                                <TouchableOpacity 
                                    style={styles.likeButton} 
                                    onPress={() => toggleLike(joke.id)}
                                >
                                    <Text style={[
                                        styles.likeIcon,
                                        joke.isLiked && styles.likedIcon
                                    ]}>
                                        {joke.isLiked ? '❤️' : '🤍'}
                                    </Text>
                                    <Text style={styles.likeCount}>{joke.likes}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    style={styles.shareButton} 
                                    onPress={() => shareJoke(joke)}
                                >
                                    <Text style={styles.shareIcon}>📤</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <Text style={styles.jokeText}>{joke.text}</Text>

                        <View style={styles.jokeFooter}>
                            <View style={styles.tagDisplayContainer}>
                                {(jokeTags[joke.id] || []).map(tag => (
                                    <TouchableOpacity 
                                        key={tag} 
                                        style={styles.tag} 
                                        onPress={() => removeTagFromJoke(joke.id, tag)}
                                    >
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
                                <Animated.View style={[
                                    styles.tagPickerMenu, 
                                    { 
                                        opacity: tagMenuAnim, 
                                        transform: [{ 
                                            scale: tagMenuAnim.interpolate({ 
                                                inputRange: [0, 1], 
                                                outputRange: [0.8, 1] 
                                            }) 
                                        }] 
                                    }
                                ]}>
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

            <Modal visible={quizVisible} transparent animationType="fade">
                <View style={styles.quizModal}>
                    <View style={styles.quizContainer}>
                        <Text style={styles.quizTitle}>🎯 Daily Quiz</Text>
                        <Text style={styles.quizQuestion}>{quizQuestion?.question}</Text>
                        <View style={styles.quizOptions}>
                            {quizQuestion?.options.map(opt => (
                                <TouchableOpacity 
                                    key={opt} 
                                    style={styles.quizOption} 
                                    onPress={() => checkAnswer(opt)}
                                >
                                    <Text style={styles.quizOptionText}>{opt}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2C0000',
    },
    header: {
        paddingTop: 60,
        paddingHorizontal: 20,
        paddingBottom: 20,
        backgroundColor: 'rgba(44, 0, 0, 0.95)',
        borderBottomWidth: 1,
        borderBottomColor: '#E6B34A',
    },
    headerTitle: {
        fontSize: 42,
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontFamily: 'AmaticSC-Bold',
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 5,
        marginBottom: 15,
    },
    scoreContainer: {
        alignItems: 'center',
    },
    scoreText: {
        color: '#E6B34A',
        fontSize: 20,
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    dailyChallenge: {
        margin: 20,
        backgroundColor: 'rgba(230, 179, 74, 0.1)',
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#E6B34A',
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    challengeContent: {
        flex: 1,
    },
    challengeTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#E6B34A',
        marginBottom: 5,
    },
    challengeText: {
        fontSize: 14,
        color: '#E0E0E0',
        marginBottom: 10,
    },
    challengeButton: {
        backgroundColor: '#E6B34A',
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 15,
        alignSelf: 'flex-start',
    },
    challengeButtonText: {
        color: '#2C0000',
        fontWeight: 'bold',
        fontSize: 14,
    },
    dismissButton: {
        padding: 10,
    },
    dismissText: {
        color: '#E6B34A',
        fontSize: 18,
        fontWeight: 'bold',
    },
    filterContainer: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    filterScroll: {
        paddingHorizontal: 10,
    },
    filterButton: {
        backgroundColor: 'rgba(106, 5, 5, 0.8)',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 25,
        marginHorizontal: 8,
        borderWidth: 2,
        borderColor: 'transparent',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    activeFilterButton: {
        backgroundColor: 'rgba(154, 23, 23, 0.9)',
        borderColor: '#E6B34A',
        borderWidth: 2,
        transform: [{ scale: 1.05 }],
    },
    filterText: {
        color: '#E0E0E0',
        fontSize: 16,
        fontWeight: '600',
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    activeFilterText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    jokesList: {
        paddingHorizontal: 20,
        paddingBottom: 100,
    },
    jokeCard: {
        backgroundColor: 'rgba(74, 4, 4, 0.9)',
        padding: 20,
        borderRadius: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: 'rgba(230, 179, 74, 0.2)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        elevation: 15,
    },
    jokeHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    jokeCategory: {
        backgroundColor: 'rgba(230, 179, 74, 0.2)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 15,
        color: '#E6B34A',
        fontSize: 12,
        fontWeight: '600',
        borderWidth: 1,
        borderColor: 'rgba(230, 179, 74, 0.3)',
    },
    jokeStats: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    likeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        backgroundColor: 'rgba(106, 5, 5, 0.5)',
    },
    likeIcon: {
        fontSize: 16,
        marginRight: 5,
    },
    likedIcon: {
        transform: [{ scale: 1.1 }],
    },
    likeCount: {
        color: '#E0E0E0',
        fontSize: 14,
        fontWeight: '600',
    },
    shareButton: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        backgroundColor: 'rgba(106, 5, 5, 0.5)',
    },
    shareIcon: {
        fontSize: 16,
    },
    jokeText: {
        color: '#FFFFFF',
        fontSize: 18,
        lineHeight: 26,
        marginBottom: 20,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    jokeFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    tagDisplayContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        flexShrink: 1,
        marginRight: 15,
    },
    tag: {
        backgroundColor: 'rgba(122, 9, 9, 0.8)',
        borderRadius: 15,
        paddingHorizontal: 12,
        paddingVertical: 6,
        marginRight: 8,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: 'rgba(230, 179, 74, 0.3)',
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 6,
    },
    tagText: {
        color: '#E6B34A',
        fontSize: 12,
        fontWeight: '600',
    },
    addTagButton: {
        backgroundColor: '#E6B34A',
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 6,
        elevation: 8,
    },
    addTagText: {
        color: '#2C0000',
        fontSize: 22,
        fontWeight: 'bold',
        lineHeight: 22,
    },
    tagPickerMenu: {
        position: 'absolute',
        right: 0,
        bottom: 50,
        backgroundColor: 'rgba(106, 5, 5, 0.95)',
        borderRadius: 15,
        padding: 12,
        zIndex: 99,
        borderWidth: 1,
        borderColor: 'rgba(230, 179, 74, 0.3)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
        elevation: 12,
    },
    tagPickerItem: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        marginBottom: 5,
        backgroundColor: 'rgba(74, 4, 4, 0.8)',
    },
    tagPickerText: {
        color: '#E6B34A',
        fontSize: 14,
        fontWeight: '600',
    },
    quizModal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.8)',
    },
    quizContainer: {
        backgroundColor: 'rgba(74, 4, 4, 0.95)',
        padding: 30,
        borderRadius: 25,
        width: '85%',
        borderWidth: 2,
        borderColor: '#E6B34A',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.5,
        shadowRadius: 15,
        elevation: 20,
    },
    quizTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#E6B34A',
        textAlign: 'center',
        marginBottom: 20,
    },
    quizQuestion: {
        color: '#FFFFFF',
        fontSize: 18,
        marginBottom: 25,
        textAlign: 'center',
        lineHeight: 26,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    quizOptions: {
        gap: 12,
    },
    quizOption: {
        backgroundColor: 'rgba(106, 5, 5, 0.8)',
        padding: 15,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: 'rgba(230, 179, 74, 0.2)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 8,
    },
    quizOptionText: {
        color: '#E0E0E0',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
});

export default HomeScreen;
