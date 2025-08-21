import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    StatusBar,
    Animated,
    Dimensions,
    Image,
} from 'react-native';

const { width, height } = Dimensions.get('window');

interface QuickAction {
    id: string;
    title: string;
    description: string;
    icon: string;
    color: string;
    action: () => void;
}

const StartScreen: React.FC = () => {
    const [selectedMood, setSelectedMood] = useState<string>('');
    
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(50)).current;
    const headerAnim = useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        // Appearance animation
        Animated.parallel([
            Animated.timing(headerAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                delay: 200,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 1000,
                delay: 200,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const moods = [
        { id: 'happy', label: '😊 Happy', color: '#4CAF50' },
        { id: 'sad', label: '😢 Sad', color: '#2196F3' },
        { id: 'excited', label: '🎉 Excited', color: '#FF9800' },
        { id: 'relaxed', label: '😌 Relaxed', color: '#9C27B0' },
        { id: 'energetic', label: '⚡ Energetic', color: '#F44336' },
        { id: 'creative', label: '🎨 Creative', color: '#E91E63' },
    ];

    const quickActions: QuickAction[] = [
        {
            id: '1',
            title: 'Random Joke',
            description: 'Get a surprise joke to brighten your day',
            icon: '🎲',
            color: '#E6B34A',
            action: () => console.log('Random Joke'),
        },
        {
            id: '2',
            title: 'Daily Challenge',
            description: 'Complete today\'s comedy quiz',
            icon: '🎯',
            color: '#FF6B6B',
            action: () => console.log('Daily Challenge'),
        },
        {
            id: '3',
            title: 'Create Joke',
            description: 'Write and share your own humor',
            icon: '✍️',
            color: '#4ECDC4',
            action: () => console.log('Create Joke'),
        },
        {
            id: '4',
            title: 'My Collection',
            description: 'Browse your saved favorites',
            icon: '📚',
            color: '#45B7D1',
            action: () => console.log('My Collection'),
        },
    ];

    const renderQuickAction = (action: QuickAction, index: number) => (
        <Animated.View
            key={action.id}
            style={[
                styles.actionCard,
                {
                    opacity: fadeAnim,
                    transform: [{ 
                        translateY: slideAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [50 * (index + 1), 0]
                        })
                    }],
                }
            ]}
        >
            <TouchableOpacity 
                style={[styles.actionButton, { backgroundColor: action.color }]}
                onPress={action.action}
            >
                <Text style={styles.actionIcon}>{action.icon}</Text>
            </TouchableOpacity>
            <View style={styles.actionContent}>
                <Text style={styles.actionTitle}>{action.title}</Text>
                <Text style={styles.actionDescription}>{action.description}</Text>
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
                        opacity: headerAnim,
                        transform: [{ translateY: headerAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [-50, 0]
                        })}]
                    }
                ]}
            >
                <Text style={styles.headerTitle}>Welcome Back!</Text>
                <Text style={styles.headerSubtitle}>
                    Ready to laugh? Let's find something perfect for your mood
                </Text>
            </Animated.View>

            <ScrollView 
                style={styles.content}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <Animated.View 
                    style={[
                        styles.moodSection,
                        {
                            opacity: fadeAnim,
                            transform: [{ scale: fadeAnim }]
                        }
                    ]}
                >
                    <Text style={styles.sectionTitle}>How are you feeling today?</Text>
                    <View style={styles.moodsContainer}>
                        {moods.map(mood => (
                            <TouchableOpacity
                                key={mood.id}
                                style={[
                                    styles.moodButton,
                                    selectedMood === mood.id && styles.selectedMoodButton,
                                    { borderColor: mood.color }
                                ]}
                                onPress={() => setSelectedMood(mood.id)}
                            >
                                <Text style={styles.moodLabel}>{mood.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </Animated.View>

                <Animated.View 
                    style={[
                        styles.actionsSection,
                        {
                            opacity: fadeAnim,
                            transform: [{ scale: fadeAnim }]
                        }
                    ]}
                >
                    <Text style={styles.sectionTitle}>Quick Actions</Text>
                    <View style={styles.actionsGrid}>
                        {quickActions.map((action, index) => renderQuickAction(action, index))}
                    </View>
                </Animated.View>

                <Animated.View 
                    style={[
                        styles.statsSection,
                        {
                            opacity: fadeAnim,
                            transform: [{ scale: fadeAnim }]
                        }
                    ]}
                >
                    <Text style={styles.sectionTitle}>Your Comedy Stats</Text>
                    <View style={styles.statsContainer}>
                        <View style={styles.statCard}>
                            <Text style={styles.statNumber}>42</Text>
                            <Text style={styles.statLabel}>Jokes Read</Text>
                        </View>
                        <View style={styles.statCard}>
                            <Text style={styles.statNumber}>18</Text>
                            <Text style={styles.statLabel}>Favorites</Text>
                        </View>
                        <View style={styles.statCard}>
                            <Text style={styles.statNumber}>7</Text>
                            <Text style={styles.statLabel}>Created</Text>
                        </View>
                        <View style={styles.statCard}>
                            <Text style={styles.statNumber}>95</Text>
                            <Text style={styles.statLabel}>Quiz Score</Text>
                        </View>
                    </View>
                </Animated.View>

                <Animated.View 
                    style={[
                        styles.tipSection,
                        {
                            opacity: fadeAnim,
                            transform: [{ scale: fadeAnim }]
                        }
                    ]}
                >
                    <View style={styles.tipCard}>
                        <Text style={styles.tipIcon}>💡</Text>
                        <Text style={styles.tipTitle}>Pro Tip</Text>
                        <Text style={styles.tipText}>
                            Laughter is contagious! Share your favorite jokes with friends and family to spread joy and create memorable moments together.
                        </Text>
                    </View>
                </Animated.View>
            </ScrollView>
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
        fontSize: 32,
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontFamily: 'AmaticSC-Bold',
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 5,
        marginBottom: 10,
    },
    headerSubtitle: {
        fontSize: 16,
        color: '#E0E0E0',
        textAlign: 'center',
        lineHeight: 22,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    content: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 100,
    },
    moodSection: {
        marginTop: 25,
    },
    sectionTitle: {
        fontSize: 22,
        color: '#FFFFFF',
        fontWeight: 'bold',
        marginBottom: 20,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    moodsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    moodButton: {
        backgroundColor: 'rgba(74, 4, 4, 0.8)',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: 'transparent',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 6,
    },
    selectedMoodButton: {
        backgroundColor: 'rgba(230, 179, 74, 0.2)',
        borderColor: '#E6B34A',
        transform: [{ scale: 1.05 }],
    },
    moodLabel: {
        color: '#E0E0E0',
        fontSize: 16,
        fontWeight: '600',
    },
    actionsSection: {
        marginTop: 30,
    },
    actionsGrid: {
        gap: 15,
    },
    actionCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(74, 4, 4, 0.8)',
        borderRadius: 20,
        padding: 20,
        borderWidth: 1,
        borderColor: 'rgba(230, 179, 74, 0.2)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 10,
    },
    actionButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 8,
    },
    actionIcon: {
        fontSize: 28,
    },
    actionContent: {
        flex: 1,
    },
    actionTitle: {
        fontSize: 18,
        color: '#FFFFFF',
        fontWeight: 'bold',
        marginBottom: 5,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    actionDescription: {
        fontSize: 14,
        color: '#E0E0E0',
        lineHeight: 20,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    statsSection: {
        marginTop: 30,
    },
    statsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 15,
    },
    statCard: {
        width: (width - 70) / 2,
        backgroundColor: 'rgba(74, 4, 4, 0.8)',
        borderRadius: 15,
        padding: 20,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(230, 179, 74, 0.2)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 8,
    },
    statNumber: {
        fontSize: 32,
        color: '#E6B34A',
        fontWeight: 'bold',
        marginBottom: 5,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    statLabel: {
        fontSize: 14,
        color: '#E0E0E0',
        fontWeight: '600',
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    tipSection: {
        marginTop: 30,
    },
    tipCard: {
        backgroundColor: 'rgba(230, 179, 74, 0.1)',
        borderRadius: 20,
        padding: 25,
        borderWidth: 2,
        borderColor: '#E6B34A',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 10,
    },
    tipIcon: {
        fontSize: 40,
        marginBottom: 15,
    },
    tipTitle: {
        fontSize: 20,
        color: '#E6B34A',
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    tipText: {
        fontSize: 16,
        color: '#E0E0E0',
        textAlign: 'center',
        lineHeight: 24,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
});

export default StartScreen;
