import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    ScrollView,
    StatusBar,
    Animated,
    Alert,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface NewJokeScreenProps {
    navigation: any;
}

const NewJokeScreen: React.FC<NewJokeScreenProps> = ({ navigation }) => {
    const [jokeText, setJokeText] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(50)).current;
    const inputAnim = useRef(new Animated.Value(0)).current;

    const categories = ['Life', 'Work', 'Relationships', 'Short Puns', 'Technology', 'Food', 'Travel', 'Sports'];
    const availableTags = ['Funny', 'Relatable', 'Clever', 'Dark', 'Family-friendly', 'Political', 'Observational', 'Story-based'];

    React.useEffect(() => {
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
            Animated.timing(inputAnim, {
                toValue: 1,
                duration: 1000,
                delay: 300,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const handleCategorySelect = (category: string) => {
        setSelectedCategory(selectedCategory === category ? '' : category);
    };

    const handleTagToggle = (tag: string) => {
        setSelectedTags(prev => 
            prev.includes(tag) 
                ? prev.filter(t => t !== tag)
                : [...prev, tag]
        );
    };

    const validateForm = () => {
        if (!jokeText.trim()) {
            Alert.alert('Error', 'Please enter your joke text');
            return false;
        }
        if (jokeText.trim().length < 10) {
            Alert.alert('Error', 'Joke must be at least 10 characters long');
            return false;
        }
        if (!selectedCategory) {
            Alert.alert('Error', 'Please select a category');
            return false;
        }
        return true;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        setIsSubmitting(true);
        
        try {
            // Here should be logic to save the joke
            // For demo purposes just showing success
            
            // Saving to AsyncStorage as an example
            const newJoke = {
                id: Date.now().toString(),
                text: jokeText.trim(),
                category: selectedCategory,
                tags: selectedTags,
                createdAt: new Date().toISOString(),
                likes: 0,
                isLiked: false,
            };

            const existingJokes = await AsyncStorage.getItem('userCreatedJokes');
            const jokes = existingJokes ? JSON.parse(existingJokes) : [];
            jokes.push(newJoke);
            await AsyncStorage.setItem('userCreatedJokes', JSON.stringify(jokes));

            Alert.alert(
                'Success!',
                'Your joke has been created and saved!',
                [
                    {
                        text: 'OK',
                        onPress: () => {
                            // Reset form
                            setJokeText('');
                            setSelectedCategory('');
                            setSelectedTags([]);
                            // Return to main screen
                            navigation.goBack();
                        }
                    }
                ]
            );
        } catch (error) {
            Alert.alert('Error', 'Failed to save joke. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleBack = () => {
        if (jokeText.trim() || selectedCategory || selectedTags.length > 0) {
            Alert.alert(
                'Discard Changes?',
                'You have unsaved changes. Are you sure you want to leave?',
                [
                    { text: 'Cancel', style: 'cancel' },
                    { 
                        text: 'Discard', 
                        style: 'destructive',
                        onPress: () => navigation.goBack()
                    }
                ]
            );
        } else {
            navigation.goBack();
        }
    };

    return (
        <KeyboardAvoidingView 
            style={styles.container} 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
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
                <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                    <Text style={styles.backButtonText}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Create New Joke</Text>
                <View style={styles.placeholderView} />
            </Animated.View>

            <ScrollView 
                style={styles.content}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <Animated.View 
                    style={[
                        styles.formSection,
                        {
                            opacity: inputAnim,
                            transform: [{ scale: inputAnim }]
                        }
                    ]}
                >
                    <Text style={styles.sectionTitle}>Joke Text</Text>
                    <TextInput
                        style={styles.jokeInput}
                        placeholder="Write your joke here..."
                        placeholderTextColor="rgba(224, 224, 224, 0.6)"
                        value={jokeText}
                        onChangeText={setJokeText}
                        multiline
                        textAlignVertical="top"
                        maxLength={500}
                    />
                    <Text style={styles.characterCount}>
                        {jokeText.length}/500 characters
                    </Text>
                </Animated.View>

                <Animated.View 
                    style={[
                        styles.formSection,
                        {
                            opacity: inputAnim,
                            transform: [{ scale: inputAnim }]
                        }
                    ]}
                >
                    <Text style={styles.sectionTitle}>Category</Text>
                    <View style={styles.categoriesContainer}>
                        {categories.map(category => (
                            <TouchableOpacity
                                key={category}
                                style={[
                                    styles.categoryButton,
                                    selectedCategory === category && styles.selectedCategoryButton
                                ]}
                                onPress={() => handleCategorySelect(category)}
                            >
                                <Text style={[
                                    styles.categoryButtonText,
                                    selectedCategory === category && styles.selectedCategoryButtonText
                                ]}>
                                    {category}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </Animated.View>

                <Animated.View 
                    style={[
                        styles.formSection,
                        {
                            opacity: inputAnim,
                            transform: [{ scale: inputAnim }]
                        }
                    ]}
                >
                    <Text style={styles.sectionTitle}>Tags (Optional)</Text>
                    <Text style={styles.sectionSubtitle}>
                        Add tags to help organize your joke
                    </Text>
                    <View style={styles.tagsContainer}>
                        {availableTags.map(tag => (
                            <TouchableOpacity
                                key={tag}
                                style={[
                                    styles.tagButton,
                                    selectedTags.includes(tag) && styles.selectedTagButton
                                ]}
                                onPress={() => handleTagToggle(tag)}
                            >
                                <Text style={[
                                    styles.tagButtonText,
                                    selectedTags.includes(tag) && styles.selectedTagButtonText
                                ]}>
                                    {tag}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </Animated.View>

                <Animated.View 
                    style={[
                        styles.previewSection,
                        {
                            opacity: inputAnim,
                            transform: [{ scale: inputAnim }]
                        }
                    ]}
                >
                    <Text style={styles.sectionTitle}>Preview</Text>
                    <View style={styles.previewCard}>
                        {jokeText ? (
                            <>
                                <Text style={styles.previewText}>{jokeText}</Text>
                                <View style={styles.previewMeta}>
                                    {selectedCategory && (
                                        <View style={styles.previewCategory}>
                                            <Text style={styles.previewCategoryText}>
                                                {selectedCategory}
                                            </Text>
                                        </View>
                                    )}
                                    {selectedTags.length > 0 && (
                                        <View style={styles.previewTags}>
                                            {selectedTags.map(tag => (
                                                <Text key={tag} style={styles.previewTagText}>
                                                    #{tag}
                                                </Text>
                                            ))}
                                        </View>
                                    )}
                                </View>
                            </>
                        ) : (
                            <Text style={styles.previewPlaceholder}>
                                Your joke preview will appear here...
                            </Text>
                        )}
                    </View>
                </Animated.View>
            </ScrollView>

            <Animated.View 
                style={[
                    styles.footer,
                    {
                        opacity: inputAnim,
                        transform: [{ translateY: inputAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [50, 0]
                        })}]
                    }
                ]}
            >
                <TouchableOpacity
                    style={[
                        styles.submitButton,
                        (!jokeText.trim() || !selectedCategory || isSubmitting) && styles.submitButtonDisabled
                    ]}
                    onPress={handleSubmit}
                    disabled={!jokeText.trim() || !selectedCategory || isSubmitting}
                >
                    <Text style={[
                        styles.submitButtonText,
                        (!jokeText.trim() || !selectedCategory || isSubmitting) && styles.submitButtonTextDisabled
                    ]}>
                        {isSubmitting ? 'Creating...' : 'Create Joke'}
                    </Text>
                </TouchableOpacity>
            </Animated.View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2C0000',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 60,
        paddingHorizontal: 20,
        paddingBottom: 20,
        backgroundColor: 'rgba(44, 0, 0, 0.95)',
        borderBottomWidth: 1,
        borderBottomColor: '#E6B34A',
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(230, 179, 74, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(230, 179, 74, 0.3)',
    },
    backButtonText: {
        color: '#E6B34A',
        fontSize: 20,
        fontWeight: 'bold',
    },
    headerTitle: {
        fontSize: 24,
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontFamily: 'AmaticSC-Bold',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    placeholderView: {
        width: 40,
    },
    content: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    formSection: {
        marginTop: 25,
    },
    sectionTitle: {
        fontSize: 20,
        color: '#FFFFFF',
        fontWeight: 'bold',
        marginBottom: 15,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    sectionSubtitle: {
        fontSize: 14,
        color: '#E0E0E0',
        marginBottom: 15,
        fontStyle: 'italic',
    },
    jokeInput: {
        backgroundColor: 'rgba(74, 4, 4, 0.8)',
        borderRadius: 15,
        padding: 20,
        color: '#FFFFFF',
        fontSize: 16,
        lineHeight: 24,
        minHeight: 120,
        borderWidth: 1,
        borderColor: 'rgba(230, 179, 74, 0.2)',
        textAlignVertical: 'top',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    characterCount: {
        fontSize: 12,
        color: '#B0B0B0',
        textAlign: 'right',
        marginTop: 8,
        fontStyle: 'italic',
    },
    categoriesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    categoryButton: {
        backgroundColor: 'rgba(106, 5, 5, 0.6)',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(230, 179, 74, 0.2)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 6,
    },
    selectedCategoryButton: {
        backgroundColor: 'rgba(230, 179, 74, 0.3)',
        borderColor: '#E6B34A',
        borderWidth: 2,
        transform: [{ scale: 1.05 }],
    },
    categoryButtonText: {
        color: '#E0E0E0',
        fontSize: 14,
        fontWeight: '600',
    },
    selectedCategoryButtonText: {
        color: '#E6B34A',
        fontWeight: 'bold',
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    tagButton: {
        backgroundColor: 'rgba(106, 5, 5, 0.5)',
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(230, 179, 74, 0.2)',
    },
    selectedTagButton: {
        backgroundColor: 'rgba(230, 179, 74, 0.3)',
        borderColor: '#E6B34A',
        borderWidth: 2,
    },
    tagButtonText: {
        color: '#E0E0E0',
        fontSize: 13,
        fontWeight: '500',
    },
    selectedTagButtonText: {
        color: '#E6B34A',
        fontWeight: 'bold',
    },
    previewSection: {
        marginTop: 25,
    },
    previewCard: {
        backgroundColor: 'rgba(74, 4, 4, 0.8)',
        borderRadius: 15,
        padding: 20,
        borderWidth: 1,
        borderColor: 'rgba(230, 179, 74, 0.2)',
        minHeight: 100,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    previewText: {
        color: '#FFFFFF',
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 15,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    previewPlaceholder: {
        color: 'rgba(224, 224, 224, 0.5)',
        fontSize: 16,
        fontStyle: 'italic',
        textAlign: 'center',
        lineHeight: 24,
    },
    previewMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 10,
    },
    previewCategory: {
        backgroundColor: 'rgba(230, 179, 74, 0.2)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(230, 179, 74, 0.3)',
    },
    previewCategoryText: {
        color: '#E6B34A',
        fontSize: 12,
        fontWeight: '600',
    },
    previewTags: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    previewTagText: {
        color: '#E6B34A',
        fontSize: 12,
        fontWeight: '500',
    },
    footer: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: 'rgba(44, 0, 0, 0.95)',
        borderTopWidth: 1,
        borderTopColor: '#E6B34A',
    },
    submitButton: {
        backgroundColor: '#E6B34A',
        paddingVertical: 16,
        borderRadius: 25,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 10,
    },
    submitButtonDisabled: {
        backgroundColor: 'rgba(230, 179, 74, 0.3)',
        shadowOpacity: 0.1,
        elevation: 2,
    },
    submitButtonText: {
        color: '#2C0000',
        fontSize: 18,
        fontWeight: 'bold',
    },
    submitButtonTextDisabled: {
        color: 'rgba(44, 0, 0, 0.5)',
    },
});

export default NewJokeScreen;
