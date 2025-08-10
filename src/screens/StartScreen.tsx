// import React, { useState, useEffect } from 'react';
// import {
//     View,
//     Text,
//     StyleSheet,
//     ImageBackground,
//     TouchableOpacity,
//     TextInput,
//     ScrollView,
//     KeyboardAvoidingView,
//     Platform,
//     Alert,
//     FlatList,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
//
// interface Joke {
//     id: string;
//     topic: string;
//     severity: number;
//     joke: string;
//     advice: string;
// }
//
// interface SavedJoke extends Joke {
//     savedId: string;
// }
//
// const generateRandomId = (): string => {
//     return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
// };
//
// const jokesData: Joke[] = [
//     { id: '1', topic: 'animals', severity: 2, joke: "Why don't scientists trust atoms? Because they make up everything!", advice: "This is a light, witty joke. Perfect for a casual gathering or a family setting. Avoid telling it if someone is deeply discussing atomic theory, it might sound dismissive." },
//     { id: '2', topic: 'tech', severity: 3, joke: "Why do programmers prefer dark mode? Because light attracts bugs!", advice: "Good for tech-savvy crowds or a friendly office environment. Might not land with non-technical people. Best after a long coding session when everyone's a bit tired." },
//     { id: '3', topic: 'food', severity: 1, joke: "What do you call a fake noodle? An impasta!", advice: "A harmless, pun-based joke suitable for all ages. Great to lighten the mood during a meal or cooking session." },
//     { id: '4', topic: 'school', severity: 2, joke: "Why did the scarecrow win an award? Because he was outstanding in his field!", advice: "Classic, gentle humor. Works well in an educational setting or with kids. Avoid if the topic is serious academic performance." },
//     { id: '5', topic: 'travel', severity: 2, joke: "I told my wife she was drawing her eyebrows too high. She looked surprised.", advice: "A simple wordplay joke. Good for a relaxed atmosphere among friends or family. Probably not suitable in a formal business meeting." },
//     { id: '6', topic: 'science', severity: 3, joke: "What do you call a sad strawberry? A blueberry.", advice: "A bit silly, but generally inoffensive. Fun for a casual, lighthearted conversation, especially if discussing fruits or colors." },
//     { id: '7', topic: 'music', severity: 2, joke: "Why did the classic rock band break up? Because they couldn't get their acts together!", advice: "A decent pun for music lovers. Best shared among friends who appreciate music humor. Not for a serious discussion about a band's legacy." },
//     { id: '8', topic: 'sports', severity: 1, joke: "Why did the football coach go to the bank? To get his quarter back!", advice: "A simple, clean joke about sports. Great for kids or a casual sports discussion. Can be used almost anywhere." },
//     { id: '9', topic: 'daily life', severity: 2, joke: "I used to be a baker, but I couldn't make enough dough.", advice: "A relatable, lighthearted joke about work/money. Good for a break room or informal chat. Avoid if someone is genuinely struggling financially." },
//     { id: '10', topic: 'history', severity: 3, joke: "Did you hear about the restaurant on the moon? Great food, no atmosphere.", advice: "A classic space/science pun. Works well in a setting where light, intellectual humor is appreciated. Might be too dry for some." },
// ];
//
// const secretJoke: Joke = {
//     id: 'secret',
//     topic: 'secret',
//     severity: 5,
//     joke: "I have a joke about a ghost... but it's not very transparent.",
//     advice: "This is a rare, bonus joke! Share it with a friend who appreciates a good pun and the effort it took to get it. A true hidden gem!"
// };
//
// const STORAGE_KEY = '@joke_generator:saved_jokes';
//
// const JokeGeneratorScreen: React.FC = () => {
//     const [topic, setTopic] = useState<string>('');
//     const [details, setDetails] = useState<string>('');
//     const [severity, setSeverity] = useState<string>('');
//     const [generatedJoke, setGeneratedJoke] = useState<Joke | null>(null);
//     const [savedJokes, setSavedJokes] = useState<SavedJoke[]>([]);
//
//     // State for the mini-game
//     const [showGame, setShowGame] = useState(false);
//     const [secretNumber, setSecretNumber] = useState(0);
//     const [gameGuess, setGameGuess] = useState('');
//     const [guessesLeft, setGuessesLeft] = useState(3);
//     const [secretJokeUnlocked, setSecretJokeUnlocked] = useState(false);
//
//     useEffect(() => {
//         loadSavedJokes();
//     }, []);
//
//     const loadSavedJokes = async () => {
//         try {
//             const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
//             if (jsonValue != null) {
//                 setSavedJokes(JSON.parse(jsonValue));
//             }
//         } catch (e) {
//             console.error('Failed to load saved jokes.', e);
//             Alert.alert('Error', 'Failed to load saved jokes.');
//         }
//     };
//
//     const saveJoke = async (jokeToSave: Joke) => {
//         try {
//             const newSavedJoke: SavedJoke = { ...jokeToSave, savedId: generateRandomId() };
//             const updatedJokes = [...savedJokes, newSavedJoke];
//             await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedJokes));
//             setSavedJokes(updatedJokes);
//             Alert.alert('Success', 'Joke saved!');
//         } catch (e) {
//             console.error('Failed to save joke.', e);
//             Alert.alert('Error', 'Failed to save joke.');
//         }
//     };
//
//     const deleteJoke = async (idToDelete: string) => {
//         try {
//             const updatedJokes = savedJokes.filter((joke) => joke.savedId !== idToDelete);
//             await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedJokes));
//             setSavedJokes(updatedJokes);
//             Alert.alert('Deleted', 'Joke removed from saved list.');
//         } catch (e) {
//             console.error('Failed to delete joke.', e);
//             Alert.alert('Error', 'Failed to delete joke.');
//         }
//     };
//
//     const handleGenerateJoke = () => {
//         const numericSeverity = parseInt(severity, 10);
//
//         if (!topic.trim()) {
//             Alert.alert('Error', 'Please enter a topic for the joke.');
//             return;
//         }
//         if (isNaN(numericSeverity) || numericSeverity < 1 || numericSeverity > 5) {
//             Alert.alert('Error', 'Please enter a number from 1 to 5 for joke harshness.');
//             return;
//         }
//
//         const filteredByTopic = jokesData.filter((joke) =>
//             joke.topic.toLowerCase().includes(topic.toLowerCase())
//         );
//
//         let candidates = filteredByTopic.filter(
//             (joke) => Math.abs(joke.severity - numericSeverity) <= 1
//         );
//
//         if (candidates.length === 0 && filteredByTopic.length > 0) {
//             candidates = filteredByTopic;
//         }
//         if (candidates.length === 0) {
//             candidates = jokesData;
//         }
//
//         if (candidates.length > 0) {
//             const randomIndex = Math.floor(Math.random() * candidates.length);
//             setGeneratedJoke(candidates[randomIndex]);
//         } else {
//             setGeneratedJoke(null);
//             Alert.alert('Oops!', 'Could not find a suitable joke. Try changing the parameters.');
//         }
//     };
//
//     // --- Mini-game functions ---
//     const startGame = () => {
//         setShowGame(true);
//         setSecretNumber(Math.floor(Math.random() * 10) + 1);
//         setGuessesLeft(3);
//         setGameGuess('');
//         setSecretJokeUnlocked(false);
//     };
//
//     const handleGameGuess = () => {
//         const numericGuess = parseInt(gameGuess, 10);
//         if (isNaN(numericGuess) || numericGuess < 1 || numericGuess > 10) {
//             Alert.alert('Invalid Guess', 'Please enter a number between 1 and 10.');
//             return;
//         }
//
//         if (numericGuess === secretNumber) {
//             setSecretJokeUnlocked(true);
//             Alert.alert('Success!', 'You unlocked the secret joke!');
//             setShowGame(false);
//         } else {
//             const newGuessesLeft = guessesLeft - 1;
//             if (newGuessesLeft > 0) {
//                 Alert.alert('Incorrect', `That's not it. You have ${newGuessesLeft} guesses left.`);
//                 setGuessesLeft(newGuessesLeft);
//             } else {
//                 Alert.alert('Game Over', `Sorry, you're out of guesses! The number was ${secretNumber}.`);
//                 setShowGame(false);
//             }
//         }
//     };
//
//     const renderSavedJokeItem = ({ item }: { item: SavedJoke }) => (
//         <View style={styles.savedJokeCard}>
//             <Text style={styles.savedJokeText}>"{item.joke}"</Text>
//             <Text style={styles.savedJokeAdvice}>Advice: {item.advice}</Text>
//             <TouchableOpacity onPress={() => deleteJoke(item.savedId)} style={styles.deleteButton}>
//                 <Text style={styles.deleteButtonText}>Delete</Text>
//             </TouchableOpacity>
//         </View>
//     );
//
//     return (
//         <ImageBackground
//             source={require('../assets/img/0e2dac62064077cb5876e816dbde3e6de782b7dc.png')}
//             resizeMode="cover"
//             style={styles.background}
//         >
//             <KeyboardAvoidingView
//                 style={styles.overlay}
//                 behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//             >
//                 <ScrollView contentContainerStyle={styles.scrollContent}>
//                     <Text style={styles.header}>JOKE GENERATOR</Text>
//
//                     {/* Main Joke Generator Section */}
//                     <View style={styles.inputContainer}>
//                         <TextInput
//                             style={styles.textInput}
//                             placeholder="Joke Topic (e.g., animals, food)"
//                             placeholderTextColor="#A0A0A0"
//                             value={topic}
//                             onChangeText={setTopic}
//                         />
//                         <TextInput
//                             style={styles.textInput}
//                             placeholder="Additional details (optional)"
//                             placeholderTextColor="#A0A0A0"
//                             value={details}
//                             onChangeText={setDetails}
//                         />
//                         <TextInput
//                             style={styles.textInput}
//                             placeholder="Joke Harshness (1-5)"
//                             placeholderTextColor="#A0A0A0"
//                             keyboardType="numeric"
//                             value={severity}
//                             onChangeText={(text) => setSeverity(text.replace(/[^1-5]/g, ''))}
//                             maxLength={1}
//                         />
//                     </View>
//
//                     <TouchableOpacity style={styles.generateButton} onPress={handleGenerateJoke}>
//                         <Text style={styles.generateButtonText}>Generate Joke</Text>
//                     </TouchableOpacity>
//
//                     {generatedJoke && (
//                         <View style={styles.jokeOutputContainer}>
//                             <Text style={styles.outputTitle}>Your Joke:</Text>
//                             <View style={styles.jokeCard}>
//                                 <Text style={styles.jokeText}>{generatedJoke.joke}</Text>
//                             </View>
//                             <Text style={styles.outputTitle}>When to tell it:</Text>
//                             <View style={styles.adviceCard}>
//                                 <Text style={styles.adviceText}>{generatedJoke.advice}</Text>
//                             </View>
//                             <TouchableOpacity
//                                 style={styles.saveButton}
//                                 onPress={() => saveJoke(generatedJoke)}
//                             >
//                                 <Text style={styles.saveButtonText}>Save Joke</Text>
//                             </TouchableOpacity>
//                         </View>
//                     )}
//
//                     {/* --- New Mini-Game Section --- */}
//                     <View style={styles.miniGameContainer}>
//                         <Text style={styles.miniGameTitle}>Unlock the Secret Joke!</Text>
//                         {!showGame && !secretJokeUnlocked && (
//                             <TouchableOpacity style={styles.gameButton} onPress={startGame}>
//                                 <Text style={styles.gameButtonText}>Start Game</Text>
//                             </TouchableOpacity>
//                         )}
//                         {showGame && (
//                             <View style={styles.gameInputContainer}>
//                                 <Text style={styles.gamePrompt}>Guess a number from 1 to 10 ({guessesLeft} tries left):</Text>
//                                 <TextInput
//                                     style={styles.gameTextInput}
//                                     placeholder="Enter your guess"
//                                     placeholderTextColor="#777"
//                                     keyboardType="numeric"
//                                     value={gameGuess}
//                                     onChangeText={(text) => setGameGuess(text.replace(/[^0-9]/g, ''))}
//                                 />
//                                 <TouchableOpacity style={styles.guessButton} onPress={handleGameGuess}>
//                                     <Text style={styles.guessButtonText}>Guess</Text>
//                                 </TouchableOpacity>
//                             </View>
//                         )}
//                         {secretJokeUnlocked && (
//                             <View style={styles.secretJokeCard}>
//                                 <Text style={styles.outputTitle}>Your Secret Joke:</Text>
//                                 <View style={styles.jokeCard}>
//                                     <Text style={styles.jokeText}>{secretJoke.joke}</Text>
//                                 </View>
//                                 <Text style={styles.outputTitle}>When to tell it:</Text>
//                                 <View style={styles.adviceCard}>
//                                     <Text style={styles.adviceText}>{secretJoke.advice}</Text>
//                                 </View>
//                             </View>
//                         )}
//                     </View>
//
//                     {/* Saved Jokes Section */}
//                     {savedJokes.length > 0 && (
//                         <View style={styles.savedJokesWrapper}>
//                             <Text style={styles.savedJokesHeader}>My Saved Jokes</Text>
//                             <FlatList
//                                 data={savedJokes}
//                                 renderItem={renderSavedJokeItem}
//                                 keyExtractor={(item) => item.savedId}
//                                 contentContainerStyle={styles.savedJokesList}
//                                 scrollEnabled={false}
//                             />
//                         </View>
//                     )}
//                 </ScrollView>
//             </KeyboardAvoidingView>
//         </ImageBackground>
//     );
// };
//
// const styles = StyleSheet.create({
//     background: { flex: 1 },
//     overlay: { flex: 1, paddingTop: 60, paddingHorizontal: 20 },
//     scrollContent: { paddingBottom: 80 },
//     header: {
//         fontSize: 48,
//         color: '#E0E0E0',
//         fontWeight: 'bold',
//         fontFamily: 'AmaticSC-Bold',
//         alignSelf: 'center',
//         marginBottom: 24,
//         textShadowColor: 'rgba(0, 0, 0, 0.5)',
//         textShadowOffset: { width: 2, height: 2 },
//         textShadowRadius: 5,
//     },
//     inputContainer: { marginBottom: 20, width: '100%' },
//     textInput: {
//         backgroundColor: 'rgba(255, 255, 255, 0.1)',
//         color: '#fff',
//         paddingVertical: 12,
//         paddingHorizontal: 15,
//         borderRadius: 10,
//         marginBottom: 10,
//         fontSize: 16,
//         borderWidth: 1,
//         borderColor: '#7A0909',
//     },
//     generateButton: {
//         backgroundColor: '#9A1717',
//         paddingVertical: 14,
//         borderRadius: 10,
//         alignItems: 'center',
//         marginBottom: 30,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 4 },
//         shadowOpacity: 0.3,
//         shadowRadius: 5,
//         elevation: 8,
//     },
//     generateButtonText: { color: '#E0E0E0', fontSize: 18, fontWeight: 'bold' },
//     jokeOutputContainer: { width: '100%' },
//     outputTitle: {
//         fontSize: 22,
//         color: '#E6B34A',
//         fontWeight: 'bold',
//         marginBottom: 10,
//         marginTop: 15,
//     },
//     jokeCard: {
//         backgroundColor: 'rgba(255, 255, 255, 0.1)',
//         padding: 18,
//         borderRadius: 12,
//         marginBottom: 15,
//         borderWidth: 1,
//         borderColor: '#7A0909',
//     },
//     jokeText: { color: '#fff', fontSize: 17, lineHeight: 24 },
//     adviceCard: {
//         backgroundColor: 'rgba(0, 0, 0, 0.4)',
//         padding: 18,
//         borderRadius: 12,
//         borderWidth: 1,
//         borderColor: '#E6B34A',
//     },
//     adviceText: {
//         color: '#eee',
//         fontSize: 15,
//         lineHeight: 22,
//         fontStyle: 'italic',
//     },
//     saveButton: {
//         backgroundColor: '#7A0909',
//         paddingVertical: 12,
//         borderRadius: 10,
//         alignItems: 'center',
//         marginTop: 20,
//         marginBottom: 30,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.4,
//         shadowRadius: 3,
//         elevation: 6,
//     },
//     saveButtonText: { color: '#E6B34A', fontSize: 16, fontWeight: 'bold' },
//
//     // Mini-game Styles
//     miniGameContainer: {
//         backgroundColor: '#4A0404',
//         padding: 20,
//         borderRadius: 15,
//         marginTop: 20,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 6 },
//         shadowOpacity: 0.4,
//         shadowRadius: 8,
//         elevation: 12,
//     },
//     miniGameTitle: {
//         fontSize: 24,
//         color: '#E6B34A',
//         fontWeight: 'bold',
//         textAlign: 'center',
//         marginBottom: 15,
//     },
//     gameButton: {
//         backgroundColor: '#E6B34A',
//         paddingVertical: 14,
//         borderRadius: 10,
//         alignItems: 'center',
//         marginBottom: 10,
//     },
//     gameButtonText: { color: '#4A0404', fontSize: 18, fontWeight: 'bold' },
//     gameInputContainer: {
//         alignItems: 'center',
//         marginBottom: 10,
//     },
//     gamePrompt: {
//         color: '#fff',
//         fontSize: 16,
//         marginBottom: 10,
//     },
//     gameTextInput: {
//         backgroundColor: 'rgba(255, 255, 255, 0.1)',
//         color: '#fff',
//         width: 100,
//         textAlign: 'center',
//         paddingVertical: 8,
//         borderRadius: 10,
//         fontSize: 16,
//         borderWidth: 1,
//         borderColor: '#E6B34A',
//     },
//     guessButton: {
//         backgroundColor: '#9A1717',
//         paddingVertical: 10,
//         paddingHorizontal: 20,
//         borderRadius: 10,
//         marginTop: 15,
//     },
//     guessButtonText: {
//         color: '#E6B34A',
//         fontWeight: 'bold',
//     },
//     secretJokeCard: {
//         marginTop: 15,
//     },
//
//     // Saved Jokes Styles
//     savedJokesWrapper: {
//         marginTop: 30,
//     },
//     savedJokesHeader: {
//         fontSize: 28,
//         color: '#fff',
//         fontWeight: 'bold',
//         marginBottom: 15,
//         alignSelf: 'center',
//     },
//     savedJokesList: {},
//     savedJokeCard: {
//         backgroundColor: 'rgba(255, 255, 255, 0.1)',
//         padding: 15,
//         borderRadius: 12,
//         marginBottom: 10,
//         borderWidth: 1,
//         borderColor: '#7A0909',
//     },
//     savedJokeText: {
//         color: '#fff',
//         fontSize: 16,
//         fontStyle: 'italic',
//         marginBottom: 8,
//     },
//     savedJokeAdvice: { color: '#eee', fontSize: 13, marginBottom: 10 },
//     deleteButton: {
//         backgroundColor: '#a00000',
//         paddingVertical: 8,
//         paddingHorizontal: 12,
//         borderRadius: 8,
//         alignSelf: 'flex-end',
//     },
//     deleteButtonText: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
// });
//
// export default JokeGeneratorScreen;

