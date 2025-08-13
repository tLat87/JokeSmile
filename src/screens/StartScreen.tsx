import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ImageBackground,
    ScrollView,
    Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    const [userScore, setUserScore] = useState(0); // общий счёт игрока
    const [earnedPoints, setEarnedPoints] = useState(0); // очки за этот квиз

    // Загружаем текущие очки из AsyncStorage
    useEffect(() => {
        const loadScore = async () => {
            const storedScore = await AsyncStorage.getItem('userScore');
            if (storedScore) {
                setUserScore(parseInt(storedScore, 10));
            }
        };
        loadScore();
    }, []);

    // Обновляем счёт в AsyncStorage
    const updateScore = async (points: number) => {
        const newScore = userScore + points;
        setUserScore(newScore);
        await AsyncStorage.setItem('userScore', newScore.toString());
    };

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

        setEarnedPoints(totalScore);
        updateScore(totalScore);

        const finalResult = getQuizResult(totalScore);
        setResult(finalResult);
        setShowResult(true);
    };

    const restartQuiz = () => {
        setCurrentQuestionIndex(0);
        setUserAnswers({});
        setShowResult(false);
        setResult(null);
        setEarnedPoints(0);
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
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.header}>Quiz: What kind of Comedian are you?</Text>
                <Text style={{ color: '#E6B34A', marginBottom: 10 }}>Total Points: {userScore}</Text>

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
                        <Text style={{ color: '#E6B34A', marginTop: 15 }}>You earned {earnedPoints} points!</Text>

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
        marginBottom: 10,
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
