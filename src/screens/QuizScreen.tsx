import React, { useState } from 'react';
import {
    Text,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView, ImageBackground, Image,
} from 'react-native';

const questions = [
    {
        question: 'How do you usually react to an awkward situation?',
        answers: [
            'A) I\'ll make a funny joke or pun to lighten the mood.',
            'B) I will make a witty remark to show the absurdity of the situation.',
            'C) I\'ll blush, hesitate, and say something out of place.',
        ],
        correct: 0,
    },
    {
        question: 'Which joke would you rather tell at a party?',
        answers: [
            'A) What do the postman and the turtle have in common? Both are delaying the letters.',
            'B) A toast to those who are not with us today. But they could be!',
            'C) Ummm... Well, something about seals... or about the weather.',
        ],
        correct: 1,
    },
    {
        question: "What is your reaction to someone else's bad joke?",
        answers: [
            'A) I\'ll try to beat him in an even more stupid manner.',
            'B) I\'ll pretend that I didn\'t hear and translate the topic.',
            'C) I\'ll smile politely, even if it\'s not funny at all.',
        ],
        correct: 0,
    },
    {
        question: 'Which emoticon do you use most often?',
        answers: ['A) 😜', 'B) 😏', 'C) 😊'],
        correct: 2,
    },
    {
        question: 'What do you choose: to laugh at yourself or at others?',
        answers: [
            'A) Over everything at once! The main thing is to have fun!',
            'B) Over others... but very delicately and cleverly.',
            'C) I\'d rather not laugh at all, in case I offend someone.',
        ],
        correct: 0,
    },
    {
        question: 'What is your favorite comedy?',
        answers: [
            'A) "Naked Gun" (or any comedy with absurd humor)',
            'B) "Dr. House" (or any movie/TV series with sharp sarcasm)',
            'C) Something kind and family-friendly, like "Home Alone."',
        ],
        correct: 1,
    },
    {
        question: 'What is the most important thing for you in a joke?',
        answers: [
            'A) Stupidity and unpredictability!',
            'B) Wit and accuracy!',
            'C) So that she would not be offensive!',
        ],
        correct: 1,
    },
];

export default function QuizScreen({navigation}) {
    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState(null);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);

    const handleNext = () => {
        if (selected === questions[current].correct) {
            setScore(score + 1);
        }

        if (current + 1 < questions.length) {
            setCurrent(current + 1);
            setSelected(null);
        } else {
            setShowResult(true);
        }
    };

    if (showResult) {
        return (
            <ImageBackground
                source={require('../assets/img/0e2dac62064077cb5876e816dbde3e6de782b7dc.png')}
                resizeMode="cover"
                style={{ flex: 1 }}
            >
                <SafeAreaView style={styles.container}>
                    <Text style={styles.resultTitle}>KING OF PUNS</Text>
                    <Image
                        source={require('../assets/img/304f7d61b119df01dd7f15b4b1e6a4159b75f706.jpg')}
                        style={styles.kingImage}
                        resizeMode="contain"
                    />
                    <Text style={styles.description}>
                        Congratulations, you are the King of Puns! Your humor is an explosion of spontaneity and absurdity! You know how to see the funny in the most mundane things and defuse any situation with a silly pun.
                        {'\n\n'}Your motto is: "Laughter prolongs life, and silly laughter is half life!"
                        {'\n'}Your style: 'Petrosian style'.
                    </Text>
                    <Text style={styles.tryThese}>Try these jokes:</Text>
                    <Text style={styles.joke}>
                        "Why does an ostrich have such a good memory? Yes, because he has nothing to write down!"{'\n'}
                        "What happens if you cross a phone and a refrigerator? – The freezer!"
                    </Text>
                    <TouchableOpacity style={styles.leaveButton} onPress={()=>{navigation.goBack()}} >
                        <Text style={styles.leaveText}>LEAVE</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </ImageBackground>

        );
    }

    return (
        <ImageBackground
            source={require('../assets/img/0e2dac62064077cb5876e816dbde3e6de782b7dc.png')}
            resizeMode="cover"
            style={{ flex: 1,}}
        >
        <SafeAreaView style={styles.container}>
            <Text style={styles.progress}>
                {current + 1}/{questions.length}
            </Text>
            <Text style={styles.question}>{questions[current].question}</Text>
            {questions[current].answers.map((answer, index) => (
                <TouchableOpacity
                    key={index}
                    onPress={() => setSelected(index)}
                    style={[
                        styles.option,
                        selected === index && styles.selectedOption,
                    ]}
                >
                    <Text style={[styles.optionText, selected === index && {color: '#000'}]}>{answer}</Text>
                </TouchableOpacity>
            ))}
            <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
                <Text style={styles.nextText}>NEXT</Text>
            </TouchableOpacity>
        </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        marginHorizontal: 30,
        justifyContent: 'center',
    },
    resultTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 10,
    },
    kingImage: {
        width: '100%',
        height: 350,
        borderRadius: 25,
        marginBottom: 20,
    },
    description: {
        fontSize: 14,
        color: '#fff',
        textAlign: 'center',
        marginBottom: 15,
    },
    tryThese: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 5,
    },
    joke: {
        fontSize: 14,
        color: '#fff',
        textAlign: 'center',
        marginBottom: 30,
    },
    leaveButton: {
        backgroundColor: '#fff',
        borderRadius: 24,
        padding: 14,
        alignSelf: 'center',
        paddingHorizontal: 40,
    },
    leaveText: {
        fontWeight: 'bold',
        color: '#000',
    },
    quizTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#fff',
        marginBottom: 20,
    },
    progress: {
        fontSize: 28,
        color: '#fff',
        textAlign: 'center',
        marginBottom: 20,
    },
    question: {
        fontSize: 18,
        color: '#fff',
        marginBottom: 20,
        textAlign: 'center',
    },
    option: {
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 24,
        padding: 12,
        marginBottom: 10,
    },
    selectedOption: {
        backgroundColor: '#fff',
    },
    optionText: {
        color: '#fff',
        textAlign: 'center',
    },
    nextButton: {
        backgroundColor: '#fff',
        borderRadius: 24,
        padding: 14,
        marginTop: 20,
    },
    nextText: {
        textAlign: 'center',
        fontWeight: 'bold',
    },
});
