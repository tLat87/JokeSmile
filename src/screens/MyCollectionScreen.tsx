// import React, { useState } from 'react';
// import {
//     View,
//     Text,
//     TextInput,
//     StyleSheet,
//     ScrollView,
//     TouchableOpacity,
//     ImageBackground,
//     Image,
// } from 'react-native';
// import { useSelector } from 'react-redux';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { Joke } from '../types';
// import {RootState} from "../redux/store.ts"; // <-- Create this type if not already present
//
// // Type definition for screen props (navigation only)
// type MyCollectionScreenProps = {
//     navigation: NativeStackNavigationProp<any>; // Replace `any` with your stack type
// };
//
// // Define the joke categories used for filtering
// const categories: string[] = ['Favorite', 'Evening wear', 'Sad and cheerful'];
//
// const MyCollectionScreen: React.FC<MyCollectionScreenProps> = ({ navigation }) => {
//     // Fetch jokes from Redux store
//     const jokes = useSelector((state: RootState) => state.jokes.list as Joke[]);
//
//     // Local state for search text and selected category
//     const [search, setSearch] = useState<string>('');
//     const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
//
//     // Filter jokes based on category and search text
//     const filteredJokes = jokes.filter((joke) =>
//         (!selectedCategory || joke.category === selectedCategory) &&
//         joke.text.toLowerCase().includes(search.toLowerCase())
//     );
//
//     return (
//         <ImageBackground
//             source={require('../assets/img/0e2dac62064077cb5876e816dbde3e6de782b7dc.png')}
//             style={styles.background}
//             resizeMode="cover"
//         >
//             <ScrollView style={styles.overlay}>
//                 {/* Header with title and Add Joke button */}
//                 <View style={styles.headerRow}>
//                     <Text style={styles.title}>MY{'\n'}COLLECTION{'\n'}OF HUMOR</Text>
//                     <TouchableOpacity
//                         style={styles.addButton}
//                         onPress={() => navigation.navigate('NewJokeScreen')}
//                     >
//                         <Image source={require('../assets/img/Component82.png')} />
//                     </TouchableOpacity>
//                 </View>
//
//                 {/* Search bar input */}
//                 <View style={styles.searchSection}>
//                     <TextInput
//                         style={styles.searchInput}
//                         placeholder="Search"
//                         placeholderTextColor="#ccc"
//                         value={search}
//                         onChangeText={setSearch}
//                     />
//                 </View>
//
//                 {/* Horizontal scrollable category filter */}
//                 <ScrollView
//                     horizontal
//                     showsHorizontalScrollIndicator={false}
//                     style={styles.categoryScroll}
//                 >
//                     {categories.map((cat) => (
//                         <TouchableOpacity
//                             key={cat}
//                             style={[
//                                 styles.categoryButton,
//                                 selectedCategory === cat && styles.activeCategory,
//                             ]}
//                             onPress={() =>
//                                 setSelectedCategory(selectedCategory === cat ? null : cat)
//                             }
//                         >
//                             <Text style={styles.categoryText}>{cat}</Text>
//                         </TouchableOpacity>
//                     ))}
//                 </ScrollView>
//
//                 {/* List of filtered jokes */}
//                 <ScrollView contentContainerStyle={styles.jokeContainer}>
//                     {filteredJokes.map((joke, index) => (
//                         <View key={joke.id || index} style={styles.jokeCard}>
//                             <Text style={styles.jokeText}>{joke.text}</Text>
//                             <Image source={require('../assets/img/Component8.png')} />
//                         </View>
//                     ))}
//                 </ScrollView>
//             </ScrollView>
//         </ImageBackground>
//     );
// };
//
// // Styles for MyCollectionScreen layout
// const styles = StyleSheet.create({
//     background: {
//         flex: 1
//     },
//     overlay: {
//         flex: 1,
//         // backgroundColor: 'rgba(0,0,0)',
//         paddingTop: 60,
//         paddingHorizontal: 16
//     },
//     headerRow: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'flex-start'
//     },
//     title: {
//         fontSize: 58,
//         color: '#fff',
//         fontWeight: 'bold',
//         fontFamily: 'AmaticSC-Bold',
//         alignSelf: 'center',
//         marginBottom: 16,
//         textAlign: 'left',
//     },
//     addButton: {
//         backgroundColor: 'transparent',
//         padding: 10,
//         alignSelf: 'center',
//     },
//     searchSection: {
//         marginTop: 20
//     },
//     searchInput: {
//         backgroundColor: '#300000',
//         borderRadius: 20,
//         paddingHorizontal: 16,
//         paddingVertical: 20,
//         color: '#fff'
//     },
//     categoryScroll: {
//         marginTop: 16,
//         marginBottom: 8
//     },
//     categoryButton: {
//         backgroundColor: '#500000',
//         paddingVertical: 6,
//         paddingHorizontal: 14,
//         borderRadius: 20,
//         marginRight: 10
//     },
//     activeCategory: {
//         backgroundColor: '#ff5500'
//     },
//     categoryText: {
//         color: '#fff',
//         fontSize: 14
//     },
//     jokeContainer: {
//         paddingBottom: 100
//     },
//     jokeCard: {
//         backgroundColor: 'rgba(255, 255, 255, 0.1)',
//         borderRadius: 16,
//         padding: 14,
//         marginBottom: 12,
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     jokeText: {
//         color: '#fff',
//         width: '85%',
//         fontSize: 15
//     }
// });
//
// export default MyCollectionScreen;

import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
    Image,
    Animated,
    Easing,
    Modal,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Type definition for screen props (navigation only)
type WheelOfFortuneScreenProps = {
    navigation: NativeStackNavigationProp<any>; // Replace `any` with your stack type
};

// Data for the wheel and jokes
const jokeThemes = [
    { name: 'Funny Facts', jokes: ["Why don't scientists trust atoms? Because they make up everything!"] },
    { name: 'Puns', jokes: ["I'm reading a book on anti-gravity. It's impossible to put down!"] },
    { name: 'Tech Jokes', jokes: ["Why was the computer cold? It left its Windows open!"] },
    { name: 'Dad Jokes', jokes: ["I'm on a seafood diet. I see food and I eat it!"] },
];

const WheelOfFortuneScreen: React.FC<WheelOfFortuneScreenProps> = ({ navigation }) => {
    const [isSpinning, setIsSpinning] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentJoke, setCurrentJoke] = useState('');
    const spinValue = useRef(new Animated.Value(0)).current;

    const spinWheel = () => {
        if (isSpinning) return;
        setIsSpinning(true);

        // Determine a random winning index
        const winningIndex = Math.floor(Math.random() * jokeThemes.length);

        // Calculate the final angle for the spin
        // A full circle is 360 degrees. Each segment is 90 degrees.
        // We want to land in the middle of the winning segment.
        // The rotation is clockwise, so we need to adjust the angle.
        // We add multiple full rotations for a good spin effect.
        const segmentAngle = 360 / jokeThemes.length;
        const targetAngle = 3600 + (360 - (winningIndex * segmentAngle + segmentAngle / 2)); // Add multiple full rotations (e.g., 10)

        Animated.timing(spinValue, {
            toValue: targetAngle,
            duration: 3000,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
        }).start(() => {
            setIsSpinning(false);
            // After the animation, show the modal with the joke
            const winningJoke = jokeThemes[winningIndex].jokes[0]; // Get the first joke from the winning theme
            setCurrentJoke(winningJoke);
            setModalVisible(true);
            // Reset the spin value for the next spin
            spinValue.setValue(0);
        });
    };

    const spin = spinValue.interpolate({
        inputRange: [0, 360],
        outputRange: ['0deg', '360deg'],
    });

    const closeModal = () => {
        setModalVisible(false);
    };

    // The wheel segments are drawn using Views with rotations
    const renderWheel = () => {
        const segmentAngle = 360 / jokeThemes.length;
        return jokeThemes.map((theme, index) => {
            const rotation = index * segmentAngle;
            return (
                <View
                    key={theme.name}
                    style={[
                        styles.wheelSegment,
                        {
                            transform: [{ rotate: `${rotation}deg` }],
                            backgroundColor: index % 2 === 0 ? '#ff5500' : '#500000',
                        },
                    ]}
                >
                    <View style={[styles.segmentTextContainer, { transform: [{ rotate: `90deg` }] }]}>
                        <Text style={styles.segmentText}>{theme.name}</Text>
                    </View>
                </View>
            );
        });
    };

    return (
        <ImageBackground
            source={require('../assets/img/0e2dac62064077cb5876e816dbde3e6de782b7dc.png')}
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.overlay}>
                {/* Header with back button and title */}
                <View style={styles.headerRow}>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <Image source={require('../assets/img/Component8.png')} style={styles.backButtonIcon} />
                    </TouchableOpacity>
                    <Text style={styles.title}>WHEEL{'\n'}OF JOKES</Text>
                </View>

                <View style={styles.contentContainer}>
                    <Animated.View style={[styles.wheelContainer, { transform: [{ rotate: spin }] }]}>
                        {renderWheel()}
                    </Animated.View>

                    <Image source={require('../assets/img/Component22.png')} style={styles.pointer} />

                    <TouchableOpacity
                        style={[styles.spinButton, isSpinning && styles.disabledButton]}
                        onPress={spinWheel}
                        disabled={isSpinning}
                    >
                        <Text style={styles.spinButtonText}>SPIN THE WHEEL</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Modal for displaying the joke */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>Congratulations!</Text>
                        <Text style={styles.modalText}>{currentJoke}</Text>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={closeModal}
                        >
                            <Text style={styles.closeButtonText}>CLOSE</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    overlay: {
        flex: 1,
        paddingTop: 60,
        paddingHorizontal: 16,
        alignItems: 'center',
    },
    headerRow: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 20,
    },
    backButton: {
        padding: 10,
        marginRight: 20,
    },
    backButtonIcon: {
        width: 24,
        height: 24,
        tintColor: 'white',
    },
    title: {
        fontSize: 58,
        color: '#fff',
        fontWeight: 'bold',
        fontFamily: 'AmaticSC-Bold',
        alignSelf: 'center',
        textAlign: 'center',
        flex: 1,
        marginLeft: -44, // Adjust this value to center the title better
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    wheelContainer: {
        width: 300,
        height: 300,
        borderRadius: 150,
        borderWidth: 5,
        borderColor: '#fff',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    wheelSegment: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderWidth: 2,
        borderColor: '#000',
        transformOrigin: '50% 50%',
        // This is a common way to create pie-chart-like segments
        borderTopWidth: 150,
        borderLeftWidth: 150,
        borderBottomWidth: 0,
        borderRightWidth: 0,
        borderColor: 'transparent',
    },
    segmentTextContainer: {
        position: 'absolute',
        top: '25%',
        left: '25%',
        width: '50%',
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    segmentText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    },
    pointer: {
        width: 40,
        height: 40,
        position: 'absolute',
        top: '25%',
        left: '50%',
        marginLeft: -20,
        marginTop: -20,
        transform: [{ rotate: '90deg' }], // Pointing at the top segment
        tintColor: '#FFA500', // Example color for the pointer
    },
    spinButton: {
        backgroundColor: '#FFA500',
        borderRadius: 30,
        paddingVertical: 15,
        paddingHorizontal: 40,
        marginTop: 50,
        ...Platform.select({
            ios: {
                shadowColor: '#FFA500',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.7,
                shadowRadius: 15,
            },
            android: {
                elevation: 15,
            },
        }),
    },
    spinButtonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'AmaticSC-Bold',
    },
    disabledButton: {
        backgroundColor: 'gray',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    modalView: {
        width: '80%',
        backgroundColor: '#300000',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        color: '#FFA500',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
        fontFamily: 'AmaticSC-Bold',
    },
    modalText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
        fontFamily: 'AmaticSC-Regular',
    },
    closeButton: {
        backgroundColor: '#FFA500',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 30,
        elevation: 2,
    },
    closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default WheelOfFortuneScreen;
