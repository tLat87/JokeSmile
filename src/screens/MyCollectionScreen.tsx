import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    ImageBackground,
    TextInput,
    Image
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the type for a single roadmap step
type RoadmapStep = {
    id: number;
    text: string;
    completed: boolean;
    comment: string;
    completionDate?: string;
};

// Static roadmap data
const initialRoadmapData: RoadmapStep[] = [
    { id: 1, text: "Write 50 jokes.", completed: false, comment: '' },
    { id: 2, text: "Perform at an open mic for the first time.", completed: false, comment: '' },
    { id: 3, text: "Record your set and review it.", completed: false, comment: '' },
    { id: 4, text: "Study one hour of stand-up from a professional comedian.", completed: false, comment: '' },
    { id: 5, text: "Write 10 new minutes of material.", completed: false, comment: '' },
    { id: 6, text: "Try a new premise or style of joke.", completed: false, comment: '' },
    { id: 7, text: "Perform at 5 different open mics.", completed: false, comment: '' },
    { id: 8, text: "Get feedback from another comedian.", completed: false, comment: '' },
    { id: 9, text: "Revise your set based on feedback.", completed: false, comment: '' },
    { id: 10, text: "Perform a paid gig.", completed: false, comment: '' },
    { id: 11, text: "Network with at least 3 bookers or club owners.", completed: false, comment: '' },
    { id: 12, text: "Create a 15-minute tight set.", completed: false, comment: '' },
    { id: 13, text: "Produce your own open mic or show.", completed: false, comment: '' },
    { id: 14, text: "Record a high-quality 20-minute set.", completed: false, comment: '' },
    { id: 15, text: "Submit a tape to a comedy festival or competition.", completed: false, comment: '' },
];

const ROADMAP_STORAGE_KEY = '@standup_roadmap';

const RoadmapScreen: React.FC = () => {
    const [roadmap, setRoadmap] = useState<RoadmapStep[]>(initialRoadmapData);
    const [editingId, setEditingId] = useState<number | null>(null);

    // Load data from AsyncStorage on component mount
    useEffect(() => {
        const loadRoadmap = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem(ROADMAP_STORAGE_KEY);
                if (jsonValue != null) {
                    setRoadmap(JSON.parse(jsonValue));
                }
            } catch (e) {
                console.error("Failed to load roadmap data.", e);
            }
        };

        loadRoadmap();
    }, []);

    // Save data to AsyncStorage whenever the roadmap state changes
    useEffect(() => {
        const saveRoadmap = async () => {
            try {
                const jsonValue = JSON.stringify(roadmap);
                await AsyncStorage.setItem(ROADMAP_STORAGE_KEY, jsonValue);
            } catch (e) {
                console.error("Failed to save roadmap data.", e);
            }
        };

        if (roadmap !== initialRoadmapData) {
            saveRoadmap();
        }
    }, [roadmap]);

    // Function to toggle step completion
    const toggleCompletion = (id: number) => {
        setRoadmap(prevRoadmap =>
            prevRoadmap.map(step =>
                step.id === id
                    ? {
                        ...step,
                        completed: !step.completed,
                        completionDate: !step.completed ? new Date().toISOString() : undefined,
                    }
                    : step
            )
        );
    };

    // Function to handle comment changes
    const handleCommentChange = (id: number, newComment: string) => {
        setRoadmap(prevRoadmap =>
            prevRoadmap.map(step =>
                step.id === id ? { ...step, comment: newComment } : step
            )
        );
    };

    return (
        <ImageBackground
            source={require('../assets/img/0e2dac62064077cb5876e816dbde3e6de782b7dc.png')} // Background image
            resizeMode="cover"
            style={styles.background}
        >
            <View style={styles.overlay}>
                <Text style={styles.header}>STAND-UP ROADMAP</Text>
                <ScrollView contentContainerStyle={styles.roadmapContainer}>
                    {roadmap.map((step) => (
                        <View key={step.id} style={styles.stepCard}>
                            <TouchableOpacity
                                style={styles.stepHeader}
                                onPress={() => toggleCompletion(step.id)}
                            >
                                <View
                                    style={[
                                        styles.checkbox,
                                        step.completed && styles.checkedCheckbox,
                                    ]}
                                >
                                    {step.completed && (
                                        <Image
                                            source={require('../assets/img/Component8.png')}
                                            style={styles.checkIcon}
                                        />
                                    )}
                                </View>
                                <Text
                                    style={[
                                        styles.stepText,
                                        step.completed && styles.completedText,
                                    ]}
                                >
                                    {step.text}
                                </Text>
                            </TouchableOpacity>

                            {step.completed && step.completionDate && (
                                <Text style={styles.completionDate}>
                                    Completed: {new Date(step.completionDate).toLocaleDateString()}
                                </Text>
                            )}

                            <TextInput
                                style={styles.commentInput}
                                placeholder="Add a comment..."
                                placeholderTextColor="#ccc"
                                value={step.comment}
                                onChangeText={(text) => handleCommentChange(step.id, text)}
                                multiline
                            />
                        </View>
                    ))}
                </ScrollView>
            </View>
        </ImageBackground>
    );
};

// Styles for the RoadmapScreen layout
const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    overlay: {
        flex: 1,
        paddingTop: 60,
        paddingHorizontal: 16,
    },
    header: {
        fontSize: 78,
        color: '#fff',
        fontWeight: 'bold',
        fontFamily: 'AmaticSC-Bold',
        alignSelf: 'center',
        marginBottom: 16,
        textAlign: 'center',
    },
    roadmapContainer: {
        paddingBottom: 80,
    },
    stepCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
    },
    stepHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#fff',
        marginRight: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkedCheckbox: {
        backgroundColor: '#ff5500',
        borderColor: '#ff5500',
    },
    checkIcon: {
        width: 16,
        height: 16,
        tintColor: '#fff',
    },
    stepText: {
        color: '#fff',
        fontSize: 16,
        flex: 1,
    },
    completedText: {
        textDecorationLine: 'line-through',
        color: 'rgba(255, 255, 255, 0.5)',
    },
    commentInput: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        color: '#fff',
        borderRadius: 8,
        padding: 10,
        fontSize: 14,
        marginTop: 5,
        minHeight: 40,
    },
    completionDate: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 12,
        marginTop: -5,
        marginBottom: 5,
        marginLeft: 36,
    },
});

export default RoadmapScreen;
