import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Animated,
    Image,
    StatusBar,
} from 'react-native';

const { width, height } = Dimensions.get('window');

interface OnboardingData {
    id: number;
    title: string;
    description: string;
    image: any;
}

const onboardingData: OnboardingData[] = [
    {
        id: 1,
        title: 'Welcome to JokeSmile',
        description: 'Discover a world of amazing jokes and funny stories that will brighten your day',
        image: require('../assets/img/Component21.png'),
    },
    {
        id: 2,
        title: 'Create Your Collection',
        description: 'Save your favorite jokes, add tags and create your personal humor library',
        image: require('../assets/img/Component322.png'),
    },
    {
        id: 3,
        title: 'Take Part in Quizzes',
        description: 'Test your knowledge, earn points and compete with friends in fun quizzes',
        image: require('../assets/img/Component24.png'),
    },
];

interface OnboardingScreenProps {
    onComplete: () => void;
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(0)).current;

    const nextSlide = () => {
        if (currentIndex < onboardingData.length - 1) {
            setCurrentIndex(currentIndex + 1);
            Animated.spring(slideAnim, {
                toValue: currentIndex + 1,
                useNativeDriver: true,
            }).start();
        } else {
            onComplete();
        }
    };

    const skipOnboarding = () => {
        onComplete();
    };

    const renderSlide = (item: OnboardingData, index: number) => {
        const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
        ];

        const titleTranslateY = scrollX.interpolate({
            inputRange,
            outputRange: [100, 0, -100],
            extrapolate: 'clamp',
        });

        const descriptionTranslateY = scrollX.interpolate({
            inputRange,
            outputRange: [150, 0, -150],
            extrapolate: 'clamp',
        });

        const imageScale = scrollX.interpolate({
            inputRange,
            outputRange: [0.8, 1, 0.8],
            extrapolate: 'clamp',
        });

        return (
            <View key={item.id} style={styles.slide}>
                <Animated.View
                    style={[
                        styles.imageContainer,
                        {
                            transform: [{ scale: imageScale }],
                        },
                    ]}
                >
                    <Image source={item.image} style={styles.image} resizeMode="contain" />
                </Animated.View>

                <Animated.View
                    style={[
                        styles.textContainer,
                        {
                            transform: [{ translateY: titleTranslateY }],
                        },
                    ]}
                >
                    <Text style={styles.title}>{item.title}</Text>
                </Animated.View>

                <Animated.View
                    style={[
                        styles.descriptionContainer,
                        {
                            transform: [{ translateY: descriptionTranslateY }],
                        },
                    ]}
                >
                    <Text style={styles.description}>{item.description}</Text>
                </Animated.View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#2C0000" />
            
            <TouchableOpacity style={styles.skipButton} onPress={skipOnboarding}>
                <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>

            <Animated.ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                )}
                scrollEventThrottle={16}
                contentContainerStyle={styles.scrollContainer}
            >
                {onboardingData.map((item, index) => renderSlide(item, index))}
            </Animated.ScrollView>

            <View style={styles.bottomContainer}>
                <View style={styles.paginationContainer}>
                    {onboardingData.map((_, index) => (
                        <View
                            key={index}
                            style={[
                                styles.paginationDot,
                                index === currentIndex && styles.paginationDotActive,
                            ]}
                        />
                    ))}
                </View>

                <TouchableOpacity style={styles.nextButton} onPress={nextSlide}>
                    <Text style={styles.nextButtonText}>
                        {currentIndex === onboardingData.length - 1 ? 'Get Started' : 'Next'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2C0000',
    },
    skipButton: {
        position: 'absolute',
        top: 60,
        right: 20,
        zIndex: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    skipText: {
        color: '#E6B34A',
        fontSize: 16,
        fontWeight: '600',
    },
    scrollContainer: {
        flexGrow: 1,
    },
    slide: {
        width,
        height,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 40,
    },
    imageContainer: {
        width: 200,
        height: 200,
        marginBottom: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        tintColor: '#E6B34A',
    },
    textContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: 20,
        fontFamily: 'AmaticSC-Bold',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 5,
    },
    descriptionContainer: {
        alignItems: 'center',
        maxWidth: 300,
    },
    description: {
        fontSize: 18,
        color: '#E0E0E0',
        textAlign: 'center',
        lineHeight: 26,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    bottomContainer: {
        paddingHorizontal: 40,
        paddingBottom: 60,
        alignItems: 'center',
    },
    paginationContainer: {
        flexDirection: 'row',
        marginBottom: 40,
    },
    paginationDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#6A0505',
        marginHorizontal: 6,
    },
    paginationDotActive: {
        backgroundColor: '#E6B34A',
        transform: [{ scale: 1.2 }],
    },
    nextButton: {
        backgroundColor: '#E6B34A',
        paddingHorizontal: 40,
        paddingVertical: 16,
        borderRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    nextButtonText: {
        color: '#2C0000',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default OnboardingScreen;
