import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    StatusBar,
    Animated,
    Dimensions,
    Alert,
    Share,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

interface SavedJoke {
    id: string;
    text: string;
    category: string;
    tags: string[];
    savedAt: string;
    likes: number;
}

const MyCollectionScreen: React.FC = () => {
    const [savedJokes, setSavedJokes] = useState<SavedJoke[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(50)).current;

    useEffect(() => {
        loadSavedJokes();
        
        // Appearance animation
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 800,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const loadSavedJokes = async () => {
        try {
            const storedTags = await AsyncStorage.getItem('userJokeTags');
            if (storedTags) {
                const tags = JSON.parse(storedTags);
                const jokes = Object.keys(tags).map(id => {
                    const jokeData = getJokeById(id);
                    return {
                        id,
                        text: jokeData.text,
                        category: jokeData.category,
                        tags: tags[id] || [],
                        savedAt: new Date().toISOString(),
                        likes: jokeData.likes || 0,
                    };
                });
                setSavedJokes(jokes);
            }
        } catch (error) {
            console.error('Error loading saved jokes:', error);
        }
    };

    const getJokeById = (id: string) => {
        // Here should be logic to get joke by ID
        // For demo purposes returning a placeholder
        return {
            text: "Sample joke text",
            category: "General",
            likes: 0,
        };
    };

    const removeJokeFromCollection = (jokeId: string) => {
        Alert.alert(
            'Remove Joke',
            'Are you sure you want to remove this joke from your collection?',
            [
                { text: 'Cancel', style: 'cancel' },
                { 
                    text: 'Remove', 
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            const storedTags = await AsyncStorage.getItem('userJokeTags');
                            if (storedTags) {
                                const tags = JSON.parse(storedTags);
                                delete tags[jokeId];
                                await AsyncStorage.setItem('userJokeTags', JSON.stringify(tags));
                                setSavedJokes(prev => prev.filter(joke => joke.id !== jokeId));
                            }
                        } catch (error) {
                            console.error('Error removing joke:', error);
                        }
                    }
                }
            ]
        );
    };

    const shareJoke = async (joke: SavedJoke) => {
        try {
            await Share.share({
                message: `${joke.text}\n\nShared from JokeSmile collection! 😄`,
                title: 'Check out this joke!',
            });
        } catch (error) {
            console.error('Error sharing joke:', error);
        }
    };

    const getAllTags = () => {
        const tags = new Set<string>();
        savedJokes.forEach(joke => {
            joke.tags.forEach(tag => tags.add(tag));
        });
        return Array.from(tags);
    };

    const filteredJokes = savedJokes.filter(joke => {
        const matchesSearch = joke.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            joke.category.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTags = selectedTags.length === 0 || 
                           selectedTags.some(tag => joke.tags.includes(tag));
        return matchesSearch && matchesTags;
    });

    const toggleTag = (tag: string) => {
        setSelectedTags(prev => 
            prev.includes(tag) 
                ? prev.filter(t => t !== tag)
                : [...prev, tag]
        );
    };

    const clearFilters = () => {
        setSelectedTags([]);
        setSearchQuery('');
    };

    const renderJokeCard = (joke: SavedJoke, index: number) => (
        <Animated.View
            key={joke.id}
            style={[
                viewMode === 'grid' ? styles.jokeCardGrid : styles.jokeCardList,
                {
                    opacity: fadeAnim,
                    transform: [{ translateY: slideAnim }],
                }
            ]}
        >
            <View style={styles.jokeHeader}>
                <View style={styles.jokeMeta}>
                    <Text style={styles.jokeCategory}>{joke.category}</Text>
                    <Text style={styles.jokeDate}>
                        {new Date(joke.savedAt).toLocaleDateString()}
                    </Text>
                </View>
                <View style={styles.jokeActions}>
                    <TouchableOpacity 
                        style={styles.actionButton} 
                        onPress={() => shareJoke(joke)}
                    >
                        <Text style={styles.actionIcon}>📤</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.actionButton, styles.deleteButton]} 
                        onPress={() => removeJokeFromCollection(joke.id)}
                    >
                        <Text style={styles.actionIcon}>🗑️</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <Text style={styles.jokeText} numberOfLines={viewMode === 'grid' ? 3 : undefined}>
                {joke.text}
            </Text>

            <View style={styles.tagsContainer}>
                {joke.tags.map(tag => (
                    <View key={tag} style={styles.tag}>
                        <Text style={styles.tagText}>{tag}</Text>
                    </View>
                ))}
            </View>

            <View style={styles.jokeFooter}>
                <Text style={styles.likesText}>❤️ {joke.likes}</Text>
                <Text style={styles.savedText}>💾 Saved</Text>
            </View>
        </Animated.View>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#2C0000" />
            
            <Animated.View 
                style={[
                    styles.header,
                    {
                        opacity: fadeAnim,
                        transform: [{ translateY: slideAnim }]
                    }
                ]}
            >
                <Text style={styles.headerTitle}>My Collection</Text>
                <Text style={styles.headerSubtitle}>
                    {savedJokes.length} saved jokes
                </Text>
            </Animated.View>

            <View style={styles.controlsContainer}>
                <View style={styles.searchContainer}>
                    <Text style={styles.searchIcon}>🔍</Text>
                    <Text style={styles.searchPlaceholder}>
                        {searchQuery || 'Search in collection...'}
                    </Text>
                </View>

                <View style={styles.viewToggle}>
                    <TouchableOpacity
                        style={[
                            styles.toggleButton,
                            viewMode === 'grid' && styles.activeToggleButton
                        ]}
                        onPress={() => setViewMode('grid')}
                    >
                        <Text style={[
                            styles.toggleText,
                            viewMode === 'grid' && styles.activeToggleText
                        ]}>
                            Grid
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.toggleButton,
                            viewMode === 'list' && styles.activeToggleButton
                        ]}
                        onPress={() => setViewMode('list')}
                    >
                        <Text style={[
                            styles.toggleText,
                            viewMode === 'list' && styles.activeToggleText
                        ]}>
                            List
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            {getAllTags().length > 0 && (
                <View style={styles.tagsFilterContainer}>
                    <ScrollView 
                        horizontal 
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.tagsFilterScroll}
                    >
                        {getAllTags().map(tag => (
                            <TouchableOpacity
                                key={tag}
                                style={[
                                    styles.filterTag,
                                    selectedTags.includes(tag) && styles.activeFilterTag
                                ]}
                                onPress={() => toggleTag(tag)}
                            >
                                <Text style={[
                                    styles.filterTagText,
                                    selectedTags.includes(tag) && styles.activeFilterTagText
                                ]}>
                                    {tag}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                    {selectedTags.length > 0 && (
                        <TouchableOpacity style={styles.clearFiltersButton} onPress={clearFilters}>
                            <Text style={styles.clearFiltersText}>Clear</Text>
                        </TouchableOpacity>
                    )}
                </View>
            )}

            {savedJokes.length === 0 ? (
                <Animated.View 
                    style={[
                        styles.emptyState,
                        {
                            opacity: fadeAnim,
                            transform: [{ scale: fadeAnim }]
                        }
                    ]}
                >
                    <Text style={styles.emptyStateIcon}>📚</Text>
                    <Text style={styles.emptyStateTitle}>Your collection is empty</Text>
                    <Text style={styles.emptyStateText}>
                        Start saving jokes to build your personal humor library!
                    </Text>
                </Animated.View>
            ) : (
                <ScrollView 
                    contentContainerStyle={[
                        styles.jokesContainer,
                        viewMode === 'grid' && styles.jokesGrid
                    ]}
                    showsVerticalScrollIndicator={false}
                >
                    {filteredJokes.map((joke, index) => renderJokeCard(joke, index))}
                </ScrollView>
            )}
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
        fontSize: 36,
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontFamily: 'AmaticSC-Bold',
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 5,
        marginBottom: 8,
    },
    headerSubtitle: {
        fontSize: 16,
        color: '#E6B34A',
        textAlign: 'center',
        fontWeight: '600',
    },
    controlsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: 'rgba(74, 4, 4, 0.3)',
        marginHorizontal: 20,
        marginTop: 20,
        borderRadius: 15,
    },
    searchContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(106, 5, 5, 0.5)',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginRight: 15,
    },
    searchIcon: {
        fontSize: 16,
        marginRight: 8,
    },
    searchPlaceholder: {
        color: '#E0E0E0',
        fontSize: 14,
        flex: 1,
    },
    viewToggle: {
        flexDirection: 'row',
        backgroundColor: 'rgba(106, 5, 5, 0.5)',
        borderRadius: 20,
        padding: 4,
    },
    toggleButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 16,
    },
    activeToggleButton: {
        backgroundColor: '#E6B34A',
    },
    toggleText: {
        color: '#E0E0E0',
        fontSize: 14,
        fontWeight: '600',
    },
    activeToggleText: {
        color: '#2C0000',
        fontWeight: 'bold',
    },
    tagsFilterContainer: {
        paddingHorizontal: 20,
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    tagsFilterScroll: {
        paddingRight: 15,
    },
    filterTag: {
        backgroundColor: 'rgba(106, 5, 5, 0.6)',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        marginRight: 10,
        borderWidth: 1,
        borderColor: 'rgba(230, 179, 74, 0.2)',
    },
    activeFilterTag: {
        backgroundColor: 'rgba(230, 179, 74, 0.3)',
        borderColor: '#E6B34A',
    },
    filterTagText: {
        color: '#E0E0E0',
        fontSize: 14,
        fontWeight: '500',
    },
    activeFilterTagText: {
        color: '#E6B34A',
        fontWeight: 'bold',
    },
    clearFiltersButton: {
        backgroundColor: 'rgba(230, 179, 74, 0.2)',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#E6B34A',
    },
    clearFiltersText: {
        color: '#E6B34A',
        fontSize: 14,
        fontWeight: '600',
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    emptyStateIcon: {
        fontSize: 80,
        marginBottom: 20,
    },
    emptyStateTitle: {
        fontSize: 24,
        color: '#FFFFFF',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 15,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    emptyStateText: {
        fontSize: 16,
        color: '#E0E0E0',
        textAlign: 'center',
        lineHeight: 24,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    jokesContainer: {
        paddingHorizontal: 20,
        paddingBottom: 100,
    },
    jokesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    jokeCardGrid: {
        width: (width - 50) / 2,
        backgroundColor: 'rgba(74, 4, 4, 0.9)',
        padding: 15,
        borderRadius: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: 'rgba(230, 179, 74, 0.2)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 12,
    },
    jokeCardList: {
        backgroundColor: 'rgba(74, 4, 4, 0.9)',
        padding: 20,
        borderRadius: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: 'rgba(230, 179, 74, 0.2)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 12,
    },
    jokeHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    jokeMeta: {
        flex: 1,
    },
    jokeCategory: {
        backgroundColor: 'rgba(230, 179, 74, 0.2)',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        color: '#E6B34A',
        fontSize: 11,
        fontWeight: '600',
        borderWidth: 1,
        borderColor: 'rgba(230, 179, 74, 0.3)',
        alignSelf: 'flex-start',
        marginBottom: 5,
    },
    jokeDate: {
        color: '#B0B0B0',
        fontSize: 11,
        fontWeight: '500',
    },
    jokeActions: {
        flexDirection: 'row',
        gap: 8,
    },
    actionButton: {
        padding: 6,
        borderRadius: 8,
        backgroundColor: 'rgba(106, 5, 5, 0.6)',
    },
    deleteButton: {
        backgroundColor: 'rgba(220, 53, 69, 0.6)',
    },
    actionIcon: {
        fontSize: 14,
    },
    jokeText: {
        color: '#FFFFFF',
        fontSize: 16,
        lineHeight: 22,
        marginBottom: 15,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 15,
    },
    tag: {
        backgroundColor: 'rgba(122, 9, 9, 0.8)',
        borderRadius: 12,
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginRight: 6,
        marginBottom: 6,
        borderWidth: 1,
        borderColor: 'rgba(230, 179, 74, 0.3)',
    },
    tagText: {
        color: '#E6B34A',
        fontSize: 10,
        fontWeight: '600',
    },
    jokeFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    likesText: {
        color: '#E0E0E0',
        fontSize: 12,
        fontWeight: '500',
    },
    savedText: {
        color: '#E6B34A',
        fontSize: 12,
        fontWeight: '600',
    },
});

export default MyCollectionScreen;
