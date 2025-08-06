import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    TextInput,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Alert,
    FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Joke {
    id: string;
    topic: string;
    severity: number;
    joke: string;
    advice: string;
}

interface SavedJoke extends Joke {
    savedId: string;
}

const generateRandomId = (): string => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

const jokesData: Joke[] = [
    { id: '1', topic: 'animals', severity: 2, joke: "Why don't scientists trust atoms? Because they make up everything!", advice: "This is a light, witty joke. Perfect for a casual gathering or a family setting. Avoid telling it if someone is deeply discussing atomic theory, it might sound dismissive." },
    { id: '2', topic: 'tech', severity: 3, joke: "Why do programmers prefer dark mode? Because light attracts bugs!", advice: "Good for tech-savvy crowds or a friendly office environment. Might not land with non-technical people. Best after a long coding session when everyone's a bit tired." },
    { id: '3', topic: 'food', severity: 1, joke: "What do you call a fake noodle? An impasta!", advice: "A harmless, pun-based joke suitable for all ages. Great to lighten the mood during a meal or cooking session." },
    { id: '4', topic: 'school', severity: 2, joke: "Why did the scarecrow win an award? Because he was outstanding in his field!", advice: "Classic, gentle humor. Works well in an educational setting or with kids. Avoid if the topic is serious academic performance." },
    { id: '5', topic: 'travel', severity: 2, joke: "I told my wife she was drawing her eyebrows too high. She looked surprised.", advice: "A simple wordplay joke. Good for a relaxed atmosphere among friends or family. Probably not suitable in a formal business meeting." },
    { id: '6', topic: 'science', severity: 3, joke: "What do you call a sad strawberry? A blueberry.", advice: "A bit silly, but generally inoffensive. Fun for a casual, lighthearted conversation, especially if discussing fruits or colors." },
    { id: '7', topic: 'music', severity: 2, joke: "Why did the classic rock band break up? Because they couldn't get their acts together!", advice: "A decent pun for music lovers. Best shared among friends who appreciate music humor. Not for a serious discussion about a band's legacy." },
    { id: '8', topic: 'sports', severity: 1, joke: "Why did the football coach go to the bank? To get his quarter back!", advice: "A simple, clean joke about sports. Great for kids or a casual sports discussion. Can be used almost anywhere." },
    { id: '9', topic: 'daily life', severity: 2, joke: "I used to be a baker, but I couldn't make enough dough.", advice: "A relatable, lighthearted joke about work/money. Good for a break room or informal chat. Avoid if someone is genuinely struggling financially." },
    { id: '10', topic: 'history', severity: 3, joke: "Did you hear about the restaurant on the moon? Great food, no atmosphere.", advice: "A classic space/science pun. Works well in a setting where light, intellectual humor is appreciated. Might be too dry for some." },
];

const STORAGE_KEY = '@joke_generator:saved_jokes';

