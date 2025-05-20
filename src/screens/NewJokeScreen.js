import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    ImageBackground, Image,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import {addJoke} from '../redux/slices/jokeSlice';

const categories = ['Favorite', 'Evening wear', 'Sad and cheerful'];
const emojis = ['😄', '😐', '🤔'];

const NewJokeScreen = () => {
    const [text, setText] = useState('');
    const [tag, setTag] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [evaluation, setEvaluation] = useState(null);

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const handleSave = () => {
        if (!text.trim()) return;

        dispatch(
            addJoke({
                text,
                category: selectedCategory,
                tags: tag.split(',').map(t => t.trim()),
                evaluation
            })
        );
        navigation.goBack();
    };

    return (
        <ImageBackground
            source={require('../assets/img/0e2dac62064077cb5876e816dbde3e6de782b7dc.png')}
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.overlay}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                   <Image source={require('../assets/img/Component20.png')} />
                </TouchableOpacity>

                <Text style={styles.title}>A NEW{'\n'}JOKE</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Joke"
                    placeholderTextColor="#ccc"
                    value={text}
                    onChangeText={setText}
                    multiline
                />

                <Text style={styles.label}>Category</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryRow}>
                    {categories.map(cat => (
                        <TouchableOpacity
                            key={cat}
                            style={[
                                styles.categoryButton,
                                selectedCategory === cat && styles.activeCategory
                            ]}
                            onPress={() => setSelectedCategory(cat)}
                        >
                            <Text style={styles.categoryText}>{cat}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                <TextInput
                    style={styles.input}
                    placeholder="Tags"
                    placeholderTextColor="#ccc"
                    value={tag}
                    onChangeText={setTag}
                />

                <Text style={styles.label}>Joke evaluation</Text>
                <View style={styles.emojiRow}>
                    {emojis.map((emoji, idx) => (
                        <TouchableOpacity
                            key={idx}
                            onPress={() => setEvaluation(emoji)}
                            style={[
                                styles.emojiBox,
                                evaluation === emoji && styles.selectedEmoji
                            ]}
                        >
                            <Text style={styles.emoji}>{emoji}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.saveText}>Save Joke</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1
    },
    overlay: {
        // flex: 1,
        backgroundColor: 'rgba(0,0,0,)',
        padding: 20,
        marginTop: 40
    },
    backArrow: {
        fontSize: 26,
        color: '#fff',
        marginBottom: 10
    },
    title: {

        fontSize: 58,
        color: '#fff',
        fontWeight: 'bold',
        fontFamily: 'AmaticSC-Bold',
        marginBottom: 20
    },
    input: {
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 24,
        padding: 12,
        color: '#fff',
        marginBottom: 16
    },
    label: {
        color: '#fff',
        marginBottom: 6,
        fontSize: 16
    },
    categoryRow: {
        flexDirection: 'row',
        marginBottom: 16
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
        color: '#fff'
    },
    emojiRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 16
    },
    emojiBox: {
        padding: 10
    },
    selectedEmoji: {
        backgroundColor: '#fff',
        borderRadius: 10
    },
    emoji: {
        fontSize: 30
    },
    saveButton: {
        backgroundColor: '#ff5500',
        borderRadius: 20,
        paddingVertical: 12,
        alignItems: 'center',
        marginTop: 16
    },
    saveText: {
        color: '#fff',
        fontSize: 16
    }
});

export default NewJokeScreen;
