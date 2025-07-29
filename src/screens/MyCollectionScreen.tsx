import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    ImageBackground,
    Image,
} from 'react-native';
import { useSelector } from 'react-redux';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Joke } from '../types';
import {RootState} from "../redux/store.ts"; // <-- Create this type if not already present

// Type definition for screen props (navigation only)
type MyCollectionScreenProps = {
    navigation: NativeStackNavigationProp<any>; // Replace `any` with your stack type
};

// Define the joke categories used for filtering
const categories: string[] = ['Favorite', 'Evening wear', 'Sad and cheerful'];

const MyCollectionScreen: React.FC<MyCollectionScreenProps> = ({ navigation }) => {
    // Fetch jokes from Redux store
    const jokes = useSelector((state: RootState) => state.jokes.list as Joke[]);

    // Local state for search text and selected category
    const [search, setSearch] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    // Filter jokes based on category and search text
    const filteredJokes = jokes.filter((joke) =>
        (!selectedCategory || joke.category === selectedCategory) &&
        joke.text.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <ImageBackground
            source={require('../assets/img/0e2dac62064077cb5876e816dbde3e6de782b7dc.png')}
            style={styles.background}
            resizeMode="cover"
        >
            <ScrollView style={styles.overlay}>
                {/* Header with title and Add Joke button */}
                <View style={styles.headerRow}>
                    <Text style={styles.title}>MY{'\n'}COLLECTION{'\n'}OF HUMOR</Text>
                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={() => navigation.navigate('NewJokeScreen')}
                    >
                        <Image source={require('../assets/img/Component82.png')} />
                    </TouchableOpacity>
                </View>

                {/* Search bar input */}
                <View style={styles.searchSection}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search"
                        placeholderTextColor="#ccc"
                        value={search}
                        onChangeText={setSearch}
                    />
                </View>

                {/* Horizontal scrollable category filter */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.categoryScroll}
                >
                    {categories.map((cat) => (
                        <TouchableOpacity
                            key={cat}
                            style={[
                                styles.categoryButton,
                                selectedCategory === cat && styles.activeCategory,
                            ]}
                            onPress={() =>
                                setSelectedCategory(selectedCategory === cat ? null : cat)
                            }
                        >
                            <Text style={styles.categoryText}>{cat}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* List of filtered jokes */}
                <ScrollView contentContainerStyle={styles.jokeContainer}>
                    {filteredJokes.map((joke, index) => (
                        <View key={joke.id || index} style={styles.jokeCard}>
                            <Text style={styles.jokeText}>{joke.text}</Text>
                            <Image source={require('../assets/img/Component8.png')} />
                        </View>
                    ))}
                </ScrollView>
            </ScrollView>
        </ImageBackground>
    );
};

// Styles for MyCollectionScreen layout
const styles = StyleSheet.create({
    background: {
        flex: 1
    },
    overlay: {
        flex: 1,
        // backgroundColor: 'rgba(0,0,0)',
        paddingTop: 60,
        paddingHorizontal: 16
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    title: {
        fontSize: 58,
        color: '#fff',
        fontWeight: 'bold',
        fontFamily: 'AmaticSC-Bold',
        alignSelf: 'center',
        marginBottom: 16,
        textAlign: 'left',
    },
    addButton: {
        backgroundColor: 'transparent',
        padding: 10,
        alignSelf: 'center',
    },
    searchSection: {
        marginTop: 20
    },
    searchInput: {
        backgroundColor: '#300000',
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 20,
        color: '#fff'
    },
    categoryScroll: {
        marginTop: 16,
        marginBottom: 8
    },
    categoryButton: {
        backgroundColor: '#500000',
        paddingVertical: 6,
        paddingHorizontal: 14,
        borderRadius: 20,
        marginRight: 10
    },
    activeCategory: {
        backgroundColor: '#ff5500'
    },
    categoryText: {
        color: '#fff',
        fontSize: 14
    },
    jokeContainer: {
        paddingBottom: 100
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
        fontSize: 15
    }
});

export default MyCollectionScreen;