const JokeGeneratorScreen: React.FC = () => {
    const [topic, setTopic] = useState<string>('');
    const [details, setDetails] = useState<string>('');
    const [severity, setSeverity] = useState<string>('');
    const [generatedJoke, setGeneratedJoke] = useState<Joke | null>(null);
    const [savedJokes, setSavedJokes] = useState<SavedJoke[]>([]);

    useEffect(() => {
        loadSavedJokes();
    }, []);

    const loadSavedJokes = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
            if (jsonValue != null) {
                setSavedJokes(JSON.parse(jsonValue));
            }
        } catch (e) {
            console.error('Failed to load saved jokes.', e);
            Alert.alert('Error', 'Failed to load saved jokes.');
        }
    };

    const saveJoke = async (jokeToSave: Joke) => {
        try {
            const newSavedJoke: SavedJoke = { ...jokeToSave, savedId: generateRandomId() };
            const updatedJokes = [...savedJokes, newSavedJoke];
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedJokes));
            setSavedJokes(updatedJokes);
            Alert.alert('Success', 'Joke saved!');
        } catch (e) {
            console.error('Failed to save joke.', e);
            Alert.alert('Error', 'Failed to save joke.');
        }
    };

    const deleteJoke = async (idToDelete: string) => {
        try {
            const updatedJokes = savedJokes.filter((joke) => joke.savedId !== idToDelete);
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedJokes));
            setSavedJokes(updatedJokes);
            Alert.alert('Deleted', 'Joke removed from saved list.');
        } catch (e) {
            console.error('Failed to delete joke.', e);
            Alert.alert('Error', 'Failed to delete joke.');
        }
    };

    const handleGenerateJoke = () => {
        const numericSeverity = parseInt(severity, 10);

        if (!topic.trim()) {
            Alert.alert('Error', 'Please enter a topic for the joke.');
            return;
        }
        if (isNaN(numericSeverity) || numericSeverity < 1 || numericSeverity > 5) {
            Alert.alert('Error', 'Please enter a number from 1 to 5 for joke harshness.');
            return;
        }

        const filteredByTopic = jokesData.filter((joke) =>
            joke.topic.toLowerCase().includes(topic.toLowerCase())
        );

        let candidates = filteredByTopic.filter(
            (joke) => Math.abs(joke.severity - numericSeverity) <= 1
        );

        if (candidates.length === 0 && filteredByTopic.length > 0) {
            candidates = filteredByTopic;
        }
        if (candidates.length === 0) {
            candidates = jokesData;
        }

        if (candidates.length > 0) {
            const randomIndex = Math.floor(Math.random() * candidates.length);
            setGeneratedJoke(candidates[randomIndex]);
        } else {
            setGeneratedJoke(null);
            Alert.alert('Oops!', 'Could not find a suitable joke. Try changing the parameters.');
        }
    };

    const renderSavedJokeItem = ({ item }: { item: SavedJoke }) => (
        <View style={styles.savedJokeCard}>
            <Text style={styles.savedJokeText}>"{item.joke}"</Text>
            <Text style={styles.savedJokeAdvice}>Advice: {item.advice}</Text>
            <TouchableOpacity onPress={() => deleteJoke(item.savedId)} style={styles.deleteButton}>
                <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <ImageBackground
            source={require('../assets/img/0e2dac62064077cb5876e816dbde3e6de782b7dc.png')}
            resizeMode="cover"
            style={styles.background}
        >
            <KeyboardAvoidingView
                style={styles.overlay}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <Text style={styles.header}>JOKE GENERATOR</Text>

                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Joke Topic (e.g., animals, food)"
                            placeholderTextColor="#ccc"
                            value={topic}
                            onChangeText={setTopic}
                        />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Additional details (optional)"
                            placeholderTextColor="#ccc"
                            value={details}
                            onChangeText={setDetails}
                        />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Joke Harshness (1-5, 5 is very harsh)"
                            placeholderTextColor="#ccc"
                            keyboardType="numeric"
                            value={severity}
                            onChangeText={(text) => setSeverity(text.replace(/[^1-5]/g, ''))}
                            maxLength={1}
                        />
                    </View>

                    <TouchableOpacity style={styles.generateButton} onPress={handleGenerateJoke}>
                        <Text style={styles.generateButtonText}>Generate Joke</Text>
                    </TouchableOpacity>

                    {generatedJoke && (
                        <View style={styles.jokeOutputContainer}>
                            <Text style={styles.outputTitle}>Your Joke:</Text>
                            <View style={styles.jokeCard}>
                                <Text style={styles.jokeText}>{generatedJoke.joke}</Text>
                            </View>
                            <Text style={styles.outputTitle}>When to tell it:</Text>
                            <View style={styles.adviceCard}>
                                <Text style={styles.adviceText}>{generatedJoke.advice}</Text>
                            </View>
                            <TouchableOpacity
                                style={styles.saveButton}
                                onPress={() => saveJoke(generatedJoke)}
                            >
                                <Text style={styles.saveButtonText}>Save Joke</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {savedJokes.length > 0 && (
                        <>
                            <Text style={styles.savedJokesHeader}>My Saved Jokes</Text>
                            <FlatList
                                data={savedJokes}
                                renderItem={renderSavedJokeItem}
                                keyExtractor={(item) => item.savedId}
                                contentContainerStyle={styles.savedJokesList}
                                scrollEnabled={false}
                            />
                        </>
                    )}
                </ScrollView>
            </KeyboardAvoidingView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: { flex: 1 },
    overlay: { flex: 1, paddingTop: 60, paddingHorizontal: 16 },
    scrollContent: { paddingBottom: 80 },
    header: {
        fontSize: 70,
        color: '#fff',
        fontWeight: 'bold',
        fontFamily: 'AmaticSC-Bold',
        alignSelf: 'center',
        marginBottom: 20,
        textAlign: 'center',
    },
    inputContainer: { marginBottom: 20, width: '100%' },
    textInput: {
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        color: '#fff',
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderRadius: 10,
        marginBottom: 10,
        fontSize: 16,
    },
    generateButton: {
        backgroundColor: '#ff5500',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 30,
    },
    generateButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
    jokeOutputContainer: { width: '100%' },
    outputTitle: {
        fontSize: 22,
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 15,
    },
    jokeCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        padding: 18,
        borderRadius: 12,
        marginBottom: 15,
    },
    jokeText: { color: '#fff', fontSize: 17, lineHeight: 24 },
    adviceCard: {
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        padding: 18,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#700000',
    },
    adviceText: {
        color: '#fff',
        fontSize: 15,
        lineHeight: 22,
        fontStyle: 'italic',
    },
    saveButton: {
        backgroundColor: '#007000',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 30,
    },
    saveButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
    savedJokesHeader: {
        fontSize: 28,
        color: '#fff',
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 15,
        alignSelf: 'center',
    },
    savedJokesList: {},
    savedJokeCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        padding: 15,
        borderRadius: 12,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#555',
    },
    savedJokeText: {
        color: '#fff',
        fontSize: 16,
        fontStyle: 'italic',
        marginBottom: 8,
    },
    savedJokeAdvice: { color: '#eee', fontSize: 13, marginBottom: 10 },
    deleteButton: {
        backgroundColor: '#a00000',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        alignSelf: 'flex-end',
    },
    deleteButtonText: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
});

export default JokeGeneratorScreen;