import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ImageBackground,
    ScrollView,
    Alert
} from 'react-native';

// Structure for the quiz questions
interface Question {
    questionText: string;
    options: {
        id: string;
        text: string;
        score: number;
    }[];
}

// Data for the quiz questions and scoring
const quizQuestions: Question[] = [
    {
        questionText: "1. A friend tells you a bad joke. You:",
        options: [
            { id: 'q1a', text: "A) Laugh politely", score: 1 },
            { id: 'q1b', text: "B) Tell an even worse one", score: 2 },
            { id: 'q1c', text: "C) Analyze why it failed", score: 3 },
        ],
    },
    {
        questionText: "2. Your boss asks for a report. You:",
        options: [
            { id: 'q2a', text: "A) Deliver it on time", score: 1 },
            { id: 'q2b', text: "B) Deliver it with a witty comment", score: 2 },
            { id: 'q2c', text: "C) Prank him with a fake report", score: 3 },
        ],
    },
    {
        questionText: "3. You're at a party. You:",
        options: [
            { id: 'q3a', text: "A) Listen to others' stories", score: 1 },
            { id: 'q3b', text: "B) Become a center of attention with jokes", score: 2 },
            { id: 'q3c', text: "C) Observe people for new material", score: 3 },
        ],
    },
];

// Comedian types and humor IQ based on total score
const getQuizResult = (score: number) => {
    if (score >= 8) {
        return {
            comedianType: "The Pun Master",
            humorIQ: 125,
            description: "You're a master of wordplay and clever one-liners. Your humor is sharp and witty, but sometimes a bit dry. People admire your intelligence, but might not always get your jokes on the first try.",
        };
    } else if (score >= 5) {
        return {
            comedianType: "The Storyteller",
            humorIQ: 100,
            description: "You excel at telling long, engaging stories with a comedic twist. Your humor is based on real-life observations and relatable experiences. People love listening to your anecdotes and feel a strong connection to your style.",
        };
    } else {
        return {
            comedianType: "The Crowd-Pleaser",
            humorIQ: 85,
            description: "You know how to make everyone laugh with accessible and universal humor. Your jokes are friendly and inoffensive, making you popular at any gathering. Your goal is simply to bring joy to others.",
        };
    }
};

const QuizScreen: React.FC = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState<{ [key: string]: string }>({});
    const [showResult, setShowResult] = useState(false);
    const [result, setResult] = useState<{ comedianType: string; humorIQ: number; description: string } | null>(null);

    const handleAnswer = (questionId: string, optionId: string) => {
        setUserAnswers(prevAnswers => ({
            ...prevAnswers,
            [questionId]: optionId,
        }));
    };

    const handleNext = () => {
        if (currentQuestionIndex < quizQuestions.length - 1) {
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        } else {
            calculateResult();
        }
    };

    const calculateResult = () => {
        let totalScore = 0;
        quizQuestions.forEach(question => {
            const selectedOptionId = userAnswers[question.questionText];
            const selectedOption = question.options.find(opt => opt.id === selectedOptionId);
            if (selectedOption) {
                totalScore += selectedOption.score;
            }
        });

        const finalResult = getQuizResult(totalScore);
        setResult(finalResult);
        setShowResult(true);
    };

    const restartQuiz = () => {
        setCurrentQuestionIndex(0);
        setUserAnswers({});
        setShowResult(false);
        setResult(null);
    };

    const isAnswerSelected = (questionText: string): boolean => {
        return !!userAnswers[questionText];
    };

    const isCurrentAnswerSelected = isAnswerSelected(quizQuestions[currentQuestionIndex]?.questionText);
    const currentQuestion = quizQuestions[currentQuestionIndex];

    return (
        <ImageBackground
            source={require('../assets/img/0e2dac62064077cb5876e816dbde3e6de782b7dc.png')}
            resizeMode="cover"
            style={styles.background}
        >
            {/*<View style={styles.darkOverlay} />*/}
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.header}>Quiz: What kind of Comedian are you?</Text>

                {!showResult ? (
                    <View style={styles.quizCard}>
                        <Text style={styles.questionText}>{currentQuestion?.questionText}</Text>
                        {currentQuestion?.options.map(option => (
                            <TouchableOpacity
                                key={option.id}
                                style={[
                                    styles.optionButton,
                                    userAnswers[currentQuestion.questionText] === option.id && styles.selectedOption
                                ]}
                                onPress={() => handleAnswer(currentQuestion.questionText, option.id)}
                            >
                                <Text style={styles.optionText}>{option.text}</Text>
                            </TouchableOpacity>
                        ))}
                        <TouchableOpacity
                            style={[
                                styles.nextButton,
                                !isCurrentAnswerSelected && styles.disabledButton
                            ]}
                            onPress={handleNext}
                            disabled={!isCurrentAnswerSelected}
                        >
                            <Text style={styles.nextButtonText}>
                                {currentQuestionIndex < quizQuestions.length - 1 ? 'Next' : 'See Result'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.resultCard}>
                        <Text style={styles.resultHeader}>Your Comedian Type:</Text>
                        <Text style={styles.comedianType}>{result?.comedianType}</Text>
                        <Text style={styles.resultHeader}>Your Humor IQ:</Text>
                        <Text style={styles.humorIQ}>{result?.humorIQ}</Text>
                        <Text style={styles.descriptionText}>{result?.description}</Text>

                        <TouchableOpacity style={styles.restartButton} onPress={restartQuiz}>
                            <Text style={styles.restartButtonText}>Restart Quiz</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </ScrollView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: { flex: 1 },
    darkOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
    },
    container: {
        flexGrow: 1,
        paddingTop: 60,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    header: {
        fontSize: 32,
        color: '#E6B34A',
        fontWeight: 'bold',
        fontFamily: 'AmaticSC-Bold',
        textAlign: 'center',
        marginBottom: 30,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 5,
    },
    quizCard: {
        width: '100%',
        backgroundColor: '#4A0404',
        borderRadius: 15,
        padding: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
        elevation: 12,
    },
    questionText: {
        fontSize: 20,
        color: '#E0E0E0',
        fontWeight: 'bold',
        marginBottom: 20,
    },
    optionButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#6A0505',
    },
    selectedOption: {
        backgroundColor: '#9A1717',
        borderColor: '#E6B34A',
    },
    optionText: {
        color: '#fff',
        fontSize: 16,
    },
    nextButton: {
        backgroundColor: '#E6B34A',
        paddingVertical: 15,
        borderRadius: 10,
        marginTop: 20,
        alignItems: 'center',
    },
    nextButtonText: {
        color: '#4A0404',
        fontSize: 18,
        fontWeight: 'bold',
    },
    disabledButton: {
        backgroundColor: 'rgba(230, 179, 74, 0.5)',
    },
    resultCard: {
        width: '100%',
        backgroundColor: '#4A0404',
        borderRadius: 15,
        padding: 25,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
        elevation: 12,
    },
    resultHeader: {
        fontSize: 22,
        color: '#E0E0E0',
        fontWeight: 'bold',
        marginTop: 15,
    },
    comedianType: {
        fontSize: 32,
        color: '#E6B34A',
        fontWeight: 'bold',
        marginTop: 5,
        marginBottom: 10,
        textAlign: 'center',
    },
    humorIQ: {
        fontSize: 48,
        color: '#fff',
        fontWeight: 'bold',
        marginTop: 5,
        marginBottom: 20,
    },
    descriptionText: {
        fontSize: 16,
        color: '#E0E0E0',
        textAlign: 'center',
        lineHeight: 24,
    },
    restartButton: {
        backgroundColor: '#9A1717',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        marginTop: 30,
    },
    restartButtonText: {
        color: '#E6B34A',
        fontSize: 18,
        fontWeight: 'bold',
    }
});

export default QuizScreen;
